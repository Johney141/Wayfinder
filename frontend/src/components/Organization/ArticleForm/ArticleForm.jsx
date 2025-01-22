import { useState } from 'react';
import './ArticleForm.css';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, } from 'react-instantsearch';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createArticleThunk } from '../../../store/articles';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../../../styles/quillStyles.css'
import TagSearchBox from './Tags/CustomSearch';
import { MdOutlineCancel } from "react-icons/md";



const client = algoliasearch(
  import.meta.env.MODE === 'production'
    ? import.meta.env.VITE_PROD_ALGOLIA_APP_ID  
    : import.meta.env.VITE_DEV_ALGOLIA_APP_ID, 
  import.meta.env.MODE === 'production'
    ? import.meta.env.VITE_PROD_ALGOLIA_SEARCH_API_KEY
    : import.meta.env.VITE_DEV_ALGOLIA_SEARCH_API_KEY
);

function ArticleForm() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [tags, setTags] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const orgId = useSelector(state => state.sessionState.user.Organization.id);

    const handleChange = (content) => {
        setBody(content)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        
        const articleBody = {
            title,
            body
        };
    
        const article = await dispatch(createArticleThunk(orgId, articleBody));
    
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
    const handleTagAdd = (newTag) => {
        if (!tags.includes(newTag)) {
          setTags([...tags, newTag]);
        }
    };
    const removeTag = (tagToRemove) => {
        setTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove))
    }
    return (
        <div className='page-container'>
            <h1>Create a new Article</h1>
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
                <InstantSearch indexName={`org_${orgId}_articles`} searchClient={client}>
                <div className='tag-container'>
                    <TagSearchBox onTagAdd={handleTagAdd}/>

                    {tags.map(tag => (
                        <div>
                            {tag}
                            <MdOutlineCancel onClick={() => removeTag(tag)}/>
                        </div>
                    ))}
                </div>


                </InstantSearch>
                <ReactQuill
                    theme="snow"
                    value={body} 
                    onChange={handleChange} 
                    placeholder="Write your article here..."
                    modules={{
                        toolbar: [
                            [{ header: [1, 2, false] }],
                            ['bold', 'italic', 'underline'],
                            [{ list: 'ordered' }, { list: 'bullet' }],
                            ['link']
                        ]
                    }}
                />
                {errors.body && <p className='error'>{errors.body}</p>}

                <button type='submit' className='article-button'>Create Article</button>
            </form>
        </div>
    );
}


export default ArticleForm;