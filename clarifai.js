'use strict';

const Clarifai = require('Clarifai');

const app = new Clarifai.App({
  apiKey: 'd4e19cb3defa43dfa24f843334f515eb'
});

const errorHandler = err => console.error(err);

// predict the contents of an image by passing in a url
app.models.predict(Clarifai.GENERAL_MODEL, 'https://samples.clarifai.com/metro-north.jpg')
  .then(res => console.log(res))
  .catch(errorHandler);

// SEARCH
// search for concepts
const searchForDog = res => {
  app.inputs.search({
    concept: {
      name: 'dog'
    }
  })
    .then(res => console.log(res))
    .catch(errorHandler);
};

// add some inputs
app.inputs
  .create('https://samples.clarifai.com/puppy.jpeg')
  .then(searchForDog)
  .catch(errorHandler);


// TRAIN
// once inputs are created, create model by giving name and list of concepts
const createModel = inputs => {
  app.models.create('pets', ["dog","cat"])
    .then(trainModel)
    .catch(errorHandler)
};

// after model is created, you can now train the model
const trainModel = model => {
  model.train()
    .then(predictModel)
    .catch(errorHandler)
};

// add inputs with concepts
app.inputs.create([{
  "url": "https://samples.clarifai.com/dog1.jpeg",
  "concepts": [
    { "id": "cat", "value": false },
    { "id": "dog", "value": true }
  ]
}, {
  "url": "https://samples.clarifai.com/dog2.jpeg",
  "concepts": [
    { "id": "cat", "value": false },
    { "id": "dog", "value": true }
  ]
}, {
  "url": "https://samples.clarifai.com/cat1.jpeg",
  "concepts": [
    { "id": "cat", "value": true },
    { "id": "dog", "value": false }
  ]
}, {
  "url": "https://samples.clarifai.com/cat2.jpeg",
  "concepts": [
    { "id": "cat", "value": true },
    { "id": "dog", "value": false }
  ]
}])
  .then(createModel)
  .catch(errorHandler);

// after training the model, you can now use it to predict on other inputs
const predictModel = model => {
  model.predict(['https://samples.clarifai.com/dog3.jpeg', 'https://samples.clarifai.com/cat3.jpeg'])
    .then(res => console.log(res))
    .catch(errorHandler)
};