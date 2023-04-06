import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

// Page for Quote Creation, editing and combining
class CreateQuote extends React.Component {
    constructor(props) {
        super(props);
        this.state = { workers: [], resources: [], quoteName: '',
            workerName: '', hours: '', hourlyRate: -1, workersCost: 0, resource: '', resourceCost: '', 
            resourcesCost: 0, finalBudget: 0, editing: false, _id: '', rates: [], useFudge: true, combine:false, error:''};
        this.handleChange = this.handleChange.bind(this);
        this.addWorker = this.addWorker.bind(this);
        this.addResource = this.addResource.bind(this);
        this.updateWorkersState = this.updateWorkersState.bind(this);
        this.calculateFinalBudget = this.calculateFinalBudget.bind(this);
        this.saveQuote = this.saveQuote.bind(this);
    }

    render() {
      const auth = sessionStorage.getItem('auth')
      return (
        <div className="formStyle">
          <div className="container">
          
          <div className="row">
            <h1 className="">Create a Quote</h1><br/>
            <p>To create a new quote please fill in the details below.</p>
            <div className="row" hidden={(!this.state.error === '')?"hidden":""}>
                <p hidden={(this.state.error === '')?'hidden':''} className='error'>Error: {this.state.error}</p>
            </div>
            {(auth && JSON.parse(auth).user.is_admin)?<div>
              <label class="form-check-label" for="useFudge">ADMIN: Should Fudge Factor be used in quote creation:</label>
              <ButtonGroup className="mb-2"><ToggleButton id="toggle-check" type="checkbox"variant="outline-primary" checked={this.state.useFudge} onChange={(e)=>this.setState({useFudge: e.currentTarget.checked})}>Use Fudge Factor</ToggleButton></ButtonGroup>
            </div>:''}
              
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
                  <select name="hourlyRate" value={this.state.hourlyRate} onChange={this.handleChange('hourlyRate')}>
                    {this.state.rates.map((rate) => (
                      <option value={rate.rate_index}>{rate.rate_name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <button className="btn btn-md btn-primary" id="addWorker" type="button" onClick={this.addWorker}>Add worker</button>
            <br/><br/>
            <div className="container pt-4">
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th className="text-center">Worker Name</th>
                      <th className="text-center">Work Hours</th>
                      <th className="text-center">Hourly Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.workers.map((worker, index) => (
                      <tr key={index}>
                        <td>{worker.workerName}</td>
                        <td>{worker.hours}</td>
                        <td>{(this.state.rates.length > 1)?(this.state.rates.filter((rate) => 
                            JSON.parse(JSON.stringify(rate)).rate_index == worker.hourlyRate
                          ))[0].rate_name
                          :''}</td>
                        <td><button className="btn btn-md btn-primary" onClick={() => {
                          this.setState({workers: this.state.workers.filter((worker, idx) => 
                            idx !== index
                          )});
                          this.setState({workersCost: parseFloat(this.state.workersCost-worker.workerCost)})
                        }}>DELETE</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th className="text-center">Resource Name</th>
                      <th className="text-center">Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.resources.map((res, index) => (
                      <tr key={index}>
                        <td>{res.resource}</td>
                        <td>{res.resourceCost}</td>
                        <td><button className="btn btn-md btn-primary" onClick={() => {
                          this.setState({resources: this.state.resources.filter((ele, idx) => 
                            idx !== index
                          )});
                          this.setState({resourcesCost: parseFloat(this.state.resourcesCost-res.resourceCost)})
                        }}>DELETE</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <label htmlFor="resourcesCost">Total Resources Cost (£)</label>
            <input id="resourcesCost" readOnly value={this.state.resourcesCost}></input>
          </div>
          <div className="row rowStyle">
            <input type="button" className="btn btn-md btn-primary space" value="Calculate Final Budget" onClick={this.calculateFinalBudget}/><br/><br/>

            <div id="finalBudgetDiv" className="space"  hidden={(this.state.finalBudget===0) ? 'hidden' : ''}>
              <label id="finalBudget" htmlFor="finalBudget">Final Budget (Workers Cost + Resources Cost) (£)</label>
              <input type="text" readOnly name="finalBudget" value={this.state.finalBudget}/>
            </div>
          </div>
          {(auth && this.state.finalBudget!==0)? <div className="row rowStyle">
          <input id="button" className="btn btn-md btn-primary" value="Save Quote" onClick={this.saveQuote}/></div>
            : undefined}
          </div><br/>
        </div>
      );
    }

    // Handle textbox/input changes to save to state, replacing unneeded characters using regular expressions
    handleChange = name => event => {
        if (name === 'resourceCost' || name === 'hours') this.setState({[name]: event.target.value.replace(/[^\d.]/, "")})
        else this.setState({[name]: event.target.value.replace(/[^\w\s]/, "")})
    }

    // Add worker button method, posting to server to calculate worker cost using fudge factor and rate and updating workers and workers cost
    addWorker(e) {
      e.preventDefault();
      if(!this.state.workerName.length || !this.state.hours.length || !this.state.hourlyRate.length ||
          this.state.hourlyRate == -1){
            this.setState({error: 'Please fill in all worker fields before adding the worker'})
        return;
      }
      this.setState({error: ''})
      console.log(this.state.hourlyRate)
      var requestURI = "http://localhost:8000/api/quote/addWorker"
      axios.post(requestURI, {hours:parseFloat(parseFloat(this.state.hours).toFixed(2)), hourlyRate:this.state.hourlyRate, useFudge: this.state.useFudge})
      .then(response => {
          console.log("Getting Worker Cost")
          let workerCost = JSON.stringify(response.data)
          let workersTotal = (this.state.workersCost + parseFloat(workerCost));
          console.log(workersTotal)
          this.setState({workersCost: workersTotal})
          this.updateWorkersState(parseFloat(workerCost))
        })
      .catch(err => {
          console.log(err.response.data.error)
          this.setState({error: err.response.data.error})
      });
      
    }

    // Update worker state variables after adding worker
    updateWorkersState(cost) {
      const newItem = {
        workerName: this.state.workerName,
        hours: parseFloat(parseFloat(this.state.hours).toFixed(2)),
        hourlyRate: this.state.hourlyRate,
        id: Date.now(),
        workerCost: cost
      };
      this.setState({
        workers: [...this.state.workers, newItem],
        workerName: '',
        hours: '',
        hourlyRate: -1
      });
    }

    // Add Resource button handler, adding resource to resource list and updating total resources cost
    addResource(e) {
      e.preventDefault();
      if(!this.state.resource.length || !this.state.resourceCost.length){
        this.setState({error: 'Please fill in all resource fields before adding the resource'})
        return;
      }
      this.setState({error: ''})
      const newItem = {
        resource: this.state.resource,
        resourceCost: parseFloat(parseFloat(this.state.resourceCost).toFixed(2)),
        id: Date.now()
      };
      let resourcesTotal = (parseFloat(this.state.resourcesCost) + (parseFloat((parseFloat(this.state.resourceCost).toFixed(2))) || 0));
      console.log(resourcesTotal)
      this.setState({resourcesCost: parseFloat(resourcesTotal.toFixed(2))})
      this.state.resources.push(newItem)
      this.setState({
        resource: '',
        resourceCost: 0
      });
    }

    // Calculate Final Budget button handler for calculating and setting the final budget
    calculateFinalBudget(e) {
      e.preventDefault();
      console.log(this.state.workersCost)
      console.log(this.state.resourcesCost)
      let finalBudget = (parseFloat(this.state.workersCost) + parseFloat(this.state.resourcesCost));
      console.log(finalBudget)
      this.setState({finalBudget: finalBudget})
      return finalBudget;
      
    }

    // Save Quote button handler for handling quote creation and updating
    saveQuote(e) {
      e.preventDefault();
      let auth = sessionStorage.getItem('auth')
      if (!auth) {
        this.setState({error: 'Not authorised to save quote'})
        return;
      }
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
      console.log(data)
      let headers = {'Authorization': 'Bearer '+JSON.parse(auth).token}
      console.log(headers)
      var requestURI = "http://localhost:8000/api/quote"
      // If editing existing quote then update
      if (this.state.editing) {
        data['_id'] = this.state._id
        axios.put(requestURI, data, {headers})
          .then(response => {
              console.log("Complete Updating Quote to database")
              this.props.navigate('/quotes')
            })
          .catch(err => {
            console.log(err.response.data.error)
            this.setState({error: err.response.data.error})
          });
      } // if not editing then post create new quote, combining quotes will create new quote 
      else{
        axios.post(requestURI, data, {headers})
          .then(response => {
              console.log("Complete Saving Quote to database")
              this.props.navigate('/quotes')
            })
          .catch(err => {
            console.log(err.response.data.error)
            this.setState({error: err.response.data.error})
          });
      }
    }

    // On initial page load, get and set rates from database and populate quote if editing or combining quotes
    componentDidMount() {
      var requestURI = "http://localhost:8000/api/rates/quote"
      axios.get(requestURI)
      .then(response => {
          console.log("Getting Rates Data")
          let ratesData = response.data
          ratesData.sort((a, b) => parseInt(a.rate_index) - parseInt(b.rate_index));
          if (ratesData.length == 0) ratesData = [{rate_index: -1, rate_name: 'No Rates Setup'}]
          else ratesData = [{rate_index: -1, rate_name: '-SELECT-'}, ...ratesData]
          this.setState({rates: ratesData})
      })
      .catch(err => {
        console.log(err.response.data.error)
        this.setState({error: err.response.data.error})
      });
      // If logged in and there is a quote sent for editing then populate quote states
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
      // If logged in and there are quotes sent for combining then populate quote states with combination of quote values
      if (sessionStorage.getItem('auth') && sessionStorage.getItem('quoteC1')) {
        let quote1 = JSON.parse(sessionStorage.getItem('quoteC1'))
        let quote2 = JSON.parse(sessionStorage.getItem('quoteC2'))
        this.setState({
          _id: '',
          combine: true,
          quoteName: quote1.quote_name + ' ' + quote2.quote_name,
          workers: quote1.workers.concat(quote2.workers),
          workersCost: quote1.workers_cost + quote2.workers_cost,
          resources: quote1.resources.concat(quote2.resources),
          resourcesCost: quote1.resources_cost + quote2.resources_cost,
          finalBudget: quote1.final_budget + quote2.final_budget          
        });
        sessionStorage.removeItem('quoteC1')
        sessionStorage.removeItem('quoteC2')
      }
    }

}

// Allows class CreateQuote to use navigation
export function CreateQuoteNavigation(props) {
  const navigate = useNavigate()
  return (<CreateQuote navigate={navigate}></CreateQuote>)
}

export default CreateQuote;