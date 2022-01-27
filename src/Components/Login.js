import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'
const URL = "http://localhost:3001/calci"
var mailformat = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
var passformat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const bcrypt = require('bcryptjs')
export const Login = () => {
    const navigate = useNavigate()
    const [values, setValues] = useState({
        email: "",
        password: ""
    })

    const [login, setlogin] = useState([])
    const [flag, setflag] = useState(false)
    const [errors, setErrors] = useState({})

    const [isSubmit, setisSubmit] = useState(false)

    const handler = (event) => {
        const { name, value } = event.target
        setValues({ ...values, [name]: value })
    }

    useEffect(() => {
        axios.get(URL)
            .then(res => {
                console.log(res.data)
                setlogin(res.data)
            })
    }, [])

    const submit = (event) => {
        event.preventDefault();
        setErrors(validate(values))
        setisSubmit(true)
        var data = false;

        login.forEach(user => {
            const doesPasswordMatch = bcrypt.compareSync(values.password, user.password)
            console.log(values.password, doesPasswordMatch);
            console.log(values.email,values.password)
            if (user.email === values.email && doesPasswordMatch) {
                let arr = user
                if (localStorage.getItem('mycart') !== undefined) {
                    localStorage.setItem('mycart', JSON.stringify(arr))
                }

                alert('login succesfully');
                setflag(true)

                data = true;
                return

            }

        });
        if (data !== true) {
            alert('Email id or password is incorrect');
            setflag(false)
        }
    }

    const validate = (values) => {
        const errors = {}
        if (!values.email) {
            errors.email = "Email required";
        }
        else if (!mailformat.test(values.email)) {
            errors.email = "invalid email";
        }

        if (!values.password) {
            errors.password = "password required"; 
        }
        else if (!passformat.test(values.password)) {
            errors.password = "invalid password";
        }

        return errors;


    }
    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmit) {
            console.log(values)
        }
    }, [errors])
    return (
        <div>
            <div className="section">
                <div className="contentBx1">
                    <div className="formBx1">
                        <h2>Login Form</h2>
                        <form >
                            <div className="inputBx1">
                                <span>Email</span>
                                <input
                                    type="email"
                                    placeholder="Email "
                                    className="form-control"
                                    name="email"
                                    id="email"
                                    value={values.email}
                                    onChange={handler}
                                ></input>
                                {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
                            </div>
                            <div className="inputBx1">
                                <span>Password</span>
                                <input
                                    type="password"
                                    placeholder="password "
                                    className="form-control"
                                    name="password"
                                    id="password"
                                    value={values.password}
                                    onChange={handler}
                                ></input>
                                {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}

                            </div>

                            <div className="inputBx1">
                                <button type="submit" value="submit"
                                    id="submit" onClick={submit}>Log in</button>
                                <br></br>

                            </div>

                            <div className="inputBx">
                                Are you new here ? 
                                <Link to='/register' style={{ color: '#a8328d' }} > Sign up</Link>
                            </div>

                        </form>
                        <h3 className="heading12">Login with social media</h3>
                        <ul class="sci">
                            <li><img src="f.png" alt="facebook"
                                className="facebook" /></li>
                                <li><img src="g.png" alt="google"
                                className="google" /></li>
                            {/* <li><img src="twitter.png" alt="twitter" className="twitter" /></li> */}
                            {/* <li><img src="instagram.png" alt="instagram" className="instagram" /></li> */}
                        </ul>
                    </div>
                </div>
                {/* <div className="imgBx1">
                    <img src="" width="200px" height="200px" alt="blg" />
                </div> */}
            </div>



            {flag ? navigate('/home') : null}
        </div>
    )
}


