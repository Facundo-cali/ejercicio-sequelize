var express = require('express');
var router = express.Router();
const moviesControllers = require('../controllers/moviesControllers')

/* GET home page. */
router.get('/', moviesControllers.all);
router.get('/create',moviesControllers.create);
router.post('/create',moviesControllers.store);
router.get('/detail/:id', moviesControllers.detail); 
router.get('/update/:id',moviesControllers.update);
router.post('/update/:id',moviesControllers.change);
router.post('/delete/:id',moviesControllers.destroy);

module.exports = router;
