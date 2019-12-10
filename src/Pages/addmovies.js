import React, { Component } from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router-dom'

class addmovies extends Component {
    state = {  }

    submit = () =>{
        var title = this.refs.title.value
        var genre = this.refs.genre.value
        var director = this.refs.director.value
        var casts = this.refs.casts.value
        var duration = parseInt(this.refs.duration.value)
        var url = this.refs.url.value
        var synopsis = this.refs.synopsis.value
        var booked = [];
        genre = genre.split(',')
        casts = casts.split(',')
        if(title && genre && director && casts && duration && url && synopsis){
                Axios.post('http://localhost:2000/movies',{
                name: title,
                genre: genre,
                director: director,
                duration: duration,
                synopsis: synopsis,
                image: url,
                casts: casts,
                booked: booked
                })
                .then((res) => {
                console.log(res.data);
                alert('Movie Added Successfully!')
                this.setState({ redirect: true })
                })
        }else{
            alert('Please Fill In All Form')
        }
        
    }



    render() { 
     const { redirect } = this.state;
     if (redirect) {
       return <Redirect to='/'/>;
     }
        return (
            <div>
                <br/>
                <center>
                <h1>Add Movies</h1>
                    <div style={{width:500, marginTop:50, marginBottom:100}}>
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Movie Title</label>
                            <input type="text" class="form-control" id="exampleFormControlInput1"  ref="title"/>
                        </div>
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Genre</label>
                            <input type="text" class="form-control" id="exampleFormControlInput1" ref="genre"/>
                        </div>
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Director</label>
                            <input type="text" class="form-control" id="exampleFormControlInput1" ref="director"/>
                        </div>
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Casts</label>
                            <input type="text" class="form-control" id="exampleFormControlInput1" ref="casts"/>
                        </div>
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Duration (Minutes)</label>
                            <input type="number" min='0' class="form-control" id="exampleFormControlInput1" ref="duration"/>
                        </div>
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Image URL</label>
                            <input type="text" class="form-control" id="exampleFormControlInput1" ref="url"/>
                        </div>
                        <div class="form-group">
                            <label for="exampleFormControlTextarea1">Synopsis</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="5" ref="synopsis"></textarea>
                        </div>
                        <button type="button" class="btn btn21" onClick={this.submit}>Add Movie</button>
                    </div>
                </center>
            </div>
          );
    }
}
 
export default addmovies;