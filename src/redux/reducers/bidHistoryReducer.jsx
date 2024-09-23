// client/src/redux/reducers/bidHistoryReducer.js
const initialState = {
    fetchBidHistory: () => {}, // Initial value is an empty function
  };
  
  const bidHistoryReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_FETCH_BID_HISTORY':
        return {
          ...state,
          fetchBidHistory: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default bidHistoryReducer;
  