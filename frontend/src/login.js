import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { setAuthBool } from './authslice'
import { setAdminBool, unsetAdminBool } from './adminslice'

// Login/Register page
export default function Login() {
    const dispatch = useDispatch()
    let navigate = useNavigate()
    
    const [values, setValues] = useState({
        name: '',
        password_reg: '',
        username_reg: '',
        password: '',
        username: '',
        open: false,
        registered: false
    });
    const [error, setError] = useState('')
    
    // Handle textbox/input changes to save to state, replacing unneeded characters using regular expressions seperating password, username and name fields
    const handleChange = name => event => {
        if (name[0] === 'p') setValues({...values, [name]: event.target.value.replace(/[^\w\s!@#?$%^&*]{0,25}$/, "") })
        else if (name[0] === 'u') setValues({...values, [name]: event.target.value.replace(/[^\w]/, "") })
        else setValues({...values, [name]: event.target.value.replace(/[^A-Za-z\s]/, "") })
    }

    // Button handler for registering, post data to database and receive confirmation or error
    const register = (e) =>  {
        e.preventDefault();
        console.log("Signing up")
        let data = {"name": values.name, "username": values.username_reg, "password" : values.password_reg}
        var requestURI = "http://localhost:8000/api/users"
        console.log(requestURI)
        console.log(data)
        axios.post(requestURI, data)
        .then(response => {
            setValues({
                name: '',
                password_reg: '',
                username_reg: '',
                password: '',
                username: '',
                open: true,
                registered: true
            });
            setError('')
        })
        .catch(err => {
            console.log(err.response.data.error)
            setError(err.response.data.error)
            setValues({...values,open:true, registered:false})
        })
    }

    // Button handler for login, post data to database and receive confirmation or error
    const login = (e) =>  {
        e.preventDefault();
        console.log("Logging in")
        let data = {"username": values.username, "password" : values.password}
        var requestURI = "http://localhost:8000/auth/signin"
        console.log(requestURI)
        axios.post(requestURI, data)
        .then(response => {
            console.log("Setting JWT in storage")
            let user = JSON.stringify(response.data)
            sessionStorage.setItem('auth', user);
            dispatch(setAuthBool())
            if (JSON.parse(user).user.is_admin == true) dispatch(setAdminBool())
            else dispatch(unsetAdminBool())
            navigate('/')
            })
        .catch(err => {
            console.log(err.response.data.error)
            setValues({...values,open:true})
            setError(err.response.data.error)
        });
        
    }
    
    return (
        <form className="formStyle">
            <div className="container">
                <div className="row">
                    <h1 className="">Login/Register</h1>
                    <p>Please login or register below.</p>
                </div>
                <div className="row" hidden={(!values.open)?"hidden":""}>
                    <p hidden={(error === '')?'hidden':''} className='error'>Error: {error}</p>
                    <h3 hidden={(!values.registered)? 'hidden': ''} className="">You have been registered, please login below:</h3>
                </div>
                <div className="row">
                    <div className="col rowStyle">
                    <div className="row">
                        <h3 className="">Login</h3>
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" name="username" onChange={handleChange('username')} value={values.username}/>

                        <label htmlFor="password">Password</label>
                        <input className="space" type="password" id="password" name="password" onChange={handleChange('password')} value={values.password}/>
                        
                        <input type='submit' id="login" className="btn btn-md btn-primary" value="Login" onClick={login} />
                    </div>
                    </div>
                    <div className="col rowStyle">
                    <div className="row">
                        <h3 className="">Register</h3>
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" onChange={handleChange('name')} value={values.name}/>
                        <label htmlFor="username_reg">Username</label>
                        <input type="text" id="username_reg" name="username_reg" onChange={handleChange('username_reg')}value={values.username_reg}/>

                        <label htmlFor="password_reg">Password</label>
                        <input className="space" type="password" id="password_reg" name="password_reg" onChange={handleChange('password_reg')} value={values.password_reg}/>
                        <input type='submit' id="register" className="btn btn-md btn-primary" value="Register" onClick={register}/>
                    </div>
                    </div>
                </div>
            </div>
        </form>
    );
}