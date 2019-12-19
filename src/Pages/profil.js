import React, { Component } from 'react';
import Axios from 'axios';
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'

class profil extends Component {
    state = { 
        profile:[],
        detail:[]
     }

    componentDidMount(){
        var id = window.location.pathname;
        id = id.replace('/profil/', '')
        console.log(id)
        var iduser = localStorage.getItem('id');
        if(iduser != id ){
            this.setState({ redirect: true })
        }
        Axios.get(`http://localhost:2000/login/${id}`)
        .then((res) =>  {
            this.setState({
                profile:res.data
            })
            console.log(res.data)
                Axios.get(`http://localhost:2000/transaction?username=${this.state.profile.username}&status=Paid`)
                .then((res) =>  {
                    console.log(res.data)
                    this.setState({
                        detail:res.data,
                    })
                    console.log(res.data)
                })
        })
    }

    ConvertSeat = (arr) =>{
        var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
        console.log(arr)
        console.log(arr.length)
        var output = ''
        var row, nomor, huruf;
        for(var i=0; i<arr.length; i++){
            console.log(i)
            row = arr[i][0]
            nomor = (arr[i][1])+1
            huruf = alphabet[row]
            output += `${huruf}${nomor} `  
        }
        return output
    }

    RenderOnGoing = () =>{
        return this.state.detail.map((val, index) =>{
            return(
                <tr>
                    <td>{index+1}</td>
                    <td>{val.movies}</td>
                    <td>{val.ticket_amount}</td>
                    <td>{this.ConvertSeat(val.seat)}</td>
                    <td>Rp. {(val.totalprice).toLocaleString()}</td>
                    <td>{val.orderdate}</td>
                </tr>
            )
        })
    }

    changepassword = () =>{
        var oldpass = this.refs.oldpass.value
        var newpass = this.refs.newpass.value
        var renewpass = this.refs.renewpass.value

        if(oldpass && newpass && renewpass){
            if(oldpass == this.state.profile.password){
                if(newpass == renewpass){
                    Axios.patch(`http://localhost:2000/login/${this.state.profile.id}`,{password:newpass})
                    .then((res)=>{
                        alert('Password Change Succesfull')
                        document.getElementById('oldpass').value = ''
                        document.getElementById('newpass').value = ''
                        document.getElementById('renewpass').value = ''
                    })
                }else{
                    alert('New Password Did Not Match')
                }
            }else{
                alert('Old Password Did Not Match')
            }
        }else(
            alert('Please Dont Leave Form Empty')
        )

    }

    render() { 
    const { redirect } = this.state;
     if (redirect) {
       return <Redirect to='/error-bwek-bwek-bwek'/>;
     }
        return ( 
                <section id="tabs" class="project-tab" style={{marginBottom:-30}}>
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12">
                                <nav>
                                    <div class="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                                        <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">My Profile</a>
                                        <a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Change Password</a>
                                        <a class="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Booking History</a>
                                    </div>
                                </nav>
                                <div class="tab-content" id="nav-tabContent">

                                    <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                        <center><h3 style={{marginTop:20,marginBottom:20}}>My Profile</h3>
                                        <hr/>
                                        <div class="form-group">
                                            <label for="exampleInputEmail1">Username</label>
                                            <input type="text" class="form-control" defaultValue={this.state.profile.username} style={{width:500}} id="exampleInputEmail1" aria-describedby="emailHelp" disabled/>
                                        </div>
                                        <div class="form-group">
                                            <label for="exampleInputEmail1">Email address</label>
                                            <input type="text" class="form-control" defaultValue={this.state.profile.email} style={{width:500}} id="exampleInputEmail1" aria-describedby="emailHelp" disabled/>
                                        </div>
                                        </center>
                                    </div>


                                    <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                                        <center><h3 style={{marginTop:20, marginBottom:20}}>Change Password</h3>
                                        <hr/>
                                        <div class="form-group">
                                            <label for="exampleInputEmail1">Old Password</label>
                                            <input type="password" class="form-control" style={{width:500}} ref='oldpass' aria-describedby="emailHelp" id='oldpass'/>
                                        </div>
                                        <div class="form-group">
                                            <label for="exampleInputEmail1">New Password</label>
                                            <input type="password" class="form-control" style={{width:500}} ref='newpass' aria-describedby="emailHelp" id='newpass'/>
                                        </div>
                                        <div class="form-group">
                                            <label for="exampleInputEmail1">Re-Type New Password</label>
                                            <input type="password" class="form-control" style={{width:500}} ref='renewpass' aria-describedby="emailHelp" id='renewpass'/>
                                        </div>
                                        <button className='btn btn21' onClick={this.changepassword}> Submit</button>
                                        </center>
                                    </div>


                                    <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                                    <center>
                                    <h3 style={{marginTop:20}}>Booking History</h3>
                                    <table class="table" style={{width:800, marginTop:10,marginBottom:60}}>
                                        <thead class="thead" style={{backgroundColor:'#006563', color:'white'}}>
                                            <tr>
                                            <th scope="col">No</th>
                                            <th scope="col">Movie</th>
                                            <th scope="col">Amount</th>
                                            <th scope="col">Seat Number</th>
                                            <th scope="col">Total</th>
                                            <th scope="col">Order Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.RenderOnGoing()}
                                        </tbody>
                                    </table>
                                    </center>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
         );
    }
}

const mapStateProps = (state) =>{ // Function yang akan terima global state
    return{
      nama: state.user.username, //state.user(merujuk ke index.js reducer).username(masuk ke global state di authReducer)
      id: state.user.id
    }
}
 
export default connect(mapStateProps)(profil);