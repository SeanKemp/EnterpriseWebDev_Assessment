import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export default function Login() {
    let navigate = useNavigate()
    
    const [values, setValues] = useState({
        name: '',
        password_reg: '',
        username_reg: '',
        password: '',
        username: '',
        open: false,
        error: ''
    });
    
    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }

    const register = (e) =>  {
        e.preventDefault();
        console.log("Signing up")
        let data = {"name": values.name, "username": values.username_reg, "password" : values.password_reg}
        var requestURI = "http://localhost:8000/api/users"
        console.log(requestURI)
        axios.post(requestURI, data)
        
    }

    const login = (e) =>  {
        e.preventDefault();
        console.log("Logging in")
        let data = {"username": values.username, "password" : values.password}
        var requestURI = "http://localhost:8000/auth/signin"
        console.log(requestURI)
        //console.log(data)
        axios.get(requestURI, data)
        axios.post(requestURI, data)
        .then(response => {
            console.log("Setting JWT in storage")
            sessionStorage.setItem('auth', JSON.stringify(response.data));
            navigate('/')
            })
        .catch(err => {
            console.log(err)
        });
        
    }
    
    
    return (
        <form className="formStyle">
            <div className="container">
            <div className="row">
                <h1 className="">Login/Register</h1>
                <p>Please login or register below.</p>
            </div>
            <div className="row">
                <div className="col rowStyle">
                <div className="row">
                    <h3 className="">Login</h3>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" onChange={handleChange('username')}/>

                    <label htmlFor="password">Password</label>
                    <input className="space" type="password" id="password" name="password" onChange={handleChange('password')}/>
                    
                    <input type='submit' id="login" className="btn btn-md btn-primary" value="Login" onClick={login} />
                </div>
                </div>
                <div className="col rowStyle">
                <div className="row">
                    <h3 className="">Register</h3>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" onChange={handleChange('name')}/>
                    <label htmlFor="username_reg">Username</label>
                    <input type="text" id="username_reg" name="username_reg" onChange={handleChange('username_reg')}/>

                    <label htmlFor="password_reg">Password</label>
                    <input className="space" type="password" id="password_reg" name="password_reg" onChange={handleChange('password_reg')}/>
                    <input type='submit' id="register" className="btn btn-md btn-primary" value="Register" onClick={register}/>
                </div>
                </div>
                
            </div>


            </div>
        </form>
    );
}