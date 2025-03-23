import { metadata } from "./metadata";
import BlogList from "./BlogList";

export async function generateMetadata() {
  return metadata;
}

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 pb-8 max-w-[75rem] min-h-screen">
      <h1 className="text-xl font-semibold mb-8">Blog Posts</h1>
      <BlogList />
    </div>
  );
}
