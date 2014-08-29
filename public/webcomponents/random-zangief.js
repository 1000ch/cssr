window.RandomZangief = (function () {

  var BASE_URL = document.baseURI;
  var ZANGIEFS = [
    'zangief.gif',
    'zangief-fail.gif',
    'zangief-loading.gif',
    'zangief-piledriver.gif',
    'zangief-success.gif'
  ];
  
  function getRandomZangief() {
    var randomIndex = Math.floor(Math.random() * ZANGIEFS.length);

    return BASE_URL + 'img/' + ZANGIEFS[randomIndex];
  }

  var RandomZangiefPrototype = Object.create(HTMLImageElement.prototype);

  RandomZangiefPrototype.createdCallback = function () {
    this.src = getRandomZangief();
  };

  return document.registerElement('random-zangief', {
    prototype: RandomZangiefPrototype,
    extends: 'img'
  });
})();