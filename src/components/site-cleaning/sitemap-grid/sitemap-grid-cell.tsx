import * as React from 'react';
import {TableCell} from '@mui/material';
import {colors} from '../../../styles';
import {SitemapCellProps} from './types';

const SitemapGridCell = ({
  type,
  fuel,
  position,
  isCurrent,
}: SitemapCellProps) => {
  const {x, y} = position;
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
      {type}
    </TableCell>
  );
};
export default SitemapGridCell;
