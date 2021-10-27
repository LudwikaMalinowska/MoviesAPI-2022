import { connect } from "react-redux";

const Dashboard = () => {

    return (
        <div>Dashboard</div>
    )
}

const mapStateToProps = (state) => {
    return {
        state
    }
}

export default connect(mapStateToProps, null)(Dashboard);