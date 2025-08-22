import React from "react";
import axios from "axios";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { contentTemplates } from "./content";

const Center = () => {
  const [idea, setIdea] = useState("");
  const [categorie, setCategorie] = useState(
    " AI SaaS (Artificial Intelligence Software as a Service)"
  );
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [showFull, setShowFull] = useState(false);

  function getRandomPrompt(categorie, idea) {
    const idx = Math.floor(Math.random() * contentTemplates.length);
    return contentTemplates[idx](categorie, idea);
  }

  const codeLines = cleanAIResponse(result).split("\n");
  const previewLines = codeLines.slice(0, 15).join("\n");

const generateHandler = async () => {
  if (!idea) {
    alert("Please enter your project idea!");
    return;
  }

  setLoading(true);

  try {
    // Get a random prompt using the current categorie and idea
    const prompt = getRandomPrompt(categorie, idea);

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-r1-0528:free",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer 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`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:5173",
        },
      }
    );

    setResult(response.data.choices[0].message.content);
    setIdea("");
  } catch (error) {
    console.error("Error generating landing page:", error);
    alert("Failed to generate landing page. Try again!");
  } finally {
    setLoading(false);
  }
};


  function cleanAIResponse(text) {
    return text
      .replace(/```html/g, "")
      .replace(/```/g, "")
      .replace(/^#.*$/gm, "")
      .replace(/<\/html>[\s\S]*$/i, "</html>")
      .trim();
  }

  const copyCode = () => {
    navigator.clipboard.writeText(cleanAIResponse(result));
    alert("Copied Successfully...!");
  };

  return (
    <>
      <div className="p-5 rounded mb-5">
        <h1 className="mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white text-center">
          Build{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-emerald-900">
            Landing Pages
          </span>{" "}
          in Seconds .
        </h1>
      </div>

      <div className="bg-[#CADCAE] p-6 sm:p-10 md:p-20 lg:p-28 rounded max-w-6xl mx-auto">
        <h1 className="text-xl sm:text-2xl md:text-3xl text-center font-extrabold mt-4">
          Landing Page{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-emerald-900">
            Generator...
          </span>
        </h1>

        <input
          type="text"
          className="w-full md:w-[70%] block mx-auto mt-6 rounded-s-lg bg-[#EEEFE0] border-0 pl-4 py-2 placeholder-gray-400 focus:placeholder-transparent focus:outline-none focus:ring-0 text-sm sm:text-base"
          placeholder="Enter your project idea ( e.g: Travel, Restaurant, Planting...)"
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
        />

        <div>
          <div className="flex flex-col md:flex-row justify-center mt-10 gap-2">
            <button
              type="button"
              className="w-full md:w-[20%] z-10 inline-flex justify-center items-center py-2.5 px-4 text-sm font-medium text-gray-500 bg-gray-100 border rounded-lg md:rounded-s-lg dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white dark:border-gray-600"
            >
              Categories
            </button>

            <select
              id="states"
              className="w-full md:w-[50%] border border-gray-300 text-gray-900 text-sm rounded-lg md:rounded-e-lg block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-0"
              onChange={(e) => setCategorie(e.target.value)}
            >
              <option
                selected
                value={
                  "AI SaaS (Artificial Intelligence Software as a Service)"
                }
              >
                AI SaaS (Artificial Intelligence Software as a Service)
              </option>
              <option>Productivity & Collaboration Tools</option>
              <option>FinTech (Financial Technology)</option>
              <option>EdTech (Education Technology)</option>
              <option>HealthTech & Wellness</option>
              <option>E-Commerce & Marketplaces</option>
            </select>
          </div>

          <button
            type="button"
            disabled={loading}
            className={`block w-full md:w-[70%] mx-auto focus:outline-none text-white 
            ${loading ? "bg-gray-400" : "bg-green-700 hover:bg-green-600"} 
            font-medium rounded-lg text-sm px-5 py-2.5 mt-8`}
            onClick={generateHandler}
          >
            {loading ? "Generating..." : "Generate a landing page !"}
          </button>

          {result && (
            <div className="mt-16">
              <h2 className="font-bold text-lg sm:text-xl mb-5">
                Live Preview :
              </h2>

              <iframe
                className="w-full h-[400px] sm:h-[500px] md:h-[600px] border"
                srcDoc={cleanAIResponse(result)}
                title="Landing Page Preview"
              />
            </div>
          )}

          {result && (
            <div>
              <h2 className="font-bold text-lg sm:text-xl mb-3 mt-5">
                HTML & CSS Code :
              </h2>
              <button
                type="button"
                className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none font-medium rounded-lg text-xs sm:text-sm px-4 py-2.5 inline-flex items-center mb-3"
                onClick={copyCode}
              >
                Copy Code !
              </button>

              <SyntaxHighlighter
                language="html"
                style={oneDark}
                wrapLongLines={true}
              >
                {showFull ? cleanAIResponse(result) : previewLines}
              </SyntaxHighlighter>

              {codeLines.length > 15 && (
                <button
                  onClick={() => setShowFull(!showFull)}
                  className="text-blue-500 underline mt-2 cursor-pointer"
                >
                  {showFull ? "Show Less" : "Show More"}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Center;
