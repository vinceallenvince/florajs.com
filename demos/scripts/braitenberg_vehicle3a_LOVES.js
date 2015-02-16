/*
Braitenberg-Vehicles
Copyright (c) 2013 Vince Allen
vince@vinceallen.com
http://www.vinceallen.com

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
/* Version: 1.0.0 */
/* Build time: September 10, 2013 11:55:33 */

/*global Flora, Burner, Brait, document */
var world = new Burner.World(document.body, {
  c: 0.01,
  gravity: new Burner.Vector(),
  width: Flora.Utils.getWindowSize().width / 0.75,
  height: Flora.Utils.getWindowSize().height / 0.75,
  borderWidth: 1,
  borderStyle: 'dashed',
  borderColor: [100, 100, 100],
  color: [0, 0, 0],
  boundToWindow: false
});

Burner.System.init(function() {

  var i, max,
      maxVehicles = 6,
      getRandomNumber = Flora.Utils.getRandomNumber,
      world = Burner.System.firstWorld();

  // create vehicles
  for (i = 0; i < maxVehicles; i += 1) {

    var obj = new Brait.Vehicle({
      system: this,
      controlCamera: !i,
      color: !i ? [255, 255, 255] : [255, 100, 0],
      borderColor: !i ? [255, 100, 0] : [255, 150, 50],
      viewArgs: [i],
      sensors: [
        new Brait.Sensor({
          type: 'food',
          behavior: 'LOVES'
        })
      ],
      collisions: {
        'food': Brait.Food.collide
      }
    });
    var eye = document.createElement('div');
    eye.id = 'eye' + obj.id;
    eye.className = 'eye';
    eye.style.background = !i ? 'rgb(100, 100, 100)' : 'rgb(255, 255, 255)',
    eye.style.opacity = 1;
    obj.el.appendChild(eye);
  }

  // create stimulants
  for (i = 0, max = (0.02 * world.bounds[1]); i < max; i += 1) {
    Brait.Stimulus.create(null, new Burner.Vector(getRandomNumber(0, world.width),
        getRandomNumber(0, world.height)), [Brait.Food]);
  }

  // add event listener to create random stimulant on mouseup
  Flora.Utils.addEvent(document, 'mouseup', Brait.Stimulus.createFood);

}, world, null, true);

Flora.Utils.addEvent(document.getElementById('buttonStart'), "mouseup", function(e) {

  if (e.stopPropagation) {
    e.stopPropagation();
  }
  document.getElementById('containerMenu').removeChild(document.getElementById('containerButton'));
  Burner.System.start();
});
