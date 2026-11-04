import { pageMetadata } from "@/lib/meta";
import PageView from "@/components/PageView";

export const metadata = pageMetadata("en", "home");

export default function Page() {
  return <PageView lang="en" pageKey="home" />;
}
