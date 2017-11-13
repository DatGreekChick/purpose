'use strict';

import Clarifai from 'clarifai/clarifai';
import API_KEY from 'secrets';

export const app = new Clarifai.App({
  apiKey: API_KEY
});

export const errorHandler = err => console.error(err);

// predict the contents of an image by passing in a url
app.models.predict(
  Clarifai.GENERAL_MODEL,
  'https://samples.clarifai.com/metro-north.jpg'
)
  .then(res => console.log(res))
  .catch(errorHandler);