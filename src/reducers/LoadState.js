export const LoadState = () => {
    // Check if user credentials is exists in the local storage
    // (local storage in browser)
    try {
        // Get data
        const state = localStorage.getItem("state");

        if(state === null) {
            return undefined;
        }
        // Return data
        return JSON.parse(state);
    } catch (e) {
        return undefined
    }
};


export const SaveState = (state) => {
    // Generate expired date (now +5 days)
    let date = new Date();
    date.setDate(date.getDate() + 5);
    // Save user credentials to the local storage
    try {
        const newState = JSON.stringify(state);
        // Save data
        localStorage.setItem("state", newState);
    } catch (e) {
        // Ignore errors
    }
};
