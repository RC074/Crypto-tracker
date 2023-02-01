import React from "react";

const Controls = ({
  mode,
  handleSearchChange,
  handleCurrencyChange,
  handleRefresh,
  handleModeChange,
}) => {
  return (
    <div className="controls-container">
      <div
        style={
          mode === "light"
            ? { color: "#151517", marginLeft: 20 }
            : { color: "#fff", marginLeft: 20 }
        }
      >
        <div className="radio">
          <input
            id="radio-1"
            name="radio"
            type="radio"
            onChange={() => handleCurrencyChange("usd")}
            defaultChecked
          />
          <label htmlFor="radio-1" className="radio-label">
            USD
          </label>
        </div>

        <div className="radio">
          <input
            id="radio-2"
            name="radio"
            type="radio"
            onChange={() => handleCurrencyChange("gbp")}
          />
          <label htmlFor="radio-2" className="radio-label">
            GBP
          </label>
        </div>

        <div className="radio">
          <input
            id="radio-3"
            name="radio"
            type="radio"
            onChange={() => handleCurrencyChange("eur")}
          />
          <label htmlFor="radio-3" className="radio-label">
            EUR
          </label>
        </div>
      </div>

      <div className="coin-search">
        <div className="input-wrapper">
          <input
            className="coin-input"
            onChange={(e) => handleSearchChange(e)}
            placeholder="Search Any Crypto"
          />
        </div>
      </div>
      <div className="buttonGroup">
        <div>
          <button
            style={
              mode === "light"
                ? { color: "#151517", border: "2px solid #151517" }
                : { color: "#fff", border: "2px solid #fff" }
            }
            className="btn"
            onClick={handleModeChange}
          >
            Mode
          </button>
        </div>
        <div>
          <button
            style={
              mode === "light"
                ? { color: "#151517", border: "2px solid #151517" }
                : { color: "#fff", border: "2px solid #fff" }
            }
            className="btn"
            onClick={handleRefresh}
          >
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
};

export default Controls;
