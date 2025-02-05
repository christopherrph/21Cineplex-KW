import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import home from './Pages/home';
import login from './Pages/login';
import register from './Pages/register';
import moviedetails from './Pages/moviedetails';
import managemovies from './Pages/managemovies';
import seatreservation from './Pages/seatreservation';
import addmovies from './Pages/addmovies';
import contact from './Pages/contact';
import editmovie from './Pages/editmovie';
import profile from './Pages/profile';
import profil from './Pages/profil';
import transactions from './Pages/transactions';
import notfound from './Pages/notfound';
import user from './Pages/user';
import feedback from './Pages/feedback';
import history from './Pages/history';
import Header from './Components/header';
import Footer from './Components/footer';
import Axios from 'axios';
import {signin} from './Redux/Action'
import {connect} from 'react-redux';




class App extends Component{

  componentDidMount(){
    var username = localStorage.getItem('username');
    if(username != null){
      Axios.get(`http://localhost:2000/login?username=${username}`)
        .then((res) =>  {
          this.props.signin(username, res.data[0].password)
          })
    }
  }

  render(){
    return(
      <div>
        <Header/>
        <Switch>
        <Route path='/' component={home} exact />
        <Route path='/login' component={login} />
        <Route path='/register' component={register} />
        <Route path='/moviedetails' component={moviedetails} />
        <Route path='/managemovies' component={managemovies} />
        <Route path='/seatreservation' component={seatreservation} />
        <Route path='/addmovies' component={addmovies} />
        <Route path='/editmovie' component={editmovie} />
        <Route path='/profile' component={profile} />
        <Route path='/contact' component={contact} />
        <Route path='/transactions' component={transactions} />
        <Route path='/profil' component={profil} />
        <Route path='/user' component={user} />
        <Route path='/feedback' component={feedback} />
        <Route path='/history' component={history} />
        <Route path='*' component={notfound}/>
        </Switch>
        <Footer/>
      </div>  
    )
  }
}

export default connect(null,{signin})(App);
