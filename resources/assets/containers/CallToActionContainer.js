import { connect } from 'react-redux';
import CallToActionBlock from '../components/CallToActionBlock';
import { clickedSignUp } from '../actions';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = (state) => {
  return {
    campaign: state.campaign,
    signups: state.signups,
    user: state.user,
  };
};

/**
 * Provide pre-bound functions that allow the component to dispatch
 * actions to the Redux store as props for this component.
 */
const actionCreators = {
  clickedSignUp,
};

// Export the container component.
export default connect(mapStateToProps, actionCreators)(CallToActionBlock);