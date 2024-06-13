"use client";

import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

interface FAQItem {
  id: number;
  question: string;
  info: string;
}

const FAQ = () => {
  const [showInfo, setShowInfo] = useState<number | null>(null);
  const [items] = useState<FAQItem[]>([
    {
      id: 1,
      question: "Phone repair cost?",
      info: "Repair costs vary based on the repair needed and phone model. Contact your service provider for an accurate quote.",
    },
    {
      id: 2,
      question: "Repair process duration?",
      info: "Time depends on repair complexity and part availability. Simple repairs like screen replacements can take a few hours, while complex issues may take days.",
    },
    {
      id: 3,
      question: "Appointment required for phone repair?",
      info: "It's recommended to schedule an appointment for prompt service. Some repair shops accept walk-ins, but appointments help avoid waiting or delays.",
    },
    {
      id: 4,
      question: "Fixing a cracked screen?",
      info: "Most repair shops offer screen replacements to restore functionality.",
    },
    {
      id: 5,
      question: "Repairing an older phone worth it?",
      info: "Decide based on damage extent, overall condition, and repair cost. Sometimes repairing is cost-effective, while other times it's better to consider a new phone.",
    },
    {
      id: 6,
      question: "Does repair void the warranty?",
      info: "It depends on your phone's warranty terms. Third-party repairs can void the manufacturer's warranty, while authorized centers won't. Check your warranty information or consult the repair service provider.",
    },
    {
      id: 7,
      question: "Types of phone repairs offered?",
      info: "Shops handle screen replacements, battery replacements, charging port repairs, camera repairs, software troubleshooting, and more.",
    },
    {
      id: 8,
      question: "Data recovery from a damaged phone?",
      info: "In many cases, repair technicians can attempt data recovery. Regularly back up your data to avoid potential loss.",
    },
    {
      id: 9,
      question: "Warranties or guarantees on repairs?",
      info: "Reputable providers offer warranties or guarantees. Inquire about specific policies before proceeding.",
    },
    {
      id: 10,
      question: "Accepted payment options?",
      info: "Shops usually accept cash, credit/debit cards, and mobile payment options like Apple Pay or Google Pay. Confirm with the provider beforehand.",
    },
    {
      id: 11,
      question: "Impact on unknown parts or features?",
      info: "During repairs, unknown parts or features may be affected. For example, True Tone on iPhones may not function correctly after screen repair. Discuss concerns with the service provider. Reputable centers minimize impacts and communicate potential risks.",
    },
  ]);

  const handleShowInfo = (itemId: number) => {
    setShowInfo((prev) => (prev === itemId ? null : itemId));
  };

  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20 border-t border-gray-800">
          <h1 className="text-2xl ml-5">Frequently asked questions</h1>
          <div className="bodyOfThePage mx-12">
            <hr className="my-4 border-gray-300" />
            {items.map((item) => (
              <div key={item.id} className="questionContainer mb-5">
                <div className="questionsHead flex items-center justify-between">
                  <h6 className="text-lg">{item.question}</h6>
                  <AiOutlinePlus
                    className={`plusIcon cursor-pointer text-3xl bg-white text-blue-900 rounded-full p-1 transition-transform duration-300 ${
                      showInfo === item.id ? "transform rotate-45" : ""
                    }`}
                    onClick={() => handleShowInfo(item.id)}
                  />
                </div>
                {showInfo === item.id && (
                  <p className="mt-2 text-justify">{item.info}</p>
                )}
                <hr className="my-4 border-gray-300" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
