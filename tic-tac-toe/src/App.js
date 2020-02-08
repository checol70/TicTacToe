import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './reset.css';
import Home from './pages/Home'

function App() {
  return (
    <div className="App">
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
