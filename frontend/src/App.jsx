import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import LoginFormPage from './components/Authentication/LoginFormPage/LoginFormPage.jsx'
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import * as sessionActions from './store/session.js'
import SignupFormPage from './components/Authentication/SignupFormPage/SignupFormPage.jsx';
import OrgLayout from './components/Organization/OrgLayout/OrgLayout.jsx';
import OrgHome from './components/Organization/OrgHome/OrgHome.jsx';
import OrgSearch from './components/Organization/OrgSearch/OrgSearch.jsx';
import OrgDetails from './components/Organization/OrgDetails/OrgDetails.jsx';
import ArticleForm from './components/Organization/ArticleForm/ArticleForm.jsx';
import UpdateForm from './components/Organization/UpdateForm/UpdateForm.jsx';
import CreateUser from './components/Authentication/CreateUser/CreateUser.jsx';


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
        path: 'signup',
        element: <SignupFormPage />
      },
      {
        path: ':orgId',
        element: <OrgLayout />,
        children: [
          {
            path: 'home',
            element: <OrgHome />
          },
          {
            path: 'create-user',
            element: <CreateUser />
          },
          {
            path: 'articles/search',
            element: <OrgSearch />
          }, 
          {
            path: 'articles/create',
            element: <ArticleForm />
          },
          {
            path: 'articles/:articleId',
            element: <OrgDetails /> 
          },
          {
            path: 'articles/:articleId/edit',
            element: <UpdateForm />
          },
        ]
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
