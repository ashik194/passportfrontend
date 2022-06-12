import axios from 'axios';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class Reset extends Component {
      state ={ 
        token:'',
        email:'',
        password:'',
        password_confirmation:'',
    }

    formSubmit = (e) => {
        e.preventDefault();
        const data = {
            token:this.state.token,
            email:this.state.email,
            password:this.state.password,
            password_confirmation:this.state.password_confirmation,
        }
        
        axios.post('/resetpassword', data).then((response) => {
            this.setState({message:response.data.message})
            document.getElementById('resetForm').reset();
        }).catch((error) => {
          this.setState({message:error.response.data.message})
        });
    }
  render() {

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
            <h1 className='text-center'>Password Reset</h1>

            <form onSubmit={this.formSubmit} id="resetForm" >
              {error}
                <div className="mb-3">
                    <label htmlFor="" className="form-label">Pin Code</label>
                    <input type="text" name='token' className="form-control" onChange={(e) => {this.setState({token:e.target.value})}} />
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

                <button type="submit" className="btn btn-success btn-block fw-bold fs-3">Reset Password</button>
                <br />
                Have an account? <Link to="/login" className='text-info'>Click Here</Link>
            </form>
            
        </div>
      </>
    )
  }
}

export default Reset