import { csrfFetch } from "./csrf";
const GET_SEARCH_ARTICLES = 'articles/getSearchArticles';
const GET_RECENT_ARTICLES = 'articles/getRecentArticles';

// Action Creators
const getSearchArticles = (articles) => {
    return {
        type: GET_SEARCH_ARTICLES,
        payload: articles
    }
}

const getRecentArticles = (articles) => {
    return {
        type: GET_RECENT_ARTICLES,
        payload: articles
    }
}



// Thunks
export const getSearchArticlesThunk = (orgId, search) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/articles/${orgId}/search?q=${search}`);
        
        if(res.ok) {
            const articles = await res.json();
            dispatch(getSearchArticles(articles));
        } else {
            throw res;
        }
    } catch (error) {
        const err = await error.json();
        return err;
    }
}

export const getRecentArticlesThunk = (orgId) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/articles/${orgId}/recent`);

        if(res.ok) {
            const articles = await res.json();
            dispatch(getRecentArticles(articles))
        }
    } catch (error) {
        const err = await error.json();
        return err;
    }
}
// Reducer

const initialState = {
    allArticles: [],
    byId: {}
}

const articleReducer = (state=initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_SEARCH_ARTICLES: 
            newState = {...state};
            newState.allArticles = action.payload.Articles;

            for (let article of action.payload.Articles) {
                newState.byId[article.id] = article;
            }
            return newState;
        case GET_RECENT_ARTICLES:
            newState = {...state};
            newState.allArticles = action.payload.Articles;

            for (let article of action.payload.Articles) {
                newState.byId[article.id] = article;
            }
            return newState;
        default:
            return state
    }
}

export default articleReducer