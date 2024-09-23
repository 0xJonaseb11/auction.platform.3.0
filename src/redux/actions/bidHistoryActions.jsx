// client/src/redux/actions/bidHistoryActions.js
export const setFetchBidHistory = (fetchBidHistory) => {
    return {
      type: 'SET_FETCH_BID_HISTORY',
      payload: fetchBidHistory,
    };
  };
  