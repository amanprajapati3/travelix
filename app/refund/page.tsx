import Legal from "../components/layout/legal/Legal";
import { site } from "@/data";

export default function RefundPolicyPage() {
  return <Legal data={site.refundPolicy} />;
}