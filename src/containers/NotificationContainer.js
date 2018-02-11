import React from 'react';
import { connect } from 'react-redux';
import { closeNotification } from '../redux/actions';

import { Alert } from 'reactstrap';

function mapStateToProps(state) {
  return {
    notificationMessage: state.notifications.message,
    notificationColor: state.notifications.color
  }
}

function mapDispatchToProps(dispatch) {
  return {
    closeNotification: () => {
      dispatch(closeNotification())
    }
  }
}

const styles = {
  container: {
    position: 'fixed',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: '10px',
    zIndex: '2'
  },
  alert: {
    minWidth: '50vw'
  }
}

const NotificationContainer = (props) => {
  const showNotification = !!props.notificationMessage

  return (
    <div className='notification-container' style={styles.container}>
      <Alert color={props.notificationColor} isOpen={showNotification} toggle={props.closeNotification} style={styles.alert}>
        {props.notificationMessage}
      </Alert>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationContainer)
