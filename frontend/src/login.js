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
        <form class="formStyle">
            <div class="container">
            <div class="row">
                <h1 class="">Login/Register</h1>
                <p>Please login or register below.</p>
            </div>
            <div class="row">
                <div class="col rowStyle">
                <div class="row">
                    <h3 class="">Login</h3>
                    <label for="username">Username</label>
                    <input type="text" id="username" name="username" onChange={handleChange('username')}/>

                    <label for="password">Password</label>
                    <input class="space" type="password" id="password" name="password" onChange={handleChange('password')}/>
                    
                    <input type='submit' id="login" class="btn btn-md btn-primary" value="Login" onClick={login} />
                </div>
                </div>
                <div class="col rowStyle">
                <div class="row">
                    <h3 class="">Register</h3>
                    <label for="name">Name</label>
                    <input type="text" id="name" name="name" onChange={handleChange('name')}/>
                    <label for="username_reg">Username</label>
                    <input type="text" id="username_reg" name="username_reg" onChange={handleChange('username_reg')}/>

                    <label for="password_reg">Password</label>
                    <input class="space" type="password" id="password_reg" name="password_reg" onChange={handleChange('password_reg')}/>
                    <input type='submit' id="register" class="btn btn-md btn-primary" value="Register" onClick={register}/>
                </div>
                </div>
                
            </div>


            </div>
        </form>
    );
}