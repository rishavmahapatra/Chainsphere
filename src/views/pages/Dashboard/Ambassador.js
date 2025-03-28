import React, { useState } from "react";
import { Typography } from "@material-ui/core";

const ReferralComponent = () => {
  const referralLink = "https://chainsphere.tech/referral";
  const [referrals, setReferrals] = useState([
    { date: "2025-03-20", time: "10:30 AM", email: "john24@gmail.com" },
    { date: "2025-03-21", time: "02:45 PM", email: "jane2@gmail.com" },
    { date: "2025-03-22", time: "06:15 PM", email: "doe23@gmail.com" },
  ]);
  const totalBusiness = 0;

  // Function to copy referral link
  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    alert("Referral link copied!");
  };

  // Function to share referral link
  const shareReferral = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join using my referral!",
          url: referralLink,
        });
        console.log("Referral link shared successfully!");
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("User canceled the share action.");
        } else {
          console.error("Error sharing:", error);
        }
      }
    } else {
      alert("Sharing not supported in this browser.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-[#0D0A0D] rounded-xl ">
      {/* Referral Link Section */}
      <div className=" shadow-md p-4 rounded-lg mb-4">
        <Typography className="pb-4" variant="h1">
          Referral
        </Typography>
        <Typography variant="h5">Referral Link</Typography>
        <div className="flex items-center justify-between border-gray-700 border my-2 p-2 rounded-md">
          <span className="truncate text-gray-100">{referralLink}</span>
          <div>
            {" "}
            <button
              onClick={copyToClipboard}
              className="bg-blue-500 text-white px-3 py-1 rounded-md ml-2"
            >
              Copy
            </button>
            <button
              onClick={shareReferral}
              className="bg-green-500 text-white px-3 py-1 rounded-md ml-2"
            >
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Referrals Table */}
      <div className="shadow-md p-4  rounded-lg">
        <Typography variant="h5">My Referrals</Typography>
        <Typography variant="h6">
          <div className="py-2 overflow-x-auto">
            <table className="min-w-full border-collapse boder">
              <thead>
                <tr className="bg-neutral-900 text-white">
                  <th className="border p-2 border-gray-800">Date</th>
                  <th className="border p-2 border-gray-800">Time</th>
                  <th className="border p-2 border-gray-800">Email</th>
                </tr>
              </thead>
              <tbody>
                {referrals.map((ref, index) => (
                  <tr key={index} className="border">
                    <td className="border p-2 border-gray-800">{ref.date}</td>
                    <td className="border p-2 border-gray-800">{ref.time}</td>
                    <td className="border p-2 border-gray-800">{ref.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Typography>
      </div>

      {/* Total Business Card */}
      <div className=" shadow-md p-4 border-gray-800 border my-10 rounded-lg text-center">
      <Typography variant="h5">Total Business</Typography>
        <p className="text-2xl font-bold text-green-600">
          ${totalBusiness.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default ReferralComponent;
