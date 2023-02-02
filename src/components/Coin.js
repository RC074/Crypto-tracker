import React from "react";
import { Sparklines, SparklinesSpots, SparklinesLine } from "react-sparklines";
import { useIsMobile } from "../utils/mobileView";

const Coin = ({
  name,
  price,
  mode,
  currency,
  symbol,
  updatedAt,
  volume,
  image,
  priceChange,
  sparkline,
}) => {
  // Formatting date
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const date = new Date(Date.parse(updatedAt));
  const formattedDate = date.toLocaleDateString(undefined, options);

  return (
    <div className="coin-container">
      <div
        className="coin-row"
        style={mode === "light" ? { color: "#151517" } : { color: "#fff" }}
      >
        <div className="coin">
          <img src={image} alt="crypto" />
          <h1>{name}</h1>
          {useIsMobile() ? "" : <p className="coin-symbol">{symbol}</p>}
        </div>
        <div className="coin-data">
          <p className="coin-price">
            {price.toFixed(2)} {currency}
          </p>

          {useIsMobile() ? (
            ""
          ) : (
            <p className="coin-volume">
              {volume.toLocaleString()} {currency}
            </p>
          )}

          {useIsMobile() ? (
            ""
          ) : priceChange < 0 ? (
            <p className="coin-percent red">{priceChange.toFixed(2)}%</p>
          ) : (
            <p className="coin-percent green">{priceChange.toFixed(2)}%</p>
          )}

          {useIsMobile() ? (
            ""
          ) : (
            <p className="coin-updatedAt">{formattedDate}</p>
          )}
        </div>
        {useIsMobile() ? (
          ""
        ) : (
          <div className="sparkline">
            <Sparklines
              svgHeight={60}
              svgWidth={200}
              // preserveAspectRatio
              data={sparkline}
              limit={20}
            >
              <SparklinesLine style={{ stroke: "green", fill: "green" }} />
              <SparklinesSpots />
            </Sparklines>
          </div>
        )}
      </div>
    </div>
  );
};

export default Coin;
