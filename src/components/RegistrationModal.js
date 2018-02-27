import React from 'react';

import { Button, Modal } from 'reactstrap';
import { PAGE_TYPES } from '../utils/constants';
import { FirebaseAuth } from 'react-firebaseui';


const RegistrationModal = (props) => {
  const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      props.firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      props.firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccess: () => {false}
    },
    credentialHelper: 'NONE',
  };
  return (
    <Modal isOpen={props.isOpen}>
      <div className="modal-header">
        <h3 className="modal-title">Sign up / Sign in</h3>
        <Button type="button" className="close" aria-label="Close" onClick={props.onToggleRegistrationModal}>
          <span aria-hidden="true">&times;</span>
        </Button>
      </div>
      <div className="modal-body">
        <FirebaseAuth uiConfig={uiConfig} firebaseAuth={props.firebase.auth()} />
      </div>
    </Modal>
  );
}

export default RegistrationModal;