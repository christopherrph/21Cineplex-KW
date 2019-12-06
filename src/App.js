import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import home from './Pages/home';
import login from './Pages/login';
import register from './Pages/register';
import Header from './Components/header';
import Footer from './Components/footer';
import Axios from 'axios';
import {signin} from './Redux/Action'
import {connect} from 'react-redux';




class App extends Component{

  componentDidMount(){
    var username = localStorage.getItem('username');
    console.log(username)
    if(username != null){
      Axios.get(`http://localhost:2000/login?username=${username}`)
        .then((res) =>  {
          this.props.signin(res.data[0])
          })
    }
  }

  render(){
    return(
      <div>
        <Header/>
        <Route path='/' component={home} exact />
        <Route path='/login' component={login} />
        <Route path='/register' component={register} />
        <Footer/>
      </div>  
    )
  }
}

export default connect(null,{signin})(App);
