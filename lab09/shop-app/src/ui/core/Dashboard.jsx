import { Link } from "react-router-dom";

const Dashboard = () => {
    return ( 
        <div>
            <Link to="users"><span>Users </span></Link>
            <Link to="products"><span>Products </span></Link>
        </div>
     );
}
 
export default Dashboard;