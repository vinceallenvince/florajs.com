var sceneList = [
  {
    name: 'main'
  },
  {
    name: 'joints'
  }
];
var movie = new exports.Movie(sceneList, {width: 960, height: 540});
movie.start();
movie.sceneBuilder.firstScene();

exports.Utils.addEvent(document, 'keyup', function(e) {

  switch(e.keyCode) {
    case 49:
      document.removeEventListener('mouseup', movie.sceneBuilder._createObjects);
      document.removeEventListener('touchstart', movie.sceneBuilder._createObjects);
      movie.sceneBuilder.firstScene();
      break;
    case 50:
      document.removeEventListener('mouseup', movie.sceneBuilder._createObjects);
      document.removeEventListener('touchstart', movie.sceneBuilder._createObjects);
      movie.sceneBuilder.buildScene('joints');
      break;
  }

});