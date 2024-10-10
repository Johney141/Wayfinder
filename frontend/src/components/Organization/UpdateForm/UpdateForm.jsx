import { useState } from 'react';
import './UpdateForm.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateArticleThunk } from '../../../store/articles';

function UpdateForm() {
    const {articleId} = useParams()
    const article = useSelector(state => state.articleState.byId[articleId])
    const [title, setTitle] = useState(article.title);
    const [body, setBody] = useState(article.body);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const orgId = useSelector(state => state.sessionState.user.Organization.id)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        
        const articleBody = {
            title,
            body
        };
        console.log(articleBody)
        const article = await dispatch(updateArticleThunk(orgId, articleId, articleBody));
    
        if (article?.errors) {
            if (article.errors.title) {
                if (article.errors.title.includes('unique')) {
                    article.errors.title = 'Title must be unique';
                }
            }
            setErrors(article.errors);
        } else {
            navigate(`/${orgId}/articles/${article.id}`);
        }
    };


    return (
        <div className='page-container'>
            <h1>Update an Article</h1>
            <form onSubmit={handleSubmit} className='form-container'>
                <label className='form-input'>
                    Title
                    <input 
                        id='form-title'
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder='Please enter a descriptive title for your article.'
                    />
                </label>
                {errors.title && <p className='error'>{errors.title}</p>}
                <label className='form-input'>
                    Body
                    <textarea
                        id='article-body'
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        placeholder='Please enter at least 50 characters.'
                    />
                </label>
                {errors.body && <p className='error'>{errors.body}</p>}

                <button type='submit' className='article-button'>Update Article</button>
            </form>
        </div>
    )
}


export default UpdateForm