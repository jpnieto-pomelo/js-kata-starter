// @ts-ignore see https://github.com/jest-community/jest-extended#setup
import * as matchers from "jest-extended";
import { Robot } from ".";
expect.extend(matchers);

it("should create a robot at 0,0 in direction E and move it to 2,2 when running command fflff", () => {
  // Arrange
  const robot = new Robot([0, 0], "E", [50, 50]);

  // Act
  robot.run("fflff");

  // Assert
  expect(robot.getPosition()).toEqual([2, 2]);
});

it("should create a robot at 0,0 and move it to 0,0 when running command ffffflfffff", () => {
  // Arrange
  const robot = new Robot([0, 0], "E", [5, 5]);

  // Act
  robot.run("ffffflfffff");

  // Assert
  expect(robot.getPosition()).toEqual([0, 0]);
});

it("should create a robot at 0,0 and move it to 3,0 and report an obstacle at 4,0", () => {
  // Arrange
  const robot = new Robot([0, 0], "E", [5, 5], [[4, 0]]);

  // Assert
  expect(() => robot.run("fffff")).toThrowError("Obstáculo en posición 4,0");
});

it("should create a robot at 0,0 and move it to 4,4 when moving 1,1 to SW", () => {
  // Arrange
  const robot = new Robot([0, 0], "S", [5, 5]);

  // Act
  robot.run("frf");

  // Assert
  expect(robot.getPosition()).toEqual([4, 4]);
});
