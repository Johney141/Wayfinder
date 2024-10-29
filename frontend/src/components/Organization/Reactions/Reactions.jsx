import { AiFillDislike, AiFillLike, AiOutlineDislike, AiOutlineLike } from "react-icons/ai"
import './Reactions.css'
import { useState } from "react";
import { useDispatch } from "react-redux";


function Reactions({reactions}) {
    const [userReaction, setUserReaction] = useState(reactions.UserReaction?.type || null);
    const reactionId = reactions.UserReaction?.id;
    
    const dispatch = useDispatch();
    
    const handleLikeClick = () => {
        if(userReaction === 'dislike') {
            // dispatch(updateReactionThunk('like'))
            setUserReaction('like')
        } else if (userReaction === null) {
            // dispatch(updateReactionThunk('like'))
            setUserReaction('like')
        }
    }
    const handleDislikeClick = () => {
        if(userReaction === 'like') {
            // dispatch(updateReactionThunk('dislike'))
            setUserReaction('dislike')
        } else if (userReaction === null) {
            // dispatch(addReactionThunk('dislike'))
            setUserReaction('dislike')
        }
    }

    const handleReactionDelete = () => {
        setUserReaction(null)
    }
    

    return (
        <div className="reactions-container">
            <div className="reaction"
                onClick={userReaction === 'like' ? handleReactionDelete : handleLikeClick}
            >
                {userReaction === 'like' ? <AiFillLike /> : <AiOutlineLike />} {reactions.like.count}
            </div>
            <div className="reaction"
                onClick={userReaction === 'dislike' ? handleReactionDelete : handleDislikeClick}
            >
                {userReaction === 'dislike' ? <AiFillDislike /> : <AiOutlineDislike />} {reactions.dislike.count}
            </div>
        </div>
    )
}

export default Reactions;