export type TrainingSummary = {
  status: TrainingStatus;
  credit: number;
  consumedFuel: number;
  userInput: ValidKeys[];
  moveTo?: Directions;
};

export enum CellType {
  PlainLand = 'o',
  RockyGround = 'r',
  Tree = 't',
  UnremovableTree = 'T',
}

export enum Directions {
  East = 'East',
  South = 'South',
  West = 'West',
  North = 'North',
}

export type DirectionMovementKeys = 'ArrowRight' | 'ArrowLeft';

export type ValidKeys = 'ArrowUp' | 'Q' | 'q' | DirectionMovementKeys;

export enum TrainingStatus {
  STANDBY,
  PROGRESSING,
  QUIT,
}

export type TrainingCommand = 'Advance' | 'Left' | 'Right' | 'Quit';
