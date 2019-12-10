import React, { Component } from 'react';
import {connect} from 'react-redux' // Harus ada untuk akses global state
import Axios from 'axios';
import {MdEventSeat} from "react-icons/md";

class seatreservation extends Component {
    state = {  
        movies:[

        ],
        chosen: [],
        price: 0,
        count: 0
    }
    
    componentDidMount(){
        var id = window.location.pathname;
        id = id.replace('/seatreservation/', '')  
        Axios.get(`http://localhost:2000/movies/${id}`)
        .then((res) =>  {
            this.setState({movies:res.data})  // Memasukkan dari 'axios.get' kedalam array dataa dalam state
            console.log(this.state.movies)
        })
    }
    
    renderseats = () =>{
        var { chosen } = this.state
        var udadibook = this.state.movies.booked
        console.log(typeof(udadibook))
        console.log(udadibook)
        var arr = []
        for(var i=0; i<=4 ;i++){
            arr.push([])
            for(var j=1; j<=20; j++){
                arr[i].push(1)
            }
        }

        for(var k=0; k<chosen.length; k++){
            arr[chosen[k][0]][chosen[k][1]] = 2
        }

        // for(var l=0; l<=udadibook.length; l++){
        //     arr[udadibook[l][0]][udadibook[l][1]] = 3
        // }
        
        console.log(arr)
        
        return arr.map((val,row) => {
         return(
             <div style={{marginBottom:10}}>
                    {row+1} {
                    val.map((val1,no) =>{
                        if(val1 == 1){
                            return(
                                <a onClick={() => this.PilihSeat([row,no])}><MdEventSeat size='25'/></a>
                                )
                        }else if(val1 == 2){
                            return(
                                <a onClick={() => this.Cancel([row,no])}><MdEventSeat size='25' style={{color:'blue'}}/></a>
                                )
                        }else if(val1 == 3){
                            return(
                                <a><MdEventSeat size='25' style={{color:'red'}}/></a>
                                )
                        }
                    })
                 }
             </div>
         )  
        })
    }

    PilihSeat = (arr) =>{
        let { price, count, chosen } = this.state;
        chosen.push(arr);
        this.setState({
            price: price + 50000,
            count: count + 1,
            chosen: chosen
        })
        console.log(this.state)
    }

    Cancel = (arr) =>{
        let { price, count, chosen } = this.state;
        let output = chosen.filter((val) => {
            return val.join('') !== arr.join('')
        })
        this.setState({
            price: price - 50000,
            count: count - 1,
            chosen: output
        })
        console.log(this.state)
    }

    book = () =>{
        let {chosen} = this.state;
        var book = this.state.movies.booked;
        book.push(chosen)
        console.log(book)
        Axios.put(`http://localhost:2000/movies/${this.state.movies.id}`,{
        booked: book,
        name: this.state.movies.name,
        genre: this.state.movies.genre,
        director: this.state.movies.director,
        duration: this.state.movies.duration,
        synopsis: this.state.movies.synopsis,
        casts: this.state.movies.casts,
        image: this.state.movies.image
      })
      .then((res) =>  {
        alert('Booking Succesfull!')
    })
    }

    render() { 
        return (
            <div>
                <center>
                    <div className='row' style={{marginBottom:100, marginTop:100}}>

                        <div style={{marginLeft:300, marginRight:100}}>
                            <img src={this.state.movies.image}/>
                        </div>

                        <div>
                        <h2>Tickets For {this.state.movies.name}</h2><br/>
                        {this.renderseats()}
                        <br/>
                        <h4>Tickets: {this.state.count}</h4>
                        <h4>Total Price: Rp.{this.state.price.toLocaleString()}</h4>
                        <button className='btn btn21' onClick={() => { if (window.confirm('Are You Sure You Wish To Book Your Ticket?')) this.book()} }>Book</button>
                        </div>

                    </div>
                </center>
            </div>
          );
    }
}
 
export default seatreservation;