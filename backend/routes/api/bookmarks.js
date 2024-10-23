const express = require('express');
const {Articles, Bookmarks} = require('../../db/models');
const { requireOrg } = require('../../utils/auth');

const router = express.Router();

router.get('/:orgId/current', requireOrg, async (req, res, next) => {
    try {
        const userId = req.user.id;
        

        const bookmarks = await Bookmarks.findAll({
            where: {userId},
            include: [
                {
                    model: Articles,
                    attributes: ['id','title']
                }
            ]
        });

        res.json({Bookmarks: bookmarks})
    } catch (error) {
        next(error)
    }
})

module.exports = router;