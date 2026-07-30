import ThreeMashPrintersSourceLanding from "../../sub-components/ThreeMashPrintersSourceLanding";
import { ThreeMashFooter } from "../ThreeMashFooter";
import { ThreeMashHeader } from "../ThreeMashHeader";

export function ThreeMashThreeDprintersPage() {
  return (
    <>
      <ThreeMashHeader logoText="mash" />
      <main className="three-mash-three-d-printers-page">
        <ThreeMashPrintersSourceLanding />
      </main>
      <ThreeMashFooter />
    </>
  );
}

export default ThreeMashThreeDprintersPage;
