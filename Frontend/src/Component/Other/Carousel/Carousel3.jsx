import React, { useState, useEffect } from 'react';

const CardsComponent = () => {
  const [cardsData, setCardsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiURL = import.meta.env.VITE_API_URL;
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiURL}/plants`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCardsData(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
    console.log(cardsData);
    
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="card-container">
      {cardsData.map((card) => (
        <div key={card?._id} className="card">
          <img src={card?.Image} alt={card.title} />
          <h3>{card?.Title}</h3>
          <p>{card.Description}</p>
        </div>
      ))}
    </div>
  );
};

export default CardsComponent;
