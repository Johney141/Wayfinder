const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const articleRouter = require('./articles.js');
const commentRouter = require('./comments.js');
const bookmarkRouter = require('./bookmarks.js');
const reactionsRouter = require('./reactions.js')
const { restoreUser } = require('../../utils/auth.js');

router.use(restoreUser);


router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/articles', articleRouter);
router.use('/comments', commentRouter);
router.use('/bookmarks', bookmarkRouter);
router.use('/reactions', reactionsRouter);

module.exports = router;