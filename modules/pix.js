var LiveForm = require("./LiveForm");
var random = require("./random.js");



module.exports = class mard extends LiveForm {
    constructor(x, y, index) {
        super(x,y,index)
        this.multiply = 0;
        this.energy = 30;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x + 2, this.y + 2],
            [this.x + 2, this.y + 1],
            [this.x + 2, this.y],
            [this.x, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x + 2, this.y + 2],
            [this.x - 2, this.y + 2],
            [this.x - 2, this.y + 1],
            [this.x - 2, this.y],
            [this.x, this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x - 2, this.y + 2],
            [this.x + 2, this.y - 2],
            [this.x + 2, this.y - 1],
            [this.x + 2, this.y],
            [this.x, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y - 2],
            [this.x - 2, this.y - 1],
            [this.x - 2, this.y],
            [this.x, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x - 2, this.y - 2],
        ];
    }
    chooseCell(character) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    mul() {
        this.multiply++;
        var newCell = random(this.chooseCell(0));
        if (newCell && this.multiply >= 14) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 4;
            var newMard = new mard(newX, newY, 4);
            PixArr.push(newMard);
            this.multiply = 0;
        }
    }
    move() {
        var newCell = random(this.chooseCell(0));
        if (newCell) {
            var x = newCell[0];
            var y = newCell[1];
            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;
            this.y = y;
            this.x = x;
        }
        this.energy-2;
        if (this.energy == 0) {
            this.die();
        }
    }
    die() {
        for (var i in PixArr) {
            if (this.x == PixArr[i].x && this.y == mardArr[i].y) {
                PixArr.splice(i, 0);
                break;
            }
        }
    }
    eat(){
        var newCell = random(this.chooseCell(2).concat(this.chooseCell(3)).concat(this.chooseCell(1)));
        console.log(newCell);
        
        if (newCell) {
            var x = newCell[0];
            var y = newCell[1];
            matrix[y][x] = 4;

            matrix[this.y][this.x] = 0;
            this.y = y;
            this.x = x;
            this.energy++;
            this.mul();
            for (var i in grassEaterArr) {
                if (x == grassEaterArr[i].x && y == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 0);
                    break;
                }
            }for (var i in grassArr) {
                if (x == grassArr[i].x && y == grassArr[i].y) {
                    grassArr.splice(i, 0);
                    break;
                }
            }for (var i in  grassEaterArr) {
                if (x == grassEaterArr[i].x && y == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 0);
                    break;
                }
            }
        }
        else{
            this.move();
        }
    }   
}