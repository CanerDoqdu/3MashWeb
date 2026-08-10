import ThreeMashPrintersSourceLanding from "../../sub-components/ThreeMashPrintersSourceLanding";
import { ThreeMashFooter } from "../ThreeMashFooter";
import { ThreeMashHeader } from "../ThreeMashHeader";
import type { Props } from "./types";

export function ThreeMashThreeDprintersPage(props: Props) {
  return (
    <>
      <ThreeMashHeader logoText="mash" />
      <main className="three-mash-three-d-printers-page">
        <ThreeMashPrintersSourceLanding {...props} />
      </main>
      <ThreeMashFooter />
    </>
  );
}

export default ThreeMashThreeDprintersPage;
