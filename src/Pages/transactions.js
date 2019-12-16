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
            var remaining = 100 - seattaken
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


    render() { 
        return (  
        <div>
            <br/>
                <div className='row'>
                    <div className='col-6'>
                    <center><h3>Transaction History</h3></center>
                    </div>
                    <div className='col-5'>
                    <center><h3>Tickets Availability</h3>
                    <table class="table" style={{marginTop:10,marginBottom:200}}>
                    <thead class="thead" style={{backgroundColor:'#006563', color:'white'}}>
                        <tr>
                        <th scope="col">No</th>
                        <th scope="col">Movie</th>
                        <th scope="col">Available Seat</th>
                        <th scope="col">Seat Booked</th>
                        <th scope="col"></th>
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