import { useState } from 'react';
import './UpdateForm.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateArticleThunk } from '../../../store/articles';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../../../styles/quillStyles.css'

function UpdateForm() {
    const {articleId} = useParams()
    const article = useSelector(state => state.articleState.byId[articleId])
    const [title, setTitle] = useState(article.title);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const orgId = useSelector(state => state.sessionState.user.Organization.id)
    function cleanHtmlContent(html) {
        return html
            .replace(/(<br\s*\/?>){2,}/g, '<br>')                   
            .replace(/<p>(<ul>|<ol>)/g, '$1')                       
            .replace(/(<\/ul>|<\/ol>)<\/p>/g, '$1')                 
            .replace(/<p>\s*<\/p>/g, '')                            
            .replace(/<p>(<li>)/g, '$1')                            
            .replace(/<\/li>\s*<\/p>/g, '</li>')                    
            .replace(/<p><br><\/p>/g, '')                           
            .replace(/<p>\s*(<\/?(?:ul|ol|li)[^>]*>)\s*<\/p>/g, '$1') 
            .replace(/&nbsp;/g, ' ')                                
            .trim();
    }
    
    

    const cleanBody = cleanHtmlContent(article.body)
    
    const [body, setBody] = useState(article.body);
    
    
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        const cleanedBody = cleanHtmlContent(body);
        
        const articleBody = {
            title,
            body: cleanedBody
        };
        
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
                <ReactQuill
                    theme="snow"
                    value={body} 
                    onChange={setBody}  
                    placeholder="Write your article here..."
                    modules={{
                        toolbar: [
                            [{ header: [1, 2, false] }],
                            ['bold', 'italic', 'underline'],
                            [{ list: 'ordered' }, { list: 'bullet' }],
                            ['link']
                        ]
                    }}
                    formats={['header', 'bold', 'italic', 'underline', 'list', 'bullet', 'link']} 
                />
                {errors.body && <p className='error'>{errors.body}</p>}

                <button type='submit' className='article-button'>Update Article</button>
            </form>
        </div>
    )
}


export default UpdateForm