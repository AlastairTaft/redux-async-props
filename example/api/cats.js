
import { Router } from 'express';

const router = new Router();
const cats = [{
  name: 'British Shorthair',
  description: 'The British Shorthair is the pedigreed version of the traditional British domestic cat, with a distinctively chunky body, dense coat and broad face.',
}, {
  name: 'Siamese cat',
  description: 'The Siamese cat is one of the first distinctly recognized breeds of Oriental cat. One of several breeds native to Thailand, the Siamese cat became one of the most popular breeds in Europe and North America in the 20th century.',
}, {
	name: 'Persian cat',
	description: 'The Persian cat is a long-haired breed of cat characterized by its round face and short muzzle. In Britain, it is sometimes called the Longhair or Persian Longhair. It is also known as the Shiraz or Shirazi, particularly in the Middle East.'
}]

router.get('/', (req, res, next) => {
  res.status(200).send(cats)
});

module.exports = router