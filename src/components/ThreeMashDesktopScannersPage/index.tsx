import { ThreeMashFooter } from "../ThreeMashFooter";
import { ThreeMashHeader } from "../ThreeMashHeader";

export function ThreeMashDesktopScannersPage() {
  return (
    <>
      <ThreeMashHeader logoText="mash" />
      <main className="three-mash-empty-product-page" aria-hidden="true" />
      <ThreeMashFooter />
    </>
  );
}

export default ThreeMashDesktopScannersPage;
