import { useEffect, useState } from 'react';
import * as sessionActions from '../../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './LoginFormPage.css'


function LoginFormPage() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const user = useSelector(state => state.sessionState.user);
  const navigate = useNavigate();

  useEffect(() => {
    if(user) {
      const orgId = user.Organization.id;
      navigate(`/${orgId}/home`)
    }
  })

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

  const handleDemo = async (e) => {
    e.preventDefault();
    return dispatch(sessionActions.login({credential:'demo@user.io', password:'password'}))
  }

  return (
    <div className='auth-container'>
      <h1 className='title' onClick={() => navigate('/')}>Wayfinder</h1>
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
            Aren&apos;t signed up yet? Click here to create an Organization
        </p>
        <button type="submit" className='auth-button'>Log In</button>
        <div className='demo-container'>
          <button
            onClick={e => handleDemo(e)}
            id='demoButton'
          >Login as Demo User</button>
        </div>
      </form>
    </div>
  );
}

export default LoginFormPage;