import { combineReducers } from "redux";


const initState = {
    /* Default data - user is not logged in */
    username: null,
    loggedIn: false
};

// Redux reducers to save and delete user credentials from the storage
const credentialsReducer = (credentials = initState, action) => {
    switch (action.type) {
        case "setCredentials":
            return action.payload;
        case "eraseCredentials":
            return action.payload;
        default:
            return credentials;
    }
};

// Set the reducer
const reducers = combineReducers({credentials: credentialsReducer});

export default reducers;
