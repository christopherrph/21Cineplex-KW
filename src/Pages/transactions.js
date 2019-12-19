import React, { Component } from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router-dom'

class transactions extends Component {
    state = { 
        movies:[],
        transaction:[]
     }

    componentDidMount(){

        var role = localStorage.getItem('role');
        if(role != 'admin'){
            this.setState({ redirecterror: true })
        }

        Axios.get(`http://localhost:2000/movies`)
        .then((res) =>  {
            this.setState({
                movies:res.data
            })
        })

        Axios.get(`http://localhost:2000/transaction`)
        .then((res) =>  {
            this.setState({
                transaction:res.data
            })
            console.log(this.state.transaction)
        })
    }

    RenderAvailable = () =>{
        return this.state.movies.map((val, index) =>{
            var seattaken = 0
            for(var i=0; i<this.state.transaction.length; i++){
                if(val.name == this.state.transaction[i].movies){
                    seattaken += this.state.transaction[i].ticket_amount
                }
            }
            var remaining = 100-seattaken
            return(
                <tr>
                    <td>{index+1}</td>
                    <td>{val.name}</td>
                    <td>{remaining}</td>
                    <td>{seattaken}</td>
                </tr>
            )
        })
    }

    RenderTrans = () =>{
        return this.state.transaction.map((val, index) =>{
            return(
                <tr>
                    <td>{index+1}</td>
                    <td>{val.orderdate}</td>
                    <td>{val.username}</td>
                    <td>{val.movies}</td>
                    <td>{val.ticket_amount}</td>
                    <td>Rp.{val.totalprice.toLocaleString()}</td>
                    <td>{val.status}</td>
                </tr>
            )
        })
    }

    Total = () =>{
        var total = 0
        for(var i =0; i<this.state.transaction.length; i++){
            if(this.state.transaction[i].status == 'Paid'){
                total += this.state.transaction[i].totalprice
            }
        }
        return total;
    }

    FavMovies = () =>{
        var film =''
        var laku = 0
        for(var i=0; i<this.state.movies.length; i++){
            if(this.state.movies[i].booked.length >= laku){
                film = this.state.movies[i].name
                laku = this.state.movies[i].booked.length
            }
        }
        return film
    }

    Paid = () =>{
        var output = 0
        for(var i=0; i<this.state.transaction.length; i++){
            if(this.state.transaction[i].status == 'Paid'){
                output++
            }
        }
        return output
    }

    Unpaid = () =>{
        var output = 0
        for(var i=0; i<this.state.transaction.length; i++){
            if(this.state.transaction[i].status == 'Unpaid'){
                output++
            }
        }
        return output
    }

    TotalTicket = () =>{
        var output = 0
        for(var i=0; i<this.state.transaction.length; i++){
            if(this.state.transaction[i].status == 'Paid'){
                output+= this.state.transaction[i].ticket_amount
            }
        }
        return output
    }


    render() { 
    const { redirecterror } = this.state;
     if (redirecterror) {
       return <Redirect to='/error-bwek-bwek-bwek'/>;
     }
        return (  
        <div>
            <br/>
            <div class="row" style={{marginLeft:80,marginRight:45}}>
                <div class="col-md-3 mb-4">
                <div class="card border-left-primary shadow h-100 py-2">
                    <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                        <div class="text-xs  text-uppercase mb-1">Earnings</div>
                        <div class="h5 mb-0  text-gray-800">Rp. {this.Total().toLocaleString()}</div>
                        </div>
                        <div class="col-auto">
                        <i class="fas fa-dollar-sign fa-1x"></i>
                        </div>
                    </div>
                    </div>
                </div>
                </div>

                <div class="col-md-3 mb-4">
                <div class="card border-left-primary shadow h-100 py-2">
                    <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                        <div class="text-xs  text-uppercase mb-1">Most Favorite Movies</div>
                        <div class="h5 mb-0  text-gray-800">{this.FavMovies()}</div>
                        </div>
                        <div class="col-auto">
                        <i class="fas fa-video fa-1x"></i>
                        </div>
                    </div>
                    </div>
                </div>
                </div>

                <div class="col-md-2 mb-4">
                <div class="card border-left-primary shadow h-100 py-2">
                    <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                        <div class="text-xs  text-uppercase mb-1">Tickets Sold</div>
                        <div class="h5 mb-0  text-gray-800">{this.TotalTicket()}</div>
                        </div>
                        <div class="col-auto">
                        <i class="fas fa-ticket-alt fa-1x"></i>
                        </div>
                    </div>
                    </div>
                </div>
                </div>

                <div class="col-md-2 mb-4">
                <div class="card border-left-primary shadow h-100 py-2">
                    <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                        <div class="text-xs  text-uppercase mb-1">Paid Booking</div>
                        <div class="h5 mb-0  text-gray-800">{this.Paid()}</div>
                        </div>
                        <div class="col-auto">
                        <i class="far fa-smile fa-1x"></i>
                        </div>
                    </div>
                    </div>
                </div>
                </div>

                <div class="col-md-2 mb-4">
                <div class="card border-left-primary shadow h-100 py-2">
                    <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-6">
                        <div class="text-xs  text-uppercase mb-1">Unpaid Booking</div>
                        <div class="h5 mb-0  text-gray-800">{this.Unpaid()}</div>
                        </div>
                        <div class="col-auto">
                        <i class="far fa-frown fa-1x"></i>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>

                <div className='row'>
                    <div className='col-6' style={{marginLeft:100}}>
                    <center><h3>Transaction History</h3>
                    <table class="table" style={{marginTop:10,marginBottom:200}}>
                    <thead class="thead" style={{backgroundColor:'#006563', color:'white'}}>
                        <tr>
                        <th scope="col">No</th>
                        <th scope="col">Order Date</th>
                        <th scope="col">Username</th>
                        <th scope="col">Movie</th>
                        <th scope="col">Ticket Amount</th>
                        <th scope="col">Total Price</th>
                        <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.RenderTrans()}
                    </tbody>
                    </table>
                    </center>
                    </div>
                    <div className='col-4' style={{marginLeft:50}}>
                    <center><h3>Tickets Availability</h3>
                    <table class="table" style={{marginTop:10,marginBottom:200}}>
                    <thead class="thead" style={{backgroundColor:'#006563', color:'white'}}>
                        <tr>
                        <th scope="col">No</th>
                        <th scope="col">Movie</th>
                        <th scope="col">Available Seat</th>
                        <th scope="col">Seat Booked</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.RenderAvailable()}
                    </tbody>
                    </table>
                    </center>
                    </div>
                </div>
        </div>
        );
    }
}
 
export default transactions;