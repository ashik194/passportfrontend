import React, { Component } from 'react'
import {Link, Navigate} from 'react-router-dom'
import axios from 'axios';

class Login extends Component {
    state={
        email:'',
        password:'',
        message:''
    }

    formSubmit = (e) => {
        e.preventDefault();
        const data = {
            email:this.state.email,
            password:this.state.password,
        }
        
        axios.post('/login', data).then((response) => {
            localStorage.setItem('token',response.data.token);
            this.setState({
                loggedIn:true
            })
            this.props.setUser(response.data.user);
        }).catch((error) => {
            this.setState({message:error.response.data.message})
        });
    }


  render() {
      if(this.state.loggedIn){
          return <Navigate to={'/profile'} />
      }

      if(localStorage.getItem('token')){
          return <Navigate to="/profile" />
      }
      let error="";
      if(this.state.message){
        error=(
            <div>
                <div className="alert alert-danger" role="alert">
                    {this.state.message}
                </div>
            </div>
        )
      }

    return (
      <>
        <div className="jumbotron col-lg-4 offset-lg-4 mt-4 p-5 bg-primary text-white rounded">
            <h1 className='text-center'>Login</h1>

            <form onSubmit={this.formSubmit}>
                {error}
                <div className="mb-3">
                    <label htmlFor="" className="form-label">Email address</label>
                    <input type="email" name='email' className="form-control" required onChange={(e) => {this.setState({email:e.target.value})}} />
                </div>
                <div className="mb-3">
                    <label htmlFor="" className="form-label">Password</label>
                    <input type="password" name='password' className="form-control" required onChange={(e) => {this.setState({password:e.target.value})}}/>
                </div>

                <button type="submit" className="btn btn-success btn-block fw-bold fs-3">Login</button>
                <br />
                Forget Password <Link to="/forget" className='text-info'>Click Here</Link>
                <br />
                Don't have account? <Link to="/register" className='text-info'>Register</Link>
            </form>
            
        </div>
      </>
    )
  }
}

export default Login