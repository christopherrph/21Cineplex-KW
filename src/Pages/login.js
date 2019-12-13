import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../App.css';
import {connect} from 'react-redux' // Harus ada untuk akses global state
import Carousel from '../Components/Carousel'
import Axios from 'axios';
import {signin} from '../Redux/Action'
import { Redirect } from 'react-router-dom'


class login extends Component {

    state={
        
    }

    componentDidMount(){
      } 

    login = () =>{
        var username = this.refs.username.value
        var password = this.refs.password.value
        if(username == '' || password == ''){
        alert('Please Fill In The Form')
        }else{
        Axios.get(`http://localhost:2000/login?username=${username}&password=${password}`) // Get dari akun yang username sm passwordnya sesuai
        .then((res) =>  {
            console.log(res.data)
            if(res.data.length === 0){
            alert('Wrong Username or Password')
            }else{
            localStorage.setItem('username', username)
            this.props.signin(username, password)
            this.setState({ redirect: true })
            } 
        })
      }}

    render() { 
    const { redirect } = this.state;
     if (redirect) {
       return <Redirect to='/'/>;
     }

        return (
            <div>
                <br/>
                <div class="form-signin loginform">
                    <h1 class="h3 mb-3 font-weight-normal">Sign In</h1>
                    <center>
                    <label for="inputEmail" class="sr-only">Username</label>
                    <input type="email" id="inputan" class="form-control" placeholder="Username" ref='username' required/>
                    <br/>
                    <label for="inputPassword" class="sr-only">Password</label>
                    <input type="password" id="inputan" class="form-control" placeholder="Password" ref='password' required/>
                    </center>
                    <br/>
                    <p>Dont have an account? <Link to='/register' className='registerhere'>register here</Link></p>
                    <button onClick={this.login} class="btn btn-lg btn-primary btn-block btn21" style={{width:300, marginLeft:200, backgroundColor:'#006563', border:'none'}} type="submit">Sign in</button>
                    <p class="mt-5 mb-3 text-muted">&copy; 2019</p>
                </div>
            </div>
          );
    }
}
 
export default connect(null,{signin})(login);