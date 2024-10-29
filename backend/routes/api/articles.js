const express = require('express');
const { Articles, Comments, Organization, User, Reactions, Sequelize, sequelize } = require('../../db/models');
const { requireOrg, requireAdmin } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op, where } = require('sequelize');



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


        return res.json({Articles: articles})
    } catch (error) {
        next(error)
    }
})

// Get Article Details
router.get('/:orgId/:articleId', requireOrg, async (req, res, next) => {
    try {
        const articleId = parseInt(req.params.articleId);
        const userId = req.user.id;
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
                    attributes: ['comment', 'id', 'createdAt', 'updatedAt', 'articleId'],
                    include: [
                        {
                            model: User,
                            attributes: ['firstName', 'lastName', 'id']
                        }
                    ],
                    
                    required: false, 
                }
            ],
            order: [[{ model: Comments }, 'updatedAt', 'DESC']]
        })
        if(!article) return next(new Error('Article not found'));

        const reactions = await Reactions.findAll({
            where: { articleId },
            attributes: [
                'id',             
                'userId',         
                'type',           
                [sequelize.fn('COUNT', sequelize.col('type')), 'count']
            ],
            group: ['type', 'userId', 'id'] 
        });

        const userReaction = await Reactions.findOne({
            where: { articleId, userId },
            attributes: ['type', 'id']
        });
        
        
        const reactionCounts = reactions.reduce((acc, reaction) => {
            const type = reaction.type;
            if (!acc[type]) acc[type] = { count: 0, reactions: [] };

            
            acc[type].count += reaction.getDataValue('count');
            acc[type].reactions.push({
                id: reaction.id,
                userId: reaction.userId,
            });
        
            return acc;
        }, { like: { count: 0, reactions: [] }, dislike: { count: 0, reactions: [] } });
        const articleData = article.toJSON();
        articleData.Reactions = reactionCounts;
        articleData.Reactions.UserReaction = userReaction ? userReaction : null;

        return res.json(articleData);


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
        const article = await Articles.findByPk(articleId);
        
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
// Delete an Article
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




