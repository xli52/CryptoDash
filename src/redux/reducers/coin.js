const initStates = {
  id: "",
  name: "",
  symbol: "",
  market_cap_rank: 0,
  thumb: "",
  large: ""
};

const coinReducer = (state = initStates, action) => {

  switch (action.type) {
    case 'CHANGE_COIN':
      return { ...action.payload };
    default:
      return state;
  };
};

export default coinReducer;