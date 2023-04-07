import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Task from './task';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

// Page for Quote Creation, editing and combining
class CreateQuote extends React.Component {
    constructor(props) {
        super(props);
        this.state = { tasks: [], taskIndex: -1, quoteName: '', finalBudget: 0, editing: false, _id: '', 
            rates: [], useFudge: true, combine:false, error:'', calculatedBudget: false, newTask: false, taskCombineText: 'SELECT', taskCombine: {}, taskCombineIndex: -1};
        this.handleChange = this.handleChange.bind(this);
        this.combineTasks = this.combineTasks.bind(this);
        this.getDataCallback = this.getDataCallback.bind(this);
        this.showErrorCallback = this.showErrorCallback.bind(this);
        this.calculateFinalBudget = this.calculateFinalBudget.bind(this);
        this.saveQuote = this.saveQuote.bind(this);
    }

    getDataCallback = (task, index) => {
      if (index === -10) this.setState({newTask: false, taskIndex:-1})
      else if (this.state.taskIndex === -1) this.setState({tasks: [...this.state.tasks, task], taskIndex: -1, newTask:false})
      else {
        let tempTasks = this.state.tasks
        tempTasks[index] = task
        console.log(tempTasks)
        this.setState({tasks: tempTasks, taskIndex: -1})
      }
    }

    showErrorCallback = (err) => {
      this.setState({error: err})
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
            {/* If is user and is admin show fudge factor select */}
            {(auth && JSON.parse(auth).user.is_admin)?<div>
              <label class="form-check-label" for="useFudge">ADMIN: Should Fudge Factor be used in quote creation:</label>
              <ButtonGroup className="mb-2"><ToggleButton id="toggle-check" type="checkbox"variant="outline-primary" checked={this.state.useFudge} onChange={(e)=>this.setState({useFudge: e.currentTarget.checked})}>Use Fudge Factor</ToggleButton></ButtonGroup>
            </div>:''}
              
            <div>
              <label htmlFor="quoteName">What would you like to name this quote?</label>
              <input type="text" id="quoteName" name="quoteName" onChange={this.handleChange('quoteName')} value={this.state.quoteName} />
            </div>
              
          </div>
          {/* If there is no tasks in state or task sent for edit or add new task has been clicked, show Task component, 
             otherwise show table of tasks and final budget*/}
          {(this.state.tasks.length === 0 || this.state.taskIndex !== -1 || this.state.newTask)? 
            <Task quoteCallback={this.getDataCallback} errorCallback={this.showErrorCallback} task={this.state.tasks[this.state.taskIndex]} index={this.state.taskIndex} useFudge={this.state.useFudge} newTask={this.state.newTask} ></Task>: 
            <div className="container pt-4">
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th className="text-center">Task Name</th>
                    <th className="text-center">Task Cost (£)</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.tasks.map((task, index) => (
                    <tr key={index}>
                      <td>{task.taskName}</td>
                      <td>{task.taskCost}</td>
                      <td><button className="btn btn-md btn-primary" onClick={() => {
                        // Send task at index of click to be edited in Task component
                        this.setState({taskIndex: index})
                      }}>VIEW/EDIT</button></td>
                      {/* Combine tasks through selection of buttons */}
                      <td><ToggleButtonGroup type="checkbox" className="mb-2">
                            <ToggleButton id={'tbg-check-'+index+task.taskName} value={'tbg-check-'+index+task.taskName} variant="outline-primary" checked={(this.state.taskCombineIndex === index)} onChange={this.combineTasks(task, index)}>
                              {this.state.taskCombineText}</ToggleButton>
                            </ToggleButtonGroup></td>
                      <td><button className="btn btn-md btn-primary" onClick={() => {
                        // Delete task at index of click
                        this.setState({tasks: this.state.tasks.filter((ele, idx) => 
                          idx !== index
                        )});
                      }}>DELETE</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="text-center space">
              <input className="btn btn-md btn-primary" value="Add New Task" onClick={()=>{
                // Setting new task state to load Task component
                this.setState({newTask: true, calculatedBudget: false});
                }}/>
            </div>
            <div className="row rowStyle">
              <input type="button" className="btn btn-md btn-primary space" value="Calculate Final Budget" onClick={this.calculateFinalBudget}/><br/><br/>
              <div id="finalBudgetDiv" className="space"  hidden={(this.state.finalBudget===0) ? 'hidden' : ''}>
                <label id="finalBudget" htmlFor="finalBudget">Final Budget (Sum of Tasks) (£)</label>
                <input type="text" readOnly name="finalBudget" value={this.state.finalBudget}/>
              </div>
            </div>
            {(auth && this.state.calculatedBudget)? <div className="row rowStyle">
            <input type="button" className="btn btn-md btn-primary" value="Save Quote" onClick={this.saveQuote}/></div>
              : undefined}
            </div>
          }
          </div><br/>
        </div>
      );
    }

    // Handle textbox/input changes to save to state, replacing unneeded characters using regular expressions
    handleChange = name => event => {
      this.setState({[name]: event.target.value.replace(/[^\w\s]/, "")})
    }

    combineTasks = (task, index) => event => {
        // If the selected button has not already been selected
        if(event.currentTarget.checked) {
            console.log("Checked")
            // If there are no other selected tasks, add task to state and change button text
            if (Object.keys(this.state.taskCombine).length === 0) {
                console.log("COMBINES")
                this.setState({taskCombine: task, taskCombineIndex: index})
                this.setState({taskCombineText:'COMBINE'})
            } // If another task is already selected, add both tasks together
            else {
              console.log(this.state.taskCombine)
              let tempTask = this.state.taskCombine
              tempTask.taskName = tempTask.taskName + ' ' + task.taskName
              tempTask.workers = tempTask.workers.concat(task.workers)
              tempTask.workersCost = parseFloat((parseFloat(tempTask.workersCost) + parseFloat(task.workersCost)).toFixed(2))
              tempTask.resources = tempTask.resources.concat(task.resources)
              tempTask.resourcesCost = parseFloat((parseFloat(tempTask.resourcesCost) + parseFloat(task.resourcesCost)).toFixed(2))
              tempTask.taskCost = parseFloat((tempTask.taskCost + task.taskCost).toFixed(2))
              let tempTasks = this.state.tasks
              tempTasks[this.state.taskCombineIndex] = tempTask
              tempTasks.splice(index, 1)
              this.setState({tasks: tempTasks, taskCombineText:'SELECT', taskCombine: {}, taskCombineIndex:-1})
            }
        } // If the selected button has already been selected, unselect it and reset combines state
        else {this.setState({taskCombine: {}, taskCombineText:'SELECT'})}
        
    }

    // Calculate Final Budget button handler for calculating and setting the final budget
    calculateFinalBudget(e) {
      e.preventDefault();
      console.log(this.state.tasks)
      if(this.state.tasks.length === 0){
        this.setState({error: 'Please add at least 1 task to the quote'})
        return;
      }
      let finalBudget = 0;
      this.state.tasks.forEach((currVal, idx) =>{
        finalBudget += parseFloat((parseFloat(currVal.taskCost)).toFixed(2));
      })
      //let finalBudget = (parseFloat(this.state.workersCost) + parseFloat(this.state.resourcesCost));
      console.log(finalBudget)
      this.setState({finalBudget: finalBudget, calculatedBudget: true})
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
      if(this.state.tasks.length === 0){
        this.setState({error: 'Please add at least 1 task to the quote'})
        return;
      }
      let data = {
        user_id: JSON.parse(auth).user._id,
        username: JSON.parse(auth).user.username,
        quote_name: this.state.quoteName,
        tasks: this.state.tasks,
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

      // If logged in and there is a quote sent for editing then populate quote states
      if (sessionStorage.getItem('auth') && sessionStorage.getItem('quote')) {
        let quote = JSON.parse(sessionStorage.getItem('quote'))
        console.log(quote)
        this.setState({
          _id: quote._id,
          editing: true,
          quoteName: quote.quote_name,
          tasks: quote.tasks,
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
          tasks: quote1.tasks.concat(quote2.tasks),
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