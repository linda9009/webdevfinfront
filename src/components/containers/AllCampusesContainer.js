import { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchAllCampusesThunk, deleteCampusThunk } from "../../store/thunks";
import  AllCampusesView  from "../views/AllCampusesView";

class AllCampusesContainer extends Component {
  componentDidMount() {
    this.props.fetchAllCampuses();
  }

  render() {
    return (
      <div>
      <AllCampusesView
        allCampuses={this.props.allCampuses}
        deleteCampus={this.props.deleteCampus}
      />
      </div>
    );
  }
}

// Map state to props;
const mapState = (state) => {
  return {
    allCampuses: state.allCampuses,
  };
};

// Map dispatch to props;
const mapDispatch = (dispatch) => {
  return {
    fetchAllCampuses: () => dispatch(fetchAllCampusesThunk()),
    deleteCampus: (campusId) => dispatch(deleteCampusThunk(campusId)),
  };
};

// // Type check props;
// AllCampusesContainer.propTypes = {
//   allCampuses: PropTypes.array.isRequired,
//   fetchAllCampuses: PropTypes.func.isRequired,
// };

// Export our store-connected container by default;
export default withRouter(connect(mapState, mapDispatch)(AllCampusesContainer));