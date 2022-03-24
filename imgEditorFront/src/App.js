import React from 'react';
import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Header from './components/header';
// import Landing from './pages/landing';
import Home from './pages/home';
import Edit from './pages/edit';
import SignFom from './pages/signForm';
import Login from './pages/login';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <Header></Header>
    
    <Switch>
      <Route path="/signForm">
        <SignFom></SignFom>
      </Route>
      <Route path="/login">
      <Login></Login>
      </Route>
     
      <Route path="/edit/:id">
        <Edit></Edit>
      </Route>
      {/* <Route path="/landing">
        <Landing></Landing>
      </Route> */}
      <Route path="/">
        <Home></Home>
      </Route>
    </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
