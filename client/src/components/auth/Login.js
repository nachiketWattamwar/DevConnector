import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { login } from "../../actions/auth";
import { connect } from "react-redux";
import PropTypes from "prop-types";
const Login = ({ login, auth }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    console.log("SUCCESS");
    login(email, password);
  };
  console.log("==============auth==============", auth);

  if (auth.isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }
  return (
    <Fragment>
      <h1 className='large text-primary'>Sign In</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Sign Into Your Account
      </p>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            minLength='6'
            value={password}
            onChange={e => onChange(e)}
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Login' />
      </form>
      <p className='my-1'>
        Don't have an account? <Link to='/Register'>Register</Link>
      </p>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  auth: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { login }
)(Login);
