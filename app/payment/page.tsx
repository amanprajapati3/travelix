import Legal from "../components/layout/legal/Legal";
import { site } from "@/data";

export default function PaymentPolicyPage() {
  return <Legal data={site.paymentPolicy} />;
}