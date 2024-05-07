import { useContext, useEffect } from "react"
import { BlogContext } from "../pages/blog.page"
import { CiHeart } from "react-icons/ci";
import { FaRegCommentDots } from "react-icons/fa";
import { Link } from "react-router-dom";
import { RiTwitterXFill } from "react-icons/ri";
import { UserContext } from "../App";
import {Toaster, toast} from 'react-hot-toast'
import axios from 'axios'
const BlogInteraction = () => {
  let {blog, blog:{_id, title, blog_id, activity, activity:{total_likes, total_comments}, author:{personal_info:{username: author_username}}}, setBlog, isLikedByUser, setLikedByUser, setCommentsWrapper} = useContext(BlogContext)
  let { userAuth } = useContext(UserContext) || {};
    let { username, access_token  } = userAuth || {};

useEffect(() => {
if(access_token){
  axios
.post(import.meta.env.VITE_SERVER_DOMAIN + "/isliked-by-user", {
  _id}, {
    headers: {
      'Authorization':`Bearer ${access_token}`
    }
})
.then(({ data:{result}}) => {
  setLikedByUser(Boolean(result))
})
.catch(err => {
  console.log(err)
})
}
}, [])



   const  handleLike = () => {
if(access_token){
setLikedByUser(preVal => !preVal)
!isLikedByUser ? total_likes++ : total_likes--
setBlog({...blog, activity: {...activity, total_likes}})
axios
.post(import.meta.env.VITE_SERVER_DOMAIN + "/like-blog", {
  _id, isLikedByUser}, {
    headers: {
      'Authorization':`Bearer ${access_token}`
    }
})
.then(({ data}) => {
})
.catch((err) => {
  console.log(err);
  
});
}else{
toast.error("Please log in to like this blog")
}
   }
  return (
    <>
    <Toaster/>
    <hr className="border-grey my-2"/>
    <div className="flex gap-6 justify-between">
      <div className="flex gap-6">
<div className="flex gap-3 items-center">
  <button className={"w-10 h-10 rounded-full flex items-center justify-center" +(isLikedByUser ? "bg-red text-red"
   :"bg-grey opacity-80")}
  onClick={handleLike}>
  <CiHeart className="w-7 h-7" />
  </button>
  { <p className="text-xl text-dark-grey">{total_likes}</p> }
</div>
<div className="flex gap-3 items-center">
  <button className="w-10 h-10 rounded-full flex items-center justify-center bg-grey opacity-80"
   onClick={()=>setCommentsWrapper(preVal => !preVal)}>
  <FaRegCommentDots  className="w-5 h-5"/>
  </button>
  <p className="text-xl text-dark-grey">{total_comments}</p> 
</div>
</div>
<div className="flex gap-6 items-center ">
  {
    username === author_username ? 
    <Link to={`/editor/${blog_id}`} className="underline hover:text-purple">
    Edit
    </Link>: ""
  }
<Link to ={`https://twitter.com/intent/tweet?text=Read${title}&url=${location.href}`}>
<RiTwitterXFill />
</Link>
</div>
    </div>
    <hr className="border-grey my-2"/>
    </>
  )
}

export default BlogInteraction