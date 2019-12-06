import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../App.css';
import {connect} from 'react-redux' // Harus ada untuk akses global state

class Footer extends Component {
    render() { 
        return (
            <div>                
                <div class='footer'>
                    <div class='row'>
                        <div class='col-6 footercont'>
                            <a href='' class='footergaris'>Profile</a><a href='' style={{marginLeft:40}} class='footergaris'>Terms of Use</a><a href='' class='footergaris' style={{marginLeft:40, border:'none'}}>Advertising</a>
                        </div>
                        <div class='col-3'>
                        </div>
                    </div>
                    <div class='copyright'>
                    <p>
                    © 1999-2012 21Cineplex.com. All materials and contents (texts, graphics, and every attributes) of 21Cineplex or 21Cineplex.com website are copyrights and trademarks of PT Nusantara Sejahtera Raya.<br/>
                    Any commercial usage of the materials and contents is forbidden without prior permission from PT Nusantara Sejahtera Raya. There is no other institutions/agencies outside<br/>
                    PT Nusantara Sejahtera Raya allowed to use www.21Cineplex.com (21Cineplex website) without prior permission from PT Nusantara Sejahtera Raya
                    </p>
                    </div>
                </div>
            </div>
          );
    }
}
 
export default Footer;