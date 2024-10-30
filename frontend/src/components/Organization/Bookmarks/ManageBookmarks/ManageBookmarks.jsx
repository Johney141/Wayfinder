import { FaRegBookmark, FaBookmark  } from "react-icons/fa";
import './ManageBookmarks.css'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBookmarkThunk, deleteBookmarkThunk } from "../../../../store/bookmarks";


function ManageBookmarks({articleId}) {

    const user = useSelector(state => state.sessionState.user)
    const orgId = user.Organization.id
    const bookmarks = useSelector(state => state.bookmarkState.allBookmarks);
    const articleBookmark = bookmarks.find(bookmark => {
        return bookmark.userId === user.id && bookmark.articleId === articleId
    })
    const initalBookmark = !!articleBookmark;

    
    const [isBookmarked, setIsBookmarked] = useState(initalBookmark)

    
    const dispatch = useDispatch();

    const handleToggleBookmark = async () => {
        if(isBookmarked) {
            await dispatch(deleteBookmarkThunk(orgId, articleBookmark.id))
        } else {
            await dispatch(createBookmarkThunk(orgId, articleId))
        }

        setIsBookmarked(!isBookmarked)
    }

    return (
        <div className="bookmark-icon" onClick={handleToggleBookmark} >
            {isBookmarked ? <FaBookmark id="bookmark-icon" /> : <FaRegBookmark /> }
        </div>
    )
}

export default ManageBookmarks