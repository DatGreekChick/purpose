import { app, errorHandler } from "./clarifai";

// TRAIN
// once inputs are created, create model by giving name and list of concepts
const createModel = (type, inputsArr) => {
  app.models.create(type, inputsArr)
    .then(trainModel)
    .catch(errorHandler)
};

// after training the model, you can use it to predict on other inputs
const predictModel = model => {
  model.predict([
    'https://samples.clarifai.com/dog3.jpeg',
    'https://samples.clarifai.com/cat3.jpeg'
  ])
    .then(res => console.log(res))
    .catch(errorHandler)
};

// after model is created, you can train the model
const trainModel = model => {
  model.train()
    .then(trainedModel => predictModel(trainedModel))
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
  .then(createModel('pet', ['dog','cat']))
  .then(createdModel => trainModel(createdModel))
  .catch(errorHandler);
