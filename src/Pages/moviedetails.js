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
        ],
        star:0,
        review:[

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
        Axios.get(`http://localhost:2000/review?movie=${id}`)
        .then((res) => {
            this.setState({review:res.data}) 
            console.log(this.state.review)
        })
    })
    }

    pleaselogin = () =>{
        alert('Please Sign In as User')
    }


    renderstar = () =>{
        if(this.state.star == 0){
            return(
                <div>
                <span class="fa fa-star" onClick={() => this.setState({star:1})}></span>
                <span class="fa fa-star" onClick={() => this.setState({star:2})}></span>
                <span class="fa fa-star" onClick={() => this.setState({star:3})}></span>
                <span class="fa fa-star" onClick={() => this.setState({star:4})}></span>
                <span class="fa fa-star" onClick={() => this.setState({star:5})}></span>
                <p>{this.state.star}/5</p>
                </div>
            )
        }else if(this.state.star == 1){
            return(
                <div>
                <span class="fa fa-star checked" onClick={() => this.setState({star:0})}></span>
                <span class="fa fa-star" onClick={() => this.setState({star:2})}></span>
                <span class="fa fa-star" onClick={() => this.setState({star:3})}></span>
                <span class="fa fa-star" onClick={() => this.setState({star:4})}></span>
                <span class="fa fa-star" onClick={() => this.setState({star:5})}></span>
                <p>{this.state.star}/5</p>
                </div>
            )
        }else if(this.state.star==2){
            return(
                <div>
                <span class="fa fa-star checked" onClick={() => this.setState({star:1})}></span>
                <span class="fa fa-star checked" onClick={() => this.setState({star:0})}></span>
                <span class="fa fa-star" onClick={() => this.setState({star:3})}></span>
                <span class="fa fa-star" onClick={() => this.setState({star:4})}></span>
                <span class="fa fa-star" onClick={() => this.setState({star:5})}></span>
                <p>{this.state.star}/5</p>
                </div>
            )
        }else if(this.state.star==3){
            return(
                <div>
                <span class="fa fa-star checked" onClick={() => this.setState({star:1})}></span>
                <span class="fa fa-star checked" onClick={() => this.setState({star:2})}></span>
                <span class="fa fa-star checked" onClick={() => this.setState({star:0})}></span>
                <span class="fa fa-star" onClick={() => this.setState({star:4})}></span>
                <span class="fa fa-star" onClick={() => this.setState({star:5})}></span>
                <p>{this.state.star}/5</p>
                </div>
            )
        }else if(this.state.star==4){
            return(
                <div>
                <span class="fa fa-star checked" onClick={() => this.setState({star:1})}></span>
                <span class="fa fa-star checked" onClick={() => this.setState({star:2})}></span>
                <span class="fa fa-star checked" onClick={() => this.setState({star:3})}></span>
                <span class="fa fa-star checked" onClick={() => this.setState({star:0})}></span>
                <span class="fa fa-star" onClick={() => this.setState({star:5})}></span>
                <p>{this.state.star}/5</p>
                </div>
            )
        }else if(this.state.star==5){
            return(
                <div>
                <span class="fa fa-star checked" onClick={() => this.setState({star:1})}></span>
                <span class="fa fa-star checked" onClick={() => this.setState({star:2})}></span>
                <span class="fa fa-star checked" onClick={() => this.setState({star:3})}></span>
                <span class="fa fa-star checked" onClick={() => this.setState({star:4})}></span>
                <span class="fa fa-star checked" onClick={() => this.setState({star:0})}></span>
                <p>{this.state.star}/5</p>
                </div>
            )
        }
    }

    submitreview = () =>{
        var review = this.refs.review.value
        var star = this.state.star
        var nama = this.props.name
        console.log(nama)
        console.log(star)
        console.log(review)
        if(nama == ''){
            alert('Sign in to write a review...')
        }else{
            if(review){
                Axios.post(`http://localhost:2000/review`,{
                name: nama,
                review: review,
                star: star,
                movie: this.state.detail[0].id
              })
              .then((res)=>{
                  document.getElementById('review').value = ''
                  this.setState({star:0})
                  document.getElementById("thankyoumodal").click()
              })
            }else{
                alert('Dont Leave The Review Empty 😰')
            }
        }
    }

    renderreview = () =>{
        if(this.state.review.length == 0){
            return(
                <div class='container'>
                    <div class="media comment-box">
                    <div class="media-left">
                        <a href="#">
                            <img class="img-responsive user-photo" src="https://ssl.gstatic.com/accounts/ui/avatar_2x.png"/>
                        </a>
                    </div>
                    <div class="media-body">
                    <h5 class="media-heading">This movie has no review</h5>
                    </div>
                    </div>
                </div>
                )
        }else{
            return this.state.review.map((val, index) =>{
                return(
                <div class='container'>
                    <div class="media comment-box">
                    <div class="media-left">
                        <a href="#">
                            <img class="img-responsive user-photo" src="https://ssl.gstatic.com/accounts/ui/avatar_2x.png"/>
                        </a>
                    </div>
                    <div class="media-body">
                    <h5 class="media-heading">{val.name} - {val.star} <span class="fa fa-star checked"></span></h5>
                    <p>{val.review}</p>
                    </div>
                    </div>
                </div>
                )
        })
        }
    }
    render() { 
        return (
            <div>
            <div style={{width:1000, marginTop:20, marginBottom:20, marginLeft:250}}>
            <div class="card card-cascade wider reverse">
            <center>
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
                </center>

                <div class="jumbotron jumbotron-fluid">
                <div class="container">
                    <h4>Add a Review For {this.state.detail[0].name} </h4>
                    <p>Kindly give this movie a review 🙏</p>
                    {this.renderstar()}
                    <div class="form-group">
                    {
                    this.props.name
                    ?
                    <textarea ref='review' class="form-control reviewbox" rows="5" id='review' style={{resize:'none'}} placeholder='Your review here...' maxlength="365"></textarea>
                    :
                    <textarea ref='review' class="form-control reviewbox" rows="5" style={{resize:'none'}} placeholder='Sign in to write a review...' maxlength="365" disabled></textarea>
                    }
                    
                    </div>
                    <center><button className='btn btn21' onClick={() => { if (window.confirm('Are You Sure You Want To Submit Your Review?')) this.submitreview()} }>Submit</button></center>
                

                    <h4>People's Comment</h4>
                    {this.renderreview()}
                </div>
                </div>
            </div>
            </div>


            <button  style={{display:'none'}} type="button" class="btn btn21" data-toggle="modal" data-target="#exampleModal" id='thankyoumodal'>
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
      role: state.user.role, //state.user(merujuk ke index.js reducer).username(masuk ke global state di authReducer)
      name: state.user.username
    }
}
export default connect (mapStateProps)(moviedetails);