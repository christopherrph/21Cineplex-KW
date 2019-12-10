import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../App.css';
import {connect} from 'react-redux' // Harus ada untuk akses global state
import Carousel from '../Components/Carousel'
import Axios from 'axios';
import { Redirect } from 'react-router-dom'


class moviedetails extends Component {

    state={   
        detail:[
            {
            }
        ]
    }

    componentDidMount(){
    var id = window.location.pathname;
    id = id.replace('/moviedetails/', '')  
    console.log(id)
    Axios.get(`http://localhost:2000/movies?id=${id}`)
    .then((res) =>  {
        this.setState({detail:res.data})  // Memasukkan dari 'axios.get' kedalam array dataa dalam state
        console.log(this.state.detail[0].casts)
        console.log(this.state.detail[0].casts.join(', '))
        document.getElementById('genre').innerHTML = this.state.detail[0].genre.join(' || ')
        document.getElementById('casts').innerHTML = 'Casts: ' + this.state.detail[0].casts.join(', ')
    })
    }

    pleaselogin = () =>{
        alert('Please Sign In as User')
    }

    render() { 
        return (
            <div>
            <center>
            <div style={{width:1000, marginTop:20, marginBottom:20}}>
            <div class="card card-cascade wider reverse">
                <div class="view view-cascade overlay">
                    <img class="movidedetailposter" src={this.state.detail[0].image} alt="Card image cap"/>
                </div>
                <div class="card-body card-body-cascade text-center">
                    <h4 class="card-title"><strong>{this.state.detail[0].name}</strong></h4>
                    <h6 class="font-weight-bold indigo-text py-2" id='genre'></h6>
                    <div class='row justify-content-md-center'>
                    <p>Duration: {this.state.detail[0].duration} minutes</p> 
                    <p style={{marginLeft:20}}>Director: {this.state.detail[0].director}</p>
                    <p style={{marginLeft:20}} id='casts'></p>
                    </div>
                    <p class="card-text">
                    {this.state.detail[0].synopsis}
                    </p>
                    {
                    this.props.role == 'user'
                    ?
                    <Link to={{ pathname:`/seatreservation/${this.state.detail[0].id}`, state:this.state.data }} >
                    <button type="button" class="btn btn21">Buy Ticket</button>
                    </Link>
                    :
                    <button type="button" class="btn btn21" onClick={this.pleaselogin}>Buy Ticket</button>
                    }
                    
                </div>
            </div>
            </div>
            </center>
            </div>
          );
    }
}

const mapStateProps = (state) =>{ // Function yang akan terima global state
    return{
      role: state.user.role //state.user(merujuk ke index.js reducer).username(masuk ke global state di authReducer)
    }
}
export default connect (mapStateProps)(moviedetails);