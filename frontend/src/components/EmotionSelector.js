import React from "react";

function EmotionSelector({ emotion, setEmotion, type, setType }) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="block mb-1 font-medium">Select Emotion</label>
        <select
          value={emotion}
          onChange={(e) => setEmotion(e.target.value)}
          className="w-full p-2 rounded-lg border border-gray-300 text-black"
        >
          <option>Happy</option>
          <option>Sad</option>
          <option>Stressed</option>
          <option>Excited</option>
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium">Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full p-2 rounded-lg border border-gray-300 text-black"
        >
          <option value="music">🎵 Music</option>
          <option value="quotes">✨ Quotes</option>
        </select>
      </div>
    </div>
  );
}

export default EmotionSelector;
