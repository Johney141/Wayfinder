import { useSelector } from "react-redux";
import { Navigate, Outlet, useParams } from "react-router-dom";
import './OrgLayout.css';
import Navigation from "../Navigation/Navigation";
import Bookmark from "../Bookmarks/Bookmarks";


function OrgLayout() {
    const { orgId } = useParams();
    const compareOrgId = parseInt(orgId)
    const currentUser = useSelector(state => state.sessionState.user);
    const userOrgId = currentUser?.Organization?.id;

    if(!currentUser) {
        return <Navigate to="/" replace />;
    }


    if(compareOrgId !== userOrgId) return (
        <>
            <h1 className="Title">Wayfinder</h1>
            <div className="not-auth">You must be apart of an Organization in order to view it&apos;s content. If you are a part of this Organization please contact your Organization&apos;s admin.</div>
        </>
    )

    return (
        <>
            <Navigation />
            <div className="org-page-layout">
                <Bookmark />
                <Outlet />
            </div>
        </>
    )

}

export default OrgLayout;