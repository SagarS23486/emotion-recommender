import React from 'react';

const EmotionSelector = ({ emotion, setEmotion, type, setType }) => {
    return (
        <div style={{ marginBottom: '20px' }}>
            <div>
                <label>Select Emotion: </label>
                <select value={emotion} onChange={e => setEmotion(e.target.value)}>
                    <option>Happy</option>
                    <option>Sad</option>
                    <option>Stressed</option>
                    <option>Excited</option>
                </select>
            </div>
            <div style={{ marginTop: '10px' }}>
                <label>Type: </label>
                <select value={type} onChange={e => setType(e.target.value)}>
                    <option value="music">Music</option>
                    <option value="quotes">Quotes</option>
                </select>
            </div>
        </div>
    );
};

export default EmotionSelector;
