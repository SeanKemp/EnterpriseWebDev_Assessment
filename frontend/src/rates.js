import { Link, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux'
import { getAuthBool } from "./authslice";
import React, {useEffect, useState} from 'react'
import axios from "axios";


//class Quotes extends React.Component {
    
export default function Rates() {    
    const [values, setValues] = useState({
        rateIndex: 0,
        rateName: '',
        rate: 0,
        editing: false,
        _id: ''
    });

    const [rates, setRates] = useState(
        []
    );

    
    const navigate = useNavigate()

    // Effectively the same as componentDidMount (https://stackoverflow.com/a/58101332)
    useEffect(()=>{
        getRatesData();
    }, [])
    


    const getRatesData = (e) => {
        var requestURI = "http://localhost:8000/api/rates"
        let headers = {'Authorization': 'Bearer '+JSON.parse(sessionStorage.getItem('auth')).token}
        axios.get(requestURI, {headers})
        .then(response => {
            console.log("Getting Rates Data")
            let ratesData = response.data
            ratesData.sort((a, b) => parseInt(a.rate_index) - parseInt(b.rate_index));
            setRates(ratesData)
        })
        .catch(err => {
            console.log(err)
            //navigate('/')
        });
    }

    const clearValues = () => {
        setValues({
            rateIndex: 0,
            rateName: '',
            rate: 0,
            editing: false,
            _id: ''
        })
    }
    
    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }
    

    return (
        <>
        <div class="formStyle">
        <div class="container">
            <h1>Pay Grade Rates</h1>
            <div class="row">
                <div class="row">
                    <p>Please view all rates below.</p>
                </div>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Rate index</th>
                            <th>Rate name</th>
                            <th>Rate</th>
                        </tr>
                    </thead>
                    <tbody>
                    {rates.map(rate => (
                        <tr key={rate._id}>
                            <td>{rate.rate_index}</td>
                            <td>{rate.rate_name}</td>
                            <td>{rate.rate}</td>
                            <td><button className="btn btn-md btn-primary" onClick={() => {
                                setValues({
                                    _id: rate._id,
                                    editing: true,
                                    rateIndex: rate.rate_index,
                                    rateName: rate.rate_name,
                                    rate: rate.rate
                                })

                            }}>EDIT</button></td>
                            <td><button className="btn btn-md btn-primary" onClick={() => {
                                
                                var requestURI = "http://localhost:8000/api/rates"
                                let headers = {'Authorization': 'Bearer '+JSON.parse(sessionStorage.getItem('auth')).token}
                                console.log(headers)
                                console.log(rate)
                                axios.delete(requestURI, {headers: headers, data: rate})
                                .then(response => {
                                    console.log("Deleted Rate")
                                    // setRates(rates.filter(r =>
                                    //     r._id !== rate._id
                                    // ));
                                    getRatesData()
                                })
                            }}>DELETE</button></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
                <div className="row">
                    <div className="col colMidStyle colTopStyle colLeftStyle">
                    <label htmlFor="rateIndex">Rate Index</label>
                    </div>
                    <div className="col colMidStyle colTopStyle">
                    <label htmlFor="rateName">Rate Name</label>
                    </div>
                    <div className="col colTopStyle colMidStyle">
                    <label htmlFor="rate">Pay Rate</label>
                    </div>
                </div>
                <div className="row">
                    <div className="col colMidStyle colBotStyle colLeftStyle">
                    <input type="text"name="rateIndex" onChange={handleChange('rateIndex')} value={values.rateIndex}/>
                    </div>
                    <div className="col colMidStyle colBotStyle">
                    <input type="text" name="rateName" onChange={handleChange('rateName')} value={values.rateName}/>
                    </div>
                    <div className="col colBotStyle colMidStyle">
                    <input type="text" name="rate" onChange={handleChange('rate')} value={values.rate}/>
                    </div>
                </div>

                <button className="btn btn-md btn-primary" id="addRate" type="button" onClick={() => {
                                var requestURI = "http://localhost:8000/api/rates"
                                let headers = {'Authorization': 'Bearer '+JSON.parse(sessionStorage.getItem('auth')).token}
                                console.log(headers)
                                let data = {rate_index: values.rateIndex, rate_name: values.rateName, rate: values.rate}
                                console.log(data)
                                if (values.editing) {
                                    data['_id'] = values._id
                                    axios.put(requestURI, data, {headers})
                                    .then(response => {
                                        console.log("Updated Rate")
                                        getRatesData()
                                        clearValues()
                                    })
                                } else  {
                                    axios.post(requestURI, data, {headers})
                                    .then(response => {
                                        console.log("Added Rate")
                                        getRatesData()
                                        clearValues()
                                    })
                                }
                                
                            }}>{values.editing? 'Update Rate':'Add Rate'}</button>
                <br/><br/>
            
            </div>
        </div>
        </>
    );
    
}
