import React from 'react';
import { toast } from 'react-toastify';
import jwt from 'jsonwebtoken';

class ActivateAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      name: '',
      buttonText: 'Click Here to activate your account',
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

  submitForm = (e) => {
    e.preventDefault();

    this.setState({
      buttonText: `Activating Account...`,
    });
  };

  render() {
    return (
      <div className='activate-account-container'>
        <div className='activate-account-message'>
          Hey {this.state.name}!, Ready to activate your account?
        </div>
        <form className='form-body' onSubmit={this.submitForm}>
          <input
            className='submit-button activate-account-button'
            type='submit'
            value={this.state.buttonText}
          />
        </form>
      </div>
    );
  }
}

export default ActivateAccount;
