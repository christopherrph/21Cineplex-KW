import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'

class user extends Component {
    state = { 
        user:[],
        transactions:[]
     }

    componentDidMount(){

        var role = localStorage.getItem('role');
        if(role != 'admin'){
            this.setState({ redirecterror: true })
        }


        Axios.get(`http://localhost:2000/login?role=user`)
        .then((res) =>  {
            this.setState({
                user:res.data
            })
            Axios.get(`http://localhost:2000/transaction`)
            .then((res) =>  {
                this.setState({
                    transactions:res.data
                })
            })
        })
    }

    renderuser = () =>{
        return this.state.user.map((val, index) =>{
            var num = 0;
            for(var i=0; i<this.state.transactions.length;i++){
                if(val.username == this.state.transactions[i].username){
                    num++
                }
            }
            return(
                <tr>
                    <td>{index+1}</td>
                    <td>{val.username}</td>
                    <td>{val.email}</td>
                    <td style={{textAlign:'center'}}>{num}</td>
                    <td><Link to={`/history/${val.username}`}><a>View History</a></Link></td>
                </tr>
            )
        })
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
                    <center><h3 style={{marginTop:20}}>User List</h3>
                    <table class="table" style={{marginTop:10,marginBottom:200}}>
                    <thead class="thead" style={{backgroundColor:'#006563', color:'white'}}>
                        <tr>
                        <th scope="col">No</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col" style={{textAlign:'center'}}>No. Of Transactions</th>
                        <th scope="col"></th>
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

export default user;