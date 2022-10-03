export type UseSitemapReaderProps = {
  successCallback: (data: any) => void;
  onErrorCallback: (message: string) => void;
};

export type SitemapReaderProps = {
  validFileTypes: ValidFileTypes[];
} & UseSitemapReaderProps;

export type ValidFileTypes = '.txt' | '.doc';

export enum SitemapStatus {
  PENDING,
  LOADED,
  FAILED,
}
