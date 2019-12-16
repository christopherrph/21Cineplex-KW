import React, { Component } from 'react';
import Axios from 'axios';
import {connect} from 'react-redux'

class profile extends Component {
    state = { 
        detail:[]
     }

    componentDidMount(){
        var nama = window.location.pathname;
        nama = nama.replace('/profile/', '')
        console.log(nama)
        Axios.get(`http://localhost:2000/transaction?username=${nama}`)
        .then((res) =>  {
            this.setState({
                detail:res.data,
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

    cancel = (id, seat, movies) =>{
        Axios.delete(`http://localhost:2000/transaction/${id}`)
        .then((res) =>  {
          this.componentDidMount()
        })

        console.log(movies)
        Axios.get(`http://localhost:2000/movies?name=${movies}`)
        .then((res) =>  {
            var book = res.data[0].booked;
            var id = res.data[0].id;
            console.log(book)
            console.log(seat)

            for(var i=0; i<seat.length; i++){
                for(var j=0; j<book.length; j++){
                    if(seat[i][0]==book[j][0] && seat[i][1]==book[j][1]){
                        console.log(j)
                        book.splice(j, 1);
                    }
                }
            }
            console.log(book)
            Axios.patch(`http://localhost:2000/movies/${id}`,{
                booked: book})
            .then((res)=>{
                alert('Booking Cancelled')
            })
            .catch((err) => {
                console.log(err)
            })
            
        })

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
                    <td>{val.status}</td>
                    <td><button className='btn btn21profile' onClick={() => { if(window.confirm('Are You Sure You Want To Cancel This Booking?')) this.cancel(val.id, val.seat, val.movies)} }>Cancel</button></td>
                </tr>
            )
        })

    }

    render() { 
        return ( 
            <div>
                <center>
                    <h3 style={{marginTop:20}}>Ticket Booking</h3>
                <table class="table" style={{width:800, marginTop:10,marginBottom:200}}>
                    <thead class="thead" style={{backgroundColor:'#006563', color:'white'}}>
                        <tr>
                        <th scope="col">No</th>
                        <th scope="col">Movie</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Seat Number</th>
                        <th scope="col">Total</th>
                        <th scope="col">Status</th>
                        <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.RenderOnGoing()}
                    </tbody>
                </table>
                </center>
            </div>
         );
    }
}

const mapStateProps = (state) =>{ // Function yang akan terima global state
    return{
      nama: state.user.username //state.user(merujuk ke index.js reducer).username(masuk ke global state di authReducer)
    }
}
 
export default connect(mapStateProps)(profile);