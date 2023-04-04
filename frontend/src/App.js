import logo from './logo.svg';
import React from 'react';
import './App.css';
import {useQuery} from 'react-query'
import axios from 'axios'
import { Link } from "react-router-dom";


class Home extends React.Component {
  constructor(props) {
    super(props);

 }

  render() {
    return (
      <div className="background">
        <div className="container formStyle">
          <div className="row">
            <h1 className="">Welcome to the Quotes and Bugdets Website</h1>
            <p>To create a new quote or view your existing quotes please log in or register below.</p>
          </div>

          <div className="row">
            <label for="quotes">To create a new quote please head to the Quotes page below</label><br/>
            <Link className="btn btn-md btn-primary" to='/quotes'>View/Create Quotes</Link>
            {/* <a role="button" href="quotes" id="quotes" className="btn btn-md btn-primary">View/Create Quotes</a> */}
          </div>

        </div>
      </div>
    );
  }
}

export default Home;
