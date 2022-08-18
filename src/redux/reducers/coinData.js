const initStates = {
  id: '',
  name: '',
  symbol: '',
  thumb: '',
  prices: [],
}

const coinDataReducer = (state = initStates, action) => {

  switch (action.type) {
    case 'UPDATE_DATA':
      return { ...action.payload };
    default:
      return state;
  };
};

export default coinDataReducer;