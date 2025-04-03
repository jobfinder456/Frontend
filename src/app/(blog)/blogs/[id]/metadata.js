export async function generateMetadata({ params }) {
    const id = params.id;
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_MAIN}/api/v1/blogs/${id}`);
      const data = await response.json();
  
      if (!data.success || !data.blog) {
        return {
          title: "Blog Not Found - Get Jobs Today",
          description: "The requested blog post could not be found.",
        };
      }
  
      // Function to shorten long titles (limit: 60 characters)
      const truncateTitle = (title, maxLength = 39) => {
        return title.length > maxLength ? title.substring(0, maxLength).trim() + "..." : title;
      };
  
      return {
        title: truncateTitle(data.blog.title) + " - Get Jobs Today",
        description: data.blog.body.replace(/<\/?[^>]+(>|$)/g, "").substring(0, 150),
      };
    } catch (error) {
      return {
        title: "Error Loading Blog - Get Jobs Today",
        description: "There was an error fetching this blog post.",
      };
    }
  }
  