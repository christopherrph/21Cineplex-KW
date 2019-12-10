import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../App.css';
import {connect} from 'react-redux' // Harus ada untuk akses global state
import { TiArrowRightOutline } from "react-icons/ti";
import { GiSpeaker, GiRoundStar } from "react-icons/gi";
import { FaMapMarkedAlt, FaEdit } from "react-icons/fa";
import { AiOutlineLogin } from "react-icons/ai";
import { IoIosPerson } from "react-icons/io"
import {logout} from '../Redux/Action'

class Header extends Component {

    logout = () =>{
      localStorage.removeItem('username');
      this.props.logout();
    }

    render() { 
        return (
            <div>
                <center>
                    <img src='https://ods.adelva.com/www/images/4502d402eb975975623f6868df13e211.jpg' style={{marginTop:10}}/>
                </center>
                
                <div class='sec1'>
                    <div class='row'>
                        <div class='col-6 header1'>
                        <Link to='/'><img src='https://21cineplex.com//theme/v5/assets/img/icons/home@2x.png' style={{marginRight:10}}/></Link>
                        <img src='https://21cineplex.com//theme/v5/assets/img/logo.png'/>
                        </div>
                        <div class='col-3 header1'>
                            <div class="input-group mb-3" style={{marginTop:25}}>
                            <div class="input-group-prepend searchbox">
                            <img src='https://icon-library.net/images/white-search-icon-png/white-search-icon-png-27.jpg' style={{height:15, marginTop:10, opacity:.8}}></img>
                            <input type="text" class="searchbox" placeholder="Search theater, movies..." aria-label="Username" aria-describedby="basic-addon1"/>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id='pilihan21'>
                    <a class='menu21' style={{color:'#006563'}}  href=''>Movie News</a><br/><br/>
                    <a class='menu21' style={{color:'#006563'}}  href=''>New Openings</a><br/><br/>
                    <a class='menu21' style={{color:'#006563'}}  href=''>Quizzes</a>
                </div>
                <div class='sec2'>
                    <div class='row'>
                    <Link to='/' style={{marginTop:17}}><a href='' class='menu' style={{marginLeft:180}}><TiArrowRightOutline/> Now Playing</a></Link>
                        <a href='' class='menu'><GiSpeaker/> Upcoming</a>
                        <a href='' class='menu'><FaMapMarkedAlt/> Theaters</a>
                        {
                        this.props.role == 'admin'
                        ?
                        <div style={{marginTop:17}}>
                        <a href='' class='menu' id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><FaEdit/> Movies</a>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{marginTop:10}}>
                            <Link to='./addmovies'><a class="dropdown-item" href="#">Add Movies</a></Link>
                            <Link to='/managemovies'><a class="dropdown-item" href="#">Edit Movies</a></Link>
                        </div>
                        </div>
                        :
                        ''
                        }
                        {
                        this.props.nama
                        ?
                        <a href='' onClick={this.logout} class='menu'><AiOutlineLogin/> Sign Out</a>
                        :
                        <Link to='/login' style={{marginTop:17}}>
                        <a href='' class='menu'><AiOutlineLogin/> Sign In</a>
                        </Link>
                        }
                        <img class='verticalline' src='https://i.dlpng.com/static/png/2311890-straight-vertical-line-png-8-png-image-vertical-line-png-picture-2000_3938_preview.png'/>
                        <div style={{marginLeft:120}}>
                            <img class='menu' src='https://21cineplex.com//theme/v5/assets/img/imax-menu.png'/>
                            <img class='menu' src='https://21cineplex.com//theme/v5/assets/img/dolby-menu.png'/>
                            <img class='menu' src='https://21cineplex.com//theme/v5/assets/img/mtix-menu.png'/>
                        </div>
                    </div>
                </div>
            </div>
          );
    }
}

const mapStateProps = (state) =>{ // Function yang akan terima global state
    return{
      nama: state.user.username, //state.user(merujuk ke index.js reducer).username(masuk ke global state di authReducer)
      role: state.user.role
    }
}
 
export default connect(mapStateProps,{logout})(Header);