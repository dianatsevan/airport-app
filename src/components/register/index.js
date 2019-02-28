import React from 'react';
import { Form, Field } from "react-final-form";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './material.style';
import TextField from '../text-field';
import {onSubmit} from '../../services/register-service';
import './index.scss';
import '../../styles/button.scss';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    }
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  // onSubmit = async values => {
  //   const e = JSON.stringify(values);
  //   localStorage.setItem("event", e);
  // };

  validate = values => {
    const errors = {};
    if (!values.firstName) {
      errors.firstName = "Required";
    }
    if (!values.lastName) {
      errors.lastName = "Required";
    }
    if (!values.email) {
      errors.email = "Required";
    }
    if (!values.password) {
      errors.password = "Required";
    }
    return errors;
  };

  render() {
    return (
      <Form 
        onSubmit={onSubmit}
        validate={this.validate}
        render={({ handleSubmit }) => (
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="register-form__container">
              <Field
                name="firstName"
                component={TextField}
                type="text"
                label="First Name"
                margin="dense"
              />
              <Field
                name="lastName"
                component={TextField}
                type="text"
                label="Last Name"
                margin="dense"
              />
              <Field
                name="email"
                component={TextField}
                type="email"
                label="Email"
                margin="dense"
              />
              <Field
                name="password"
                component={TextField}
                type="password"
                label="Password"
                margin="dense"
              />

              <button className="button" type="submit">
                Submit
              </button>
            </div>
          </form>
        )}
      />
    );
  }
}

export default withStyles(styles)(Register);