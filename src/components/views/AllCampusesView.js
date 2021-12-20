import { Link } from "react-router-dom";

const AllCampusesView = (props) => {
  const { allCampuses, deleteCampus } = props;
  if (!allCampuses.length) {
    return (
      <div>
        There are no campuses.
        <Link to={`../newcampus`}>
          <button>Add New Campus</button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      {allCampuses.map((campus) => {
        return (
          <div key={campus.id}>
            <Link to={`/campuses/${campus.id}`}>
              <h1>{campus.name}</h1>
            </Link>
            <div>{campus.description}</div>
            <button onClick={() => deleteCampus(campus.id)}>Delete</button>
          </div>
        );
      })}
      <Link to={`../newcampus`}>
        <button>Add New Campus</button>
      </Link>
    </div>
  );
};

export default AllCampusesView;
