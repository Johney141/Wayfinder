
import { csrfFetch } from "./csrf";
const GET_USER_BOOKMARKS = 'bookmarks/getUserBookmarks';
const CREATE_BOOKMARK = 'bookmarks/createBookmark';
const DELETE_BOOKMARK = 'bookmarks/deleteBookmark';

// Action Creators
const getUserBookmarks = (bookmarks) => {
    return {
        type: GET_USER_BOOKMARKS,
        payload: bookmarks
    }
}

const createBookmark = (bookmark) => {
    return {
        type: CREATE_BOOKMARK,
        payload: bookmark
    }
}

const deleteBookmark = (bookmark) => {
    return {
        type: DELETE_BOOKMARK,
        payload: bookmark
    }
}

// Thunks
export const getUserBookmarksThunk = (orgId) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/bookmarks/${orgId}/current`);

        if(res.ok) {
            const bookmarks = await res.json();
            dispatch(getUserBookmarks(bookmarks))
        } else {
            throw res;
        }
    } catch (error) {
        const err = await error.json();
        return err;
    }
}

export const createBookmarkThunk = (orgId, articleId) => async (dispatch) => {
    try {
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}
        };
        const res = await csrfFetch(`/api/bookmarks/${orgId}/${articleId}`, options);

        if (res.ok) {
            const bookmark = await res.json();
            dispatch(createBookmark(bookmark))
            return bookmark;
        } else {
            throw res;
        }
    } catch (error) {
        const err = await error.json();
        return err;
    }
}

export const deleteBookmarkThunk = (orgId, bookmarkId) => async (dispatch) => {
    try {
        const options = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        };
        const res = await csrfFetch(`/api/bookmarks/${orgId}/${bookmarkId}`, options);

        if (res.ok) {
            const bookmark = await res.json();
            dispatch(deleteBookmark(bookmark.bookmark));
            return bookmark;
        } else {
            throw res;
        }
    } catch (error) {
        const err = await error.json();
        return err;
    }
}

// Reducer

const initialState = {
    allBookmarks: [],
    byId: {}
}

const bookmarkReducer = (state=initialState, action) => {
    let newState
    switch (action.type) {
        case GET_USER_BOOKMARKS: 
            newState = {...state};
            newState.allBookmarks = action.payload.Bookmarks;

            for (let bookmark of action.payload.Bookmarks) {
                newState.byId[bookmark.id] = bookmark;
            }
            return newState;

        case CREATE_BOOKMARK: 
            newState = {...state}
            newState.allBookmarks = [...newState.allBookmarks, action.payload];

            newState.byId = {...newState.byId, [action.payload.id]: action.payload};
            return newState;

        case DELETE_BOOKMARK: 
            newState = {...state};
            
            newState.allBookmarks = newState.allBookmarks.filter(bookmark => {
                return bookmark.id !== action.payload.id
            });

            delete newState.byId[action.payload.id]

            return newState;
        default: 
            return state;
    }
}

export default bookmarkReducer;