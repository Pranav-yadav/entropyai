// create a react functional component for homepage showing multiple tabs for different sections such as Explain, Convert, Generate Smart Contract from other code. And a search bar. The search bar should be able to search for a particular section and the section should be highlighted in the page. The search bar should be able to search for a particular section and the section should be highlighted in the page.
import { useState } from "react";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState(Tab.HIGHLIGHTS);
  const [loading, setLoading] = useState(false);

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
        <h1 className="text-3xl font-bold text-center">Find Open-Source Repositories to contribute today</h1>
        <input
          className="w-1/3 border border-gray-300 rounded-md shadow-xl py-2 px-4 my-8 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          type="text"
          placeholder="Search repositories"
        />
      </div>
      {/*create tabs for highlights and and starred repos which onClick will set the state of the tab to active */}
      <div className="flex justify-around items-around">
        <button
          className={`flex flex-row items-center justify-center w-1/2 py-2 px-4 my-2 mx-4 border border-[#f87216] rounded-l-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-3 focus:ring-offset-2 focus:ring-[#f87216] hover:text-black hover:bg-[#f87216] ${
            activeTab === Tab.HIGHLIGHTS ? "bg-[#f87216] text-white" : ""
          }`}
          onClick={() => {
            setActiveTab(Tab.HIGHLIGHTS);
          }}
        >
          {/* <FaNewspaper className="mr-2" /> */}
          Highlights
        </button>
        <button
          className={`flex flex-row items-center justify-center w-1/2 py-2 px-4 my-2 mx-4 border border-[#f87216] rounded-r-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-3 focus:ring-offset-2 focus:ring-[#f87216] hover:text-black hover:bg-[#f87216] ${
            activeTab === Tab.STARRED ? "bg-[#f87216] text-white" : ""
          }`}
          onClick={() => {
            setActiveTab(Tab.STARRED);
            fetchReposStarred(userSessionAndTokens?.providerToken);
          }}
        >
          {/* <FaStar className="mr-2" /> */}
          Starred
        </button>
        <button
          className={`flex flex-row items-center justify-center w-1/2 py-2 px-4 my-2 mx-4 border border-[#f87216] rounded-r-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-3 focus:ring-offset-2 focus:ring-[#f87216] hover:text-black hover:bg-[#f87216] ${
            activeTab === Tab.INSIGHTS ? "bg-[#f87216] text-white" : ""
          }`}
          onClick={() => {
            setActiveTab(Tab.INSIGHTS);
          }}
        >
          {/* <FaSmileWink className="mr-2" /> */}
          Insights
        </button>
      </div>
      {/* activeTab is highlights, render the highlights */}
      <div className="flex flex-col mt-8 justify-center items-center text-[rgb(255 255 255 / 87%)!important]">
        {activeTab === Tab.VULN_SCANNING && (
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold">VULNERABILITY SCANNING</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {highlights &&
                highlights.length > 0 &&
                highlights.map((highlight) => (
                  <div className="p-4 border border-gray-200 rounded-md shadow-sm">
                    <h3 className="text-lg font-bold">{highlight.title}</h3>
                    <p className="text-gray-500">{highlight.id}</p>
                    <div className="flex items-center mt-2">
                      <span className="text-sm text-gray-500">{
                        /* highlight.stargazers_count */ `stargazers_count`
                      }</span>
                      <FaStar className="ml-1" />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
        {/*if activeTab is starred, render the EXPLAIN */}
        {activeTab === Tab.EXPLAIN && (
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold">EXPLAIN Repos</h2>
            {repos && repos.length > 0 ? (
              repos.map((repo) => (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  <div className="p-4 border border-gray-200 rounded-md shadow-sm">
                    <h3 className="text-lg font-bold">{repo.fullName}</h3>
                    <p className="text-gray-500">{repo.id}</p>
                    <div className="flex items-center mt-2">
                      <span className="text-sm text-gray-500">{/* repo.stargazers_count */ `stargazers_count`}</span>
                      {/* <FaStar className="ml-1" /> */}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 shadow-sm">
                <h2 className="text-lg font-bold">🥹</h2>
                <h3 className="text-lg font-bold">We tried hard</h3>
                <h6 className="text-lg font-bold">But at last no starred repos were found for you</h6>
              </div>
            )}
          </div>
        )}
        {/* if activeTab is insights, render the insights repos */}
        {activeTab === Tab.CONVERT && (
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold">CONVERT</h2>
            {repos && repos.length > 0 ? (
              repos.map((repo) => (
                <div className="grid grid-cols md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  <div className="p-4 border border-gray-200 rounded-md shadow-sm">
                    <h3 className="text-lg font-bold">{repo.fullName}</h3>
                    <p className="text-gray-500">{repo.id}</p>
                    <div className="flex items-center mt-2">
                      <span className="text-sm text-gray-500">{/* repo.stargazers_count */ `stargazers_count`}</span>
                      {/* <FaStar className="ml-1" /> */}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 shadow-sm">
                <h2 className="text-lg font-bold">🥹</h2>
                <h3 className="text-lg font-bold">We tried hard</h3>
                <h6 className="text-lg font-bold">But at last no insights were found for you</h6>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const Tab = {
  VULN_SCANNING: "vuln_scanning",
  EXPLAIN: "explain",
  CONVERT: "convert",
};
