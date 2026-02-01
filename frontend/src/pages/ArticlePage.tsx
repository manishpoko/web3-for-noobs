import { useParams, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";
import toast from "react-hot-toast";
import DOMPurify from "dompurify"
import { useQuery,  } from "@tanstack/react-query";

interface SinglePostType {
  postId: string;
  title: string;
  slug: string;
  content: string;
  createdAt: string;
  author?: {
    username: string;
  };
  authorId: string;
}

function getUserIdFromToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload)); //atob decodes the weird payload into readable message

    return decoded.userId;
  } catch (err) {
    return err;
  }
}

export default function ArticlePage() {
  const  {article}  = useParams(); //grABS THE ID FROM THE URL (this later changes from id to slug)
  const navigate = useNavigate(); 

  const currentUserId = getUserIdFromToken(); //storing the current user id


  //using rect-query for data fetching and other functions, instead of useEffect etc
  const {isPending, error, data } = useQuery<SinglePostType>({
    queryKey: ['post', article],

    queryFn: async()=> {
      const response = await fetch(`${API_BASE_URL}/posts/${article}`)
      if(!response.ok) {
        throw new Error("error fetching the article")
      }
      return await response.json();

    },
    retry: false, //dont retry if its a 404 (no use)

  })
  if(isPending) {
    return (
      <div className="text-center mt-20 font-retro text-xl animate-pulse text-brand-primary">
      loading data...
      </div>
    )
  }
    if (error){
          return <div className="text-center p-10 text-red-500">{error.message}</div>;
    }

    const post = data;

  //function to delete a post(only by the post author and not anyone else )
  const handleDelete = async () => {
    if (!confirm("are you sure you want to delete this post?")) return; //this means if the user doesnt confirm to delete post, returrn
    

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_BASE_URL}/posts/${post?.postId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        toast.success("post deleted!");
        navigate("/");
      } else {
        toast.error("failed to delete");
      }
    } catch (err) {
      console.error(err);
    }
  };





  const isOwner = currentUserId === post.authorId; //returns true if currenUserId matches with the id of the author(from the backend)

  return (
    <div className="max-w-4xl lg:max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      {/* //header here// */}
      <div className="border-b pb-4 mb-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-2 text-center">{post.title}</h1>
        <div className="flex justify-center items-center text-gray-500 text-sm">
          <span className="font-semibold text-indigo-600 mr-2">
            by {post.author?.username || "unknown author"}
          </span>
          <span className="mx-2">•</span>
          <span className=""> 
             { new Date(post.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
      {/* //shows only if isOwner is true(i.e. if the owner wants to edit or delete) */}
      {isOwner && (
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/edit/${post.postId}`)}
            className="bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200 text-sm font-bold"
          >
            EDIT
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200 text-sm font-bold"
          >
            DELETE
          </button>
        </div>
      )}
      {/* //content section// */}
      <div className="
      // layout - center the block:-
      prose prose-lg md:prose-xl max-w-none
       mx-auto

       mt-12
      
      //typography(minimalist for content)
      font-reading //the clean outfit font we imported
      text-gray-800
      leading-relaxed //this increases line height
      tracking-wide //more gap b/w letters

      //headings with the retro theme
      prose-headings:font-display
      prose-headings:text-black
      prose-headings:uppercase
      prose-headings:mt-12
      prose-headings:mb-

      //paragraphs clean and readable
      prose-p:mb-6 

      // links(minimalist but with brand theme)
      prose-a:text-black prose-a:font-semibold prose-a:no-underline
      prose-a:border-b-2 prose-a:border-brand-primary
      hover:prose-a:bg-brand-primary hover:prose-a:text-white prose-a:transition-all

      //blockquotes(editorial style)
      prose-blockquote:border-l-4 prose-blockquote:border-brand-accent
      prose-blockquote:bg-gray-500 prose-blockquote:p-6 prose-blockquote:italic
      prose-blockquote:rounded-r-lg

      //images(retro border, but minimalistic)
      prose-img:rounded-md prose-img:border-2 prose-img:border-black
      prose-img:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
      prose-img:mx-auto
      
      "
        dangerouslySetInnerHTML = {{ __html: DOMPurify.sanitize(post.content) }}>
          {/* 
          -dangerourslySetInnerHTMl is to tell react to treat the entire chunk as a html rather than normal plaintext.
          
          -the domPurify.sanitize() is the cleaner that strips out any maliciou code from the text (eg a hacker script) */
          }
        
      </div>
    </div>
  );
}
