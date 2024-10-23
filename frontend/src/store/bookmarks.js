
import { csrfFetch } from "./csrf";
const GET_USER_BOOKMARKS = 'bookmarks/getUserBookmarks'

// Action Creators
const getUserBookmarks = (bookmarks) => {
    return {
        type: GET_USER_BOOKMARKS,
        payload: bookmarks
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
        default: 
            return state;
    }
}

export default bookmarkReducer;