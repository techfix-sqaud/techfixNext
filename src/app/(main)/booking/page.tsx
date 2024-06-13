"use client";
import React, { useEffect, useState } from "react";
import "../../globals.css";

const Appointment = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const appointmentLink =
    "https://outlook.office365.com/owa/calendar/Appointment@techfix-raleigh.com/bookings/";

  useEffect(() => {
    if (!appointmentLink) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, []);
  return (
    <div>
      {loading ? (
        <div>loading ...</div>
      ) : (
        <iframe src={appointmentLink}></iframe>
      )}
    </div>
  );
};

export default Appointment;
