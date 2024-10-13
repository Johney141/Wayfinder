import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { deleteArticleThunk } from "../../../store/articles";
import './DeleteArticle.css'



function DeleteArticle({orgId, articleId, navigate}) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();


    const handleDelete = (e) => {
        e.preventDefault();
        e.stopPropagation();

        dispatch(deleteArticleThunk(orgId, articleId))
            .then(() => {
                closeModal();
                navigate(`/${orgId}/home`)
            })
    }

    return (
        <div className="modal-container">
            <h1>Confirm Delete</h1>
            <p>Are you use you want to delete this article?</p>
            <button
                onClick={e => handleDelete(e)}
            >Yes (Delete Article)</button>
            <button
                onClick={closeModal}
            >No (Keep Article)</button>
        </div>
    )
}

export default DeleteArticle;