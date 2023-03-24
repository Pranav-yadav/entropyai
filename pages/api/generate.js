import { Configuration, OpenAIApi } from "openai";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY
const OPENAI_MODEL = process.env.OPENAI_MODEL

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration,);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const animal = req.body.animal || '';
  console.log("animal:", animal);
  if (animal.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid animal",
      }
    });
    return;
  }

  try {
    // const completion = await openai.createCompletion({
    //   model: OPENAI_MODEL,
    //   prompt: generatePrompt(animal),
    //   temperature: 0.5,
    // });


    // const response = await openai.listModels();
    // console.log("listmodels:", response.data);

    const completion = await openai.createChatCompletion({
      model: OPENAI_MODEL,
      "messages": [{ "role": "user", "content": "Hey! Can you help me with following:" }, { "role": "assistant", "content": "Sure! Please tell me your query." }, { "role": "user", "content": generatePrompt(animal) }],
      temperature: 0.2,
    });

    // res.status(200).json({ result: completion.data.choices[0].text });
    res.status(200).json({ result: completion.data.choices[0].message.content });
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

// function generatePrompt(animal) {
//   const capitalizedAnimal =
//     animal[0].toUpperCase() + animal.slice(1).toLowerCase();
//   return `Suggest three names for an animal that is a superhero.

// Animal: Cat
// Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
// Animal: Dog
// Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
// Animal: ${capitalizedAnimal}
// Names:`;
// }


function generatePrompt(smartContract) {
  // const capitalizedAnimal =
  //   animal[0].toUpperCase() + animal.slice(1).toLowerCase();
  let cPrompt = `For following Smart Contract written in Solidity, find the vulnerabilities and generate a report in tabular format. The report should contain the following columns: Vulnerability, Description, Severity, and Remediation`;
  cPrompt += `
  \`\`\`solidity
  ${smartContract}
  \`\`\`
  `;
  return cPrompt;
}