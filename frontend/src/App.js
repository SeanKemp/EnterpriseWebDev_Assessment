import React from 'react';
import './App.css';
import { Link } from "react-router-dom";

// Home page
class Home extends React.Component {
  constructor(props) {
    super(props);
 }

  render() {
    return (
      <div className="background">
        <div className="formStyle container">
          <div className="row space">
            <h1 className="">Welcome to the Quotes and Bugdets Website</h1>
            <p>You can calculate the final budget without logging in, however to get full functionality please login/register in the navigation bar above.</p>
            <img className='quoteImg' src={require('./img/quote.jpg')} />
          </div>
          <br/>
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
