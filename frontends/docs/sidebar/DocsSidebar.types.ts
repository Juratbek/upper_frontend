export interface IDocsSidebarLink {
  name: string;
  url: string;
  children?: IDocsSidebarLink[];
}

export type TGetLinksProps = (links: IDocsSidebarLink[], padding: number) => JSX.Element[];
