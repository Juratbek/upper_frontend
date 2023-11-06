export interface IPagesProps {
  count: number;
  onPageChange: (page: number) => void;
  activePage: number;
  className?: string;
}
