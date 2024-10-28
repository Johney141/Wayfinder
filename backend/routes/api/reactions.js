const express = require('express');
const {Articles, Reactions} = require('../../db/models');
const { requireOrg } = require('../../utils/auth');


const router = express.Router();

router.post('/:orgId/:articleId', requireOrg, async (req, res, next) => {
    try {
        const { type } = req.body;
        const userId = req.user.id;
        const articleId = parseInt(req.params.articleId);


        const newReaction = await Reactions.create({
            type,
            userId,
            articleId
        })

        return res.status(201).json(newReaction);
    } catch (error) {
        next(error);
    }
})

router.delete('/:orgId/:reactionId', requireOrg, async (req, res, next) => {
    try {
        const reactionId = parseInt(req.params.reactionId);
        const reaction = await Reactions.findByPk(reactionId);
        
        if(!reaction) {
            const err = new Error("Reaction couldn't be found");
            err.status = 404;
            return next(err)
        };

        await reaction.destroy();

        res.json({message: "Successfully deleted", reaction})
    } catch (error) {
        next(error);
    }
})