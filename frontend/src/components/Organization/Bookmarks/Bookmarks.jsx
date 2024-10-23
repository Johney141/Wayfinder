import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { getUserBookmarksThunk } from "../../../store/bookmarks";
import Loading from "../../Utilities/Loading/Loading";
import './Bookmarks.css'



function Bookmark() {
    const [isLoaded, setIsLoaded] = useState(false);
    const orgId = useSelector(state => state.sessionState.user.Organization.id);
    const bookmarks = useSelector(state => state.bookmarkState.allBookmarks)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const getUserBookmarks = async () => {
            await dispatch(getUserBookmarksThunk(orgId))
            setIsLoaded(true);
        };

        if(!isLoaded) {
            getUserBookmarks();
        }
    }, [isLoaded, dispatch, orgId])
    
    if(!isLoaded) {
        return <Loading />
    }

    return (
        <div className="sidebar-container">
            <h1>Bookmarks</h1>
            <div className="bookmark-container">
                {bookmarks.map(bookmark => (
                    <div 
                        className='article' 
                        key={bookmark.id}
                        onClick={() => navigate(`/${orgId}/articles/${bookmark.Article.id}`)}
                    >
                        <p>{bookmark.Article.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );

}

export default Bookmark