import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [smartContractInput, setSmartContractInput] = useState("");
  const [result, setResult] = useState();
  const [loading, setLoading] = useState<boolean>(false);
  // const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const onSubmit = (event: any) => {
    event.preventDefault();
    console.log("submitted!");
    if (smartContractInput.length < 50) {
      alert("Please enter a valid smart contract");
      return;
    }
    // setSmartContractInput("");
    // @ts-ignore
    document.getElementById("result").innerHTML = "";
    setLoading(true);

    try {
      console.log("smartContractInput:", smartContractInput);
      // return
      let response: Response;
      fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ animal: `${smartContractInput}` }),
      })
        .then((res) => {
          response = res;
        })
        .catch((err) => {
          console.log("err:", err);
          setLoading(false);
          return;
        });

      let data: JSON = JSON.parse("{}");
      // @ts-ignore
      response.json().then((jsonData) => {
        data = jsonData;
      });
      // @ts-ignore
      if (response.status !== 200) {
        throw (
          // @ts-ignore
          data.error ||
          // @ts-ignore
          new Error(`Request failed with status ${response.status}`)
        );
      }

      console.log("data:", data);
      // @ts-ignore
      setResult(data.result || "Something went wrong!");
      // @ts-ignore
      document.getElementById("result").innerHTML = data.result;
      setSmartContractInput("");
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.log("Error:");
      console.error(error);
      // @ts-ignore
      alert(error.message || "Something went wrong!");
    }
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>EntropyAi</title>
        <meta name="description" content="What do you want to find?" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/EntropyAi_dark.png" />
        <meta
          name="author"
          content="Pranav Yadav | EntropyAi | (https://github.com/Pranav-yadav)"
        />
        <meta
          name="keywords"
          content="EntropyAi, OpenAI, GPT-4, ChatGPT, GPT-3, BARD, BING, Web3, Smart Contracts, Vulnerability, Bug, Exploit, Ethereum, Blockchai"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Link
          href="/home/"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md my-4"
        >
          Home
        </Link>

        {/* Our content */}
        <div>
          <Head>
            <title>OpenAI Quickstart</title>
            <link rel="icon" href="/EntropyAi_dark.png" />
          </Head>

          <div className={styles.main}>
            <Image
              className="w-fit bg-transparent"
              src="/EntropyAi_dark.png"
              alt="Next.js Logo"
              width={180}
              height={37}
              priority
            />
            <h3>Paste your Smart Contract</h3>
            {/* <form onSubmit={onSubmit}> */}
            <div className="flex flex-col jsutify-center items-center px-8 py-6 my-4">
              <textarea
                id="smartContractText"
                name="animal"
                placeholder="Paste your smart contract here"
                value={smartContractInput}
                onChange={(e: any) => setSmartContractInput(e.target.value)}
                maxLength={1500}
                minLength={50}
                required
                // size={100}
                className="px-4 py-2 border border-gray-300 rounded-md min-w-[65vw] min-h-[50vh] my-4"
              />
              <button
                className={`px-4 py-2 bg-indigo-600 text-white rounded-md my-4 cursor-pointer ${
                  loading || smartContractInput.length < 50
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                type="submit"
                value="Generate Audit Report"
                name="Report"
                disabled={loading || smartContractInput.length < 50}
                onClick={onSubmit}
              >
                {loading ? "Generating the Report..." : "Generate Report ⚡"}
              </button>
            </div>
            {/* </form> */}
            <div className={styles.result}>
              <h3>Result</h3>
              <p id="result"></p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
