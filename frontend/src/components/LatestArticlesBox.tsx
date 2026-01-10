//the fetching logic for latest article stays here-
import { useLatestArticle } from "../hooks/useLatestArticles";
import ArticleListItem from "./ArticleListItem";

export default function LatestArticleBox() {
  //we take destructure the items (instead of doing const latestArticles = somethingsomething.data, we directly renamed it after destructuring - {data: latestArticles})
  const { data: latestArticles, isPending } = useLatestArticle();

  if (isPending) {
    return <div className="font-retro ">loading the newest hot posts ...</div>;
  }

  const posts = latestArticles || [];

  return (
    <div className="mt-12 p-6 border-4 border-black bg-gray-100">
      <h2 className="text-2xl uppercase font-display mb-6">
        fresh from the oven:
      </h2>

      <div className="flex flex-col gap-4">
        {/* we named latestArticles as "posts" above, and that shall be mapped herw */}
        {posts.map((post) => (
          <ArticleListItem
            key={post.postId}
            id={post.postId}
            title={post.title}
            description={post.description}
            slug={post.slug || ""}
          />
        ))}
      </div>
    </div>
  );
}
