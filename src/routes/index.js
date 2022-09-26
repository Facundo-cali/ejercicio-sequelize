var express = require('express');
var router = express.Router();
const moviesControllers = require('../controllers/moviesControllers')

/* GET home page. */
router.get('/', moviesControllers.all);
router.get('/create',moviesControllers.create);
router.post('/create',moviesControllers.store);
router.get('/update/:id',moviesControllers.update);
router.post('/update/:id',moviesControllers.change);


module.exports = router;
