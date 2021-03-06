import { connect } from 'react-redux';
import { PuckConnector } from '@dosomething/puck-client';
import Share from './Share';

const mapStateToProps = state => ({
  share: state.share,
  user: state.user,
});

// Export the container component.
export default connect(mapStateToProps)(PuckConnector(Share));
