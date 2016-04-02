
import { Router } from 'express';

const router = new Router();

// Enable CORS
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.use('/cats', require('./cats.js'));
router.use('/dogs', require('./dogs.js'));

module.exports = router