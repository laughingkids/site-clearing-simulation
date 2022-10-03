import {useState} from 'react';
import {UseSitemapReaderProps} from './types';

export const convertTextSitemapAsMatrix = (input: string, divider = '\n') => {
  const matrix: string[][] = [];
  if (!input) {
    return matrix;
  }
  input.split(divider).forEach((row: string) => {
    const values = row.split('');
    matrix.push(values);
  });
  return matrix;
};

export const useSitemapReader = ({
  successCallback,
  onErrorCallback,
}: UseSitemapReaderProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [progressPercentage, setProgressPercentage] = useState(0);

  const processSitemap = (event: any) => {
    setSuccess(false);
    setIsLoading(true);
    event.preventDefault();
    const selectedFile = event.currentTarget.files[0];
    const errorMsg = `Fail to process sitemap in file: ${selectedFile.name}. Please check input or try again.`;
    const reader = new FileReader();
    reader.onload = ({target}: ProgressEvent<FileReader>) => {
      const input = target?.result as string;
      const matrix = convertTextSitemapAsMatrix(input);
      if (
        matrix.find((row: string[]) => row.length === 0) ||
        matrix.length === 0
      ) {
        onErrorCallback(errorMsg);
      } else {
        setSuccess(true);
        setIsLoading(false);
        successCallback(matrix);
      }
    };
    reader.onerror = () => {
      onErrorCallback(errorMsg);
    };
    reader.onprogress = ({loaded, total}: ProgressEvent<FileReader>) => {
      setProgressPercentage((loaded / total) * 100);
    };
    reader.readAsText(selectedFile);
  };
  return [isLoading, success, progressPercentage, processSitemap];
};
