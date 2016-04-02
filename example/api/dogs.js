
import { Router } from 'express';

const router = new Router();
const cats = [{
  name: 'Rex',
  description: 'Rex means business, a very serious dog. Would make a good guard dog.',
}, {
  name: 'K9',
  decription: 'Happy go lucky dog. Always in a good mood.',
}]

router.get('/', (req, res, next) => {
  res.status(200).send(cats)
});

module.exports = router