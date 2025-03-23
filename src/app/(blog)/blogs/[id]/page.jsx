import BlogDetail from "./BlogDetail";
import { generateMetadata } from "./metadata";

export { generateMetadata }; // Export for Next.js to use dynamic metadata

export default function BlogPage({ params }) {
  return <BlogDetail id={params.id} />;
}
