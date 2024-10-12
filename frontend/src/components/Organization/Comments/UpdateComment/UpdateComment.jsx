import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateCommentThunk } from "../../../../store/articles";
import { useModal } from "../../../../context/Modal";


function UpdateComment({orgId, comment, commentUpdated}) {
    const [newComment, setNewComment] = useState(comment.comment);
    const commentId = comment.id
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const commentBody = {
            comment: newComment
        }

        await dispatch(updateCommentThunk(orgId, commentId, commentBody))
            .then(() => {
                setNewComment('');
                commentUpdated();
                closeModal();
            })
    }

    return (
        <div >
            <h1>Update your Comment</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)
                    }    
                />
                <button
                    type="submit"
                    disabled={!newComment.length ? true : false}
                >Update</button>
            </form>
        </div>
    )
}

export default UpdateComment;