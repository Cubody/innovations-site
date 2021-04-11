import './App.css';
import Innovations from "./components/Innovations";
import SignIn from "./components/SignIn";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import PrivateRoute from "./services/utils/PrivateRoute";

function App() {
    return (
        <Router>
            <div className="App">
                <div className="container d-flex align-items-center flex-column">
                    <Switch>
                        <PrivateRoute path="/" exact={true}>
                            <Innovations role/>
                        </PrivateRoute>
                        <Route path="/auth">
                            <SignIn/>
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default App;
