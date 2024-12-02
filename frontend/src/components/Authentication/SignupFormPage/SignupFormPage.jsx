import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../../store/session';
import './SignupFormPage.css'
import { useNavigate } from 'react-router-dom';

function SignupFormPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("")
  const user = useSelector(state => state.sessionState.user);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if(user) {
      const orgId = user.Organization.id;
      navigate(`/${orgId}/home`)
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          firstName,
          lastName,
          password,
          name
        })
      ).catch(async (res) => {
        const data = await res.json();
        if (data?.errors) {
          setErrors(data.errors);
        }
      });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  return (
    <div className='auth-container'>
      <h1 className='title' onClick={() => navigate('/')}>Wayfinder</h1>
      <form onSubmit={handleSubmit} className='auth-form'>
        <h1 id='signup-title'>Sign Up</h1>
        <h4 className='signup-subheading'>Your Information</h4>
        <label
        className='auth-input'
        >
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label
        className='auth-input'
        >
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        {errors.firstName && <p>{errors.firstName}</p>}
        <label
        className='auth-input'>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        {errors.lastName && <p>{errors.lastName}</p>}
        <label
        className='auth-input'>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <label
        className='auth-input'>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        <h4 className='signup-subheading'>Your Organization</h4>
        <label
        className='auth-input'>
          Organization Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}

        <p 
          onClick={() => navigate('/login')}
          id='signup-link'>
            Already signed up? Click here to login
        </p>

        <button type="submit" className='auth-button'>Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormPage;