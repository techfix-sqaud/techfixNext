import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useMemo } from "react";
import { Message } from "../contexts/types/Messages";
import { _getMessages } from "../API/webServices";
import { RxAvatar } from "react-icons/rx";

const MessageCard = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await _getMessages();
      const unreadMessages = response.filter(
        (msg: Message) => msg.status === "Seen"
      );
      setMessages(unreadMessages);
    };
    fetchMessages();
  }, []);

  const filteredMessages = useMemo(() => {
    return messages.filter((msg) =>
      Object.values(msg).some((value) => {
        if (typeof value === "string") {
          return value.toLowerCase().includes(searchQuery.toLowerCase());
        }
        if (typeof value === "number") {
          return value.toString().includes(searchQuery);
        }
        // Add more conditions for other data types if necessary
        return false;
      })
    );
  }, [messages, searchQuery]);

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <h4 className="mb-3 px-7.5 text-xl font-semibold text-black dark:text-white">
        Messages
      </h4>

      <div className="mb-4 px-7.5">
        <input
          type="text"
          className="w-full rounded-md border border-stroke px-4 py-2 text-black dark:border-strokedark dark:bg-boxdark dark:text-white"
          placeholder="Search messages"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="max-h-90 overflow-y-auto">
        {filteredMessages.map((msg, key) => (
          <Link
            href={`mailto:${msg?.email}`}
            className="flex items-center gap-5 px-7.5 py-3 hover:bg-gray-3 dark:hover:bg-meta-4"
            key={key}
          >
            <div className="relative h-14 w-14 rounded-full">
              <RxAvatar style={{ fontSize: 36 }} />
            </div>

            <div className="flex flex-1 items-center justify-between">
              <div>
                <h5 className="font-medium text-black dark:text-white">
                  {msg?.name}
                </h5>
                <p>
                  <span className="text-medium text-black dark:text-white">
                    {msg?.email}
                  </span>
                </p>
                <p>
                  <span className="text-sm text-black dark:text-white">
                    {msg?.message}
                  </span>
                </p>
                <span className="text-xs">
                  {new Date(msg?.date).toLocaleDateString()}
                </span>
              </div>
              {/* {msg.textCount !== 0 && (
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                  <span className="text-sm font-medium text-white">
                    {chat.textCount}
                  </span>
                </div>
              )} */}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MessageCard;
