import React from 'react';

const RecommendationsList = ({ recommendations, type, onRefresh }) => {
    return (
        <div>
            <h2>{type === 'music' ? 'Songs' : 'Quotes'}</h2>
            <button onClick={onRefresh} style={{ marginBottom: '10px' }}>
                Refresh
            </button>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {recommendations.map((item, index) => (
                    <li key={index} style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
                        {type === 'music' ? (
                            <>
                                {item.albumImage && (
                                    <img
                                        src={item.albumImage}
                                        alt={item.title}
                                        style={{ width: '50px', height: '50px', marginRight: '10px' }}
                                    />
                                )}
                                <a href={item.url} target="_blank" rel="noopener noreferrer">
                                    {item.title} - {item.artist}
                                </a>
                            </>
                        ) : (
                            <span>"{item.quote}" - {item.author}</span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecommendationsList;
