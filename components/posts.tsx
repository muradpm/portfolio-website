import Link from "next/link";
import { formatDate, getBlogPosts } from "@/lib/utils";

export function BlogPosts({ limit }: { limit?: number }) {
  let allBlogs = getBlogPosts();

  allBlogs = allBlogs.sort((a, b) => {
    if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
      return -1;
    }
    return 1;
  });

  if (limit) {
    allBlogs = allBlogs.slice(0, limit);
  }

  return (
    <div>
      {allBlogs.map((post) => (
        <Link
          key={post.slug}
          className="flex flex-col space-y-1 mb-4"
          href={`/blog/${post.slug}`}
        >
          <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
            <p className="text-neutral-600 dark:text-neutral-400 w-[110px] tabular-nums">
              {formatDate(post.metadata.publishedAt, false)}
            </p>
            <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
              {post.metadata.title}
            </p>
          </div>
        </Link>
      ))}
      {limit && (
        <Link
          href="/blog"
          className="mt-4 inline-block hover:text-neutral-800 dark:hover:text-neutral-100"
        >
          view all posts →
        </Link>
      )}
    </div>
  );
}
