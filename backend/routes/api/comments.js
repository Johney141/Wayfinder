const express = require('express')
const { Articles, Comments, Organization, User } = require('../../db/models');
const { requireOrg } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


const validateComment = [
    check('comment')
        .exists({checkFalsy: true})
        .withMessage('Comment is required'),
    handleValidationErrors
]
// Create Comment
router.post('/:orgId/:articleId', requireOrg, validateComment, async (req, res, next) => {
    try {
        const { comment } = req.body;
        const userId = req.user.id;
        const articleId = parseInt(req.params.articleId);
        const article = await Articles.findByPk(articleId);

        if(!article) {
            const err = new Error('Article not found')
            err.status = 404;
            return next(err);
        }

        const newComment = await Comments.create({
            comment,
            userId,
            articleId
        })

        return res.status(201).json(newComment);
    } catch (error) {
        next(error)
    }
});

// Update Comment 
router.put('/:orgId/:commentId', requireOrg, validateComment, async (req, res, next) => {
    try {
        const { comment } = req.body;
        const commentId = parseInt(req.params.commentId);
        const updateComment = await Comments.findByPk(commentId)
        const userId = req.user.id;

        if(!updateComment) {
            const err = new Error('Comment not found');
            err.status = 404; 
            return next(err);
        };
        if(updateComment.userId != userId) {
            const err = new Error('Forbidden')
            err.status = 401;
            return next(err);
        };

        await updateComment.update({
            comment,
            userId,
            articleId: updateComment.articleId
        })

        return res.json(updateComment)
    } catch (error) {
        next(error) 
    }
})

// Delete Comment
router.delete('/:orgId/:commentId', requireOrg, async (req, res, next) => {
    try {
        const commentId = parseInt(req.params.commentId);
        const comment = await Comments.findByPk(commentId);

        if(!comment) {
            const err = new Error("Comment couldn't be found");
            err.status = 404;
            return next(err)
        };
        if(comment.userId != req.user.id) {
            const err = new Error('Forbidden')
            err.status = 401;
            return next(err);
        };
        
        await comment.destroy();

        res.json({message: "Successfully deleted", comment})

    } catch (error) {
        next(error);
    }
})
module.exports = router;