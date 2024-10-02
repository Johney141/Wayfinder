import { useState } from 'react';
import * as sessionActions from '../../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './LoginFormPage.css'


function LoginFormPage() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();



  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data?.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <div className='auth-container'>
      
      <form onSubmit={handleSubmit} className='auth-form'>
        <h1 id='auth-title'>Log In</h1>
        <label
        className='auth-input'
        >
          Work Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label
        className='auth-input'
        >
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.credential && <p>{errors.credential}</p>}
        <p 
          onClick={() => navigate('/signup')}
          id='signup-link'>
            Aren't signed up yet? Click here to create an Organization
          </p>
        <button type="submit" className='auth-button'>Log In</button>
      </form>
    </div>
  );
}

export default LoginFormPage;