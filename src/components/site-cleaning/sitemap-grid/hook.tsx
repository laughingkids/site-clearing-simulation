import {useEffect, useState} from 'react';
import {
  CellType,
  TrainingStatus,
  TrainingSummary,
  ValidKeys,
} from '../../../types/site-cleaning';
import {cellActivityFuel, KeydownEventCb, SiteMapGridProps} from './types';
import {
  getDirectionByCoordination,
  getNextMove,
  getSimulationCredit,
  isValidKey,
} from './utilities';

const useGridMove = ({matrix, onKeyDown}: SiteMapGridProps) => {
  // initial states (shared with parent component)
  let status = TrainingStatus.PROGRESSING;
  let credit = 0;
  let moveTo = {x: 1, y: 0};
  let consumedFuel = 0;
  // local variables
  const width = matrix[0].length;
  const height = matrix.length;
  // local states
  const [position, setPosition] = useState({x: -1, y: 0});
  const [nextMove, setNextMove] = useState(moveTo);
  const [userInput, setUserInput] = useState([] as ValidKeys[]);

  useEffect(() => {
    const handleKeyDown: KeydownEventCb = (event: KeyboardEvent) => {
      // early quit
      if (!isValidKey(event.key)) {
        event.preventDefault();
      }
      const {x, y} = position;
      setUserInput([event.key, ...userInput] as ValidKeys[]);
      switch (event.key) {
        case 'ArrowUp': {
          const nextPosition = {y: y - nextMove.y, x: x + nextMove.x};
          const outerBoarder =
            nextPosition.x < 0 ||
            nextPosition.y < 0 ||
            nextPosition.x >= width ||
            nextPosition.y >= height;
          const nextCell = matrix[nextPosition.y][nextPosition.x];
          const hitUnremovableTree = nextCell === CellType.UnremovableTree;
          setPosition({y: nextPosition.y, x: nextPosition.x});
          if (outerBoarder || hitUnremovableTree) {
            status = TrainingStatus.QUIT;
            credit = getSimulationCredit(consumedFuel, matrix);
            break;
          }
          const fuel = cellActivityFuel[nextCell as CellType];
          matrix[nextPosition.y][nextPosition.x] = CellType.PlainLand;
          consumedFuel += fuel;
          break;
        }
        case 'ArrowLeft':
        case 'ArrowRight': {
          moveTo = getNextMove(event.key, nextMove);
          setNextMove(moveTo);
          break;
        }
        case 'q':
        case 'Q': {
          status = TrainingStatus.QUIT;
          credit = getSimulationCredit(consumedFuel, matrix);
          break;
        }
      }
      // get summary
      onKeyDown({
        userInput,
        status,
        consumedFuel,
        credit,
        moveTo: getDirectionByCoordination(moveTo),
      } as TrainingSummary);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [position, nextMove]);
  return {nextMove, matrix, position};
};

export default useGridMove;
