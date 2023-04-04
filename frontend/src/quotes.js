import { Link, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux'
import { getAuthBool } from "./reduxslice";
import React, {useEffect, useState} from 'react'
import axios from "axios";


//class Quotes extends React.Component {
    
export default function Quotes() {    
    const [quotes, setQuotes] = useState(
        []
    );
    const navigate = useNavigate()
    var loggedIn
    if (sessionStorage.getItem('auth')) loggedIn = true //useSelector(getAuthBool)
    else loggedIn = false
    console.log(loggedIn)
    

    const getQuoteData = (e) => {
        var requestURI = "http://localhost:8000/api/quote"
        let headers = {'Authorization': 'Bearer '+JSON.parse(sessionStorage.getItem('auth')).token}
        axios.get(requestURI, {headers})
        .then(response => {
            console.log("Getting Quote Data")
            let quoteData = response.data
            console.log(quoteData)
            console.log(Object.keys(quoteData[0]))
            console.log(Object.values(quoteData[0]))
            setQuotes(quoteData)
            
            
        })
    }

    // Effectively the same as componentDidMount (https://stackoverflow.com/a/58101332)
    useEffect(()=>{
        getQuoteData();
    }, [])
    

    return (
        <>
        <div class="container formStyle">
            <h1>Quotes</h1>
            <div class="row">
            {!loggedIn? (
                <div class="row">
                    <p>To save a quote that has been generated and view saved quotes you must login or register an account before creating a quote.</p>
                    <p>However you can still generate a quote without needing an account by following the below instructions.</p>
                </div>):(
                <div>
                    <div class="row">
                        <p>Please view all you saved quotes below.</p>
                    </div>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Quote Name</th>
                                <th>Final Budget</th>
                                <th>Created</th>
                            </tr>
                        </thead>
                        <tbody>
                        {quotes.map(quote => (
                            <tr key={quote._id}>
                                <td>{quote.quote_name}</td>
                                <td>{quote.final_budget}</td>
                                <td>{new Date(quote.created).toUTCString()}</td>
                                <td><button className="btn btn-md btn-primary" onClick={() => {
                                    sessionStorage.setItem("quote", JSON.stringify(quote))
                                    navigate('/createQuote')
                                }}>EDIT</button></td>
                                <td><button className="btn btn-md btn-primary" onClick={() => {
                                    
                                    var requestURI = "http://localhost:8000/api/quote"
                                    let headers = {'Authorization': 'Bearer '+JSON.parse(sessionStorage.getItem('auth')).token}
                                    console.log(headers)
                                    console.log(quote)
                                    axios.delete(requestURI, {headers: headers, data: quote})
                                    .then(response => {
                                        console.log("Deleted Quote")
                                        setQuotes(quotes.filter(q =>
                                            q._id !== quote._id
                                        ));
                                    })
                                }}>DELETE</button></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
          
          </div>
            <div class="row">
                <label for="login">To create your own Quote please click the button below:</label><br/>
                <Link class="btn btn-md btn-primary" to='/createQuote'>Create Quote</Link>
                {/* <a role="button" href="createQuote" id="createQuote" class="btn btn-md btn-primary">Create Quote</a> */}
            </div>
        </div>
        </>
    );
    
}
