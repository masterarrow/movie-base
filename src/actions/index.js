// Save to the Redux storage user credentials when hi logged in
export const setCredentials = (userData) => {
    return {
        type: "setCredentials",
        payload: userData
    }
};

// Delete from the Redux storage user credentials when hi logged out
export const eraseCredentials = () => {
    return {
        type: "setCredentials",
        payload: {
            username: null,
            loggedIn: false
        }
    }
};
