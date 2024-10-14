import { useState } from 'react';
import * as sessionActions from '../../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function CreateUser() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isAdmin, setIsAdmin] = useState(false)
    const [errors, setErrors] = useState({});
    const org = useSelector(state => state.sessionState.user.Organization)
    const orgId = org.id

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
          setErrors({});
          console.log("Trying to submit....")
          return dispatch(
            sessionActions.createUser(orgId, {
              email,
              firstName,
              lastName,
              password,
              isAdmin
            })
          )
          .then(() => {
            navigate(`/${orgId}/home`);
            })
          .catch(async (res) => {
            const data = res
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
            <h1 className='title'>{org.name}</h1>
            <form onSubmit={handleSubmit} className='auth-form'>
            <h1 id='signup-title'>Create a new user for your Organization</h1> 
            <h4 className='signup-subheading'>New User Information</h4>
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
            <label>
                Role
                <select
                    value={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.value === 'true')} 
                >
                    <option value={false}>User</option>
                    <option value={true}>Admin</option>
                </select>
            </label>

            <button type="submit" className='auth-button'>Create User</button>
            </form>
        </div>
    );
}

export default CreateUser