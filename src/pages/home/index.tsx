import Link from "next/link";
import React, { useState } from "react";

const Tab = {
  VULN_SCANNING: "vuln_scanning",
  EXPLAIN: "explain",
  CONVERT: "convert",
};

export default function HomePage() {
  const [activeTab, setActiveTab] = useState(Tab.VULN_SCANNING);
  const [loading, setLoading] = useState(false);
  const [vulnResult, setVulnResult] = useState<string>("");
  const [explainResult, setExplainResult] = useState<string>("");
  const [convertResult, setConvertResult] = useState<string>("");

  if (loading) {
    // loading spinner styled using tailwindcss and @headlessui/react.
    return (
      <div className="flex justify-center items-center min-h-[30vh]">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // if (error) {
  //   // error message styled using tailwindcss and @headlessui/react.
  //   return (
  //     <div className="flex justify-center items-center min-h-[30vh]">
  //       <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
  //         <strong className="font-bold">Error:</strong>
  //         <span className="block sm:inline">{error.message}</span>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="flex flex-col justify-center py-4 text-[rgb(255 255 255 / 87%)]">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold text-center">
          ENTROPY.AI - Smart Contract ToolBox
        </h1>
        <Link
          href="/"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md my-4"
        >
          Back
        </Link>
        <input
          className="w-1/3 border border-gray-300 rounded-md shadow-xl py-2 px-4 my-8 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          type="text"
          placeholder="What do you want to do?"
        />
      </div>
      {/*create tabs for VULN_SCANNING and and EXPLAIN which onClick will set the state of the tab to active */}
      <div className="flex justify-around items-around">
        <button
          className={`flex flex-row items-center justify-center w-1/2 py-2 px-4 my-2 mx-4 border border-[#f87216] rounded-l-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-3 focus:ring-offset-2 focus:ring-[#f87216] hover:text-black hover:bg-[#f87216] ${
            activeTab === Tab.VULN_SCANNING ? "bg-[#f87216] text-white" : ""
          }`}
          onClick={() => {
            setActiveTab(Tab.VULN_SCANNING);
          }}
        >
          {/* <FaNewspaper className="mr-2" /> */}
          VULN_SCANNING
        </button>
        <button
          className={`flex flex-row items-center justify-center w-1/2 py-2 px-4 my-2 mx-4 border border-[#f87216] rounded-r-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-3 focus:ring-offset-2 focus:ring-[#f87216] hover:text-black hover:bg-[#f87216] ${
            activeTab === Tab.EXPLAIN ? "bg-[#f87216] text-white" : ""
          }`}
          onClick={() => {
            setActiveTab(Tab.EXPLAIN);
            // fetchExplain(userSessionAndTokens?.providerToken);
          }}
        >
          {/* <FaStar className="mr-2" /> */}
          EXPLAIN
        </button>
        <button
          className={`flex flex-row items-center justify-center w-1/2 py-2 px-4 my-2 mx-4 border border-[#f87216] rounded-r-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-3 focus:ring-offset-2 focus:ring-[#f87216] hover:text-black hover:bg-[#f87216] ${
            activeTab === Tab.CONVERT ? "bg-[#f87216] text-white" : ""
          }`}
          onClick={() => {
            setActiveTab(Tab.CONVERT);
          }}
        >
          {/* <FaSmileWink className="mr-2" /> */}
          CONVERT
        </button>
      </div>
      {/* activeTab is VULN_SCANNING, render the VULN_SCANNING */}
      <div className="flex flex-col mt-8 justify-center items-center text-[rgb(255 255 255 / 87%)!important]">
        {activeTab === Tab.VULN_SCANNING && (
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold">VULNERABILITY SCANNING</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {vulnResult && vulnResult.length > 0 && (
                <div className="p-4 border border-gray-200 rounded-md shadow-sm">
                  <h3 className="text-lg font-bold">Result:</h3>
                  <p className="" id="vulnResult"></p>
                </div>
              )}
            </div>
          </div>
        )}
        {/*if activeTab is EXPLAIN, render the EXPLAIN */}
        {activeTab === Tab.EXPLAIN && (
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold">EXPLAIN</h2>
            {vulnResult && vulnResult.length > 0 && (
              <div className="p-4 border border-gray-200 rounded-md shadow-sm">
                <h3 className="text-lg font-bold">Result:</h3>
                <p className="" id="vulnResult"></p>
              </div>
            )}
            ): (
            <div className="p-4 shadow-sm">
              <h2 className="text-lg font-bold">🥹</h2>
              <h3 className="text-lg font-bold">We tried hard</h3>
              <h6 className="text-lg font-bold">
                But at last no results were found for you
              </h6>
            </div>
            )
          </div>
        )}
        {/* if activeTab is CONVERT, render the CONVERT */}
        {activeTab === Tab.CONVERT && (
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold">CONVERT</h2>
            {vulnResult && vulnResult.length > 0 && (
              <div className="p-4 border border-gray-200 rounded-md shadow-sm">
                <h3 className="text-lg font-bold">Result:</h3>
                <p className="" id="vulnResult"></p>
              </div>
            )}
            ): (
            <div className="p-4 shadow-sm">
              <h2 className="text-lg font-bold">🥹</h2>
              <h3 className="text-lg font-bold">We tried hard</h3>
              <h6 className="text-lg font-bold">
                But at last no results were found for you
              </h6>
            </div>
            )
          </div>
        )}
      </div>
    </div>
  );
}
