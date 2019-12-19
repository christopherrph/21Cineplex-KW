import React, { Component } from 'react';
import {connect} from 'react-redux';
import Axios from 'axios';

class contact extends Component {
    state = {  }

    submit = () =>{
        var email = this.refs.email.value
        var feedback = this.refs.feedback.value
        if(email && feedback){
            Axios.post(`http://localhost:2000/feedback`,{
            email: email,
            feedback: feedback
          })
          .then((res)=>{
              document.getElementById('email').value = ''
              document.getElementById('feedback').value = ''
              document.getElementById("thankyoumodal").click()
          })
        }else{
            alert('Please Fill In The Form')
        }
    }

    render() { 
        return ( 
            <div>
                <center>
                <h2 style={{marginTop:20}}>Contact Us</h2>
                <div class="mapouter" style={{marginTop:20, marginBottom:30}}>
                    <div class="gmap_canvas"><iframe width="685" height="400" id="gmap_canvas" src="https://maps.google.com/maps?q=purwadhika%20startup&t=&z=15&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe><a href="https://www.couponflat.com"></a>
                    </div>
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">Email</label>
                    {
                    this.props.email
                    ?
                    <input type="email" class="form-control" style={{width:500}} ref='email' aria-describedby="emailHelp" id='email' defaultValue={this.props.email}/>
                    :
                    <input type="email" class="form-control" style={{width:500}} ref='email' aria-describedby="emailHelp" id='email'/>
                    } 
                </div>
                <div class="form-group" style={{width:500}}>
                    <label for="exampleFormControlTextarea1">Feedback / Questions</label>
                    <textarea class="form-control" id="feedback" ref='feedback' rows="5"></textarea>
                </div>
                <button className='btn btn21' onClick={() => { if(window.confirm('Are You Sure You Wish To Submit?')) this.submit()} } style={{marginBottom:20}}>Submit</button>
                </center>


                <button  style={{display:'none'}} type="button" class="btn btn21" data-toggle="modal" data-target="#exampleModal" id='thankyoumodal'>
                Don't
                </button>
                <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-body">
                        <img src='http://clipartmag.com/images/animated-thank-you-45.gif'/>
                    </div>
                    </div>
                </div>
                </div>



            </div>
         );
    }
}

const mapStateProps = (state) =>{ // Function yang akan terima global state
    return{
      email: state.user.email
    }
}
 
export default connect(mapStateProps)(contact);