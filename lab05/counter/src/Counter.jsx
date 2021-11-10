
import {incrementCounterAction} from "./actions/CounterActions"
import { connect } from "react-redux";


const Counter = ({ counter, incrementCounterAction } ,props) => {

  return (
    <div className="counter">
      <p>{counter}</p>
      <button onClick={() => incrementCounterAction(1)}
      >+</button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
      counter: state
  };
}

const mapDispatchToProps = {
  incrementCounterAction
}


export default connect(mapStateToProps, mapDispatchToProps)(Counter);
