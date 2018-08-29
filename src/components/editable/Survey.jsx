import React from "react";
import { connect } from 'react-redux';

import { Survey, Model, StylesManager } from "survey-react";
import Paper from "@material-ui/core/Paper";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";

import Editable from "./Editable";
import SurveyEditor from "../editingTools/SurveyEditor";

import { saveSurveyResult } from '../../redux/actions'
import "survey-react/survey.css";

const styles = {
  header: {
    backgroundColor: '#f3f7f6',
    color: '#000',
    padding: '1rem',
  },
  h3: {
    margin: '0'
  },
  body: {
    padding: '1rem',
    borderTop: '2px solid #01b4aa'
  },
  scoreBox: {
    padding: '0.5em',
    backgroundColor: '#f3f7f6',
    textAlign: 'center',
    fontSize: '1.1rem',
    fontWeight: '700'
  },
  questionBox: {
    padding: '1rem 0.5rem',
    borderBottom: '1px solid #eee5eb',
    fontSize: '1rem',
    display: 'flex'
  },
  icon: {
    paddingRight: '1rem',
  },
  label: {
    fontWeight: '700',
    marginRight: '0.5rem'
  },
  loginPrompt: {
    padding: '0.5rem',
    textAlign: 'right',
    fontSize: '0.9rem',
  }
}

const SurveyQuestionReview = ({ question }) => (
  <div style={styles.questionBox}>
    <div style={styles.icon}>{question.isAnswerCorrect() ? <CheckIcon color="primary" /> : <ClearIcon color="secondary" />}</div>
    <div>
      <div><span style={styles.label}>Question:</span><span>{`${question.title}`}</span></div>
      <div><span style={styles.label}>Your response:</span><span>{`${question.value}`}</span></div>
      <div><span style={styles.label}>Our response:</span><span>{`${question.correctAnswer}`}</span></div>
    </div>
  </div>
)

const SurveyResults = ({ survey, isLoggedIn }) => {
  const correctAnswersCount = survey.getCorrectedAnswerCount();
  const questions = survey.getQuizQuestions();

  return (
    <Paper>
      <div style={styles.header}>
        <h3 style={styles.h3}><span>{survey.title}</span></h3>
      </div>
      <div style={styles.body}>
        <div style={styles.scoreBox}>
          {`You scored: ${correctAnswersCount} / ${questions.length}`}
        </div>
        {
          questions.map((question, index) => (
            <SurveyQuestionReview key={`question-${index}`} question={question} />
          ))
        }
        { isLoggedIn && <div style={styles.scoreBox}>You can see all your quiz results on your <a href='/dashboard'>Dashboard</a>.</div> }
      </div>
    </Paper>
  )
}


class EditableSurvey extends React.Component {
  state = { completedSurvey: null, model: null };

  handleSave = text => {
    this.props.saveChanges(() =>
      this.props.updateContent(this.props.sectionIndex, this.props.index, { text })
    );
  };

  handleComplete = completedSurvey => {
    this.setState({ completedSurvey })
    this.props.saveSurveyResult(completedSurvey, this.props.pageId);
  }

  componentDidMount() {
    StylesManager.ThemeColors.default = { ...StylesManager.ThemeColors.default,
      "$main-color": "#01b4aa", //teal
      "$main-hover-color":"#004440", // dark teal
      "$header-color": styles.header.color,
      "$header-background-color": styles.header.backgroundColor,
    }
    StylesManager.applyTheme();
    const model = new Model(this.props.text)
    this.setState({ model })
  }


  render() {
    const { text, isLoggedIn, ...rest } = this.props;

    if (this.state.completedSurvey) {
      return <SurveyResults survey={this.state.completedSurvey} isLoggedIn={isLoggedIn} />
    }

    if (!this.state.model) {
      return <div />
    }

    return (
      <Editable
        editor={SurveyEditor}
        handleSave={this.handleSave}
        content={{ text: text }}
        surveyEditor={true}
        {...rest}
      >
        {
          !isLoggedIn && <div style={styles.loginPrompt}>Please log in if you want to save your quiz results.</div>
        }
        <Paper>
          <Survey
            model={this.state.model}
            onComplete={this.handleComplete}
          />
        </Paper>
      </Editable>
    );
  }
};

const mapDispatchToProps = dispatch => {
  return {
    saveSurveyResult: (survey, pageId) => {
      dispatch(saveSurveyResult(survey, pageId))
    }
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.adminTools.isLoggedIn,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditableSurvey);
