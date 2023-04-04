import logo from './logo.svg';
import React from 'react';
import './App.css';
import { Link } from "react-router-dom";


class Home extends React.Component {
  constructor(props) {
    super(props);

 }

  render() {
    return (
      <div className="background">
        <div className="formStyle container">
          <div className="row">
            <h1 className="">Welcome to the Quotes and Bugdets Website</h1>
            <p>To create a new quote or view your existing quotes please log in or register below.</p>
          </div>

          <div className="row">
            <label htmlFor="quotes">To create a new quote please head to the Quotes page below</label><br/>
            <Link className="btn btn-md btn-primary" to='/quotes'>View/Create Quotes</Link>
          </div>

        </div>
      </div>
    );
  }
}

export default Home;
