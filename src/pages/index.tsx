// @ts-nocheck
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
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  async function onSubmit(event) {
    event.preventDefault();
    setSmartContractInput("");
    document.getElementById("result").innerHTML = "";
    setLoading(true);

    try {
      console.log("smartContractInput:", smartContractInput);
      // return
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ animal: `${smartContractInput}` }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      console.log("data:", data);

      setResult(data.result);
      document.getElementById("result").innerHTML = data.result;
      setSmartContractInput("");
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
    setLoading(false);
  }

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
        {/*  <div className={styles.description}>
          <p>
            Get started by editing&nbsp;
            <code className={styles.code}>src/pages/index.tsx</code>
          </p>
           <div>
            <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              By{" "}
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                className={styles.vercelLogo}
                width={100}
                height={24}
                priority
              />
            </a>
          </div>
        </div>

        <div className={styles.center}>
          <Image
            className={styles.logo}
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
          <div className={styles.thirteen}>
            <Image
              src="/thirteen.svg"
              alt="13"
              width={40}
              height={31}
              priority
            />
          </div>
        </div>

        <div className={styles.grid}>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Docs <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Find in-depth information about Next.js features and&nbsp;API.
            </p>
          </a>

          <a
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Learn <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Learn about Next.js in an interactive course with&nbsp;quizzes!
            </p>
          </a>

          <a
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Templates <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Discover and deploy boilerplate example Next.js&nbsp;projects.
            </p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Deploy <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Instantly deploy your Next.js site to a shareable URL
              with&nbsp;Vercel.
            </p>
          </a>
        </div> */}

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
            <form onSubmit={onSubmit}>
              <div className="flex flex-col jsutify-center items-center px-8 py-6 my-4">
                <textarea
                  id="smartContractText"
                  type="text"
                  name="animal"
                  placeholder="Paste your smart contract here"
                  value={smartContractInput}
                  onChange={(e) => setSmartContractInput(e.target.value)}
                  maxLength={1500}
                  minLength={50}
                  required
                  size={100}
                  className="px-4 py-2 border border-gray-300 rounded-md min-w-[65vw] min-h-[50vh] my-4"
                />
                <button
                  className={`px-4 py-2 bg-indigo-600 text-white rounded-md my-4 cursor-pointer ${
                    isDisabled ? "cursor-not-allowed" : ""
                  }`}
                  type="submit"
                  value="Generate Audit Report"
                  name="Report"
                  disabled={
                    loading ||
                    isDisabled ||
                    document.getElementById("smartContractText")?.textContent
                      ?.length < 50
                  }
                >
                  {loading ? "Generating the Report..." : "Generate Report"}
                </button>
              </div>
            </form>
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
