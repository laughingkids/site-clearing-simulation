import {
  CellType,
  Directions,
  DirectionMovementKeys,
} from '../../../types/site-cleaning';
import {Coordination} from './types';

const SIN_90 = 1;
const SIN_MIN_90 = -1;
const COS_90 = 0;

export const getNextMove = (
  movement: DirectionMovementKeys,
  {x: previousX, y: previousY}: Coordination
) => {
  const sin = movement === 'ArrowRight' ? SIN_90 : SIN_MIN_90;
  const nextX = previousX * COS_90 + previousY * sin;
  const nextY = -previousX * sin + previousY * COS_90;
  console.log({nextX, nextY});
  return {
    x: nextX === 0 ? 0 : nextX,
    y: nextY === 0 ? 0 : nextY,
  };
};

export const getUnclearedSquare = (matrix?: CellType[][]): number => {
  if (!matrix || !isValidMatrix(matrix)) {
    return 0;
  }
  let count = 0;
  for (const row of matrix) {
    for (const cell of row) {
      if (cell !== CellType.PlainLand && cell !== CellType.UnremovableTree) {
        count += 1;
      }
    }
  }
  return count;
};

export const isValidMatrix = (matrix: CellType[][]): boolean => {
  return matrix.length !== 0 && matrix[0].length !== 0;
};

export const getSimulationCredit = (
  fuelConsumption: number,
  matrix: CellType[][]
): number => {
  const unclearedSquare = getUnclearedSquare(matrix);
  return fuelConsumption + unclearedSquare * 3;
};

export const getDirectionByCoordination = ({x, y}: Coordination) => {
  if (x === 0) {
    if (y === 1) {
      return Directions.North;
    } else {
      return Directions.South;
    }
  }
  if (y === 0) {
    if (x === 1) {
      return Directions.East;
    } else {
      return Directions.West;
    }
  }
};

export const isValidKey = (key: string) => {
  return ['q', 'Q', 'ArrowUp', 'ArrowRight', 'ArrowLeft'].includes(key);
};
