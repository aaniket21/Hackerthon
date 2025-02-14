import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyCbFlp1gmXGZyukXLwiUkr5B-qpVI-wj9M"; // 🔥 Replace this with your actual Gemini API key
const genAI = new GoogleGenerativeAI(API_KEY);

const AskAI: React.FC = () => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchAIResponse = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setResponse("");

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(question);
      const text = result.response.text();

      setResponse(text);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setResponse("❌ Sorry, I couldn't fetch an answer. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-gray-600 rounded-xl shadow-lg mt-10" id="ask">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-white mb-6">Ask Me Anything</h2>
        
        {/* AI Section Image */}
        <img
          alt="Ask AI"
          className="mx-auto rounded-lg shadow-md mb-6"
        />

        <div className="max-w-2xl mx-auto">
          {/* Input Field */}
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Type your question..."
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          
          {/* Ask AI Button */}
          <button
            onClick={fetchAIResponse}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700"
          >
            Ask AI
          </button>

          {/* Loading Indicator */}
          {loading && <p className="text-gray-500 mt-2">🤖 Thinking...</p>}

          {/* AI Response */}
          {response && (
            <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Response:</h3>
              <p className="text-gray-700">{response}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AskAI;

