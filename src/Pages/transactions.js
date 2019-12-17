import React, { Component } from 'react';
import Axios from 'axios';

class transactions extends Component {
    state = { 
        movies:[],
        transaction:[]
     }

    componentDidMount(){
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


    render() { 
        return (  
        <div>
            <br/>
            <div class="row" style={{marginLeft:85}}>
                <div class="col-xl-3 col-md-6 mb-4">
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

                <div class="col-xl-3 col-md-6 mb-4">
                <div class="card border-left-primary shadow h-100 py-2">
                    <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                        <div class="text-xs  text-uppercase mb-1">Most Favorite Movies</div>
                        <div class="h5 mb-0  text-gray-800">{this.FavMovies()}</div>
                        </div>
                        <div class="col-auto">
                        <i class="fas fa-calendar fa-1x"></i>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>

                <div className='row'>
                    <div className='col-5' style={{marginLeft:100}}>
                    <center><h3>Transaction History</h3>
                    <table class="table" style={{marginTop:10,marginBottom:200}}>
                    <thead class="thead" style={{backgroundColor:'#006563', color:'white'}}>
                        <tr>
                        <th scope="col">No</th>
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
                    <div className='col-5' style={{marginLeft:100}}>
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