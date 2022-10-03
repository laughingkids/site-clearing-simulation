import {TrainingCommand, ValidKeys} from '../../../types/site-cleaning';

export const getTrainingCommand = (key: ValidKeys): TrainingCommand => {
  switch (key) {
    case 'ArrowLeft':
      return 'Left';
    case 'ArrowRight':
      return 'Right';
    case 'ArrowUp':
      return 'Advance';
    case 'Q':
    case 'q':
      return 'Quit';
  }
};
