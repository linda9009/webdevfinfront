import { Link } from "react-router-dom";

const StudentView = (props) => {
  const { student } = props;
  if (!student.campus){
    return(
      <div>
      <h1>{student.firstname + " " + student.lastname}</h1>
      <h3>{student.email}</h3>
      <img src={student.imageUrl} alt="Image"/>
      <p>{student.gpa}</p>
      <div>This student is currently not enrolled in a school.</div>
      <Link to={`${student.id}/editstudent`}>
        <button>Edit Student</button>
      </Link>
      </div>
    );
  }
  return (
    <div>
      <h1>{student.firstname + " " + student.lastname}</h1>
      <h3>{student.email}</h3>
      <img src={student.imageUrl} alt="Image"/>
      <p>{student.gpa}</p>
      <div key={student.campus.id}>
          <Link to={`/campuses/${student.campus.id}`}>
            <h3>{student.campus.name}</h3>
          </Link>
        </div>
        <Link to={`${student.id}/editstudent`}>
        <button>Edit Student</button>
      </Link>
    </div>
  );

};

export default StudentView;