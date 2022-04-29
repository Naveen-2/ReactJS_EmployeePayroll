
import './App.css';
import PayrollForm from './components/payroll-form/payroll-form'
import Header from "./components/header/Header";
import PayrollDashboard from './components/payroll-dashboard/payroll-dashboard';
import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Router>
        <div className="App">
              <Switch>
                  <Route exact path="/payroll-dashboard" component={PayrollDashboard}/>
                  <Route exact path="/payroll-form" component={PayrollForm}/>
              </Switch>
        </div>
      </Router>
      </>
  );
}

export default App;
