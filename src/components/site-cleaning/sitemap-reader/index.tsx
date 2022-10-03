import * as React from 'react';
import {useSitemapReader} from './hook';
import {SitemapReaderProps} from './types';
import {Button, LinearProgress, Box, Fab} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import UploadIcon from '@mui/icons-material/UploadFile';
import './style.css';

const clearInputValue = (event: any) => (event.currentTarget.value = null);

const SiteMapReader = ({
  validFileTypes,
  ...useSitemapReaderProps
}: SitemapReaderProps): JSX.Element => {
  const [isLoading, success, progressPercentage, processSitemap] =
    useSitemapReader({...useSitemapReaderProps});
  return (
    <Box sx={{display: 'flex', alignItems: 'center'}}>
      <Box sx={{m: 1, position: 'relative'}}>
        <Button variant="contained" component="label">
          {success ? <CheckIcon /> : <UploadIcon />}
          <p>Upload Site Map</p>
          <input
            type="file"
            id="sitemap-input"
            accept={validFileTypes.join(',')}
            onChange={processSitemap as (event: any) => void}
            multiple={false}
            onClick={clearInputValue}
            hidden
          />
        </Button>
      </Box>
      {isLoading && (
        <LinearProgress
          variant="determinate"
          value={progressPercentage as number}
        />
      )}
    </Box>
  );
};

export default SiteMapReader;
