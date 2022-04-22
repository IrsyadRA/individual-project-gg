import './App.css';
import React from 'react';
import CreatePlaylist from './pages/create_playlist_pages';
import LoginPage from './pages/login_pages';
import { Route, Switch, Redirect } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Switch>
         <Route path="/create-playlist">
          {window.location.hash ? <CreatePlaylist/>:<Redirect to="/" />}
        </Route> 
        <Route path="/">
         <LoginPage/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
