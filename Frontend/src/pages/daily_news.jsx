import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DailyNews() {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    const getNews = async () => {
      const options = {
        method: 'GET',
        url: 'https://world-historical-events-api.p.rapidapi.com/api/events',
        headers: {
          'x-rapidapi-key': '4c5be6c858mshb074e95e20315dcp1d16a5jsnd5dc2d873367',
          'x-rapidapi-host': 'world-historical-events-api.p.rapidapi.com',
        },
      };

      try {
        const response = await axios.request(options);
        setNewsData(response.data.data); // Access .data inside .data
        console.log(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getNews();
  }, []);

  return (
    <div className="bg-light py-4">
      <div className="container">
        <h2 className="mb-4 text-center">Daily Historical Events</h2>

        {/* Scrollable content area */}
        <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
          <div className="row">
            {newsData.length > 0 ? (
              newsData.map((item, index) => (
                <div key={index} className="col-md-6 col-lg-4 mb-4">
                  <div className="card h-100 shadow-sm">
                    <div className="card-body">
                      <h5 className="card-title">{item["Name of Incident"]}</h5>
                      <p><strong>Country:</strong> {item.Country}</p>
                      <p><strong>Date:</strong> {item.Date} {item.Month} {item.Year}</p>
                      <p><strong>Place:</strong> {item["Place Name"]}</p>
                      <p><strong>Type:</strong> {item["Type of Event"]}</p>
                      <p><strong>Impact:</strong> {item.Impact}</p>
                      <p><strong>Outcome:</strong> {item.Outcome}</p>
                      <p><strong>Responsible:</strong> {item["Important Person/Group Responsible"]}</p>
                      <p><strong>Affected:</strong> {item["Affected Population"]}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center">Loading news data...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DailyNews;
