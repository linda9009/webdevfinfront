import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import NewCampusView from '../views/NewCampusView';
import { addCampusThunk } from '../../store/thunks';


class NewCampusContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
          name: null, 
          imageUrl: "", 
          address: null, 
          description: null,
          redirect: false, 
          redirectId: null
        };
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
        };
        
        let newCampus = await this.props.addCampus(campus);
        if (campus.name && campus.address){
        this.setState({
          name: "", 
          imageUrl: "", 
          address: "", 
          description: "",
          redirect: true, 
          redirectId: newCampus.id
        });}
    }

    componentWillUnmount() {
        this.setState({redirect: false, redirectId: null});
    }

    render() {
        if(this.state.redirect) {
          return (<Redirect to={`/campuses/${this.state.redirectId}`}/>)
        }
        return (
          <NewCampusView 
            handleChange = {this.handleChange} 
            handleSubmit={this.handleSubmit}      
          />
        );
    }
}

const mapDispatch = (dispatch) => {
    return({
        addCampus: (campus) => dispatch(addCampusThunk(campus)),
    })
}

export default connect(null, mapDispatch)(NewCampusContainer);