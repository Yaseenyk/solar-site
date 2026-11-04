import { pageMetadata } from "@/lib/meta";
import PageView from "@/components/PageView";

export const metadata = pageMetadata("en", "scheme");

export default function Page() {
  return <PageView lang="en" pageKey="scheme" />;
}
