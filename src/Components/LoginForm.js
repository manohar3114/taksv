import React, { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import {useNavigate} from 'react-router-dom'
import { FaGooglePlus, FaFacebookF, FaInstagram } from "react-icons/fa";


import './index.css';

const LoginForm = () => {
    const navigate = useNavigate()
    const [isActive, setIsActive] = useState(false);
    const [loginInputs, setLoginInputs] = useState({
        email:'',
        password:'',
    })
    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(()=>{
        sessionStorage.clear();
            },[]);


    const validate = () => {
        let result = true;
        if (loginInputs.email === '' || loginInputs.email === null) {
            result = false;
            toast.warning('Please Enter email');
        }
        if (loginInputs.password === '' || loginInputs.password === null) {
            result = false;
            toast.warning('Please Enter Password');
        }
        return result;
    }

    const ProceedLogin = (e) => {
        e.preventDefault();
        if (validate()) {
            // const options = {
            //     method:'POST',
            //     headers:{'content-type':'application/json'},
            //     body:JSON.stringify(loginInputs)
            // }
            fetch(`http://localhost:8080/user/`)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error('Network response was not ok.');
                }
            })
            .then((data) => {
                
                const userFound = data.some((user) => ((user.email === loginInputs.email) && (user.password === loginInputs.password)));
                //console.log(userFound)
                if (!userFound) {
                    toast.error('Invalid email or password');
                    return;
                }
    
                else {
                    toast.success('Login successful');
                    sessionStorage.setItem('email', data.email);
                    sessionStorage.setItem('password', data.password);
                    navigate('/')
                }
            })
            .catch((err) => {
                toast.error('Login failed: ' + err.message);
            });
        }
    }


    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setInputs({
            ...inputs,
            [name]: value || ''
        });
        
    };

    const handleLoginChange =(event) => {
        const {name, value} = event.target;
        setLoginInputs({
            ...loginInputs,
            [name] : value || ''
        })
    }

    const handleInputBlur = (event) => {
        const { name } = event.target;

        validateField(name);
    };

    const validateField = (fieldName) => {
        if (!inputs[fieldName] && fieldName !== 'name') {
            setErrors({
                ...errors,
                [fieldName]: 'This field is required'
            });
        } 
    };

    const handleSignUp = (event) => {
        event.preventDefault();

        
        const newErrors = {};
    Object.keys(inputs).forEach((key) => {
        if (!inputs[key] && (key !== 'name' || !inputs['name'])) {
            newErrors[key] = 'This field is required';
        }
    });
    if (!inputs.password) {
        newErrors.password = 'Password is required';
    } else {
        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,12})/;
        if (!passwordRegex.test(inputs.password)) {
            newErrors.password = 'Password must have at least 8 characters, 1 capital letter, and 1 special character';
        }
    }

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error);

    if (!hasErrors) {
        const userObject = inputs
        fetch("http://localhost:8080/user", {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(userObject)
            }).then((res) => {
                toast.success('Registered successfully.')
                setIsActive(!isActive)
                setInputs({
                    name:'',
                    email:'',
                    password:'',
                })
            }).catch((err) => {
                toast.warning('Failed :' + err.message);
            });
        //console.log(userObject)
        }
    };

    return (
        <div className={isActive ? "container right-panel-active" : "container"}>
            <div className="form-container sign-up-container">
                <form  onSubmit={handleSignUp}>
                    <h1>Create Account</h1>
                    <div className="social-container">
                        <FaGooglePlus/>
                        <FaFacebookF />
                        <FaInstagram/>
                    
                    </div>
                    <span>or use your email for registration</span>
                    <input
                        type="text"
                        placeholder="Name"
                        value={inputs.name}
                        name="name"
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                    />
                    <span className="error">{errors.name}</span>
                    <input
                        type="email"
                        placeholder="Email"
                        value={inputs.email}
                        name="email"
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                    />
                    <span className="error">{errors.email}</span>
                    <input
                        type="password"
                        placeholder="Password"
                        value={inputs.password}
                        name="password"
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                    />
                    <span className="error">{errors.password}</span>
                    <button type='submit'>Sign Up</button>
                </form>
            </div>
            <div className="form-container sign-in-container">
                <form  onSubmit={ProceedLogin}>
                    <h1>Sign in</h1>
                    <div className="social-container">
                        <FaGooglePlus/>
                        <FaFacebookF />
                        <FaInstagram/>
                    </div>
                    <span>or use your account</span>
                    <input type="email"
                     name='email'
                     value={loginInputs.email}
                     onChange={handleLoginChange}
                     
                     placeholder="Email" />
                    <input type="password" placeholder="Password"
                    name='password' 
                    value={loginInputs.password}
                    onChange={handleLoginChange}
                     />
                    <a>Forgot your password?</a>
                    <button type='submit'>Sign In</button>
                </form>
            </div>
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1>Welcome Back!</h1>
                        <p>To keep connected with us please login with your personal info</p>
                        <button className="ghost" onClick={() => setIsActive(!isActive)}>Sign In</button>
                    </div>
                    <div className="overlay-panel overlay-right" >
                        <h1>Hello, Friend!</h1>
                        <p>Enter your personal details and start journey with us</p>
                        <button className="ghost" onClick={() => setIsActive(!isActive)}>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
