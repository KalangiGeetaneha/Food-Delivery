import React, { useContext, useState } from 'react'
import './LoginPopUp.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../Context/StoreContext'
import axios from 'axios'

const LoginPopUp = ({ setshowLogin }) => {

    const { url, setToken } = useContext(StoreContext)

    const [currState, setCurrState] = useState("Login")

    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    // HANDLE INPUT CHANGE
    const onChangeHandler = (e) => {

        const name = e.target.name
        const value = e.target.value

        setData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    // LOGIN / REGISTER
    const onLogin = async (event) => {

        event.preventDefault()

        try {

            let newUrl = url

            if (currState === "Login") {
                newUrl += "/api/user/login"
            }
            else {
                newUrl += "/api/user/register"
            }

            const response = await axios.post(newUrl, data)

            if (response.data.success) {

                setToken(response.data.token)

                localStorage.setItem(
                    "token",
                    response.data.token
                )

                setshowLogin(false)

            } else {

                alert(response.data.message)
            }

        } catch (error) {

            console.log(error)

            alert("Something went wrong")
        }
    }

    return (

        <div className='login-popup'>

            <form
                onSubmit={onLogin}
                className="login-popup-container"
            >

                <div className="login-popup-title">

                    <h2>{currState}</h2>

                    <img
                        onClick={() => setshowLogin(false)}
                        src={assets.cross_icon}
                        alt=""
                    />

                </div>

                <div className="login-popup-input">

                    {currState === "Sign Up" && (

                        <input
                            type="text"
                            name='name'
                            placeholder='Your Name'
                            value={data.name}
                            onChange={onChangeHandler}
                            required
                        />
                    )}

                    <input
                        type="email"
                        name='email'
                        placeholder='Your Email'
                        value={data.email}
                        onChange={onChangeHandler}
                        required
                    />

                    <input
                        type="password"
                        name='password'
                        placeholder='Password'
                        value={data.password}
                        onChange={onChangeHandler}
                        required
                    />

                </div>

                <button type='submit'>

                    {currState === "Sign Up"
                        ? "Create Account"
                        : "Login"
                    }

                </button>

                <div className="login-popup-condition">

                    <input type="checkbox" required />

                    <p>
                        I agree to the terms and conditions
                    </p>

                </div>

                {currState === "Login"
                    ? (
                        <p>
                            Create a new account?

                            <span
                                onClick={() =>
                                    setCurrState("Sign Up")
                                }
                            >
                                Click here
                            </span>

                        </p>
                    )
                    : (
                        <p>
                            Already have an account?

                            <span
                                onClick={() =>
                                    setCurrState("Login")
                                }
                            >
                                Login here
                            </span>

                        </p>
                    )
                }

            </form>

        </div>
    )
}

export default LoginPopUp