import React, { Component } from 'react'
import '../App.css';
import { Link } from 'react-router-dom'


class notfound extends Component {
    render() { 
        return (
            <div>
                <center>
                <img src='https://www.bigbluedoor.net/sites/default/files/404.png' style={{height:400, marginBottom:30, marginTop:30}}/>
                </center>
            </div>
          );
    }
}
 
export default notfound;