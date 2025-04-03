import axios from "axios";
import NotFound from "@/components/NotFound";

// Function to fetch blog details from API
async function fetchBlog(id) {
  try {
    id = id.split("-");
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACK_MAIN}/api/v1/blogs/${id.pop()}`);
    return response.data.success ? response.data.blog : null;
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
}

// Function to generate metadata dynamically
export async function generateMetadata({ params }) {
  const blog = await fetchBlog(params.id);

  if (!blog) {
    return {
      title: "Blog Not Found - Get Jobs Today",
      description: "The requested blog post could not be found.",
    };
  }

  const truncateTitle = (title, maxLength = 39) =>
    title.length > maxLength ? title.substring(0, maxLength).trim() + "..." : title;

  return {
    title: `${truncateTitle(blog.title)} - Get Jobs Today`,
    description: blog.body.replace(/<\/?[^>]+(>|$)/g, "").substring(0, 150),
  };
}

// **Main Blog Page Component**
export default async function BlogPage({ params }) {
  const blog = await fetchBlog(params.id);
  if (!blog) return <NotFound />; // Show 404 page if blog not found

  return (
    <div className="container mx-auto px-4 max-w-[75rem] mb-20 min-h-screen">
      <h1 className="text-4xl font-bold text-start my-6 min-[1112px]:pl-[2rem]">{blog.title}</h1>
      <div className="prose max-w-[64rem] mx-auto" dangerouslySetInnerHTML={{ __html: blog.body }} />
    </div>
  );
}
