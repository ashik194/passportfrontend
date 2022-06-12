import React, { Component } from 'react'
import { Navigate } from 'react-router-dom';

class Profile extends Component {

  render() {
      if(!localStorage.getItem('token')){
          return <Navigate to="/login" />
      }
      let name;
      let email;
      if(this.props.user){
          name = this.props.user.name;
          email = this.props.user.email;
      }
    return (
      <>
        <div className="jumbotron col-lg-4 offset-lg-4 mt-4 p-5 bg-primary text-white rounded">
            <h1 className='text-center'>Profile</h1>

            <ul className='list-group'>
                <li className='list-group-item'>Name: {name}</li>
                <li className='list-group-item'>Email: {email}</li>
            </ul>
            
        </div>
      </>
    )
  }
}

export default Profile