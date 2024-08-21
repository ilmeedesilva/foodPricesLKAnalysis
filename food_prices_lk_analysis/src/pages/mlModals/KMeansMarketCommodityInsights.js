import React from "react";
import style from "./MlModals.module.scss";

const MarketCommodityInsights = ({
  markets = [],
  commodities = [],
  mean = 0,
  median = 0,
  priceStats = [],
}) => {

  return (
    <div className={style.card}>
      
      <div>
        <p>
          <strong>Markets:</strong>
        </p>
        {markets.length > 0 ? (
          <ul>
            {markets.map((market, index) => (
              <li key={index}>{market}</li>
            ))}
          </ul>
        ) : (
          <p>No markets available</p>
        )}
      </div>
      <div>
        <p>
          <strong>Commodities:</strong>
        </p>
        {commodities.length > 0 ? (
          <ul>
            {commodities.map((commodity, index) => (
              <li key={index}>{commodity}</li>
            ))}
          </ul>
        ) : (
          <p>No commodities available</p>
        )}
      </div>
      <div>
        <p>
          <strong>Mean Price:</strong>
        </p>
        {mean || "No details available"}
      </div>
      <div>
        <p>
          <strong>Median Price:</strong>
        </p>
        {median || "No details available"}
      </div>
      <div>
        <p>
          <strong>Price Range:</strong>
        </p>
        {priceStats.length > 0 ? (
          <ul>
            {priceStats.map((priceRange, index) => (
              <li key={index}>{priceRange}</li>
            ))}
          </ul>
        ) : (
          <p>No Price Ranges available</p>
        )}
      </div>
    </div>
  );
};

export default MarketCommodityInsights;
