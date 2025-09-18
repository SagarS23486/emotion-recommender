import React from "react";

function RecommendationsList({ recommendations, onShare }) {
  if (!recommendations || recommendations.length === 0) {
    return <p className="text-gray-200 italic">No recommendations yet.</p>;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {recommendations.map((rec, index) => {
        // Music recommendation
        if (rec.title) {
          return (
            <div
              key={index}
              className="bg-white/30 p-4 rounded-lg shadow-md hover:scale-[1.02] transition-transform"
            >
              {rec.albumImage && (
                <img
                  src={rec.albumImage}
                  alt={rec.title}
                  className="w-20 h-20 rounded mb-2"
                />
              )}
              <p className="font-semibold">{rec.title}</p>
              <p className="text-sm text-gray-200">by {rec.artist}</p>
              {rec.url && (
                <a
                  href={rec.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-300 underline text-sm"
                >
                  Listen on Spotify
                </a>
              )}
            </div>
          );
        }

        // Quote recommendation
        if (rec.quote) {
          return (
            <div
              key={index}
              className="bg-white/90 rounded-xl p-4 shadow-md"
            >
              <blockquote className="italic mb-2">“{rec.quote}”</blockquote>
              <p className="text-gray-700 mb-2">— {rec.author}</p>
              {onShare && (
                <button
                  onClick={() => onShare(rec)}
                  className="text-gray-500 hover:text-purple-600"
                >
                  Share
                </button>
              )}
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}

export default RecommendationsList;
