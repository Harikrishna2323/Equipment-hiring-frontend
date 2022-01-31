const INITIAL_STATE = {
  bookings: [],
};

export const bookingsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_ALL_BOOKINGS": {
      return {
        ...state,
        bookings: action.payload,
      };
    }

    default:
      return state;
  }
};
