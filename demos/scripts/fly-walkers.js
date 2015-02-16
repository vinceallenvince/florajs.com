/*
FloraJS-Flocking
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
/* Build time: August 18, 2013 02:34:32 */

/*global exports */
(function(exports) {

  var totalWalkers = 16;

  var Walkers = {
    beforeStepWalkers: function() {
      var vel = -this.parent.velocity.mag() * 10;
      this.angle += vel;
    },
    createWalkers: function() {
      for (var i = 0; i < totalWalkers; i++) {
        var walker = this.add('Walker', {
          zIndex: 2,
          maxSpeed: 5
        });

        this.add('Mover', {
          parent: walker,
          pointToDirection: false,
          pointToParentDirection: false,
          checkWorldEdges: false,
          angle: 0,
          isStatic: false,
          color: [255, 255, 255],
          borderRadius: 0,
          width: 6,
          height: 20,
          offsetDistance: 0,
          offsetAngle: 0,
          zIndex: 1,
          beforeStep: Walkers.beforeStepWalkers
        });
      }
    }
  };

  exports.Walkers = Walkers;

}(exports));