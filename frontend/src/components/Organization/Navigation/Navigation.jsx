import { useSelector } from "react-redux";
import { useNavigate, } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import './Navigation.css'
import { useState } from "react";
import ProfileButton from "./ProfileButton";

function Navigation() {
    const user = useSelector(state => state.sessionState.user);
    const [search, setSerach] = useState('')
    const orgId = useSelector(state => state.sessionState.user.Organization.id);
    const orgName = user.Organization.name;
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        const trimmedSearch = search.trim();
        if(trimmedSearch) {
            navigate(`/${orgId}/search?q=${trimmedSearch}`)
        }
        setSerach('')
    }

    return (
        <nav className="nav-bar">
            <h3 
                id="org-title"
                onClick={() => navigate(`/${orgId}/home`)}>
                    {orgName}
            </h3>
            <form className="search-wrapper" onSubmit={handleSearch}>
                <input 
                    type="search"
                    id="search-bar"
                    value={search}
                    placeholder="Type your search here..."
                    onChange={(e) => setSerach(e.target.value)}
                />
                <IoIosSearch id="search-icon" onClick={handleSearch}/>
            </form>
            <ProfileButton />
        </nav>
    );
}

export default Navigation