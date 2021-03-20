const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes.js');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

// router.get('/', (req, res) => res.send('Hello World!'));

module.exports = router;
