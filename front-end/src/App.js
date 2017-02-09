import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import $ from '../node_modules/jquery/dist/jquery.min.js';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theClass: []

    }
    this.addStudent = this.addStudent.bind(this);
  }

  

  componentDidMount() {
    $.getJSON('http://localhost:3002/getStudents', (studentsFromAPI)=>{
      console.log(studentsFromAPI);
      this.setState({
        theClass: studentsFromAPI
      })
    })
  }

  addStudent(event){
  {/*event.target is the first thing that was clicked - the button - parent node is the div - childnode 0 is the first child of that div and value is what the user typed in*/ }
  {/*when you're done, I want you to run this code*/ }
  self = this;
    var studentToAdd = event.target.parentNode.childNodes[0].value;
    $.ajax({
      method: "POST",
      url: "http://localhost:3002/addStudent",
      data: {name: studentToAdd }
    })

    .done(function (studentsArray){
      self.setState({
        theClass: studentsArray
      })
    });
  }  

  render() {

    var theClassArray = []; 
    this.state.theClass.map((student,index)=>{
      theClassArray.push(<li key={index}>{student.Name}</li>)
    })
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          {theClassArray}
        </p>

        <div className='add-box'>
          <input type='text' id='newStudent'/>
          <button onClick={this.addStudent}>Add Student</button>
        </div>  
      </div>
    );
  }
}

export default App;
