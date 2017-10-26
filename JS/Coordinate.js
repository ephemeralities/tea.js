/**
 * (x, y) coordinate system used for sprites, camera positions, etc.
 * @class Coordinate
 * @param {number} x - Coordinate on the x axis
 * @param {number} y - Coordinate on the y axis
 * */

function Coordinate(x, y) {
    this.x = x;
    this.y = y;
}

/**
 * Updates coordinate with a new x and y position
 * @memberof Coordinate.prototype
 * @func update
 * @param {number} x - Coordinate on the x axis
 * @param {number} y - Coordinate on the y axis
 * */
Coordinate.prototype.update = function(x, y) {
    this.x = x;
    this.y = y;
};
