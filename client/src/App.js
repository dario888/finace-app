import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
//COMPONETS
import Navbar from './components/Navbar'
import Home from './components/Home'
import Expenses from './components/expenses/Expenses'
import Salary from './components/Salary'
import Footer from './components/Footer';
import LogIn from './components/auth/LogIn';
import SignUp from './components/auth/SignUp';
//CONTEXT
import ExpensesState from './context/expenses/expensesState'

import './App.css';



function App() {
  

  return (
    <ExpensesState>
    <BrowserRouter>
    <div className="app">
      <Navbar  />
      <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/api/expenses" component={Expenses} />
      <Route exact path="/salary" component={Salary} />
      <Route exact path="/login" component={LogIn}/>
      <Route exact path="/signup" component={SignUp} />
      </Switch>
      <Footer />
    </div>
    </BrowserRouter>
    </ExpensesState>
  );
}

export default App;
