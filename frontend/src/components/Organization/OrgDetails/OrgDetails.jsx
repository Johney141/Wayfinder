import { useEffect, useState } from 'react'
import './OrgDetails.css'
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../Utilities/Loading/Loading';
import { useParams } from 'react-router-dom';
import { getArticleDetailsThunk } from '../../../store/articles';

function OrgDetails() {
    const [isLoaded, setIsLoaded] = useState(false);
    const { articleId } = useParams();
    const orgId = useSelector(state => state.sessionState.user.Organization.id);
    const article = useSelector(state => state.articleState.byId[articleId]);
    const paragraphs = article.body.split('\n');

    const dispatch = useDispatch();
    
    useEffect(() => {
        const getArticleDetails = async () => {
            await dispatch(getArticleDetailsThunk(orgId, articleId))
            setIsLoaded(true);
        }

        if(!isLoaded) {
            getArticleDetails();
        }
    }, [isLoaded]);

    if(!isLoaded) {
        return <Loading />
    }

    return (
        <div className='detail-container'>
            <h1>{article.title}</h1>
            <div className='article-container'>
            {paragraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
            ))}
            </div>
            <h3>Comments</h3>
            <div className='comments-container'>
                {article.Comments.map(comment => (
                <div
                    className='comment'
                    key={comment.id}
                >
                    <p>{comment.comment}</p>
                    <p className='author'>{comment.User.firstName} {comment.User.lastName}</p>
                </div>
                ))}
            </div>
        </div>
    )
}

export default OrgDetails