import {
  REQUESTED_USER_SUBMISSIONS,
  REQUESTED_USER_SUBMISSIONS_FAILED,
  RECEIVED_USER_SUBMISSIONS,
  STORE_REPORTBACK_PENDING,
  STORE_REPORTBACK_SUCCESSFUL,
  ADD_SUBMISSION_METADATA,
  ADD_SUBMISSION_ITEM_TO_LIST
} from '../actions';

/**
 * Submissions reducer:
 */
const submissions = (state = {}, action) => {
  switch (action.type) {
    case REQUESTED_USER_SUBMISSIONS:
      return {...state, isFetching: true};

    case REQUESTED_USER_SUBMISSIONS_FAILED:
      // @TODO: add errors?
      return {...state, isFetching: false};

    case RECEIVED_USER_SUBMISSIONS:
      return {...state, isFetching: false};

    case STORE_REPORTBACK_PENDING:
      return {...state, isStoring: true};

    case STORE_REPORTBACK_SUCCESSFUL:
      return {...state, isStoring: false};

    case ADD_SUBMISSION_METADATA:
      return {
        ...state,
        reportback: {
          id: action.id || action.reportback.id,
          flagged: action.reportback.flagged || null,
          quantity: parseInt(action.reportback.impact) || parseInt(action.reportback.quantity),
          whyParticipated: action.reportback.whyParticipated ||action.reportback.why_participated,
        },
      };

    case ADD_SUBMISSION_ITEM_TO_LIST:
      return {...state, items: [action.reportbackItem, ...state.items]}

    default:
      return state;
  }
}

export default submissions;