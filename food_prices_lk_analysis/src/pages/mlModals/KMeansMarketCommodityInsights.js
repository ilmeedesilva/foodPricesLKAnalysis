import React from "react";
import style from "./MlModals.module.scss";
import CustomTable from "../../custom/table/CustomTable";

const MarketCommodityInsights = ({
  markets = [],
  commodities = [],
  mean = 0,
  median = 0,
  priceStats = [],
}) => {
  const combinedData = markets.map((market, index) => ({
    market,
    commodity: commodities[index] || "",
  }));

  return (
    <div className={style.card}>
      <div className={style.width90}>
        <CustomTable
          Data={{
            headers: ["market", "commodity"],
            rows: combinedData,
          }}
          isSelectedable={false}
          rowsPerView={8}
        />
      </div>

      <div>
        <p className="text-md mt-2 mb-0">
          <strong>Median Price:</strong>
        </p>
        {median || "No details available"}
      </div>
      <div>
        <p className="text-md mt-0 mb-0">
          <strong>Price Range:</strong>
        </p>
        {priceStats.length > 0 ? (
          <p className="text-sm mt-0">
            {priceStats.map((priceRange, index) => (
              <lspan key={index}>{priceRange}</lspan>
            ))}
          </p>
        ) : (
          <p>No Price Ranges available</p>
        )}
      </div>
    </div>
  );
};

export default MarketCommodityInsights;
