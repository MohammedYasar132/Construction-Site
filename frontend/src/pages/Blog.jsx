import React, { useState, useEffect } from "react";
import { Search, FileText, Calendar, User, ArrowRight } from "lucide-react";
import { getBlogs } from "../api/blogService";
import { BlogCard } from "../components/UI/Card";

const fallbackBlogs = [
  // {
  //   id: 1,
  //   title: "The Future of Sustainable Architecture",
  //   content:
  //     "As environmental concerns rise, the construction industry is shifting toward green building techniques. From kinetic solar panels and rain gardens to self-healing concrete, developers are seeking ways to build that minimize ecological footprints while enhancing building longevity.",
  //   author: "Sarah Jenkins (Architectural Lead)",
  //   imageUrl:
  //     "https://images.unsplash.com/photo-1503387762-592dedb8c310?q=80&w=600",
  //   createdAt: new Date().toISOString(),
  // },
  // {
  //   id: 2,
  //   title: "A Guide to Renovating Historical Properties",
  //   content:
  //     "Renovating historical properties requires a careful balance between preserving character and introducing modern structural safety. Our team reviews how load-bearing integrity is analyzed and how historical details can be kept while upgrading standard plumbing, electrical systems, and insulations.",
  //   author: "David Vance (Senior Engineer)",
  //   imageUrl:
  //     "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?q=80&w=600",
  //   createdAt: new Date().toISOString(),
  // },
  // {
  //   id: 3,
  //   title: "Smart Technologies Changing Commercial Building Design",
  //   content:
  //     "Internet of Things (IoT) sensors, automated lighting grids, and integrated HVAC feedback systems are reshaping commercial buildings. Learn how developers can design structures that adapt to occupancy rates dynamically, cutting utility expenditures and improving employee productivity.",
  //   author: "Mark Rutherford (Operations Director)",
  //   imageUrl:
  //     "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600",
  //   createdAt: new Date().toISOString(),
  // },
];

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getBlogs();
        setBlogs(data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setBlogs(fallbackBlogs);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="pt-24 md:pt-32 pb-16 bg-white dark:bg-dark text-text-primary transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header and Search Container */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs uppercase tracking-widest font-extrabold text-primary anb-border pl-3">
              JOURNAL
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-black uppercase text-secondary dark:text-white mt-3">
              Company Blog
            </h1>
            <div className="w-16 h-1 bg-primary mt-4" />
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface dark:bg-dark-card border border-gray-200 dark:border-gray-800 px-4 py-3 pl-10 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-text-primary"
            />
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={16}
            />
          </div>
        </div>

        {/* Blog Listing Grid */}
        {loading ? (
          <div className="text-center py-24">
            <span className="text-gray-400 animate-pulse text-sm">
              Loading journal logs...
            </span>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-gray-200 dark:border-gray-800 rounded">
            <span className="text-gray-400 text-sm">
              No articles match your search.
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog, index) => (
              <BlogCard key={blog._id || blog.id} blog={blog} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
