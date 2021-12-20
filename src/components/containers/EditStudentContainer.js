import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import { fetchStudentThunk, editStudentThunk } from "../../store/thunks";
import { EditStudentView } from "../views";

class EditStudentContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
          firstname: "", 
          lastname: "", 
          email: "",
          campusId: null, 
          redirect: false, 
          redirectId: null
        };
    }
  componentDidMount() {
    //getting student ID from url
    this.props.fetchStudent(this.props.match.params.id);
  }


  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

handleSubmit = async event => {
    event.preventDefault();

    let student = {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
        campusId: this.state.campusId ,
        id: this.props.student.id
        
    };
    
    let updatedStudent = await this.props.editStudent(student);

    this.setState({
      firstname: "", 
      lastname: "", 
      email: "",
      campusId: null, 
      redirect: true, 
      redirectId: this.props.student.id
    });
}
componentWillUnmount() {
    this.setState({redirect: false, redirectId: null});
}
render() {
    if(this.state.redirect) {
      return (<Redirect to={`/student/${this.state.redirectId}`}/>)
    }
    return (
      <EditStudentView 
        handleChange = {this.handleChange} 
        handleSubmit={this.handleSubmit}      
      />
    );
}
}
// map state to props
const mapState = (state) => {
  return {
    student: state.student,
  };
};

// map dispatch to props
const mapDispatch = (dispatch) => {
  return {
    fetchStudent: (id) => dispatch(fetchStudentThunk(id)),
    editStudent: (student) => dispatch(editStudentThunk(student)),
  };
}

export default connect(mapState, mapDispatch)(EditStudentContainer);