// import mockAxios from 'jest-mock-axios';
// export default mockAxios;

const coinList = {
  data: {
    coins: [
      {
        id: "bitcoin",
        name: "Bitcoin",
        symbol: "BTC",
        market_cap_rank: 1,
        thumb: "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png",
        large: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png"
      }
    ]
  }
}

const axios = {
  get: jest.fn((url) => {
    return Promise.resolve(coinList);
  })
};

export default axios;