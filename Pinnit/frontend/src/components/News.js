import React, { useEffect, useState } from 'react';
import '../styles/News.css'; // Correct path to CSS

function News() {
  const [newsItems, setNewsItems] = useState([]);

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await fetch('https://backend-8eis.onrender.com/news');
        const data = await response.json();
        console.log('Fetched news data:', data); // Debugging: log fetched data
        setNewsItems(data);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    }

    fetchNews();
  }, []);

  return (
    <div className="news-container">
      <h1>Campus News</h1>
      <div>
        {newsItems.length > 0 ? (
          newsItems.map((news, index) => (
            <div key={index} className="news-item">
              <h2>{news.title}</h2>
              <p>{news.date}</p>
              <p>{news.content}</p>
              <hr />
            </div>
          ))
        ) : (
          <p>No news available</p>
        )}
      </div>
    </div>
  );
}

export default News;
