export type TrainingSummary = {
  status: TrainingStatus;
  credit: number;
  consumedFuel: number;
  userInput: ValidKey[];
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

export type ValidKey = 'ArrowUp' | 'Q' | 'q' | DirectionMovementKeys;

export const ValidKeysList: ValidKey[] = [
  'ArrowRight',
  'ArrowLeft',
  'ArrowUp',
  'Q',
];

export enum TrainingStatus {
  STANDBY,
  PROGRESSING,
  QUIT,
}

export type TrainingCommand = 'Advance' | 'Left' | 'Right' | 'Quit';
