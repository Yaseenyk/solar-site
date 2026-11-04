import Link from "next/link";

export default function NotFound() {
  return (
    <div className="prose-guide">
      <h1 className="text-3xl font-bold text-zinc-50">Page not found</h1>
      <p>Try the <Link href="/">calculator on the home page</Link> or the <Link href="/pm-surya-ghar-subsidy/">subsidy guide</Link>.</p>
    </div>
  );
}
