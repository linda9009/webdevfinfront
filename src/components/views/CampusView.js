import { Link } from "react-router-dom";

const CampusView = (props) => {
  const {campus} = props;
  if (!campus.students.length){
    return (
      <div>      
      <h1>{campus.name}</h1>
      <img src={campus.imageUrl} alt="Campus"/>
      <p>{campus.address}</p>
      <h3>{campus.description}</h3>
    <div>There are currently no students enrolled.</div>
    <Link to={`${campus.id}/editcampus`}>
        <button>Edit Campus</button>
      </Link>
    </div>
    );}
  return (
    <div>      
      <h1>{campus.name}</h1>
      <img src={campus.imageUrl} alt="Campus"/>
      <p>{campus.address}</p>
      <h3>{campus.description}</h3>
      <Link to={`${campus.id}/editcampus`}>
        <button>Edit Campus</button>
      </Link>

      <ul>
      {campus.students.map( student => {
        let name = student.firstname + " " + student.lastname;
        return (
          <li key={student.id}><Link to={`/student/${student.id}`}>{name}</Link></li>
        );
      })}
      </ul>
    </div>
  );
    
    
};

export default CampusView;