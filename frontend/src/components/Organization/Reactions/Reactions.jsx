import { AiFillDislike, AiFillLike, AiOutlineDislike, AiOutlineLike } from "react-icons/ai"
import './Reactions.css'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReactionThunk, deleteReactionThunk, updateReactionThunk } from "../../../store/articles";




function Reactions({reactions, articleId}) {
    const [userReaction, setUserReaction] = useState(reactions.UserReaction?.type || null);
    const [likeCount, setLikeCount] = useState(reactions.like.count);
    const [dislikeCount, setDislikeCount] = useState(reactions.dislike.count);
    const orgId = useSelector(state => state.sessionState.user.Organization.id);
    const reactionId = reactions.UserReaction?.id;
    
    const dispatch = useDispatch();
    
    const handleLikeClick = () => {
        const body = {type: 'like'}

        if(userReaction === 'dislike') {
            dispatch(updateReactionThunk(orgId, reactionId, body))
            setLikeCount(prev => prev + 1);
            setDislikeCount(prev => prev - 1);
            setUserReaction('like')
        } else if (userReaction === null) {
            dispatch(createReactionThunk(orgId, articleId, body))
            setLikeCount(prev => prev + 1);
            setUserReaction('like')
        }
    }
    const handleDislikeClick = () => {
        const body = {type: 'dislike'}

        if(userReaction === 'like') {
            dispatch(updateReactionThunk(orgId, reactionId, body))
            setLikeCount(prev => prev - 1);
            setDislikeCount(prev => prev + 1);
            setUserReaction('dislike')
        } else if (userReaction === null) {
            dispatch(createReactionThunk(orgId, articleId, body))
            setDislikeCount(prev => prev + 1);
            setUserReaction('dislike')
        }
    }

    const handleReactionDelete = () => {
        dispatch(deleteReactionThunk(orgId, reactionId))
        if(userReaction === 'like') {
            setLikeCount(prev => prev - 1);
        } else if(userReaction === 'dislike') {
            setDislikeCount(prev => prev - 1);
        }
        
        setUserReaction(null)
    }
    

    return (
        <div className="reactions-container">
            <div className="reaction"
                onClick={userReaction === 'like' ? handleReactionDelete : handleLikeClick}
            >
                {userReaction === 'like' ? <AiFillLike /> : <AiOutlineLike />} {likeCount}
            </div>
            <div className="reaction"
                onClick={userReaction === 'dislike' ? handleReactionDelete : handleDislikeClick}
            >
                {userReaction === 'dislike' ? <AiFillDislike /> : <AiOutlineDislike />} {dislikeCount}
            </div>
        </div>
    )
}

export default Reactions;