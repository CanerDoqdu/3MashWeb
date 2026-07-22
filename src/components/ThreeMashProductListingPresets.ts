import type { Props } from "./ThreeMashProductsPage/types";

export function listingProps(props: Props, defaults: Partial<Props>): Props {
  return {
    ...defaults,
    ...props,
    titleText: props.titleText !== undefined ? props.titleText : defaults.titleText,
    eyebrowText: props.eyebrowText || defaults.eyebrowText,
    descriptionText: props.descriptionText || defaults.descriptionText,
  };
}
