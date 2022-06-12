import axios from 'axios';
import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from '../components/About';
import Forget from '../components/Forget';
import Home from '../components/Home';
import Login from '../components/Login';
import Profile from '../components/Profile';
import Register from '../components/Register';
import Reset from '../components/Reset';
import Nav from './Nav';

class Header extends Component {

  
  state ={ 
    userData:{}
}


componentDidMount(){
    axios.get('/user-data').then((response) => {
        this.setUser(response.data)
    }).catch((error) => {
        console.log(error);
    });
}

setUser = (user) =>{
    this.setState({userData:user})
}


  render() {
    return (
      <Fragment>
          <Router>
          <Nav  user={this.state.userData} setUser={this.setUser} />
            <Routes>
                <Route exact path='/' element = { <Home />} />
                <Route exact path='/about' element={ <About /> }/>
                <Route exact path='/profile' element={ <Profile user={this.state.userData} /> }/>
                <Route exact path='/login' element = { <Login user={this.state.userData} setUser={this.setUser} />} />
                <Route exact path='/register' element = { <Register user={this.state.userData} setUser={this.setUser} />} />
                <Route exact path='/reset/:id' element = { <Reset />} />
                <Route exact path='/forget' element = { <Forget />} />
            </Routes>
          </Router>
      </Fragment>
    )
  }
}

export default Header;
