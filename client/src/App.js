import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
//COMPONETS
import Navbar from './components/Navbar';
import Home from './components/Home';
import NotFound from './components/NotFound';
import Bilance from './components/Bilance';
import Salary from './components/Salary';
import Footer from './components/Footer';
import LogIn from './components/auth/LogIn';
import SignUp from './components/auth/SignUp';
import setToken from './context/setToken'

//CONTEXT
import ExpensesState from './context/expenses/expensesState';
import BudgetsState from './context/budget/budgetState';
import AuthState from './context/auth/authState';
import AlertState from './context/alert/alertState';


//STYLING
import './App.css';



if(localStorage.token) setToken(localStorage.token);

function App() {
  

  return (
    <AuthState>
      <ExpensesState>
        <BudgetsState>
            <AlertState>
              <BrowserRouter>
                <div className="app">
                <Navbar />
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/api/expenses" component={Bilance} />
                    <Route exact path="/salary" component={Salary} />
                    <Route exact path="/login" component={LogIn}/>
                    <Route exact path="/signup" component={SignUp} />
                    <Route component={NotFound} />
                  </Switch>
                  <Footer />
                  </div>
               </BrowserRouter>
              </AlertState>
          </BudgetsState>
      </ExpensesState>
    </AuthState>
  );
}

export default App;
