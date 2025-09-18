import React, { useState } from "react";
import RecommendationsList from "./components/RecommendationsList";

function App() {
  const [mood, setMood] = useState("");
  const [recommendations, setRecommendations] = useState([]);

  // Dummy music & quotes
  const dummyMusic = [
    {
      title: "Happy Song 1",
      artist: "Artist A",
      url: "https://spotify.com",
      albumImage: "",
    },
    {
      title: "Happy Song 2",
      artist: "Artist B",
      url: "https://spotify.com",
      albumImage: "",
    },
  ];

  const dummyQuotes = [
    { quote: "Happiness is a journey, not a destination.", author: "Buddha" },
    { quote: "Be yourself; everyone else is already taken.", author: "Oscar Wilde" },
  ];

  // Handle mood selection
  const handleMoodSelect = (selectedMood) => {
    setMood(selectedMood);

    if (selectedMood === "Happy") {
      // Combine music & quotes
      setRecommendations([...dummyMusic, ...dummyQuotes]);
    }
    // You can add other moods later
  };

  // Handle share for quotes
  const handleShare = (quote) => {
    navigator.clipboard.writeText(`"${quote.quote}" — ${quote.author}`);
    alert("Quote copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-500 text-white p-6">
      <h1 className="text-4xl font-bold text-center mb-6">MoodMate</h1>
      <p className="text-center mb-8">Find music & quotes that match your mood</p>

      {/* Mood buttons */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => handleMoodSelect("Happy")}
          className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/40 transition"
        >
          😃 Happy
        </button>
        <button
          onClick={() => alert("Detecting emotion...")}
          className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/40 transition"
        >
          Detect
        </button>
      </div>

      {/* Recommendations */}
      <RecommendationsList
        recommendations={recommendations}
        onShare={handleShare}
      />
    </div>
  );
}

export default App;
