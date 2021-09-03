import React from 'react';
import { toast } from 'react-toastify';
import jwt from 'jsonwebtoken';

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      token: '',
      password: '',
      confirmPassword: '',
      submitButton: 'Reset Password',
    };
  }

  componentDidMount() {
    const { match } = this.props;
    let token = match.params.token;

    if (token) {
      let { name } = jwt.decode(token);
      this.setState({
        token: token,
        name: name,
      });
    }
  }

  handleChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  };

  submitForm = (e) => {
    e.preventDefault();
    const { password, confirmPassword, token } = this.state;

    if (password !== '' && password === confirmPassword) {
      this.setState({
        ...this.state,
        submitButton: `Resetting Password...`,
      });
    } else {
      if (password === '') {
        toast.warn(`Password cannot be blank`);
      } else {
        toast.error(
          `Password and Confirmed password are not same, Please Retry`
        );
      }
    }
  };

  render() {
    const { password, confirmPassword, submitButton } = this.state;
    return (
      <div className='reset-password-container'>
        <div className='form-header'>Reset Password</div>
        <div className='reset-password-message'>
          Hey {this.state.name}!, Reset your password here
        </div>
        <form className='form-body' onSubmit={this.submitForm}>
          <input
            className='form-input'
            type='password'
            name='password'
            value={password}
            placeholder='Password...'
            onChange={this.handleChange}
          />
          <input
            className='form-input'
            type='password'
            name='confirmPassword'
            value={confirmPassword}
            placeholder='Confirm Password...'
            onChange={this.handleChange}
          />
          <input
            className='submit-button forgot-password-submit-button'
            type='submit'
            value={submitButton}
          />
        </form>
      </div>
    );
  }
}

export default ResetPassword;
