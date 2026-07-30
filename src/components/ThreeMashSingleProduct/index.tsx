import { ThreeMashProductDetailLive } from "../ThreeMashProductDetailLive";
import { Props } from "./types";

export function ThreeMashSingleProduct(props: Props) {
  return <ThreeMashProductDetailLive {...(props as any)} renderMode="hero" />;
}

export default ThreeMashSingleProduct;
