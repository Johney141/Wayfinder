import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RxHamburgerMenu } from "react-icons/rx";
import * as sessionActions from '../../../store/session';
import './ProfileButton.css'
import { useNavigate } from 'react-router-dom';

function ProfileButton() {
  const user = useSelector(state => state.sessionState.user)
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const navigate = useNavigate();

  const toggleMenu = (e) => {
    e.stopPropagation(); 
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  // const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    navigate('/')
  };

  const handleMangeSpots = (e) => {
    e.preventDefault();
    navigate('/spots/current')
  }

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div className='profile'>
      <button onClick={toggleMenu} className='dropdown-menu'>
        <RxHamburgerMenu />
      </button>
      <div className={ulClassName} ref={ulRef}>
          <div className='user-container'>
            <div className='user-info'>
              <p>Hello, {user.firstName}</p>
              <p>{user.email}</p>
            </div>
            <div>
              <button
                onClick={handleMangeSpots}
                id='manageSpots'
              >
                Profile
              </button>
            </div>
            <div>
              <button 
                onClick={logout} 
                id='logoutButton'>
                Log Out
              </button>
            </div>
          </div>
      </div>
    </div>
  );
}

export default ProfileButton;