const express = require("express");
const router = express.Router();
const SpotifyWebApi = require("spotify-web-api-node");
const axios = require("axios");

// Local fallback data
const quotesData = require('../data/quotes.json') || [
  { emotion: "Happy", text: "Keep smiling!" },
  { emotion: "Sad", text: "It's okay to feel sad sometimes." },
  { emotion: "Stressed", text: "Take a deep breath." },
  { emotion: "Excited", text: "You can do it!" },
];

// Spotify API setup (replace these)
const spotifyApi = new SpotifyWebApi({
  clientId: "40e5727292cd48f88ff710dd20c0180d",
  clientSecret: "3142701771214e7dbdf28d3da3fb3ce9",
  redirectUri: "http://localhost:8888/callback",
});

async function refreshSpotifyToken() {
  try {
    const data = await spotifyApi.clientCredentialsGrant();
    spotifyApi.setAccessToken(data.body["access_token"]);
    console.log("✅ Spotify access token refreshed (expires in sec):", data.body["expires_in"]);
    return true;
  } catch (err) {
    console.error("❌ Error refreshing Spotify token:", err.message || err);
    return false;
  }
}

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

router.get("/", async (req, res) => {
  const emotion = (req.query.emotion || "").trim();
  const type = (req.query.type || "").trim();

  console.log("→ GET /recommendations", { emotion, type, time: new Date().toISOString() });

  if (!emotion || !type) {
    console.log("⛔ Missing params");
    return res.status(400).json({ error: "Emotion and type are required" });
  }

  try {
    if (type === "music") {
      const tokenOk = await refreshSpotifyToken();
      if (!tokenOk) {
        console.log("Using fallback music because token refresh failed");
        const fallback = require("../data/music.json");
        return res.json(fallback.filter(m => m.emotion.toLowerCase() === emotion.toLowerCase()));
      }

      // Try to get up to 50 tracks for variety
      console.log("Searching Spotify for:", emotion);
      const result = await spotifyApi.searchTracks(emotion, { limit: 50 });

      const items = result.body?.tracks?.items || [];
      console.log(`Spotify returned ${items.length} tracks`);

      let tracks = items.map(track => ({
        title: track.name,
        artist: track.artists.map(a => a.name).join(", "),
        url: track.external_urls?.spotify || "",
        albumImage: track.album?.images?.[0]?.url || "",
      }));

      tracks = shuffleArray(tracks).slice(0, 10);

      if (tracks.length === 0) {
        console.log("No Spotify tracks found, using fallback");
        const fallback = require("../data/music.json");
        return res.json(fallback.filter(m => m.emotion.toLowerCase() === emotion.toLowerCase()));
      }

      return res.json(tracks);
    }

    if (type === "quotes") {
      try {
        console.log("Fetching quote from Quotable for tag:", emotion.toLowerCase());
        const response = await axios.get(`https://api.quotable.io/random?tags=${encodeURIComponent(emotion.toLowerCase())}`);
        const quote = { quote: response.data.content, author: response.data.author };
        console.log("Quote fetched");
        return res.json([quote]);
      } catch (err) {
        console.error("Quotable API failed:", err.message || err);
        const filtered = quotesData.filter(q => q.emotion.toLowerCase() === emotion.toLowerCase());
        return res.json(filtered);
      }
    }

    return res.status(400).json({ error: "Invalid type" });
  } catch (err) {
    console.error("Server error:", err.message || err);
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
