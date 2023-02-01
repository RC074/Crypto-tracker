import React from "react";

import fetchData from "./api";
import Coin from "./components/Coin";
import Header from "./components/Header";
import Controls from "./components/Controls";

import "./App.css";
import "./currencyButtons.css";

class App extends React.Component {
  state = {
    search: "",
    mode: "dark",
    currentCurrency: "usd",
    coins: [],
    filteredCoins: [],
  };

  componentDidMount() {
    this.retrieveCoinData();
  }

  // Wrapper for fetchData
  retrieveCoinData = async () => {
    const data = await fetchData(this.state.currentCurrency);
    console.log(data);
    this.setState({ coins: data, filteredCoins: data });
  };

  // filter coins based on search params
  filterCoins = () => {
    const filtered = this.state.coins.filter((coin) =>
      coin.name.toLowerCase().includes(this.state.search.toLowerCase())
    );
    this.setState({ filteredCoins: filtered });
  };

  // handler functions
  handleSearchChange = async (e) => {
    await this.setState({ search: e.target.value });
    window.scrollTo({ top: 0, behavior: "smooth" });
    this.filterCoins();
  };

  handleCurrencyChange = async (changeToCur) => {
    await this.setState({ currentCurrency: changeToCur });
    await this.retrieveCoinData();
    this.filterCoins();
  };

  handleRefresh = () => {
    this.setState({ coins: [], filterCoins: [] });
    this.retrieveCoinData();
  };

  handleModeChange = () => {
    this.setState(
      this.state.mode === "dark" ? { mode: "light" } : { mode: "dark" }
    );
  };

  render() {
    return (
      <div
        className="App"
        style={
          this.state.mode === "dark"
            ? { backgroundColor: "#151517" }
            : { backgroundColor: "#fff" }
        }
      >
        <Controls
          mode={this.state.mode}
          handleSearchChange={this.handleSearchChange}
          handleCurrencyChange={this.handleCurrencyChange}
          handleRefresh={this.handleRefresh}
          handleModeChange={this.handleModeChange}
        />
        <Header mode={this.state.mode} />
        {this.state.coins.length > 0 ? (
          this.state.filteredCoins.map((coin) => {
            return (
              <Coin
                key={coin.id}
                mode={this.state.mode}
                name={coin.name}
                price={coin.current_price}
                currency={this.state.currentCurrency.toUpperCase()}
                symbol={coin.symbol}
                updatedAt={coin.last_updated}
                volume={coin.market_cap}
                image={coin.image}
                priceChange={coin.price_change_percentage_24h}
              />
            );
          })
        ) : (
          <h1
            style={
              this.state.mode === "light"
                ? { color: "#151517", marginTop: "100px" }
                : { color: "#fff", marginTop: "100px" }
            }
          >
            Loading
          </h1>
        )}
      </div>
    );
  }
}

export default App;
