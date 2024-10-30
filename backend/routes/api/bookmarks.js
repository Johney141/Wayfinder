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

router.post('/:orgId/:articleId', requireOrg, async (req, res, next) => {
    try {
        const userId = req.user.id;
        const articleId = parseInt(req.params.articleId);

        const newBookmark = await Bookmarks.create({
            userId,
            articleId
        })

        const fullBookmark = await Bookmarks.findByPk(newBookmark.id, {
            include: [
                {
                    model: Articles,
                    attributes: ['id','title']
                }
            ]
        })

        return res.status(201).json(fullBookmark)
    } catch (error) {
        next(error);
    }
});

router.delete('/:orgId/:bookmarkId', requireOrg, async (req, res, next) => {
    try {
        const bookmarkId = parseInt(req.params.bookmarkId);
        const bookmark = await Bookmarks.findByPk(bookmarkId);

        if(!bookmark) {
            const err = new Error("Bookmark couldn't be found");
            err.status = 404;
            return next(err)
        }
        await bookmark.destroy();

        res.json({message: "Successfully deleted", bookmark: bookmark});
    } catch (error) {
        next(error);
    }
})

module.exports = router;