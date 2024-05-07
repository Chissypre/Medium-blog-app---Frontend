import { Link } from "react-router-dom"
import logo from "../imgs/logo.png"
import AnimationWrapper from "../common/page-animation"
import {Toaster, toast} from 'react-hot-toast'
import { useState, useContext, useEffect } from "react"
import axios from 'axios';
import { EditorContext } from "../pages/editor.pages"
import { UserContext } from "../App"
import EditorJS from "@editorjs/editorjs"
import { tools } from "./tools.component"
import {useNavigate, useParams } from 'react-router-dom'
import lightLogo from "../imgs/logo-light.png"
import darkLogo from "../imgs/logo-dark.png"
import lightBanner from "../imgs/blog banner light.png"
import darkBanner from "../imgs/blog banner dark.png"
import { ThemeContext } from "../App"



const BlogEditor = () => {
    let {blog, blog:{title, banner, content, tags, des}, setBlog, setEditorState, textEditor, setTextEditor} = useContext
    (EditorContext)
    let {theme} = useContext(ThemeContext)
    let { userAuth } = useContext(UserContext) || {};
    let {blog_id} = useParams()
    let { access_token } = userAuth || {};
    let navigate = useNavigate()
    useEffect(()=>{
        if(!textEditor.isReady){
            setTextEditor (new EditorJS({
                holderId:"textEditor",
                data:Array.isArray(content) ? content[0] :content,
                tools:tools,
                placeholder: "Let's write an awesome story"
            }))

        }

}, [])
   
    const [fileInputState, setFileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [imageUploaded, setImageUploaded] =useState(false)
    const handleTitleKeyDown = (e) => {
        if(e.keyCode === 13){
            e.preventDefault();
        }
    }

    const handleTitleChange = (e) => {
        let input = e.target
        input.style.height ='auto'
        input.style.height =input.scrollHeight +"px"
        setBlog({ ...blog, title: input.value });
    }
    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        previewFile(file);
        setSelectedFile(file);
        setFileInputState(e.target.value);
    };

    const handleError = () => {
      let img = e.target
      img.src = theme === "light" ? lightBanner : darkBanner
    }

    const handlePublishEvent = async () => {
        if (!banner.length) {
            return toast.error("Upload a blog banner to publish it");
        }
    
        if (!title.length && !banner) {
            return toast.error("Write a blog title to publish it");
        }
    
        try {
            const data = await textEditor.save();
    
            if (data.blocks.length) {
                setBlog({ ...blog, content: data });
                console.log("Before setting publish state");
                setEditorState("publish");
                console.log("After setting publish state");
            } else {
                toast.error("Write something in your blog to publish it");
            }
        } catch (error) {
            console.error("Error saving editor content:", error);
        }
    };
    




    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        };
    };

    const handleSubmitFile = (e) => {
        e.preventDefault();
        if (!selectedFile) return;
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = () => {
            uploadImage(reader.result);
        };
        reader.onerror = () => {
            console.error('AHHHHHHHH!!');
            toast.error('something went wrong!');
        };
    };

    
  
  const uploadImage = async (base64EncodedImage) => {
        try {
            let loadingToast = toast.loading("Uploading...")
            const response = await axios.post(`${import.meta.env.VITE_SERVER_DOMAIN}/upload`, {
                data: base64EncodedImage,
                
                
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
               
            });
           
            setBlog({...blog, banner:response.data.url})
            

            toast.dismiss(loadingToast)
            setImageUploaded(true)
            toast.success('Image uploaded successfully');
        } catch (err) {
            console.error(err);
            toast.error('Something went wrong!');
        }
    }; 

    



    const handleSaveDraft = (e) => {
        if (e.target.classList.contains("disable")) {
          return;
        }
      
        if (!title.length) {
          return toast.error("Write Blog topics before saving it as a draft");
        }
      
        let loadingToast = toast.loading("Saving Draft....");
        e.target.classList.add("disable");
      
        if (textEditor.isReady) {
          textEditor.save().then((content) => {
            let blogObj = {
              title,
              banner,
              content,
              tags,
              des,
              draft: true,
            };
      
            axios
              .post(import.meta.env.VITE_SERVER_DOMAIN + "/create-blog", {...blogObj, id:blog_id}, {
                headers: {
                  Authorization: `Bearer ${access_token}`,
                },
              })
              .then(() => {
                e.target.classList.remove("disable");
                toast.dismiss(loadingToast);
                toast.success("Saved");
                setTimeout(() => {
                  navigate("/dashboard/blogs?tab=draft");
                }, 500);
              })
              .catch(({ response }) => {
                e.target.classList.remove("disable");
                toast.dismiss(loadingToast);
                return toast.error(response.data.error);
              });
          });
        }
      };
      
                
    
  return (
    <>
    <nav className="navbar">
  <Link to="/" className="flex-none w-10">
  <img src={theme === "light" ? darkLogo : lightLogo}/>
  </Link>
  <p className="max-md:hidden text-black line-clamp-1 w-full">
    {title.length ? title : "New Blog" }
  </p>
  <div className="flex gap-4 ml-auto">
    <button className="btn-dark py-2" onClick={handlePublishEvent} >Publish</button>
    <button className="btn-light py-2" onClick={handleSaveDraft}>Save Draft</button>
  </div>
    </nav>
    <AnimationWrapper>
        <section>
        <Toaster/>
            <div className=" max-w-[900px] w-full">
            {!imageUploaded && <form  onSubmit={handleSubmitFile} className="flex flex-col justify-start">
    <input
    id="uploadBanner"
    type="file"
    accept=".png, .jpg, .jpeg"
    onChange={handleFileInputChange}
    value={fileInputState}
    />
       <button className="my-3 ml-1 mx-auto bg-grey max-w-[70px] py-0.5 border border-black px-3 rounded " 
        type="submit">
                    Upload
                </button>
</form>}

                <div className="relative aspect-video hover:opacity-80 bg-white border-4 border-grey py-2 mx-auto pt-10">

                {blog ? (
                            <img
                                className="my-1 object-contain"
                                src={blog.banner}
                                onError={handleError}
                            />
                        ) : (
                            <img
                                className="my-1 object-contain"
                                src={previewSource}
                                onError={handleError}
                            />
                        )}
                </div>
                <textarea
                defaultValue={title}
                placeholder="Blog Title"
                className="text-4xl font-medium w-full h-20 outline-none
                 resize-none mt-10 leading-tight placeholder:opacity-40 bg-white"
                 onKeyDown={handleTitleKeyDown}
                 onChange={handleTitleChange}
                >

                </textarea>
                <hr className="w-full opacity-10 my-5"/>
                <div id="textEditor" className="font-gelasio"></div>

</div>
        </section>
    </AnimationWrapper>
    </>
  )
}

export default BlogEditor