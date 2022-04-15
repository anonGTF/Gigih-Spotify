import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { useSelector } from "react-redux";
import Home from './pages/Home';
import Login from "./pages/Login";
// import './App.css';

function App() {
  const { id, token } = useSelector(state => state.user)

  return (
    <div className="App bg-gray-50">
      <Router>
        <Switch>
          <Route path="/create-playlist">
            {(id !== "" && token !== "") ? <Home /> : <Redirect exact from="/create-playlist" to="/" />}
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
