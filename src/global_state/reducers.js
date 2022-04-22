const accessReducer = (state, action) => {
    switch (action.type) {
        case "Auth/AccessToken":
        return {
          accessToken: action.payload
        };
      default:
        return state;
    }
  };

  export {accessReducer}