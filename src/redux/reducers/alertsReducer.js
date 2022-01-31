const INITIAL_STATE = {
  loading: false,
};
export const alertsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOADING": {
      return {
        ...state,
        loading: action.payload,
      };
    }

    default:
      return state;
  }
};
