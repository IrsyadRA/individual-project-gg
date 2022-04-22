
const accessToken = (query) => ({
    type: "Auth/AccessToken",
    payload: query
});


export { accessToken };