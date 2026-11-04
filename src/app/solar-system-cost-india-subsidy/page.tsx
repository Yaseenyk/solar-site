import { pageMetadata } from "@/lib/meta";
import PageView from "@/components/PageView";

export const metadata = pageMetadata("en", "cost");

export default function Page() {
  return <PageView lang="en" pageKey="cost" />;
}
