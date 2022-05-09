export class Robot {
  position: [number, number];
  direction: string;
  tableSize: [number, number];
  obstacles: [number, number][];

  constructor(position, direction, tableSize, obstacles = []) {
    this.position = position;
    this.direction = direction;
    this.tableSize = tableSize;
    this.obstacles = obstacles;
  }

  getPosition() {
    return this.position;
  }

  checkObstacles(newCoordinates) {
    return this.obstacles.some((obstacle) => obstacle[0] === newCoordinates[0] && obstacle[1] === newCoordinates[1]);
  }

  handleOverflow(newPosition) {
    newPosition = [newPosition[0] % this.tableSize[0], newPosition[1] % this.tableSize[1]];
    if (newPosition[0] < 0) {
      newPosition[0] += this.tableSize[0];
    }
    if (newPosition[1] < 0) {
      newPosition[1] += this.tableSize[1];
    }
    return newPosition;
  }

  moveForward() {
    let newPosition;
    switch (this.direction) {
      case "N":
        newPosition = [this.position[0], this.position[1] + 1];
        break;
      case "E":
        newPosition = [this.position[0] + 1, this.position[1]];
        break;
      case "S":
        newPosition = [this.position[0], this.position[1] - 1];
        break;
      case "W":
        newPosition = [this.position[0] - 1, this.position[1]];
        break;
      default:
        break;
    }
    newPosition = this.handleOverflow(newPosition);
    if (this.checkObstacles(newPosition)) {
      throw new Error(`Obstáculo en posición ${newPosition[0]},${newPosition[1]}`);
    } else {
      this.position = newPosition;
    }
  }

  moveBackward() {
    switch (this.direction) {
      case "N":
        this.position[1] = (this.position[1] % this.tableSize[1]) - 1;
        break;
      case "E":
        this.position[0] = (this.position[0] % this.tableSize[1]) - 1;
        break;
      case "S":
        this.position[1] = (this.position[1] % this.tableSize[1]) + 1;
        break;
      case "W":
        this.position[0] = (this.position[0] % this.tableSize[1]) + 1;
        break;
      default:
        break;
    }
  }

  turnRight() {
    switch (this.direction) {
      case "N":
        this.direction = "E";
        break;
      case "E":
        this.direction = "S";
        break;
      case "S":
        this.direction = "W";
        break;
      case "W":
        this.direction = "N";
        break;
      default:
        break;
    }
  }

  turnLeft() {
    switch (this.direction) {
      case "N":
        this.direction = "W";
        break;
      case "E":
        this.direction = "N";
        break;
      case "S":
        this.direction = "E";
        break;
      case "W":
        this.direction = "S";
        break;
      default:
        break;
    }
  }

  run(command: string) {
    command.split("").forEach((c) => {
      switch (c) {
        case "f":
          this.moveForward();
          break;
        case "r":
          this.turnRight();
          break;
        case "l":
          this.turnLeft();
          break;
        case "b":
          this.moveBackward();
          break;
        default:
          break;
      }
    });
  }
}
