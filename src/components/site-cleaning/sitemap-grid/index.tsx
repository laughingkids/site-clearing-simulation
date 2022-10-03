import {TableContainer, TableRow} from '@mui/material';
import * as React from 'react';
import {CellType, TrainingStatus} from '../../../types/site-cleaning';
import useGridMove from './hook';
import SitemapGridCell from './sitemap-grid-cell';
import {cellActivityFuel, SiteMapGridProps} from './types';
import {isValidMatrix} from './utilities';

const SitemapGrid = (props: SiteMapGridProps) => {
  if (!isValidMatrix(props.matrix)) {
    return <></>;
  }
  const {matrix, position, nextMove, status} = useGridMove(props);
  return (
    <TableContainer>
      {matrix?.map((row, y) => {
        return (
          <TableRow>
            {row?.map((col, x) => {
              const isCurrent = position.x === x && position.y === y;
              return (
                <SitemapGridCell
                  isQuit={status === TrainingStatus.QUIT}
                  moveTo={nextMove}
                  isCurrent={isCurrent}
                  type={col as CellType}
                  position={{x, y}}
                  fuel={cellActivityFuel[col as CellType]}
                />
              );
            })}
          </TableRow>
        );
      })}
    </TableContainer>
  );
};

export default SitemapGrid;
