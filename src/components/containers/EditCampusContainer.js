import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import { fetchCampusThunk, editCampusThunk } from "../../store/thunks";
import { EditCampusView } from "../views";

class EditCampusContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: "",
            imageUrl: "",
            address: "",
            description: "", 
          redirect: false, 
          redirectId: null
        };
    }
  componentDidMount() {
    //getting Campus ID from url
    this.props.fetchCampus(this.props.match.params.id);
  }


  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

handleSubmit = async event => {
    event.preventDefault();

    let campus = {
        name: this.state.name,
        imageUrl: this.state.imageUrl,
        address: this.state.address,
        description: this.state.description ,
        id: this.props.campus.id
        
    };
    
    let updatedCampus = await this.props.editCampus(campus);

    this.setState({
        name: "",
        imageUrl: "",
        address: "",
        description: "",
        redirect: true, 
        redirectId: this.props.campus.id
    });
}
componentWillUnmount() {
    this.setState({redirect: false, redirectId: null});
}
render() {
    if(this.state.redirect) {
      return (<Redirect to={`/campuses/${this.state.redirectId}`}/>)
    }
    return (
      <EditCampusView 
        handleChange = {this.handleChange} 
        handleSubmit={this.handleSubmit}      
      />
    );
}
}
// map state to props
const mapState = (state) => {
  return {
    campus: state.campus,
  };
};

// map dispatch to props
const mapDispatch = (dispatch) => {
  return {
    fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
    editCampus: (campus) => dispatch(editCampusThunk(campus)),
  };
}

export default connect(mapState, mapDispatch)(EditCampusContainer);