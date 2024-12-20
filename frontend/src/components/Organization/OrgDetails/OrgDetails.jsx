import { useEffect, useState } from 'react'
import './OrgDetails.css'
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../Utilities/Loading/Loading';
import { useNavigate, useParams } from 'react-router-dom';
import { getArticleDetailsThunk } from '../../../store/articles';
import { CiEdit, CiTrash } from "react-icons/ci";
import OpenModalButton from '../../OpenModalButton/OpenModalButton';
import DeleteArticle from '../DeleteArticle/DeleteArticle';
import CreateComment from '../Comments/CreateComment/CreateComment';
import UpdateComment from '../Comments/UpdateComment/UpdateComment';
import DeleteComment from '../Comments/DeleteComment/DeleteComment';
import ManageBookmarks from '../Bookmarks/ManageBookmarks/ManageBookmarks';
import Reactions from '../Reactions/Reactions';

function OrgDetails() {
    const [isLoaded, setIsLoaded] = useState(false);
    const { articleId } = useParams();
    const user = useSelector(state => state.sessionState.user);
    const orgId = user.Organization.id
    const article = useSelector(state => state.articleState.byId[articleId]);

    

    const paragraphs = article?.body.split('\n');

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    useEffect(() => {
        const getArticleDetails = async () => {
            await dispatch(getArticleDetailsThunk(orgId, articleId));
            setIsLoaded(true);
        };


        if (articleId) {
            setIsLoaded(false);
            getArticleDetails();
        }
    }, [dispatch, orgId, articleId]);


    if (!article || !isLoaded) {
        return <Loading />
    }

    const handleComment = async () => {
        await dispatch(getArticleDetailsThunk(orgId, articleId));
    }



    return (
        <div className='detail-container'>
            <div className='article-header'>
                <span className='detail-title'>
                    <h1>{article.title}</h1>
                    <ManageBookmarks articleId={article.id} />
                </span>

                {user.isAdmin ? (
                    <div className='admin-actions'>
                        <CiEdit id='edit-article' onClick={() => navigate('edit')}/>
                        <OpenModalButton 
                            icon={<CiTrash className='delete-icon'/>}
                            modalComponent={<DeleteArticle orgId={orgId} articleId={articleId} navigate={navigate} />}

                        />
                    </div>
                ) 
                :
                 null}
            </div>
            <div className='article-container'>
            {paragraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
            ))}
            </div>
            {article.Reactions && <Reactions reactions={article.Reactions} articleId={articleId}/>}
            <h3>Comments</h3>
            <div className='comments-container'>
                <CreateComment orgId={orgId} articleId={articleId} commentCreated={handleComment} />
                {article?.Comments?.length ? (
                    article.Comments.map(comment => (
                        <div className='comment' key={comment.id}>
                            <div>
                                <p>{comment.comment}</p>
                                <p className='author'>{comment.User.firstName} {comment.User.lastName}</p>
                            </div>
                            {comment.User.id === user.id ? (
                                <div className='author-actions'>
                                    <OpenModalButton 
                                        icon={<CiEdit className='update-icon' />}
                                        modalComponent={<UpdateComment orgId={orgId} comment={comment} commentUpdated={handleComment}/>}
                                    />
                                    <OpenModalButton 
                                        icon={<CiTrash className='delete-icon' />}
                                        modalComponent={<DeleteComment orgId={orgId} commentId={comment.id} commentDeleted={handleComment}/>}
                                    />
                                </div>
                            ) : null}
                        </div>
                    ))
                ) : (
                    <p>No comments yet</p>
                )}
            </div>
        </div>
    )
}

export default OrgDetails