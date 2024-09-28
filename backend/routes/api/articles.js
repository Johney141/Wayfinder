const express = require('express');
const { Articles, Comments, Organization, User, Sequelize } = require('../../db/models');
const { requireOrg, requireAdmin } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize');



const router = express.Router();
// Search Route
router.get('/:orgId/search', requireOrg, async (req, res, next) => {
    try {
        const orgId = parseInt(req.params.orgId);
        const query = req.query.q;

        if(!query) {
            const noQuery = new Error('Search query is required')
            noQuery.status = 400
            return next(noQuery)
        }


        const articles = await Articles.findAll({
            where: {
                orgId,
                [Op.or]: [
                    { title: {[Op.like]: Sequelize.fn('LOWER', `%${query}%`)}}, 
                    { body: {[Op.like]: Sequelize.fn('LOWER', `%${query}%`)}}
                ]
            },
            include: [
                {
                    model: Organization,
                    attributes: ['name']
                },
                {
                    model: User,
                    attributes: ['firstName', 'lastName']
                }
            ]
        })

        if(!articles.length) return next(new Error('No Articles found'))

        res.json({Articles: articles})
    } catch (error) {
        next(error)
    }
});


// Recent articles 
router.get('/:orgId/recent', requireOrg, async (req, res, next) => {
    try {
        const orgId = parseInt(req.params.orgId)

        const articles = await Articles.findAll({
            where: { orgId },
            order: [['updatedAt', 'DESC']],
            limit: 5
        });

        if(!articles.length) return next(new Error('No recent Articles'));

        return res.json({Articles: articles})
    } catch (error) {
        next(error)
    }
})

// Get Article Details
router.get('/:orgId/:articleId', requireOrg, async (req, res, next) => {
    try {
        const articleId = parseInt(req.params.articleId);
        const article = await Articles.findOne({
            where: {id: articleId},
            include: [
                {
                    model: Organization,
                    attributes: ['name']
                },
                {
                    model: User, 
                    attributes: ['firstName', 'lastName']
                },
                {
                    model: Comments,
                    attributes: ['comment', 'id', 'createdAt', 'updatedAt'],
                    include: [
                        {
                            model: User,
                            attributes: ['firstName', 'lastName']
                        }
                    ],
                    required: false
                }
            ]
        })
        if(!article) return next(new Error('Article not found'));

        return res.json(article)


    } catch (error) {
        next(error);
    }
});

const validateArticle = [
    check('title')
        .exists({checkFalsy: true})
        .withMessage('Title is required'),
    check('body')
        .exists({checkFalsy: true})
        .withMessage('Body is required'),
    check('body')
        .isLength({min: 50})
        .withMessage('Body must be at least 50 characters long'),
    handleValidationErrors
]

// Create a Article
router.post('/:orgId', requireOrg, requireAdmin, validateArticle, async (req, res, next) => {
    try {
        const { title, body } = req.body;
        const userId = req.user.id;
        const orgId = parseInt(req.params.orgId);

        
    
        const newArticle = await Articles.create({
            title,
            body,
            userId,
            orgId
        })

        return res.status(201).json(newArticle)
    } catch (error) {
        next(error)
    }
})
// Update Article
router.put('/:orgId/:articleId', requireOrg, requireAdmin, validateArticle, async (req, res, next) => {
    try {
        const { title, body } = req.body;
        const userId = req.user.id;
        const orgId = parseInt(req.params.orgId);
        const articleId = parseInt(req.params.articleId);
        const article = await Articles.findByPk(articleId)
        
        if(!article) {
            const err = new Error('Article not found')
            err.status = 404;
            return next(err);
        }

        await article.update({
            title,
            body,
            userId,
            orgId
        })
    
        return res.json(article)
    } catch (error) {
        next(error)
    }
})

router.delete('/:orgId/:articleId', requireOrg, requireAdmin, async (req, res, next) => {
    try {
        const articleId = parseInt(req.params.articleId);
        const article = await Articles.findByPk(articleId);

        if(!article) {
            const err = new Error("Article couldn't be found");
            err.status = 404;
            return next(err)
        }

        await article.destroy();
    

        res.json({message: "Successfully deleted", article: article});
    } catch (error) {
        next(error)
    }
});

module.exports = router;




