import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Redirect } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import { LoadState } from "./reducers/LoadState"
import { setCredentials } from "./actions";
import NavBar from "./components/NavBar";
import Home from "./Home";
import Error404 from "./Error404";
import SignOut from "./SignOut";
import SignIn from "./SignIn";
import CreateMovie from "./CreateMovie";
import MovieDetails from "./MovieDetails";

function App() {
    let user = useSelector(state => state.credentials);
    const dispatch = useDispatch();

    // Configure toast notifications
    toast.configure({
        autoClose: 5000,
        pauseOnFocusLoss: false
    });

    // const data = "";
    useEffect(() => checkCredentials(), []);

    const checkCredentials = () => {
        let credentials = LoadState();

        if(credentials && credentials.loggedIn) {
            // Save renewed data to the Redux and local storage
            user = credentials;
            dispatch(setCredentials(credentials));
        }
    };

    return (
        <Router component={App}>
            {checkCredentials}
            <div className="App">
              <NavBar/>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/movie/:slug" component={MovieDetails}/>
                    <Route path="/new" render={() => (user.loggedIn === false) ? <Redirect to="/"/> : <CreateMovie/>}/>
                    <Route path="/new/:slug" render={() => (user.loggedIn === false) ? <><Redirect to="/"/></> : <CreateMovie/>}/>
                    <Route path="/sign-in" render={() => user.loggedIn ? <Redirect to="/"/> : <SignIn/>}/>
                    <Route path="/sign-out" render={() => (user.loggedIn === false) ? <Redirect to="/"/> : <SignOut/>}/>
                    <Route path="*" component={Error404}/>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
