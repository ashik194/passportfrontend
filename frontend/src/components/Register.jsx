import axios from 'axios';
import React, { Component } from 'react'
import {Link, Navigate} from 'react-router-dom';

class Register extends Component {
    state ={ 
        name:'',
        email:'',
        password:'',
        password_confirmation:'',
    }

    formSubmit = (e) => {
        e.preventDefault();
        const data = {
            name:this.state.name,
            email:this.state.email,
            password:this.state.password,
            password_confirmation:this.state.password_confirmation,
        }
        
        axios.post('/register', data).then((response) => {
            localStorage.setItem('token',response.data.token);
            this.setState({
                loggedIn:true
            })
            this.props.setUser(response.data.user);
        }).catch((error) => {
            console.log(error);
        });
    }


  render() {

        if(this.state.loggedIn){
            return <Navigate to={'/profile'} />
        }

    return (
      <>
      <div className="jumbotron col-lg-4 offset-lg-4 mt-4 p-5 bg-primary text-white rounded">
            <h1 className='text-center'>Register</h1>

            <form onSubmit={this.formSubmit}>
                <div className="mb-3">
                    <label htmlFor="" className="form-label">User Name</label>
                    <input type="text" name='name' className="form-control" onChange={(e) => {this.setState({name:e.target.value})}} />
                </div>
                <div className="mb-3">
                    <label htmlFor="" className="form-label">Email address</label>
                    <input type="email" name='email' className="form-control" onChange={(e) => {this.setState({email:e.target.value})}} />
                </div>
                <div className="mb-3">
                    <label htmlFor="" className="form-label">Password</label>
                    <input type="password" name='password' className="form-control" onChange={(e) => {this.setState({password:e.target.value})}} />
                </div>

                <div className="mb-3">
                    <label htmlFor="" className="form-label">Confirm Password</label>
                    <input type="password" name='password_confirmation' className="form-control" onChange={(e) => {this.setState({password_confirmation:e.target.value})}} />
                </div>

                <button type="submit" className="btn btn-success btn-block fw-bold fs-3">Register</button>
                <br />
                Have an account? <Link to="/login" className='text-info'>Click Here</Link>
            </form>
            
        </div>
      </>
    )
  }
}

export default Register