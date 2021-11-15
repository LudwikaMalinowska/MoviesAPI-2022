
import {incrementCounterAction, startCounterAction, stopCounterAction} from "./actions/CounterActions"
import { connect } from "react-redux";


const Counter = ({ counter, incrementCounterAction,
startCounterAction, stopCounterAction } ,props) => {

  return (
    <div className="counter">
      <p>{counter}</p>
      <button
        onClick={startCounterAction}
      >Start</button>
      <button onClick={() => incrementCounterAction(1)}
      >+</button>
      <button
      onClick={stopCounterAction}
      >Stop</button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
      counter: state.counter,
      counting: state.counting
  };
}

const mapDispatchToProps = {
  incrementCounterAction,
  startCounterAction,
  stopCounterAction
}


export default connect(mapStateToProps, mapDispatchToProps)(Counter);
