import React from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { getAuthBool } from './reduxslice';
import { useNavigate } from 'react-router-dom';

class CreateQuote extends React.Component {

    constructor(props) {
        super(props);
        this.state = { workers: [], resources: [], quoteName: '',
            workerName: '', hours: '', hourlyRate: '', workersCost: 0,
            resource: '', resourceCost: '', resourcesCost: 0, finalBudget: 0, editing: false, _id: ''};
        this.handleChange = this.handleChange.bind(this);
        this.addWorker = this.addWorker.bind(this);
        this.addResource = this.addResource.bind(this);
        this.calculateWorker = this.calculateWorker.bind(this);
        this.calculateFinalBudget = this.calculateFinalBudget.bind(this);
        this.saveQuote = this.saveQuote.bind(this);
    }


    render() {
      return (
        <form className="formStyle">
          <div className="container">
          
          <div className="row">
            <h1 className="">Create a Quote</h1><br/>
              <p>To create a new quote please fill in the details below.</p>
            <div>
              <label htmlFor="quoteName">What would you like to name this quote?</label>
              <input type="text" id="quoteName" name="quoteName" onChange={this.handleChange('quoteName')} value={this.state.quoteName} />
            </div>
              
          </div>
          <div className="row rowStyle">
            <h3>Workers</h3>
            <div className="col">
              <div className="row row-cols-3">
                <div className="col colMidStyle colTopStyle">
                  <label htmlFor="workerName">How would you like to name this worker?</label>
                </div>
                <div className="col colMidStyle colTopStyle">
                  <label htmlFor="hours">How many hours do you think it will take this worker to complete the work?</label>
                </div>
                <div className="col colTopStyle">
                  <label htmlFor="hourlyRate">What is this workers hourly rate?</label>
                </div>
                <div className="col colMidStyle colBotStyle">
                  <input type="text" id="workerName" name="workerName" onChange={this.handleChange('workerName')} value={this.state.workerName}/>
                </div>
                <div className="col colMidStyle colBotStyle">
                  <input type="text" id="hours" name="hours" onChange={this.handleChange('hours')} value={this.state.hours}/>
                </div>
                <div className="col colBotStyle">
                  <input type="text" id="hourlyRate" name="hourlyRate" onChange={this.handleChange('hourlyRate')} value={this.state.hourlyRate}/>
                </div>
              </div>
            </div>
            <button className="btn btn-md btn-primary" id="addWorker" type="button" onClick={this.addWorker}>Add worker</button>
            <br/><br/>
            <div className="container pt-4">
              <div className="table-responsive">
                <WorkerList items={this.state.workers}/>
              </div>
            </div>
            <label htmlFor="workersCost">Total Workers Cost (£)</label>
            <input id="workersCost" readOnly value={this.state.workersCost}></input>
          </div>
          <div className="row rowStyle">
            <h3>Non-Human Resources</h3>
            <div className="col">
              <div className="row row-cols-2">
                  <div className="col colMidStyle colTopStyle">
                  <label htmlFor="resource">What resource do you need?</label>
                  </div>
                  <div className="col colTopStyle">
                  <label htmlFor="resourceCost">What is this resource going to cost? (£)</label>
                  </div>
                  <div className="col colMidStyle colBotStyle">
                  <input type="text" id="resource" name="resource" onChange={this.handleChange('resource')} value={this.state.resource}/>
                  </div>
                  <div className="col colBotStyle">
                  <input type="text" id="resourceCost" name="resourceCost" onChange={this.handleChange('resourceCost')} value={this.state.resourceCost}/>
                  </div>
              </div>
            </div>
            <button className="btn btn-md btn-primary" id="addResource" type="button" onClick={this.addResource}>Add Resource</button>
            <br/><br/>
            <div className="container pt-4">
              <div className="table-responsive">
                <ResourceList items={this.state.resources}/>
              </div>
            </div>
            <label htmlFor="resourcesCost">Total Resources Cost (£)</label>
            <input id="resourcesCost" readOnly value={this.state.resourcesCost}></input>
          </div>
          <div className="row rowStyle">
            <input type="button" className="btn btn-md btn-primary space" value="Calculate Final Budget" onClick={this.calculateFinalBudget}/><br/><br/>

            <div id="finalBudgetDiv" className="space"  hidden={(this.state.finalBudget===0) ? 'hidden' : ''}>
              <label id="finalBudget" htmlFor="finalBudget">Final Budget (£)</label>
              <input type="text" readOnly name="finalBudget" value={this.state.finalBudget}/>
            </div>
          </div>
          {(sessionStorage.getItem('auth'))? <div className="row rowStyle">
          <input id="button" className="btn btn-md btn-primary" value="Save Quote" onClick={this.saveQuote}/></div>
            : undefined}
          <br/><br/>
          </div>
        </form>
      );
    }


    handleChange = name => event => {
        this.setState({[name]: event.target.value})
    }

    addWorker(e) {
      e.preventDefault();
      if(!this.state.workerName.length || !this.state.hours.length || !this.state.hourlyRate.length){
        return;
      }
      console.log(this.state.workerName)
      console.log(this.state.hours)
      console.log(this.state.hourlyRate)
      const newItem = {
        workerName: this.state.workerName,
        hours: this.state.hours,
        hourlyRate: this.state.hourlyRate,
        id: Date.now()
      };
      this.calculateWorker(this.state.hours, this.state.hourlyRate, true);
      this.state.workers.push(newItem)
      this.setState({
        workerName: '',
        hours: '',
        hourlyRate: ''
      });
    }

    addResource(e) {
      e.preventDefault();
      if(!this.state.resource.length || !this.state.resourceCost.length){
        return;
      }
      const newItem = {
        resource: this.state.resource,
        resourceCost: this.state.resourceCost,
        id: Date.now()
      };
      //if (add) {
      let resourcesTotal = (this.state.resourcesCost + (parseFloat(this.state.resourceCost) || 0));
      //} else resourcesTotal = "" + (this.state.resourcesCost - (parseFloat(this.state.resourceCost) || 0));
      console.log(resourcesTotal)
      this.setState({resourcesCost: resourcesTotal})
      this.state.resources.push(newItem)
      this.setState({
        resource: '',
        resourceCost: ''
      });
    }

    calculateFinalBudget(e) {
      e.preventDefault();
      console.log(this.state.workersCost)
      console.log(this.state.resourcesCost)
      let finalBudget = (parseFloat(this.state.workersCost) + parseFloat(this.state.resourcesCost));
      console.log(finalBudget)
      this.setState({finalBudget: finalBudget})
      return finalBudget;
      
    }

    saveQuote(e) {
      e.preventDefault();
      let auth = sessionStorage.getItem('auth')
      if (!auth) return;
      // if(!this.state.resource.length || !this.state.resourceCost.length){
      //   return;
      // }
      console.log(JSON.parse(auth).user._id)
      let data = {
        user_id: JSON.parse(auth).user._id,
        username: JSON.parse(auth).user.username,
        quote_name: this.state.quoteName,
        workers: this.state.workers,
        workers_cost: this.state.workersCost,
        resources: this.state.resources,
        resources_cost: this.state.resourcesCost,
        final_budget: this.state.finalBudget
      };
      //if (add) {
      //let finalBudget = ''+((parseInt(this.state.workerCost) || 0) + (parseInt(this.state.resourcesCost) || 0));
      //} else workersTotal = "" + ((parseInt(this.state.workersCost) || 0) - parseInt(workersTotal));
      console.log(data)
      let headers = {'Authorization': 'Bearer '+JSON.parse(auth).token}
      console.log(headers)
      var requestURI = "http://localhost:8000/api/quote"
      if (this.state.editing) {
        data['_id'] = this.state._id
        axios.put(requestURI, data, {headers})
          .then(response => {
              console.log("Complete Updating Quote to database")
              // this.setState({ workers: [], resources: [], quoteName: '',
              // workerName: '', hours: '', hourlyRate: '', workersCost: 0,
              // resource: '', resourceCost: '', resourcesCost: 0, finalBudget: 0});
              this.props.navigation.navigate('/')
            })
          .catch(err => {
              console.log(err)
          });
      } else{
        axios.post(requestURI, data, {headers})
          .then(response => {
              console.log("Complete Saving Quote to database")
              // this.setState({ workers: [], resources: [], quoteName: '',
              // workerName: '', hours: '', hourlyRate: '', workersCost: 0,
              // resource: '', resourceCost: '', resourcesCost: 0, finalBudget: 0});
              this.props.navigation.navigate('/')
            })
          .catch(err => {
              console.log(err)
          });
      }
    }

    calculateWorker (hours, hourlyRate, add) {
      console.log("Calculating Worker Cost")
      let data = {"hours": hours, "hourlyRate" : hourlyRate}
      console.log(data)
      var requestURI = "http://localhost:8000/api/quote/addWorker"
      axios.post(requestURI, data)
      .then(response => {
          console.log("Getting Worker Cost")
          let workersTotal = JSON.stringify(response.data)
          console.log(workersTotal)
          if (add) {
            workersTotal = (this.state.workersCost + parseFloat(workersTotal));
          } else workersTotal = (this.state.workersCost - parseFloat(workersTotal));
          console.log(workersTotal)
          this.setState({workersCost: workersTotal})
        })
      .catch(err => {
          console.log(err)
      });
    }

    componentDidMount() {
      if (sessionStorage.getItem('auth') && sessionStorage.getItem('quote')) {
        let quote = JSON.parse(sessionStorage.getItem('quote'))
        console.log(quote)
        this.setState({
          _id: quote._id,
          editing: true,
          quoteName: quote.quote_name,
          workers: quote.workers,
          workersCost: quote.workers_cost,
          resources: quote.resources,
          resourcesCost: quote.resources_cost,
          finalBudget: quote.final_budget          
        });
        sessionStorage.removeItem('quote')
      }
    }

}

class WorkerList extends React.Component {
  render() {
    return (
      <table className="table table-bordered">
        <thead>
          <tr>
            <th className="text-center">Worker Name</th>
            <th className="text-center">Work Hours</th>
            <th className="text-center">Hourly Rate</th>
            {/* <th className="text-center"></th> */}
          </tr>
        </thead>
        <tbody id="tWorkerBody">
          {this.props.items.map((item, index) => (
            <tr key={index}>
              <td>{item.workerName}</td>
              <td>{item.hours}</td>
              <td>{item.hourlyRate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

class ResourceList extends React.Component {
  render() {
    return (
      <table className="table table-bordered">
        <thead>
          <tr>
            <th className="text-center">Resource Name</th>
            <th className="text-center">Cost</th>
            <th className="text-center"></th>
          </tr>
        </thead>
        <tbody id="tResBody">
          {this.props.items.map((item, index) => (
            <tr key={index}>
              <td>{item.resource}</td>
              <td>{item.resourceCost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}


export default CreateQuote;