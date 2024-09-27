const express = require('express');
const { Articles, Comments, Organization, User, Sequelize } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize');


const router = express.Router();

router.get('/:orgId/search', requireAuth, async (req, res, next) => {
    try {
        const orgId = parseInt(req.params.orgId);
        const query = req.query.q;
        const userOrg = req.user.orgId;

        if(orgId !== userOrg) {
            const notAuth = new Error('Forbidden')
            notAuth.status = 403
            return next(notAuth)
        }

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

        if(!articles.length) {
            const noArticles = new Error('No articles found');
            noArticles.status = 404;
            return next(noArticles);
        }

        res.json({Articles: articles})
    } catch (error) {
        next(error)
    }
});

module.exports = router;




