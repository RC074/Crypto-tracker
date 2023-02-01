import React from "react";
import axios from "axios";

const fetchData = async (cur) => {
  const end_point = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${cur}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;

  console.log("retrieving...");
  const dataPromise = await axios
    .get(end_point)
    .then((res) => res.data)
    .catch((err) => console.log(err));

  // will be resolved later in App component
  return dataPromise;
};

export default fetchData;
