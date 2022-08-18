const currencyReducer = (state = 'usd', action) => {

  switch (action.type) {
    case 'CHANGE_CURRENCY':
      return action.payload;
    default:
      return state;
  };
};

export default currencyReducer;