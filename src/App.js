import Home from './Pages/Home';
import './App.css';
import {Route,Switch } from 'react-router-dom';
import routes from "./routes";

function App() {
  return (
    <Switch>
    <Route path={routes.home}>
      <Home/>
    </Route>
  </Switch>
  );
}

export default App;
