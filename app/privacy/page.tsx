import Legal from "../components/layout/legal/Legal";
import { site } from "@/data";

export default function PrivacyPolicyPage() {
  return <Legal data={site.privacyPolicy} />;
}