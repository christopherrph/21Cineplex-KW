import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../App.css';
import {connect} from 'react-redux' // Harus ada untuk akses global state
import Carousel from '../Components/Carousel'
import Axios from 'axios';
import {signin} from '../Redux/Action'
import { Redirect } from 'react-router-dom'


class register extends Component {

    state={
        
    }

    componentDidMount(){
      } 


    checkpassword = (str) =>{
        if (str.length <= 8) {
          return(false);
        }else if (str.search(/\d/) == -1) {
          return(false);
        } else if (str.search(/[a-zA-Z]/) == -1) {
          return(false);
        }
        return(true);
    }

    register = () =>{
        var email = this.refs.email.value
        var username = this.refs.username.value
        var password = this.refs.password.value
        var repassword = this.refs.repassword.value
        if(email && username && password && repassword){
            if(password == repassword){
              if(this.checkpassword(password)){
                Axios.get(`http://localhost:2000/login?username=${username}`) // Get dari akun yang username sm passwordnya sesuai
               .then((res) =>  {
                if(res.data.length === 0){
                    Axios.get(`http://localhost:2000/login?email=${email}`) // Get dari akun yang username sm passwordnya sesuai
                    .then((res) =>  {
                     if(res.data.length === 0){
                        Axios.post('http://localhost:2000/login',{
                            username: username,
                            password: password,
                            email: email,
                            role:'user'
                          })
                          .then((res) => {
                            console.log(res.data);
                            alert("Register Success")
                            this.setState({ redirect: true })
                          })
                     }else{
                       alert('Email Taken')
                     } 
                   })
                }else{
                  alert('Username Taken')
                } 
              })
              }else{
                alert('Invalid Password')
              }
            }else{
            alert('Password Did Not Match')
            }
        }else{
            alert('Please Fill In The Form')
        }
    }

    render() { 
    const { redirect } = this.state;
     if (redirect) {
       return <Redirect to='/login'/>;
     }

        return (
            <div>
                <br/>
                <div class="form-signin loginform">
                    <h1 class="h3 mb-3 font-weight-normal">Register</h1>
                    <center>
                    <label for="inputEmail" class="sr-only">Email</label>
                    <input type="email" id="inputan" class="form-control" placeholder="Email" ref='email' required/>
                    <br/>
                    <label for="inputEmail" class="sr-only">Username</label>
                    <input type="text" id="inputan" class="form-control" placeholder="Username" ref='username' required/>
                    <br/>
                    <label for="inputPassword" class="sr-only">Password</label>
                    <input type="password" id="inputan" class="form-control" placeholder="Password" ref='password' required/>
                    <br/>
                    <label for="inputPassword" class="sr-only">Re-Type Password</label>
                    <input type="password" id="inputan" class="form-control" placeholder="Re-Type Password" ref='repassword' required/>
                    </center>
                    <br/>
                    <p style={{fontSize:12, marginTop:-20, marginBottom:30}}>Password must be more than 8 characters and contains a number</p>
                    <p>Already have an account? <Link to='/login' className='registerhere'>sign in here</Link></p>
                    <button onClick={this.register} class="btn btn-lg btn-primary btn-block btn21" style={{width:300, marginLeft:200, backgroundColor:'#006563', border:'none'}} type="submit">Register</button>
                    <p class="mt-5 mb-3 text-muted">&copy; 2019</p>
                </div>
            </div>
          );
    }
}
 
export default (register);