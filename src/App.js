import "./App.css";
import React, {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Home from "./Home";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/v1" exact component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
