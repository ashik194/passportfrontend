import axios from 'axios';
import React, { Component } from 'react'
import {Link} from 'react-router-dom';

class Forget extends Component {
    state={
        email:'',
        message:''
    }

    formSubmit = (e) => {
        e.preventDefault();
        const data = {
            email:this.state.email,
        }
        
        axios.post('/forgetpassword', data).then((response) => {
           this.setState({message:response.data.message})
            document.getElementById('forgetForm').reset();
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
        <div className="jumbotron col-lg-4 offset-lg-4 mt-4 p-5 bg-primary text-white rounded">
        <h1 className='text-center'>Forget Password</h1>

        <form onSubmit={this.formSubmit} id="forgetForm">
            {error}
            <div class="mb-3">
                <label for="" class="form-label">Email address</label>
                <input type="email" class="form-control" name='email' required onChange={(e) => {this.setState({email:e.target.value})}}/>
            </div>

            <button type="submit" class="btn btn-success btn-block fw-bold fs-3">Submit</button>
            <br />
            Have an account? <Link to="/login" className='text-info'>Click Here</Link>
            <br />
            Don't have account? <Link to="/register" className='text-info'>Register</Link>
        </form>
        
    </div>
    )
  }
}

export default Forget