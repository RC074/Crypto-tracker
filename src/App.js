import React from "react";
import Modal from "react-modal";

import fetchData from "./api";
import Coin from "./components/Coin";
import Header from "./components/Header";
import Controls from "./components/Controls";

import "./App.css";
import "./currencyButtons.css";

Modal.setAppElement("#root");

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
    // console.log(data);
    this.setState({ coins: [...data] });
    this.setState({ filteredCoins: [...data] });
  };

  // filter coins based on search params
  filterCoins = () => {
    console.log(this.state.coins);
    const filtered = this.state.coins.filter((coin) =>
      coin.name.toLowerCase().includes(this.state.search.toLowerCase())
    );
    console.log(filtered);
    this.setState({ filteredCoins: [...filtered] });
  };

  // handler functions
  handleSearchChange = async (e) => {
    await this.setState({ search: e.target.value });
    window.scrollTo({ top: 0, behavior: "smooth" });
    this.filterCoins();
  };

  handleCurrencyChange = async (changeToCur) => {
    await this.setState({ coins: [], filteredCoins: [] });
    await this.setState({ currentCurrency: changeToCur });
    console.log(this.state.currentCurrency);
    await this.retrieveCoinData();
    // this.filterCoins();
  };

  handleRefresh = async () => {
    await this.setState({ coins: [], filteredCoins: [] });
    this.retrieveCoinData();
  };

  handleModeChange = () => {
    this.setState(
      this.state.mode === "dark" ? { mode: "light" } : { mode: "dark" }
    );
  };

  handleSort = (sortby) => {
    if (sortby === "rate") {
      let temp = [...this.state.filteredCoins];
      let temp2 = [...this.state.coins];
      temp.sort((coinA, coinB) =>
        coinA.current_price < coinB.current_price ? 1 : -1
      );
      temp2.sort((coinA, coinB) =>
        coinA.current_price < coinB.current_price ? 1 : -1
      );
      this.setState({ coins: [...temp2], filteredCoins: [...temp] });
    }
    if (sortby === "change") {
      let temp = [...this.state.filteredCoins];
      let temp2 = [...this.state.coins];
      temp.sort((coinA, coinB) =>
        coinA.price_change_percentage_24h < coinB.price_change_percentage_24h
          ? 1
          : -1
      );
      temp2.sort((coinA, coinB) =>
        coinA.price_change_percentage_24h < coinB.price_change_percentage_24h
          ? 1
          : -1
      );
      this.setState({ coins: [...temp2], filteredCoins: [...temp] });
    }
    if (sortby === "volume") {
      let temp = [...this.state.filteredCoins];
      let temp2 = [...this.state.coins];
      temp.sort((coinA, coinB) =>
        coinA.market_cap < coinB.market_cap ? 1 : -1
      );
      temp2.sort((coinA, coinB) =>
        coinA.market_cap < coinB.market_cap ? 1 : -1
      );
      this.setState({ coins: [...temp2], filteredCoins: [...temp] });
    }
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
        <h1 className="title">
          <i className="fa-brands fa-bitcoin"></i>Crypto-Tracker
        </h1>
        <div className="coin-search">
          <input
            className="coin-input"
            onChange={(e) => this.handleSearchChange(e)}
            placeholder="Search Any Crypto"
          />
        </div>
        <Controls
          mode={this.state.mode}
          // handleSearchChange={this.handleSearchChange}
          handleCurrencyChange={this.handleCurrencyChange}
          handleRefresh={this.handleRefresh}
          handleModeChange={this.handleModeChange}
        />

        <Header mode={this.state.mode} handleSort={this.handleSort} />
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
                sparkline={coin.sparkline_in_7d.price}
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
