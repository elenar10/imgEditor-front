import React from 'react';
import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Header from './components/header';
import Home from './pages/landing';
import Edit from './pages/edit';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <Header></Header>
    <Switch>
      {/* <Route path="/signForm">
        <SignFom></SignFom>
      </Route>
      <Route path="/login">
      <Login></Login>
      </Route> */}
     
      <Route path="/edit">
        <Edit></Edit>
      </Route>
      <Route path="/">
        <Home></Home>
      </Route>
    </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
