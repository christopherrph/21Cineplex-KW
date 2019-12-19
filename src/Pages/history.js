import React, { Component } from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router-dom'

class history extends Component {
    state = { 
        transactions:[]
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

    componentDidMount(){
        var role = localStorage.getItem('role');
        if(role != 'admin'){
            this.setState({ redirecterror: true })
        }

            var name = window.location.pathname;
            name = name.replace('/history/', '')  
            Axios.get(`http://localhost:2000/transaction?username=${name}`)
            .then((res) =>  {
                this.setState({
                    transactions:res.data
                })
            })
    }

    renderuser = () =>{
        return this.state.transactions.map((val, index) =>{
            return(
                <tr>
                    <td>{index+1}</td>
                    <td>{val.orderdate}</td>
                    <td>{val.movies}</td>
                    <td>{val.ticket_amount}</td>
                    <td>{this.ConvertSeat(val.seat)}</td>
                    <td>Rp. {(val.totalprice).toLocaleString()}</td>
                    <td>{val.status}</td>
                </tr>
            )
        })
    }

    back = () =>{
        window.history.back();
    }

    render() { 
        const { redirecterror } = this.state;
     if (redirecterror) {
       return <Redirect to='/error-bwek-bwek-bwek'/>;
     }
        return (  
        <div>
            <center>
            <div style={{width:800}}>
                    <center><h3 style={{marginTop:20}}>Transaction History</h3>
                    <a  class='back' onClick={this.back} style={{marginLeft:10}}>Back</a>
                    <table class="table" style={{marginTop:10,marginBottom:200}}>
                    <thead class="thead" style={{backgroundColor:'#006563', color:'white'}}>
                        <tr>
                        <th scope="col">No</th>
                        <th scope="col">Order Date</th>
                        <th scope="col">Movie</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Seat Number</th>
                        <th scope="col">Total</th>
                        <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.renderuser()}
                    </tbody>
                    </table>
                    </center>
            </div>
            </center>
        </div>
        );
    }
}

export default history;