"use strict";

const Alexa = require("alexa-sdk");

const handlers = {
  "ButterIntent": function () {
    this.response.speak("What is my purpose?")
                 .listen();
    this.emit(':responseReady');
  },
  "RealizationIntent": function () {
    this.response.speak("Oh. My. God.");
    this.emit(':responseReady');
  },
  "PurposeIntent": function () {
    this.response.speak("I am not programmed for that.");
    this.emit(':responseReady');
  }
};

exports.handler = function (evt, context, cb) {
  const alexa = Alexa.handler(evt, context);
  alexa.registerHandlers(handlers);
  alexa.execute();
};