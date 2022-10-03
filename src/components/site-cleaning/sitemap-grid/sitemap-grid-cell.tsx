import * as React from 'react';
import {TableCell} from '@mui/material';
import {colors} from '../../../styles';
import {SitemapCellProps} from './types';
import {
  Forest,
  North,
  East,
  South,
  West,
  HighlightOff,
  Terrain,
  Park,
  Grass,
} from '@mui/icons-material';
import {CellType, Directions} from '../../../types/site-cleaning';
import {getDirectionByCoordination} from './utilities';

const DirectionCell = ({direction}: {direction?: Directions}) => {
  switch (direction) {
    case Directions.East:
      return <East />;
    case Directions.West:
      return <West />;
    case Directions.North:
      return <North />;
    case Directions.South:
      return <South />;
    default:
      return <></>;
  }
};

const SiteCell = ({type}: {type: CellType}) => {
  switch (type) {
    case CellType.RockyGround:
      return <Terrain />;
    case CellType.Tree:
      return <Park />;
    case CellType.UnremovableTree:
      return <Forest />;
    case CellType.PlainLand:
    default:
      return <Grass />;
  }
};

const SitemapGridCell = ({
  type,
  fuel,
  position,
  isCurrent,
  moveTo,
  isQuit,
}: SitemapCellProps) => {
  const {x, y} = position;
  const direction = getDirectionByCoordination(moveTo);
  return (
    <TableCell
      key={`${x},${y}`}
      data-fuel={fuel}
      data-position-x={x}
      data-position-y={y}
      style={{
        backgroundColor: isCurrent ? colors.primary : colors.primaryBackground,
        color: colors.primaryText,
      }}
    >
      {isCurrent ? (
        isQuit ? (
          <HighlightOff />
        ) : (
          <DirectionCell direction={direction} />
        )
      ) : (
        <SiteCell type={type} />
      )}
    </TableCell>
  );
};
export default SitemapGridCell;
