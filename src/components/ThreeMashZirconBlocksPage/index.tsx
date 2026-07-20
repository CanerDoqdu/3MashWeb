import { ThreeMashFooter } from "../ThreeMashFooter";
import { ThreeMashHeader } from "../ThreeMashHeader";

export function ThreeMashZirconBlocksPage() {
  return (
    <>
      <ThreeMashHeader logoText="mash" />
      <main className="three-mash-empty-product-page" aria-hidden="true" />
      <ThreeMashFooter />
    </>
  );
}

export default ThreeMashZirconBlocksPage;
