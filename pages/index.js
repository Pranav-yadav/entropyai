import Head from "next/head";
import { useState } from "react";
import MyApp from "./_app";

export default function Home() {
  const [smartContractInput, setSmartContractInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
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
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      console.log("data:", data);

      setResult(data.result);
      setSmartContractInput("");
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <MyApp>
      <div className="bg-black-500">
        <Head>
          <title>OpenAI Quickstart</title>
          <link rel="icon" href="/dog.png" />
        </Head>

        <main className="">
          <img src="/dog.png" className="" />
          <h3>Paste your Smart Contract</h3>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              name="animal"
              placeholder="Enter an animal"
              value={smartContractInput}
              onChange={(e) => setSmartContractInput(e.target.value)}
              maxLength={1500}
              minLength={10}
              required
              size={1500}
            />
            <input type="submit" value="Generate Audit Report" />
          </form>
          <div className="">{result}</div>
        </main>
      </div>
    </MyApp>
  );
}
