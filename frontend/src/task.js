import React from 'react'
import axios from 'axios'

// Component for the Task in Quote Creation
class Task extends React.Component {
    constructor(props) {
      super(props);
      this.state = { workers: [], resources: [], workerName: '', hours: '', hourlyRate: -1, 
          workersCost: 0, resource: '', resourceCost: '', resourcesCost: 0, 
          rates: [], taskName: '', taskCost: 0};
      this.handleChange = this.handleChange.bind(this);
      this.addTask = this.addTask.bind(this);
      this.addWorker = this.addWorker.bind(this);
      this.addResource = this.addResource.bind(this);
      this.updateWorkersState = this.updateWorkersState.bind(this);
    }
  
    render(){
      return (
        <div className="row rowStyle">
        <div className="">
            <label className='fontSpace' htmlFor="taskName">Task Name: </label>
            <input type="text" name="taskName" onChange={this.handleChange('taskName')} value={this.state.taskName}/>
        </div>
          <div className='workerTask'>
            <h5>Workers</h5>
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
                    {/* Add rates from states to dropdown selection */}
                    {this.state.rates.map((rate) => (
                      <option value={rate.rate_index}>{rate.rate_name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="text-center row">
              <button className="btn btn-md btn-primary" id="addWorker" type="button" onClick={this.addWorker}>Add worker</button>
            </div>
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
                        {/* Display rate name from the saved hourly rate */}
                        <td>{(this.state.rates.length > 1)?(this.state.rates.filter((rate) => 
                            JSON.parse(JSON.stringify(rate)).rate_index == worker.hourlyRate
                          ))[0].rate_name
                          :''}</td>
                        {/* Delete worker and update cost */}
                        <td><button className="btn btn-md btn-primary" onClick={() => {
                          this.setState({workers: this.state.workers.filter((worker, idx) => 
                            idx !== index
                          )});
                          let newWorkersCost = (parseFloat(this.state.workersCost) - parseFloat(worker.workerCost))
                          this.setState({workersCost: parseFloat(newWorkersCost.toFixed(2))})
                          this.setState({taskCost: parseFloat((parseFloat(this.state.taskCost) - parseFloat(worker.workerCost)).toFixed(2))})
                        }}>DELETE</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div>
            <h5>Non-Human Resources</h5>
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
            <div className="text-center row">
            <button className="btn btn-md btn-primary" id="addResource" type="button" onClick={this.addResource}>Add Resource</button>
            </div>
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
                          // Remove resource from resources by index and update cost
                          this.setState({resources: this.state.resources.filter((ele, idx) => 
                            idx !== index
                          )});
                          let newResCost = (parseFloat(this.state.resourcesCost) - (parseFloat(res.resourceCost)))
                          this.setState({resourcesCost: parseFloat(newResCost.toFixed(2))}) 
                          this.setState({taskCost: parseFloat((parseFloat(this.state.taskCost) - parseFloat(res.resourceCost)).toFixed(2))})
                        }}>DELETE</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="space" >
            <label  htmlFor='taskCost'>Task Cost (Workers Cost + Resources Cost) (£)</label>
            <input type="text" readOnly name='taskCost' value={this.state.taskCost}/>
          </div>
          <div className="text-center">
            <input type="button" className="btn btn-md btn-primary" value={(this.props.index === -1)?"Add Task":"Save Task"} onClick={this.addTask}/>
            {(this.props.index !== -1 || this.props.newTask)?<input type="button" className="btn btn-md btn-primary buttonSpace" value="Back" onClick={()=> this.props.quoteCallback({},-10)}/>:''}
          </div>
        </div>
      );
    }
  
    // Handle textbox/input changes to save to state, replacing unneeded characters using regular expressions
    handleChange = name => event => {
      if (name === 'resourceCost' || name === 'hours') this.setState({[name]: event.target.value.replace(/[^\d.]/, "")})
      else this.setState({[name]: event.target.value.replace(/[^\w\s]/, "")})
    }
  
    // Handles adding the task to the main create quotes component
    addTask(e) {
        // Send error to CreateQuote parent through callback if not at least 1 worker and task name
        if(this.state.workers.length === 0 || !this.state.taskName.length){
            this.props.errorCallback('Please add a task name and at least 1 worker to task')
            return;
        }
        // Reset error now that task has been added
        this.props.errorCallback('')
        let task = { workers: this.state.workers, resources: this.state.resources, workersCost: this.state.workersCost, resourcesCost: this.state.resourcesCost, taskName: this.state.taskName, taskCost: this.state.taskCost}
        // Send data to CreateQuote parent through callback
        this.props.quoteCallback(task, this.props.index)
    }
  
    // Add worker button method, posting to server to calculate worker cost using fudge factor and rate and updating workers and workers cost
    addWorker(e) {
      e.preventDefault();
      // Send error to CreateQuote parent through callback if worker fields are not all filled
      if(!this.state.workerName.length || !this.state.hours.length || !this.state.hourlyRate.length ||
          this.state.hourlyRate == -1){
            this.props.errorCallback('Please fill in all worker fields before adding the worker')
        return;
      }
      // Reset error now that task has been added
      this.props.errorCallback('')
      // Send worker data to server to calculate using fudge factor (or not if admin chooses) and receiving cost back
      var requestURI = "http://localhost:8000/api/quote/addWorker"
      axios.post(requestURI, {hours:parseFloat(parseFloat(this.state.hours).toFixed(2)), hourlyRate:this.state.hourlyRate, useFudge: this.props.useFudge})
      .then(response => {
          console.log("Getting Worker Cost")
          let workerCost = JSON.stringify(response.data)
          let workersTotal = (this.state.workersCost + parseFloat(workerCost));
          this.setState({workersCost: workersTotal})
          this.setState({taskCost: parseFloat((workersTotal + parseFloat(this.state.resourcesCost)).toFixed(2))})
          this.updateWorkersState(parseFloat(workerCost))
        })
      .catch(err => {
          console.log(err.response.data.error)
          this.props.errorCallback(err.response.data.error)
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
        this.props.errorCallback('Please fill in all resource fields before adding the resource')
        return;
      }
      this.props.errorCallback('')
      const newItem = {
        resource: this.state.resource,
        resourceCost: parseFloat(parseFloat(this.state.resourceCost).toFixed(2)),
        id: Date.now()
      };
      let resourcesTotal = (parseFloat(this.state.resourcesCost) + (parseFloat((parseFloat(this.state.resourceCost).toFixed(2))) || 0));
      this.setState({resourcesCost: parseFloat(resourcesTotal.toFixed(2))})
      this.setState({taskCost: parseFloat((parseFloat(this.state.workersCost) + parseFloat(resourcesTotal.toFixed(2))).toFixed(2))})
      this.setState({
        resources: [...this.state.resources, newItem],
        resource: '',
        resourceCost: 0
      });
    }
  
    // On initial page load, get and set rates from database and populate quote if editing or combining quotes
    componentDidMount() {
      // If the task is not new, set the state to task values
        if (this.props.index !== -1) {
        this.setState({ workers: this.props.task.workers, resources: this.props.task.resources, workersCost: this.props.task.workersCost, 
            resourcesCost: this.props.task.resourcesCost, taskName: this.props.task.taskName, taskCost: this.props.task.taskCost});
      } 
      // Get rates from database
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
        this.props.errorCallback(err.response.data.error)
      });
      
    }
  
  }
  export default Task;