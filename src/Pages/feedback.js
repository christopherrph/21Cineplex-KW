import React, { Component } from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router-dom'

class feedback extends Component {
    state = { 
        feedback:[]
     }

    componentDidMount(){

        var role = localStorage.getItem('role');
        if(role != 'admin'){
            this.setState({ redirecterror: true })
        }

        Axios.get(`http://localhost:2000/feedback`)
        .then((res) =>  {
            this.setState({
                feedback:res.data
            })
        })
    }

    renderfeedback = () =>{
        return this.state.feedback.map((val, index) =>{
            return(
                <tr>
                    <td>{index+1}</td>
                    <td>{val.email}</td>
                    <td>{val.feedback}</td>
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
                    <center><h3>Feedback</h3>
                    <table class="table" style={{marginTop:10,marginBottom:200}}>
                    <thead class="thead" style={{backgroundColor:'#006563', color:'white'}}>
                        <tr>
                        <th scope="col">No</th>
                        <th scope="col" style={{width:400}}>Email</th>
                        <th scope="col" style={{width:800}}>Feedback</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.renderfeedback()}
                    </tbody>
                    </table>
                    </center>
            </div>
            </center>
        </div>
        );
    }
}

export default feedback;