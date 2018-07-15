import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';

import { updateSectionContent } from '../redux/actions'
import InnerContentContainer from '../containers/InnerContentContainer';


const styles = {
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
}

const mapStateToProps = (state) => {
  return {
    isEditingPage: state.adminTools.isEditingPage,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateSectionContent: (sectionIndex, contentIndex, newContent) => {
      dispatch(updateSectionContent(sectionIndex, contentIndex, newContent))
    }
  }
}

const CallToActionContainer = (props) => {
  return (
    <section className={`call-to-action ${props.classes}`}>
      <Grid container style={styles.container} justify="center">
          <Grid item xs={12} sm={10} md={8}>
            <InnerContentContainer
              sectionIndex={props.index}
              content={props.content}
              onUpdate={props.onUpdateSectionContent}
            />
        </Grid>
      </Grid>
    </section>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(CallToActionContainer);