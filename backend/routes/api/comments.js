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
})
module.exports = router;