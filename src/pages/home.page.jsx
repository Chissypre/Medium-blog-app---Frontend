import { useEffect } from "react";
import AnimationWrapper from "../common/page-animation";
import InPageNavigation from "../components/inpage-navigation.component";
import axios from "axios";
import { useState } from "react";
import Loader from "../components/loader.component";
import BlogPostCard from "../components/blog-post.component";
import MinimalBlogPost from "../components/nobanner-blog-post.component";
import { FaArrowTrendUp } from "react-icons/fa6";
import { activeTabRef } from "../components/inpage-navigation.component";
import NoDataMessage from "../components/nodata.component";
import { filterPaginationData } from "../common/filter-pagination-data";
import LoadMoreDataBtn from "../components/load-more.component";
const HomePage = () => {
  let [blogs, setBlogs] = useState(null);
  let [trendingBlogs, setTrendingBlogs] = useState(null);
  let [pageState, setPageState] = useState("home");
  let categories = [
    "lifestyle",
    "artifical intelligence",
    "software development",
    "health",
    "tech news",
    "technology",
    "finance",
    "spirituality"
  ];

  const fetchLatestBlogs = (page = 1) => {
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/latest-blogs", {page})
      .then(async({ data }) => {
        let formateData = await  filterPaginationData({
          state:blogs,
          data:data.blogs,
          page,
          countRoute:"/all-latest-blogs-count"
        })
        setBlogs(formateData)
      })
      .catch((err) => {
        console.log(err);
      });
  };

const fetchBlogsByCategory = ({page = 1}) =>{
  axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/search-blogs", {tag: pageState, page})
      .then(async({ data }) => {
        let formateData = await  filterPaginationData({
          state:blogs,
          data:data.blogs,
          page,
          countRoute:"/search-blogs-count",
          data_to_send:{tag:pageState}
        })
        setBlogs(formateData);
      })
      .catch((err) => {
        console.log(err);
      });
}

  const fetchTrendingBlogs = () => {
    axios
      .get(import.meta.env.VITE_SERVER_DOMAIN + "/trending-blogs")
      .then(({ data }) => {
        setTrendingBlogs(data.blogs);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadBlogByCategory = (e) => {
    let category = e.target.innerText.toLowerCase();
    console.log("category", category);
    setBlogs(null);
    if (pageState === category) {
      setPageState("home");
      return;
    }
    setPageState(category);
  };

  useEffect(() => {
    activeTabRef.current.click();

    if (pageState === "home") {
      fetchLatestBlogs({page:1});
    }else{
      fetchBlogsByCategory({page:1})
    }
    if (!trendingBlogs) {
      fetchTrendingBlogs();
    }
  }, [pageState]);

  return (
    <AnimationWrapper>
      <section className="h-cover flex justify-center gap-10">
        {/* latest blogs */}
        <div className="w-full">
          <InPageNavigation
            routes={[pageState, "Trending blogs"]}
            defaultHidden={["Trending blogs"]}
          >
            <>
              {blogs === null ? (
                <Loader />
              ) : (
                blogs.results.length?
                blogs.results.map((blog, i) => {
                  return (
                    <AnimationWrapper
                      key={i}
                      transition={{ duration: 1, delay: i * 0.1 }}
                    >
                      <BlogPostCard
                        content={blog}
                        author={blog.author.personal_info}
                      />
                    </AnimationWrapper>
                  );
                })
                :<NoDataMessage message="No Blogs Published."/>
              )}
              <LoadMoreDataBtn state={blogs} fetchDataFun ={(pageState === "home" ? fetchLatestBlogs : fetchBlogsByCategory)}/>
            </>
            {trendingBlogs === null ? (
              <Loader />
            ) : (
              trendingBlogs.length?
              trendingBlogs.map((blog, i) => {
                return (
                  <AnimationWrapper
                    key={i}
                    transition={{ duration: 1, delay: i * 0.1 }}
                  >
                    <MinimalBlogPost blog={blog} index={i} />
                  </AnimationWrapper>
                );
              })
              :<NoDataMessage message="No Trending Blogs."/>
            )}
          </InPageNavigation>
        </div>
        {/* filters and trending blogs */}
        <div className="min-w-[40%] lg:min-w-[400px] max-w-min border-1 border-grey pl-8 pt-3 max-md:hidden">
          <div className="flex flex-col gap-10">
            <div className="">
              <h1 className="font-medium text-xl mb-8">
                Stories from all interests
              </h1>
              <div className="flex gap-3 flex-wrap">
                {categories.map((category, i) => (
                  <button
                    className={
                      "tag" +
                      (pageState === category ? "bg-black text-white" : "")
                    }
                    onClick={loadBlogByCategory}
                    key={i}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <h1 className="font-medium text-xl mb-8 flex-row flex ">
              Trending
              <FaArrowTrendUp className="items-center mx-3 mt-1" />
            </h1>
            {trendingBlogs === null ? (
              <Loader />
            ) : (
              trendingBlogs.map((blog, i) => {
                return (
                  <AnimationWrapper
                    key={i}
                    transition={{ duration: 1, delay: i * 0.1 }}
                  >
                    <MinimalBlogPost blog={blog} index={i} />
                  </AnimationWrapper>
                );
              })
              
            )}
          </div>
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default HomePage;
