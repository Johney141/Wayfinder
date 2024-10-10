import { useState } from "react";
import { useDispatch } from "react-redux";
import { createCommentThunk } from "../../../../store/articles";



function CreateComment({orgId, articleId, commentCreated}) {
    const [comment, setComment] = useState('');

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const commentBody = {
            comment
        }

        await dispatch(createCommentThunk(orgId, articleId, commentBody))
            .then(() => {
                setComment('')
                commentCreated();
            })
    }
    
    return(
        <form onSubmit={handleSubmit}>
            <label>
                Post your comment
                <input 
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}    
                />
            </label>
            <button
                type="submit"
                disabled={!comment.length ? true : false}
            >Post</button>
        </form>
    )
}

export default CreateComment;