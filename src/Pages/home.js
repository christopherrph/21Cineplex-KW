import React, { Component } from 'react'
import '../App.css';
import {connect} from 'react-redux' // Harus ada untuk akses global state
import Carousel from '../Components/Carousel'
import Axios from 'axios';
import { Link } from 'react-router-dom'


class home extends Component {

    state={
        movie:[]
    }

    componentDidMount(){
        Axios.get('http://localhost:2000/movies')
        .then((res) =>  {
            this.setState({movie:res.data})  // Memasukkan dari 'axios.get' kedalam array dataa dalam state
            console.log(this.state.movie)
        })
        .catch((err) => {
            console.log(err)
        })
    } 

    renderPoster = () =>{
        return this.state.movie.map((val,) =>{
            return(
                <div style={{marginBottom:80}}>
                <Link to={`/moviedetails/${val.id}`}>
                <img src={val.image} style={{margin:20}} class='posterindv'></img>
                </Link>
                <br/>
                <label style={{fontWeight:600, fontSize:17}}>
                    {val.name}
                </label>
                </div>
            )
        })
    }

    render() { 
        return (
            <div>
                <br/>
                {
                this.props.nama
                ?
                <center><h2>Welcome, {this.props.nama}</h2></center>
                :
                ''
                }
                {console.log(this.props.text)}
                <img src='https://ods.adelva.com/www/images/d4f32c51776f44b8658c50a04703ad84.jpg' style={{position:"absolute", right:130}}/>
                <div class='carousel'>
                <Carousel/>
                </div>
                <div class='row' style={{marginLeft:140}}>
                    <div class='nowplaying'>
                        Now Playing
                    </div>
                    <select class='kota'>
                        <option>Jakarta</option>
                        <option>Bandung</option>
                        <option>Bali</option>
                    </select>
                </div>
                <center>
                <div class="poster">
                    <div class="row">
                    {this.renderPoster()}
                    </div>
                </div>
                </center>
            </div>
          );
    }
}

const mapStateProps = (state) =>{ // Function yang akan terima global state
    return{
      nama: state.user.username, //state.user(merujuk ke index.js reducer).username(masuk ke global state di authReducer)
      text: state.contoh.text
    }
}
 
export default connect(mapStateProps)(home);