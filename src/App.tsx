import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { useSelector } from "react-redux";
import Home from './pages/Home';
import Login from "./pages/Login";
import MyPlaylist from "./pages/MyPlaylist";
import { RootState } from "./store";

function App() {
  const { id, token } = useSelector((state: RootState) => state.user)

  return (
    <div className="App bg-gray-50">
      <Router>
        <Switch>
          <Route path="/create-playlist">
            {(id !== "" && token !== "") ? <Home /> : <Redirect exact from="/create-playlist" to="/" />}
          </Route>
          <Route path="/my-playlist">
            {(id !== "" && token !== "") ? <MyPlaylist /> : <Redirect exact from="/my-playlist" to="/" />}
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
