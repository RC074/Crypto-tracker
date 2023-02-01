import React from "react";

const Header = ({ mode }) => {
  return (
    <div className="header-container">
      <div
        className="headers"
        style={mode === "light" ? { color: "#151517" } : { color: "#fff" }}
      >
        {/* for alignments */}
        <div style={{ paddingRight: 80 }}>Name</div>
        <div style={{ paddingRight: 60 }}>Symbol</div>
        <div style={{ paddingRight: 70 }}>Rate</div>
        <div style={{ paddingRight: 50 }}>Volume</div>
        <div>Price Change</div>
        <div>Last Updated</div>
      </div>
    </div>
  );
};

export default Header;
