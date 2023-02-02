import React from "react";
import { useIsMobile } from "../utils/mobileView";

const Header = ({ mode, handleSort }) => {
  return (
    <div className="header-container">
      {useIsMobile() ? (
        <div
          className="headers"
          style={mode === "light" ? { color: "#151517" } : { color: "#fff" }}
        >
          {/* for alignments */}
          <div style={{ paddingRight: 80 }}>Name</div>
          <div style={{ alignSelf: "right" }}>
            Rate<i className="fa-solid fa-sort"></i>
          </div>
        </div>
      ) : (
        <div
          className="headers"
          style={mode === "light" ? { color: "#151517" } : { color: "#fff" }}
        >
          {/* for alignments */}
          <div style={{ paddingRight: 20 }}>Name</div>
          <div style={{ paddingRight: 0, paddingLeft: 20 }}>Symbol</div>
          <div style={{ paddingRight: 20 }}>
            Rate
            <i
              className="fa-solid fa-sort"
              onClick={() => handleSort("rate")}
            ></i>
          </div>
          <div style={{ paddingRight: 0 }}>
            Volume
            <i
              className="fa-solid fa-sort"
              onClick={() => handleSort("volume")}
            ></i>
          </div>
          <div>
            Change 24h
            <i
              className="fa-solid fa-sort"
              onClick={() => handleSort("change")}
            ></i>
          </div>
          <div>Last Updated</div>
          <div>Sparkline 7d</div>
        </div>
      )}
    </div>
  );
};

export default Header;
