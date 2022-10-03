import {CellType, TrainingSummary} from '../../../types/site-cleaning';

export type SiteMapGridProps = {
  matrix: CellType[][];
  onKeyDown: (trainingSummary: TrainingSummary) => void;
};

export type Coordination = {
  x: number;
  y: number;
};

export type SitemapCellProps = {
  position: Coordination;
  type: CellType;
  fuel: number;
  isCurrent: boolean;
};

export const cellActivityFuel: {[key in CellType]: number} = {
  [CellType.PlainLand]: 1,
  [CellType.RockyGround]: 2,
  [CellType.Tree]: 2,
  [CellType.UnremovableTree]: -1,
};

export type KeydownEventCb = (event: KeyboardEvent) => void;
