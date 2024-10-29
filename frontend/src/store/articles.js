import { csrfFetch } from "./csrf";
const GET_SEARCH_ARTICLES = 'articles/getSearchArticles';
const GET_RECENT_ARTICLES = 'articles/getRecentArticles';
const GET_ARTICLE_DETAILS = 'articles/getArticleDetails';
const CREATE_ARTICLE = 'articles/createArticle';
const UPDATE_ARTICLE = 'articles/updateArticle';
const DELETE_ARTICLE = 'articles/deleteArticle';
const CREATE_COMMENT = 'comments/createComment';
const UPDATE_COMMENT = 'comments/updateComment';
const DELETE_COMMENT = 'comments/deleteComment';
const CREATE_REACTION = 'reactions/createReaction';
const UPDATE_REACTION = 'reactions/updateReaction';
const DELETE_REACTION = 'reactions/deleteReaction'

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

const updateArticle = (article) => {
    return {
        type: UPDATE_ARTICLE,
        payload: article
    }
}

const deleteArticle = (article) => {
    return {
        type: DELETE_ARTICLE,
        payload: article
    }
}

const createComment = (comment) => {
    return {
        type: CREATE_COMMENT,
        payload: comment
    }
}

const updateComment = (comment) => {
    return {
        type: UPDATE_COMMENT,
        payload: comment
    }
}

const deleteComment = (comment) => {
    return {
        type: DELETE_COMMENT,
        payload: comment
    }
}

const createReaction = (reaction) => {
    return {
        type: CREATE_REACTION,
        payload: reaction
    }
}
const updateReaction = (reaction) => {
    return {
        type: UPDATE_REACTION,
        payload: reaction
    }
}
const deleteReaction = (reaction) => {
    return {
        type: DELETE_REACTION,
        payload: reaction
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
            console.log(article)
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

export const updateArticleThunk = (orgId, articleId, articleBody) => async (dispatch) => {
    try {
        const options = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(articleBody)
        };

        const res = await csrfFetch(`/api/articles/${orgId}/${articleId}`, options);
        
        if(res.ok) {
            const article = await res.json();
            dispatch(updateArticle(article))
            return article
        } else {
            throw res;
        }
    } catch (error) {
        const err = await error.json();
        return err;
    }
}

export const deleteArticleThunk = (orgId, articleId) => async (dispatch) => {
    try {
        const options = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        };
        const res = await csrfFetch(`/api/articles/${orgId}/${articleId}`, options);

        if(res.ok) {
            const article = await res.json();
            dispatch(deleteArticle(article))
            return article
        } else {
            throw res;
        }
    } catch (error) {
        const err = await error.json();
        return err;
    }
}

export const createCommentThunk = (orgId, articleId, commentBody) => async (dispatch) => {
    try {
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(commentBody)
        };

        const res = await csrfFetch(`/api/comments/${orgId}/${articleId}`, options);
        if(res.ok) {
            const comment = await res.json();
            dispatch(createComment(comment))
            return comment
        } else {
            throw res;
        }

    } catch (error) {
        const err = await error.json();
        return err;
    }
}

export const updateCommentThunk = (orgId, commentId, commentBody) => async (dispatch) => {
    try {
        const options = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(commentBody)
        };

        const res = await csrfFetch(`/api/comments/${orgId}/${commentId}`, options);

        if(res.ok) {
            const comment = await res.json();
            dispatch(updateComment(comment))
            return comment
        } else {
            throw res;
        }
    } catch (error) {
        const err = await error.json();
        return err;
    }
}

export const deleteCommentThunk = (orgId, commentId) => async (dispatch) => {
    try {
        const options = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        };
        const res = await csrfFetch(`/api/comments/${orgId}/${commentId}`, options);

        if(res.ok) {
            const comment = await res.json();
            dispatch(deleteComment(comment))
            return comment
        } else {
            throw res;
        }
    } catch (error) {
        const err = await error.json();
        return err;
    }
}

export const createReactionThunk = (orgId, articleId, type) => async (dispatch) => {
    try {
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(type)
        };
        const res = await csrfFetch(`/api/reactions/${orgId}/${articleId}`, options);
        if(res.ok) {
            const reaction = await res.json();
            dispatch(createReaction(reaction))
            return reaction
        } else {
            throw res;
        }

    } catch (error) {
        const err = await error.json();
        return err;
    }
}
export const updateReactionThunk = (orgId, reactionId, type) => async (dispatch) => {
    try {
        const options = {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(type)
        };
        const res = await csrfFetch(`/api/reactions/${orgId}/${reactionId}`, options);
        if(res.ok) {
            const reaction = await res.json();
            dispatch(updateReaction(reaction));
            return reaction;
        } else {
            throw res;
        }
    } catch (error) {
        const err = await error.json();
        return err;
    }
};

export const deleteReactionThunk = (orgId, reactionId) => async (dispatch) => {
    try {
        const options = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        };
        const res = await csrfFetch(`/api/reactions/${orgId}/${reactionId}`, options);
        if(res.ok) {
            const reaction = await res.json();
            dispatch(deleteReaction(reaction.reaction));
            return reaction;
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
            newState.allArticles = [action.payload];
            newState.byId[action.payload.id] = action.payload;
            return newState
        case CREATE_ARTICLE: 
            newState = {...state};

            newState.allArticles = [...newState.allArticles, action.payload];

            newState.byId = {...newState.byId, [action.payload.id]: action.payload};
            return newState
        case UPDATE_ARTICLE: {
            newState = {...state};
            console.log(newState)

            const updatedAllArticles = newState.allArticles.map(article =>
                article.id === action.payload.id ? action.payload : article
            );
            newState.allArticles = updatedAllArticles;

            newState.byId = {...newState.byId, [action.payload.id]: action.payload};

            return newState;
        }
        case DELETE_ARTICLE: 
            newState = {...state};

            newState.allArticles = newState.allArticles.filter(article => {
                article.id !== action.payload.article.id
            })

            delete newState.byId[action.payload.article.id]

            return newState
        case CREATE_COMMENT: 
            newState = {...state};
            newState.allArticles = newState.allArticles.map(article => {
                if(article.id === action.payload.articleId) {
                    return {
                        ...article,
                        Comments: [...article.Comments, action.payload]
                    }
                } else {
                    return article
                }
            });

            newState.byId = {
                ...newState.byId,
                [action.payload.articleId]: {
                    ...newState.byId[action.payload.articleId],
                    Comments: [...newState.byId[action.payload.articleId].Comments, action.payload]
                }
            };

            return newState;
        case UPDATE_COMMENT: 
            newState = {...state};

            newState.allArticles = newState.allArticles.map(article => {
                if(article.id === action.payload.articleId) {
                    return {
                        ...article,
                        Comments: article.Comments.map(comment => {
                            return comment.id === action.payload.id ? action.payload : comment;
                        })
                    }
                } else {
                    return article
                }
            });

            newState.byId = {...newState.byId, [action.payload.articleId]: {
                ...newState.byId[action.payload.articleId],
                Comments: newState.byId[action.payload.articleId].Comments.map(comment => {
                    return comment.id === action.payload.id ? action.payload : comment;
                })
            }}
            return newState
        case DELETE_COMMENT: 
            newState = {...state};

            newState.allArticles = newState.allArticles.map(article => {
                if(article.id === action.payload.comment.articleId) {
                    return {
                        ...article,
                        Comments: article.Comments.filter(comment => {
                            comment.id !== action.payload.comment.id;
                        })
                    }
                } else {
                    return article
                }
            })

            newState.byId = {
                ...newState.byId,
                [action.payload.comment.articleId]: {
                    ...newState.byId[action.payload.comment.articleId],
                    Comments: newState.byId[action.payload.comment.articleId].Comments.filter(comment => 
                        comment.id !== action.payload.comment.id)
                }
            };
            return newState;
        case UPDATE_REACTION:
        case CREATE_REACTION: 
            newState = {...state};
            newState.allArticles = newState.allArticles.map(article => {
                if(article.id === action.payload.articleId) {
                    return {
                        ...article,
                        Reactions: {...article.Reactions, UserReaction: action.payload}
                    }
                } else {
                    return article
                }
            });

            newState.byId = {
                ...newState.byId,
                [action.payload.articleId]: {
                    ...newState.byId[action.payload.articleId],
                    Reactions: {...newState.byId[action.payload.articleId].Reactions, UserReaction: action.payload}
                }
            };

            return newState;
        case DELETE_REACTION:
            newState = {...state};
            newState.allArticles = newState.allArticles.map(article => {
                if(article.id === action.payload.articleId) {
                    return {
                        ...article,
                        Reactions: {...article.Reactions, UserReaction: null}
                    }
                } else {
                    return article
                }
            });

            newState.byId = {
                ...newState.byId,
                [action.payload.articleId]: {
                    ...newState.byId[action.payload.articleId],
                    Reactions: {...newState.byId[action.payload.articleId].Reactions, UserReaction: null}
                }
            };

            return newState;
        default:
            return state
    }
}

export default articleReducer