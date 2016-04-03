
import { Router } from 'express';

const router = new Router();
const dogs = [{
  name: 'Labrador Retriever',
  description: 'The Labrador Retriever, also Labrador, is a type of retriever-gun dog. The Labrador is one of the most popular breeds of dog in the United Kingdom and the United States.',
}, {
  name: 'German Shepherd',
  description: 'The German Shepherd is a breed of medium to large-sized working dog that originated in Germany. The breed\'s officially recognized name is German Shepherd Dog in the English language, sometimes abbreviated',
}, {
  name: 'Bulldog',
  description: 'The Bulldog is a medium-sized breed of dog commonly referred to as the English Bulldog or British Bulldog. Other Bulldog breeds include the American Bulldog, Old English Bulldog, Leavitt Bulldog, Olde English Bulldogge, and the French Bulldog.',
}]

router.get('/', (req, res, next) => {
  res.status(200).send(dogs)
});

module.exports = router