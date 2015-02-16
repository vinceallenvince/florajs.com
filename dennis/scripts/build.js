/*
%PROJECTNAME%
Copyright (C) 2012 Vince Allen
Brooklyn, NY 11215, USA

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
/* Version: %VERSION% */
/* Build time: October 30, 2012 07:01:19 */
/** @namespace */
var Dennis = {}, exports = Dennis;

(function(exports) {
'use strict';
/*global console, exports */
/*jshint supernew:true */

/**
 * @namespace
 */
var Utils = {};

/**
 * Use to extend the properties and methods of a superClass
 * onto a subClass.
 */
Utils.extend = function(subClass, superClass) {

  'use strict';

  function F() {}
  F.prototype = superClass.prototype;
  subClass.prototype = new F;
  subClass.prototype.constructor = subClass;
};

/**
 * Re-maps a number from one range to another.
 *
 * @param {number} value The value to be converted.
 * @param {number} min1 Lower bound of the value's current range.
 * @param {number} max1 Upper bound of the value's current range.
 * @param {number} min2 Lower bound of the value's target range.
 * @param {number} max2 Upper bound of the value's target range.
 * @returns {number} A number.
 */
Utils.map = function(value, min1, max1, min2, max2) { // returns a new value relative to a new range

  'use strict';

  var unitratio = (value - min1) / (max1 - min1);
  return (unitratio * (max2 - min2)) + min2;
};

/**
 * Generates a psuedo-random number within a range.
 *
 * @param {number} low The low end of the range.
 * @param {number} high The high end of the range.
 * @param {boolean} [flt] Set to true to return a float.
 * @returns {number} A number.
 */
Utils.getRandomNumber = function(low, high, flt) {

  'use strict';

  if (flt) {
    return Math.random()*(high-(low-1)) + low;
  }
  return Math.floor(Math.random()*(high-(low-1))) + low;
};

/**
 * Converts degrees to radians.
 *
 * @param {number} degrees The degrees value to be converted.
 * @returns {number} A number in radians.
 */
Utils.degreesToRadians = function(degrees) {

  'use strict';

  if (typeof degrees !== 'undefined') {
    return 2 * Math.PI * (degrees/360);
  } else {
    if (typeof console !== 'undefined') {
      console.log('Error: Utils.degreesToRadians is missing degrees param.');
    }
    return false;
  }
};

/**
 * Converts radians to degrees.
 *
 * @param {number} radians The radians value to be converted.
 * @returns {number} A number in degrees.
 */
Utils.radiansToDegrees = function(radians) {

  'use strict';

  if (typeof radians !== 'undefined') {
    return radians * (180/Math.PI);
  } else {
    if (typeof console !== 'undefined') {
      console.log('Error: Utils.radiansToDegrees is missing radians param.');
    }
    return false;
  }
};

/**
 * Constrain a value within a range.
 *
 * @param {number} val The value to constrain.
 * @param {number} low The lower bound of the range.
 * @param {number} high The upper bound of the range.
 * @returns {number} A number.
 */
Utils.constrain = function(val, low, high) {

  'use strict';

  if (val > high) {
    return high;
  } else if (val < low) {
    return low;
  }
  return val;
};

 /**
 * Returns a new object with all properties and methods of the
 * old object copied to the new object's prototype.
 *
 * @param {Object} object The object to clone.
 * @returns {Object} An object.
 */
Utils.clone = function(object) {

   'use strict';

    function F() {}
    F.prototype = object;
    return new F;
};

/**
 * Add an event listener to a DOM element.
 *
 * @param {Object} target The element to receive the event listener.
 * @param {string} eventType The event type.
 * @param {function} The function to run when the event is triggered.
 */
Utils.addEvent = function(target, eventType, handler) {

  'use strict';

  if (target.addEventListener) { // W3C
    this.addEventHandler = function(target, eventType, handler) {
      target.addEventListener(eventType, handler, false);
    };
  } else if (target.attachEvent) { // IE
    this.addEventHandler = function(target, eventType, handler) {
      target.attachEvent("on" + eventType, handler);
    };
  }
  this.addEventHandler(target, eventType, handler);
};

/**
 * Logs a message to the browser console.
 *
 * @param {string} msg The message to log.
 */
Utils.log = function(msg) {

  'use strict';

  if (typeof console !== 'undefined' && typeof console.log !== 'undefined') {
    this.log = function(msg) {
      console.log(msg); // output error to console
    };
    this.log.call(this, msg);
  } else {
   this.log = function () {}; // noop
  }
};

/**
 * @returns {Object} The current window width and height.
 * @example getWindowDim() returns {width: 1024, height: 768}
 */
Utils.getWindowSize = function() {

  'use strict';

  var d = {
    'width' : false,
    'height' : false
  };
  if (typeof(window.innerWidth) !== "undefined") {
    d.width = window.innerWidth;
  } else if (typeof(document.documentElement) !== "undefined" &&
      typeof(document.documentElement.clientWidth) !== "undefined") {
    d.width = document.documentElement.clientWidth;
  } else if (typeof(document.body) !== "undefined") {
    d.width = document.body.clientWidth;
  }
  if (typeof(window.innerHeight) !== "undefined") {
    d.height = window.innerHeight;
  } else if (typeof(document.documentElement) !== "undefined" &&
      typeof(document.documentElement.clientHeight) !== "undefined") {
    d.height = document.documentElement.clientHeight;
  } else if (typeof(document.body) !== "undefined") {
    d.height = document.body.clientHeight;
  }
  return d;
};

exports.Utils = Utils;
/**
 * Creates a new Dandelion.
 *
 *
 * @constructor
 */
function Dandelion(opt_options) {

  var options = opt_options || {};

  Flora.Element.call(this, options);

  this.perlinSpeed = options.perlinSpeed || 0.005;
  this.perlinTime = options.perlinTime || 0;
  this.offsetX = options.offsetX || Math.random() * 10000;
  this.offsetY = options.offsetY || Math.random() * 10000;

  this.initX = options.initX || this.world.width/2;
  this.swayDistance = options.swayDistance/2 || 0;

  this.location = options.location || {x: 0, y: 0};
  this.width = options.width || 20;
  this.height = options.height || 20;
  this.color = options.color || [200, 0, 0];
  this.borderColor = options.borderColor || [200, 0, 0];

  this.seedReleaseFreq = 500; // lower numbers = higher frequency

}
exports.Utils.extend(Dandelion, Flora.Element);

Dandelion.prototype.name = 'Dandelion';

Dandelion.prototype.step = function() {

  this.perlinTime += this.perlinSpeed;
  this.location.x = this.initX + exports.Utils.map(Flora.SimplexNoise.noise(this.perlinTime + this.offsetX, 0, 0.1), -1, 1 ,-this.swayDistance, this.swayDistance);

  if (exports.Utils.getRandomNumber(0, this.seedReleaseFreq) === 1) {
    this._releaseSeeds();
  }

  this.acceleration.mult(0); // reset acceleration
};

Dandelion.prototype._releaseSeeds = function() {

  var getRandomNumber = exports.Utils.getRandomNumber,
      movieWidth = Flora.universe.first().width,
      movieHeight = Flora.universe.first().height,
      maxParticleLifespan = 300,
      minParticleLifespan = 100;

  var ps = new Flora.ParticleSystem({
    location: this.location,
    burstRate: getRandomNumber(8, 12),
    lifespan: getRandomNumber(35, 45),
    particle: function () {

      var initLifespan = getRandomNumber(minParticleLifespan, maxParticleLifespan);

      return {
        className: 'seed',
        location: this.getLocation().add(new Flora.Vector(0, getRandomNumber(-2, 2))),
        width: 1,
        height: 4,
        initLifespan: initLifespan,
        lifespan: initLifespan,
        mass: 10,
        maxSpeed: getRandomNumber(1, 5),
        color: [255, 255, 255],
        wrapEdges: true,
        /*borderRadius: '0%',
        boxShadow: '0 0 20px 20px rgba(200, 200, 200, 0)',*/
        step: function() {

          this.width = 1;
          this.height = 4;
          this.borderRadius = 0;

          var world = Flora.universe.first();

           // wind
          this.applyForce(world.wind);

          // add acceleration
          this.velocity.add(this.acceleration);

          // check if velocity > maxSpeed
          if (this.maxSpeed) {
            this.velocity.limit(this.maxSpeed);
          }

          // add velocity
          this.location.add(this.velocity);

          // reset acceleration
          this.acceleration.mult(0);

          // fade out seeds as their lifespan progresses
          this.opacity = exports.Utils.map(this.lifespan, 1, this.initLifespan, 0, 1);

          // angular velocity mapped to x location
          this.angle = this.location.x;

          // destroy seeds outside world
          if (this.location.x < 0 || this.location.x > movieWidth ||
              this.location.y < 0 || this.location.y > movieHeight) {
            Flora.elementList.destroyElement(this.id);
            return;
          }

          // decrement lifespan
          if (this.lifespan > 0) {
            this.lifespan -= 1;
          } else if (this.lifespan === 0) {
            Flora.elementList.destroyElement(this.id);
          }
        }
      };
    }
  });
};

exports.Dandelion = Dandelion;
/**
 * Creates a new SceneBuilder.
 *
 * A SceneBuilder holds methods that correspond to entries in a list
 * of scenes. When buildScene(scene) is called, the corresponding method
 * is called and the scene is built.
 *
 * @constructor
 * @param {Array.<Object>} list A list of scenes (required).
 */
function SceneBuilder(list) {

  if (!list) {
    throw new Error(this.name + ': A scene list is required.');
  }

  /**
   * The index of the current scene in this._list
   * @private
   */
  this._index = 0;

  this._setSceneList(list);
}

SceneBuilder.prototype.name = 'SceneBuilder';

/**
 * A list of scenes
 * @private
 */
SceneBuilder.prototype._list = null;

/**
 * Sets scene list.
 * @private
 * @retuns {Array.<Object>} A list of scenes.
 */
SceneBuilder.prototype._setSceneList = function(list) {

  if (!list) {
    throw new Error(this.name + ': A scene list is required.');
  }

  this._list = list;

  this._checkSceneMethodsExist(list);

  return this._list;
};

/**
 * Builds a new scene.
 *
 * @public
 * @param {string} scene A scene to build. The scene name
 *    must match an entry in the scene list passed when
 *    the SceneBuilder was constructed.
 */
SceneBuilder.prototype.buildScene = function(scene) {

  var i, max;

  if (!scene) {
    throw new Error(this.name + ': A scene is required.');
  }

  for (i = 0, max = this._list.length; i < max; i += 1) {
    if (this._list[i].name === scene) {
      if (Flora.universe) {
        Flora.universe.clearWorld(Flora.universe.first().id);
      }
      return this['_' + scene](i);
    }
  }
};

/**
 * Checks if a build method exists for each scene.
 *
 * @private
 * @param {Array.<Object>} list A list of scenes (required).
 * @throws {Error} If a build method does not exist.
 */
SceneBuilder.prototype._checkSceneMethodsExist = function(list) {

  var i, max, name, arr = [];

  for (i = 0, max = list.length; i < max; i += 1) {
    name = list[i].name;
    if (!this['_' + name]) {
      arr.push(name);
    }
  }
  if (!arr.length) {
    this._list = list;
    return true;
  } else {
    throw new Error(this.name + ': The passed scenes have no build method.', arr);
  }
};

/**
 * Builds the first scene.
 * @public
 * @returns {number} The scene index.
 */
SceneBuilder.prototype.firstScene = function() {
  this._index = 0;
  this.buildScene(this._list[this._index].name);
  return this._index;
};

/**
 * Builds the last scene.
 * @public
 * @returns {number} The scene index.
 */
SceneBuilder.prototype.lastScene = function() {
  this._index = this._list.length - 1;
  this.buildScene(this._list[this._index].name);
  return this._index;
};

/**
 * Builds the next scene.
 * @public
 * @returns {number} The scene index.
 */
SceneBuilder.prototype.nextScene = function() {
  if (this._index + 1 < this._list.length) {
    this._index += 1;
    this.buildScene(this._list[this._index].name);
  }
  return this._index;
};

/**
 * Builds the previous scene.
 * @public
 * @returns {number} The scene index.
 */
SceneBuilder.prototype.previousScene = function() {
  if (this._index - 1 >= 0) {
    this._index -= 1;
    this.buildScene(this._list[this._index].name);
  }
  return this._index;
};

/**
 * @private
 */
SceneBuilder.prototype._title = function(index) {

  var getRandomNumber = exports.Utils.getRandomNumber;

  var i, xPosArr = [],
      xPos,
      totalDandelions = 14,
      movieWidth = Flora.universe.first().width,
      movieHeight = Flora.universe.first().height,
      interval = movieWidth/totalDandelions,
      swayDistance = interval/8,
      headMaxSize = 24,
      headMinSize = 16,
      headSize,
      stemMinHeight = 50,
      stemMaxHeight = 100,
      stemHeight;

  // create dandelions
  for (i = 1; i < totalDandelions; i += 1) {

    headSize = getRandomNumber(headMinSize, headMaxSize);
    stemHeight = getRandomNumber(stemMinHeight, stemMaxHeight);

    xPos = interval * i;
    xPos += getRandomNumber(-swayDistance, swayDistance);
    xPosArr.push(xPos);

    var plHead = new Flora.ColorPalette();
    plHead.addColor({
      min: 1,
      max: 12,
      startColor: [200, 200, 200],
      endColor: [170, 170, 170]
    });

    var plHeadBorder = new Flora.ColorPalette();
    plHeadBorder.addColor({
      min: 1,
      max: 12,
      startColor: [255, 255, 255],
      endColor: [240, 240, 240]
    });

    var dandelion = new exports.Dandelion({
      className: 'dandelion',
      initX: xPos,
      location: new Flora.Vector(xPos, movieHeight - stemHeight),
      width: headSize,
      height: headSize,
      color: plHead.getColor(),
      borderColor: plHeadBorder.getColor(),
      swayDistance: swayDistance
    });

    var root = new Flora.Point({
      className: 'root',
      location: new Flora.Vector(xPos, movieHeight)
    });

    var stem = new Flora.Connector(dandelion, root, {className: 'stem'});
  }

  // update wind
  var perlinTime = 0,
      perlinOffsetX = getRandomNumber(0, 100),
      perlinOffsetY = getRandomNumber(0, 100),
      windX, windY;

  setInterval(function() {

    perlinTime += 0.01;

    windX = exports.Utils.map(Flora.SimplexNoise.noise(perlinTime + perlinOffsetX, 0),
        -1, 1, -5, 5);

    windY = exports.Utils.map(Flora.SimplexNoise.noise(perlinTime + perlinOffsetY, 0),
        -1, 1, -0.5, 0);

    Flora.universe.update({
        wind: new Flora.Vector(windX, windY)},
        Flora.universe.getWorldById('movie'));

  }, 100);

  //this._releaseSeeds();

  return index;
};

/**
 * @private
 */
SceneBuilder.prototype._field = function(index) {



  return index;
};


exports.SceneBuilder = SceneBuilder;
/**
 * Creates a new Movie.
 *
 * @constructor
 */
function Movie(list, opt_size, opt_backgroundColor) {

  if (!list) {
    throw new Error(this.name + ': A scene list is required.');
  }

  this.sceneList = list;
  this.size = opt_size || {width: 960, height: 540}; // 1280 x 720 = HD
  //this.backgroundColor = opt_backgroundColor || [30, 30, 30];
}

Movie.prototype.name = 'Movie';

Movie.prototype.sceneBuilder = null;

/**
 * Runs any necessary bootstrapping and creates a SceneBuilder.
 */
Movie.prototype.start = function() {

  var width = this.size.width,
      height = this.size.height,
      backgroundColor = this.backgroundColor;

  Flora.System.start(function() {
      Flora.universe.update({
        wind: new Flora.Vector(10, 0),
        width: width,
        height: height,
        color: backgroundColor,
        location: new Flora.Vector(exports.Utils.getWindowSize().width/2 - width/2,
            exports.Utils.getWindowSize().height/2 - height/2)
      }, Flora.universe.getWorldById('movie'));
  }, null, [document.getElementById('movie')]);
  this.sceneBuilder = new exports.SceneBuilder(this.sceneList);
};

exports.Movie = Movie;
}(exports));
