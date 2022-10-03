import {useEffect, useState} from 'react';
import {
  CellType,
  TrainingStatus,
  TrainingSummary,
  ValidKey,
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
  let credit = 0;
  // local variables
  const width = matrix[0].length;
  const height = matrix.length;
  // local states
  const [position, setPosition] = useState({x: -1, y: 0});
  const [nextMove, setNextMove] = useState({x: 1, y: 0});
  const [status, setStatus] = useState(TrainingStatus.PROGRESSING);
  const [consumedFuel, setConsumedFuel] = useState(0);
  const [userInput, setUserInput] = useState([] as ValidKey[]);
  const reset = () => {
    setPosition({x: -1, y: 0});
    setNextMove({x: 1, y: 0});
    setStatus(TrainingStatus.PROGRESSING);
    setConsumedFuel(0);
    setUserInput([] as ValidKey[]);
  };
  useEffect(() => {
    let moveTo = nextMove;
    let nextStatus: TrainingStatus = status;
    let fuelConsumption = consumedFuel;
    let userCommand = userInput;
    const handleKeyDown: KeydownEventCb = (event: KeyboardEvent) => {
      // early quit
      if (nextStatus === TrainingStatus.QUIT) {
        return;
      }
      const {x: currentX, y: currentY} = position;
      if (isValidKey(event.key)) {
        userCommand = [event.key as ValidKey, ...userCommand];
        setUserInput(userCommand);
        switch (event.key) {
          case 'ArrowUp': {
            const nextPosition = {
              y: currentY - nextMove.y,
              x: currentX + nextMove.x,
            };
            const outerBoarder =
              nextPosition.x < 0 ||
              nextPosition.y < 0 ||
              nextPosition.x >= width ||
              nextPosition.y >= height;
            if (!outerBoarder) {
              setPosition({y: nextPosition.y, x: nextPosition.x});
            }
            if (
              outerBoarder ||
              matrix[nextPosition.y][nextPosition.x] ===
                CellType.UnremovableTree
            ) {
              nextStatus = TrainingStatus.QUIT;
              setStatus(nextStatus);
              credit = getSimulationCredit(consumedFuel, matrix);
              break;
            }
            const fuel =
              cellActivityFuel[matrix[nextPosition.y][nextPosition.x]];
            matrix[nextPosition.y][nextPosition.x] = CellType.PlainLand;
            fuelConsumption += fuel;
            setConsumedFuel(fuelConsumption);
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
            nextStatus = TrainingStatus.QUIT;
            setStatus(nextStatus);
            credit = getSimulationCredit(consumedFuel, matrix);
            break;
          }
        }
        // get summary
        onKeyDown({
          userInput: userCommand,
          status: nextStatus,
          consumedFuel: fuelConsumption,
          credit,
          moveTo: getDirectionByCoordination(moveTo),
        } as TrainingSummary);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [position, nextMove]);
  return {nextMove, matrix, position, status, reset};
};

export default useGridMove;
