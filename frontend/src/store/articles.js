import { csrfFetch } from "./csrf";
const GET_SEARCH_ARTICLES = 'articles/getSearchArticles';
const GET_RECENT_ARTICLES = 'articles/getRecentArticles';
const GET_ARTICLE_DETAILS = 'articles/getArticleDetails';
const CREATE_ARTICLE = 'articles/createArticle';

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

const getArticleDetails = (article) => {
    return {
        type: GET_ARTICLE_DETAILS,
        payload: article
    }
}

const createArticle = (article) => {
    return {
        type: CREATE_ARTICLE,
        payload: article
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
        } else {
            throw res
        }
    } catch (error) {
        const err = await error.json();
        return err;
    }
}

export const getArticleDetailsThunk = (orgId, articleId) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/articles/${orgId}/${articleId}`);
        if(res.ok) {
            const article = await res.json();
            dispatch(getArticleDetails(article))
        } else {
            throw res
        }
    } catch (error) {
        const err = await error.json();
        return err;
    }
}

export const createArticleThunk = (orgId, articleBody) => async (dispatch) => {
    try {
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(articleBody)
        };

        const res = await csrfFetch(`/api/articles/${orgId}`, options);
        
        if(res.ok) {
            const article = await res.json();
            dispatch(createArticle(article))
            return article
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
    allArticles: [],
    byId: {}
}

const articleReducer = (state=initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_SEARCH_ARTICLES: 
        case GET_RECENT_ARTICLES:
            newState = {...state};
            newState.allArticles = action.payload.Articles;

            for (let article of action.payload.Articles) {
                newState.byId[article.id] = article;
            }
            return newState;
        case GET_ARTICLE_DETAILS: 
            newState = {...state};
            newState.allArticles = action.payload;
            newState.byId[action.payload.id] = action.payload;
            return newState
        case CREATE_ARTICLE: 
            newState = {...state};

            newState.allArticles = [...newState.allArticles, action.payload];

            newState.byId = {...newState.byId, [action.payload.id]: action.payload};
            return newState
        default:
            return state
    }
}

export default articleReducer