
import { Router } from 'express';

const router = new Router();
const cats = [{
  name: 'Fluffy',
  description: 'Fluffy is a pretty fluffy cat, she likes to be groomed.',
}, {
  name: 'Spike',
  decription: 'Spike is very playful and enjoys playing with toys.',
}]

router.get('/', (req, res, next) => {
  res.status(200).send(cats)
});

module.exports = router