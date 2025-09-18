import React, { useState } from 'react';
import EmotionSelector from './components/EmotionSelector';
import RecommendationsList from './components/RecommendationsList';
import { fetchRecommendations } from './api/fetchRecommendations';

function App() {
    const [emotion, setEmotion] = useState('Happy');
    const [type, setType] = useState('music');
    const [recommendations, setRecommendations] = useState([]);

    const getRecommendations = async () => {
        const data = await fetchRecommendations(emotion, type);
        setRecommendations(data);
    };

    const handleRefresh = () => {
        getRecommendations();
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Emotion-Based Recommender</h1>
            <EmotionSelector
                emotion={emotion}
                setEmotion={setEmotion}
                type={type}
                setType={setType}
            />
            <button onClick={getRecommendations} style={{ marginTop: '10px' }}>
                Get Recommendations
            </button>
            <RecommendationsList
                recommendations={recommendations}
                type={type}
                onRefresh={handleRefresh}
            />
        </div>
    );
}

export default App;
