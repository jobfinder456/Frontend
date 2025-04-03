import axios from "axios";

// Function to fetch blogs from API
async function fetchBlogs() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACK_MAIN}/api/v1/blogs`
    );
    return response.data.success ? response.data.blogs : [];
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

// Function to generate SEO-friendly URL slugs
function generateSlug(title, id) {
  return `${title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}-${id}`;
}

export default async function BlogList() {
  const blogs = await fetchBlogs(); // Fetch blogs on the server

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map((blog) => (
        <a
          href={`/blogs/${generateSlug(blog.title, blog.id)}`}
          key={blog.id}
          className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm p-4"
        >
          <h2 className="text-xl font-semibold">{blog.title}</h2>
          <p className="text-gray-600 mt-2">
            {blog.description
              ? blog.description
                  .replace(/<\/?[^>]+(>|$)/g, "")
                  .substring(0, 100) + "..."
              : "No content available"}
          </p>
        </a>
      ))}
    </div>
  );
}
