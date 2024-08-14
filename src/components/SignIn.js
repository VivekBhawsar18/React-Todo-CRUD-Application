import React from 'react'
import { NavLink } from 'react-router-dom';

const SignIn = () => {
  return (
    <div>
        <div className="container my-4">
            <div className="row justify-content-center">
                <div className="col-sm-6 col-md-4">
                    <h1 className="text-center mb-4">Welcome back</h1>
                    <form >
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="email" name='email'  placeholder="Enter your email" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" name='password' placeholder="Enter your password" minLength={8} required />
                        </div>
                        <button type="submit" className="btn btn-primary btn-full-width">Login</button>
                    </form>
                    <p className="text-center mt-4">Don't have an account?
                        <NavLink
                            className="nav-link"
                            activeclassname="active"
                            to="/sign-up"
                        >Sign up
                        </NavLink>
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SignIn
