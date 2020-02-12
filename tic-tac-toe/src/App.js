import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './reset.css';
import Home from './pages/Home'
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <div className="App container">
      <header className="App-header">
        <BrowserRouter><div>
              <Switch>
                <Route exact path="/" component={Home} />
              </Switch>
            </div>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
