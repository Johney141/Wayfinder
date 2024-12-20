import { useDispatch } from "react-redux";
import { useModal } from "../../../../context/Modal";
import { deleteCommentThunk } from "../../../../store/articles";


function DeleteComment({orgId, commentId, commentDeleted}) {
    const {closeModal} = useModal();
    const dispatch = useDispatch();

    const handleDelete = (e) => {
        e.preventDefault();
        e.stopPropagation();

        dispatch(deleteCommentThunk(orgId, commentId))
            .then(() => {
                commentDeleted();
                closeModal();
            })
    }
    return (
        <div className="modal-container">
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to delete this comment?</p>
            <button
                onClick={e => handleDelete(e)}
            >Yes (Delete Comment)</button>
                        <button
                onClick={closeModal}
            >No (Keep Comment)</button>
        </div>
    )
}

export default DeleteComment;