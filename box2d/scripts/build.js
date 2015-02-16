/*
Flora + Box2D
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
/* Version: 0.0.1 */
/* Build time: October 28, 2012 06:43:15 */
/** @namespace */
var FloraBox2D = {}, exports = FloraBox2D;

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
 * Creates a new Box.
 *
 *
 * @constructor
 */
function Box(world, opt_options) {

  var options = opt_options || {};

  Flora.Element.call(this, options);

  // the box2D World
  this.box2DWorld = world;

  // 1. Define a body
  this.bd = new Box2D.Dynamics.b2BodyDef();

  // 2. Configure the body definition
  if (!this.isStatic) {
    this.bd.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
  } else {
    this.bd.type = Box2D.Dynamics.b2Body.b2_staticBody;
  }
  this.bd.position.Set(this.location.x, this.location.y);
  this.bd.angle = Utils.degreesToRadians(this.angle);
  this.bd.allowSleep = true;
  this.bd.awake = true;
  this.bd.bullet = false;
  this.bd.active = true;
  this.bd.userData = this.id;

  // 3. Create the body
  this.body = this.box2DWorld.CreateBody(this.bd);

  // 4. Create a fixture
  this.fd = new Box2D.Dynamics.b2FixtureDef();
  this.fd.density = 100;
  this.fd.friction = 0.5;
  this.fd.restitution = 0.35;

  // 5. Create a shape.
  this.fd.shape = new Box2D.Collision.Shapes.b2PolygonShape();
  this.fd.shape.SetAsBox(
    this.width/2,
    this.height/2
  );

  // 6. Attach shape to body via fixture
  this.body.CreateFixture(this.fd);

}
exports.Utils.extend(Box, Flora.Element);

Box.prototype.name = 'Box';

Box.prototype.step = function() {

  var body = this.body;

  if (body.GetPosition().x && body.GetPosition().y) {
    this.location.x = body.GetPosition().x;
    this.location.y = body.GetPosition().y;
  }
  this.angle = Utils.radiansToDegrees(body.GetAngle());

  if (this.location.y > this.world.height + 100) {
    this.box2DWorld.DestroyBody(this.body);
    Flora.elementList.destroyElement(this.id);
  }

};

exports.Box = Box;
/**
 * Creates a new Ball.
 *
 *
 * @constructor
 */
function Ball(world, opt_options) {

  var options = opt_options || {};

  Flora.Element.call(this, options);

  // the box2D World
  this.box2DWorld = world;

  // 1. Define a body
  this.bd = new Box2D.Dynamics.b2BodyDef();

  // 2. Configure the body definition
  this.bd.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
  this.bd.position.Set(this.location.x, this.location.y);
  this.bd.angle = Utils.degreesToRadians(this.angle);
  this.bd.allowSleep = true;
  this.bd.awake = true;
  this.bd.bullet = false;
  this.bd.active = true;
  this.bd.userData = this.id;

  // 3. Create the body
  this.body = this.box2DWorld.CreateBody(this.bd);

  // 4. Create a fixture
  this.fd = new Box2D.Dynamics.b2FixtureDef();
  this.fd.density = 100;
  this.fd.friction = 0.5;
  this.fd.restitution = 0.35;

  // 5. Create a shape.
  this.fd.shape = new Box2D.Collision.Shapes.b2CircleShape();
  this.fd.shape.SetRadius(
    this.width/2
  );

  // 6. Attach shape to body via fixture
  this.body.CreateFixture(this.fd);

}
exports.Utils.extend(Ball, Flora.Element);

Ball.prototype.name = 'Ball';

Ball.prototype.step = function() {

  var body = this.body;

  if (body.GetPosition().x && body.GetPosition().y) {
    this.location.x = body.GetPosition().x;
    this.location.y = body.GetPosition().y;
  }
  this.angle = Utils.radiansToDegrees(body.GetAngle());

  if (this.location.y > this.world.height + 100) {
    this.box2DWorld.DestroyBody(this.body);
    Flora.elementList.destroyElement(this.id);
  }

};

exports.Ball = Ball;
/**
 * Creates a new Wall.
 *
 *
 * @constructor
 */
function Wall(world, opt_options) {

  var options = opt_options || {};

  Flora.Element.call(this, options);

  // the box2D World
  this.box2DWorld = world;

  // 1. Define a body
  this.bd = new Box2D.Dynamics.b2BodyDef();

  // 2. Configure the body definition
  this.bd.type = Box2D.Dynamics.b2Body.b2_staticBody;
  this.bd.position.Set(this.location.x, this.location.y);
  this.bd.angle = Utils.degreesToRadians(this.angle);
  this.bd.allowSleep = true;
  this.bd.awake = true;
  this.bd.bullet = false;
  this.bd.active = true;
  this.bd.userData = this.id;

  // 3. Create the body
  this.body = this.box2DWorld.CreateBody(this.bd);

  // 4. Create a fixture
  this.fd = new Box2D.Dynamics.b2FixtureDef();
  this.fd.density = 0;
  this.fd.friction = 0.5;
  this.fd.restitution = 0.1;

  // 5. Create a shape.
  this.fd.shape = new Box2D.Collision.Shapes.b2PolygonShape(); // build shape
  this.fd.shape.SetAsBox(
    this.width/2,
    this.height/2
  );

  // 6. Attach shape to body via fixture
  this.body.CreateFixture(this.fd);

}
exports.Utils.extend(Wall, Flora.Element);

Wall.prototype.name = 'Wall';

Wall.prototype.step = function() {

  var body = this.body;

  this.location.x = body.GetPosition().x;
  this.location.y = body.GetPosition().y;
  this.angle = Utils.radiansToDegrees(body.GetAngle());

};

exports.Wall = Wall;
/**
 * Creates a new Edge.
 *
 *
 * @constructor
 */
function Edge(world, opt_options) {

  var options = opt_options || {};

  Flora.Element.call(this, options);

  // the box2D World
  this.box2DWorld = world;

  // 1. Define a body
  this.bd = new Box2D.Dynamics.b2BodyDef();

  // 2. Configure the body definition
  this.bd.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
  this.bd.position.Set(this.location.x, this.location.y);
  this.bd.angle = Utils.degreesToRadians(this.angle);
  this.bd.allowSleep = true;
  this.bd.awake = true;
  this.bd.bullet = false;
  this.bd.active = true;
  this.bd.userData = this.id;

  // 3. Create the body
  this.body = this.box2DWorld.CreateBody(this.bd);

  // 4. Create a fixture
  this.fd = new Box2D.Dynamics.b2FixtureDef();
  this.fd.density = 100;
  this.fd.friction = 0.5;
  this.fd.restitution = 0.35;


  // 5. Create a shape.
  this.fd.shape = new Box2D.Collision.Shapes.b2PolygonShape();
  console.log(this.fd.shape);

  var vertices = [
    {x: 0, y: 400},
    {x: 960, y: 450}
  ];

  this.fd.shape.SetAsEdge();

  // 6. Attach shape to body via fixture
  this.body.CreateFixture(this.fd);

}
exports.Utils.extend(Edge, Flora.Element);

Edge.prototype.name = 'Edge';

Edge.prototype.step = function() {

  var body = this.body;

  if (body.GetPosition().x && body.GetPosition().y) {
    this.location.x = body.GetPosition().x;
    this.location.y = body.GetPosition().y;
  }
  this.angle = Utils.radiansToDegrees(body.GetAngle());

};

exports.Edge = Edge;
/**
 * Creates a new Joint.
 *
 *
 * @constructor
 */
function Joint(world, parentA, parentB, opt_options) {

  var options = opt_options || {};

  Flora.Connector.call(this, parentA, parentB, options);

  this.bodyA = parentA.body;
  this.bodyB = parentB.body;


  // the box2D World
  this.box2DWorld = world;

  // 1. Define the Joint
  this.djd = new Box2D.Dynamics.Joints.b2DistanceJointDef();

  // initialize the joint def
  this.djd.Initialize(this.bodyA, this.bodyB, this.bodyA.GetWorldCenter(), this.bodyB.GetWorldCenter());
  this.djd.collideConnected = true;
  this.djd.length = 20;
  this.djd.frequencyHz = 3;
  this.djd.dampingRatio = 0;

  this.box2DWorld.CreateJoint(this.djd);

}
exports.Utils.extend(Joint, Flora.Connector);

Joint.prototype.name = 'Joint';

Joint.prototype.step = function() {

    var locBodyA = this.bodyA.GetWorldCenter(),
        locBodyB = this.bodyB.GetWorldCenter(),
        vectorBodyA = new Flora.Vector(locBodyA.x, locBodyA.y),
        vectorBodyB = new Flora.Vector(locBodyB.x, locBodyB.y),
        vectorMidPt = Flora.Vector.VectorMidPoint(vectorBodyA, vectorBodyB),
        a = vectorBodyB.x - vectorBodyA.x, // adjacent
        o = vectorBodyB.y - vectorBodyA.y; // opposite

    //VecMidPt.add(new Flora.Vector.create(0, -(this.myIndex - 1))); // midpoint gaines a pixel if created in a loop

    this.location = vectorMidPt; // position the center of the connector at the midpoint of the two bodies
    this.angle = exports.Utils.radiansToDegrees(Math.atan(o/a)); // rotate in the direction of the two bodies
    this.width = vectorBodyA.distance(vectorBodyB);
};

exports.Joint = Joint;
/**
 * Creates a new Box2DWorld.
 *
 * @param {Object} [options] Box2DWorld options.
 * @param {Object} [options.opt_gravity = {x : 0, y : 100}] Sets the gravitational force.
 * @param {boolean} [options.opt_allowSleep = false] Set to true to allow world to sleep.
 * @constructor
 */
function Box2DWorld(opt_options) {

  var options = opt_options || {},
      gravity = options.gravity || {x : 0, y : 100},
      allowSleep = !!options.allowSleep;

  Flora.Element.call(this, options);

  this.world = new Box2D.Dynamics.b2World(
    new Box2D.Common.Math.b2Vec2(gravity.x, gravity.y), // gravity
    allowSleep // allow sleep
  );
}
exports.Utils.extend(Box2DWorld, Flora.Element);

Box2DWorld.prototype.name = 'Box2DWorld';

Box2DWorld.prototype.step = function() {

  this.world.Step(1 / 60, 10, 10);
  this.world.ClearForces();

};

exports.Box2DWorld = Box2DWorld;
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
SceneBuilder.prototype._main = function(index) {

  var caption = new Flora.Caption({
    text: 'Click for more objects.',
    opacity: 0.4,
    borderColor: 'transparent',
    position: 'top center'
  });

  FloraBox2D.box2d = new exports.Box2DWorld();

  var flWorldWidth = Flora.universe.first().width,
      flWorldHeight = Flora.universe.first().height;

  var barrierA = new exports.Wall(FloraBox2D.box2d.world, {
    location: new Flora.Vector(flWorldWidth/2 - 80, flWorldHeight/2 + 100),
    width: Flora.universe.first().width * 0.25,
    height: 20,
    angle: 30
  });

  var barrierB = new exports.Wall(FloraBox2D.box2d.world, {
    location: new Flora.Vector(flWorldWidth/2 + 80, flWorldHeight/2 - 100),
    width: Flora.universe.first().width * 0.25,
    height: 20,
    angle: -30
  });

  var floor = new exports.Wall(FloraBox2D.box2d.world, {
    location: new Flora.Vector(flWorldWidth/2, flWorldHeight - 40),
    width: Flora.universe.first().width * 0.75,
    height: 20
  });

  var box = new exports.Box(FloraBox2D.box2d.world);

  Utils.addEvent(document, 'mouseup', this._createObjects);
  Utils.addEvent(document, 'touchstart', this._createObjects);

  return index;
};

SceneBuilder.prototype._createObjects = function(e) {

  var size = exports.Utils.getRandomNumber(10, 40),
      x = Math.round(e.clientX - Flora.universe.first().location.x),
      y = Math.round(e.clientY - Flora.universe.first().location.y);

  var plBox = new Flora.ColorPalette();
  plBox.addColor({
    min: 1,
    max: 20,
    startColor: [250, 100, 50],
    endColor: [200, 50, 0]
  });

  var plBall = new Flora.ColorPalette();
  plBall.addColor({
    min: 1,
    max: 30,
    startColor: [0, 174, 239],
    endColor: [20, 240, 245]
  });

  if (exports.Utils.getRandomNumber(0, 1)) {
    new exports.Box(FloraBox2D.box2d.world, {
      location: new Flora.Vector(x, y),
      width: size,
      height: size,
      color: plBox.getColor()
    });
  } else {
    new exports.Ball(FloraBox2D.box2d.world, {
      location: new Flora.Vector(x, y),
      width: size,
      height: size,
      color: plBall.getColor()
    });
  }
};

/**
 * @private
 */
SceneBuilder.prototype._joints = function(index) {

  var caption = new Flora.Caption({
    text: 'Click for more objects.',
    opacity: 0.4,
    borderColor: 'transparent',
    position: 'top center'
  });

  FloraBox2D.box2d = new exports.Box2DWorld();

  var flWorldWidth = Flora.universe.first().width,
      flWorldHeight = Flora.universe.first().height,
      startLeft = flWorldWidth * 0.25,
      startRight = flWorldWidth * 0.75;

  var anchor1 = new exports.Box(FloraBox2D.box2d.world, {
    location: new Flora.Vector(startLeft, flWorldHeight/2),
    isStatic: true,
    color: [177, 157, 95],
    boxShadow: 'none'
  });

  var anchor2 = new exports.Box(FloraBox2D.box2d.world, {
    location: new Flora.Vector(startRight, flWorldHeight/2),
    isStatic: true,
    color: [177, 157, 95],
    boxShadow: 'none'
  });

  var i, max = 12, boxes = [];

  for (i = 0; i < max; i += 1) {

    var box = new exports.Box(FloraBox2D.box2d.world, {
      location: new Flora.Vector(startLeft + i * ((startRight - startLeft)/max), flWorldHeight/1.5),
      color: [197, 177, 115],
      boxShadow: 'none'
    });

    if (i === 0) {
      new exports.Joint(FloraBox2D.box2d.world, anchor1, box);
    } else if (i === max - 1) {
      new exports.Joint(FloraBox2D.box2d.world, anchor2, box);
      new exports.Joint(FloraBox2D.box2d.world, boxes[boxes.length - 1], box);
    } else {
      new exports.Joint(FloraBox2D.box2d.world, boxes[boxes.length - 1], box);
    }

    boxes.push(box);
  }

  Utils.addEvent(document, 'mouseup', this._createObjects);
  Utils.addEvent(document, 'touchstart', this._createObjects);

  return index;
};

/**
 * @private
 */
SceneBuilder.prototype._edge = function(index) {

  var caption = new Flora.Caption({
    text: 'Click for more objects.',
    opacity: 0.4,
    borderColor: 'transparent',
    position: 'top center'
  });

  FloraBox2D.box2d = new exports.Box2DWorld();

  var flWorldWidth = Flora.universe.first().width,
      flWorldHeight = Flora.universe.first().height;

  var edge = new exports.Edge(box2dWorld.world);

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
  this.size = opt_size || {width: 640, height: 480}; // 1280 x 720
  this.backgroundColor = opt_backgroundColor || [30, 30, 30];
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
        isStatic: false,
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
