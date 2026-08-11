declare module "@ikas/component-utils" {
  export function observer<T extends (props: any) => any>(component: T): T;
}

declare module "*.webp" {
  const src: string;
  export default src;
}

declare module "*.mp4" {
  const src: string;
  export default src;
}

declare module "*.png" {
  const src: string;
  export default src;
}
