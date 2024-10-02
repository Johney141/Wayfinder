import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import LoginFormPage from './components/Authentication/LoginFormPage/LoginFormPage.jsx'
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import SignupFormPage from './components/Authentication/SignupFormPage/SignupFormPage.jsx';


function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <LoginFormPage />
      },
      {
        path: '/signup',
        element: <SignupFormPage />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
