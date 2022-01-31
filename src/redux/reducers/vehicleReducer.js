const INITIAL_DATA = {
  vehicles: [],
};

export const vehiclesReducer = (state = INITIAL_DATA, action) => {
  switch (action.type) {
    case "GET_ALL_VEHICLES": {
      return {
        ...state,
        vehicles: action.payload,
      };
    }
    default:
      return state;
  }
};
