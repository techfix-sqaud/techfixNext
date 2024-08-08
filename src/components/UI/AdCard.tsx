import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import { _createAd, _getAds, _updateAd } from "../API/webServices";
import { FaEdit } from "react-icons/fa";

const AdCard = () => {
  const [ads, setAds] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedAd, setSelectedAd] = useState<any>(null);
  const [editInput, setEditInput] = useState<string>("");

  useEffect(() => {
    const fetchAds = async () => {
      const response = await _getAds();
      setAds(response);
    };
    fetchAds();
  }, []);

  const filteredAds = useMemo(() => {
    return ads.filter((ad) =>
      Object.values(ad).some((value) => {
        if (typeof value === "string") {
          return value.toLowerCase().includes(searchQuery.toLowerCase());
        }
        if (typeof value === "number") {
          return value.toString().includes(searchQuery);
        }
        return false;
      })
    );
  }, [ads, searchQuery]);

  const handleEditAd = (ad: any) => {
    setSelectedAd(ad);
    setEditInput(ad.ad);
  };

  const handleUpdateCreateAd = async () => {
    if (selectedAd) {
      const updateAd = await _updateAd(selectedAd.id, editInput);
      console.log("Updating ad:", selectedAd.id, editInput);
      // Update the ad in the state
      setAds((prevAds) =>
        prevAds.map((ad) =>
          ad.id === selectedAd.id ? { ...ad, ad: editInput } : ad
        )
      );
    } else {
      // Create new ad logic here
      const newAd = await _createAd(editInput);
      console.log("Creating new ad:", newAd);
      // Add the new ad to the state
      setAds((prevAds) => [...prevAds, newAd]);
    }
    // Reset the selected ad and input
    setSelectedAd(null);
    setEditInput("");
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-5">
      <h4 className="mb-6 px-7.5 text-xl font-semibold text-black dark:text-white">
        Ads
      </h4>

      <div className="mb-4 px-7.5 flex items-center gap-2">
        <input
          type="text"
          className="w-full rounded-md border border-stroke px-4 py-2 text-black dark:border-strokedark dark:bg-boxdark dark:text-white"
          value={editInput}
          onChange={(e) => setEditInput(e.target.value)}
        />
        <button
          className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-white hover:bg-opacity-90"
          onClick={handleUpdateCreateAd}
        >
          {selectedAd ? "Update" : "Create"}
        </button>
      </div>

      <div className="max-h-90 overflow-y-auto">
        {filteredAds.map((ad, key) => (
          <div
            className="flex items-center gap-5 px-7.5 py-3 hover:bg-gray-3 dark:hover:bg-meta-4 cursor-pointer"
            key={key}
            onClick={() => handleEditAd(ad)}
          >
            <div className="relative h-14 w-14 rounded-full">
              <FaEdit style={{ fontSize: 36 }} />
            </div>

            <div className="flex flex-1 items-center justify-between">
              <div>
                <h5 className="font-medium text-black dark:text-white">
                  {ad?.ad}
                </h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdCard;
