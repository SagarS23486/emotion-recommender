const express = require("express");
const router = express.Router();
const SpotifyWebApi = require("spotify-web-api-node");

// 🎵 Local fallback data (for quotes or backup)
const quotesData = [
  { emotion: "Happy", text: "Happiness depends upon ourselves. – Aristotle" },
  { emotion: "Sad", text: "Tears come from the heart and not from the brain. – Leonardo da Vinci" },
  { emotion: "Stressed", text: "Calmness is the cradle of power. – Josiah Gilbert Holland" },
  { emotion: "Excited", text: "The best way to predict the future is to create it. – Peter Drucker" },
];

// 🎵 Spotify API setup
const spotifyApi = new SpotifyWebApi({
  clientId: "30e5727292cd48f88ff710dd20c0180d",          // Replace with your real Spotify client ID
  clientSecret: "4142701771214e7dbdf28d3da3fb3ce9",  // Replace with your real Spotify client secret
  redirectUri: "http://localhost:8888/callback", // Must match in Spotify Dashboard
});

// 🔄 Helper: refresh token
async function refreshSpotifyToken() {
  try {
    const data = await spotifyApi.clientCredentialsGrant();
    spotifyApi.setAccessToken(data.body["access_token"]);
    console.log("✅ Spotify access token refreshed");
  } catch (err) {
    console.error("❌ Error refreshing Spotify token:", err.message);
  }
}

// 🔄 Helper: shuffle array
function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

// 📌 API Route: /api/recommendations
router.get("/", async (req, res) => {
  const emotion = req.query.emotion;
  const type = req.query.type;

  if (!emotion || !type) {
    return res.status(400).json({ error: "Emotion and type are required" });
  }

  try {
    if (type === "music") {
      await refreshSpotifyToken();

      // Get up to 50 tracks for variety
      const result = await spotifyApi.searchTracks(emotion, { limit: 50 });

      let tracks = result.body.tracks.items.map((track) => ({
        title: track.name,
        artist: track.artists.map((a) => a.name).join(", "),
        url: track.external_urls.spotify,
        albumImage: track.album.images[0]?.url || "",
      }));

      // Shuffle + return 10
      tracks = shuffleArray(tracks).slice(0, 10);

      return res.json(
        tracks.length > 0
          ? tracks
          : [{ title: "No tracks found", artist: "", url: "", albumImage: "" }]
      );
    } else if (type === "quotes") {
      const filteredQuotes = quotesData.filter(
        (q) => q.emotion.toLowerCase() === emotion.toLowerCase()
      );
      return res.json(
        filteredQuotes.length > 0
          ? shuffleArray(filteredQuotes).slice(0, 3)
          : [{ text: "No quotes found for this emotion." }]
      );
    } else {
      return res.status(400).json({ error: "Invalid type" });
    }
  } catch (error) {
    console.error("❌ Error fetching recommendations:", error.message);
    res.status(500).json({ error: "Failed to fetch recommendations" });
  }
});

module.exports = router;
