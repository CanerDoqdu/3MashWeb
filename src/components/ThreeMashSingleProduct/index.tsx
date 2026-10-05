import { ThreeMashProductDetailLive } from "../ThreeMashProductDetailLive";
import { Props } from "./types";

export function ThreeMashSingleProduct(props: Props) {
  const liveProps = { ...props, renderMode: "hero" };
  return <ThreeMashProductDetailLive {...liveProps} />;
}

export default ThreeMashSingleProduct;
