import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/databaseConfig";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const [URL, setURL] = useState('');
    const [isAuthor, setIsAuthor] = useState(false);

    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    // console.log(userData);
    
    
    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPost(post)
                    post && userData ? setIsAuthor(post.userId === userData.$id) : false;

                    // console.log(post);
                    // console.log(userData);

                    appwriteService.getFilePreview(post.featuredImages).then((url) => {
                        if (url) {
                            setURL(url.href)
                        }
                    })
                }
                else {
                    navigate("/")
                };
            });

        } else navigate("/");

    }, [slug, navigate]);




    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImages);
                navigate("/");
            }
        });
    };

    

    // userData.then((data) => { console.log(data); })

    // console.log(isAuthor);

    return post ? (
        <div className="w-11/12 max-h-max mx-auto py-8">
            <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                <img
                    src={URL}
                    alt={post.title}
                    className="rounded-xl w-3/5"
                />

                {isAuthor && (
                    <div className="absolute space-x-2 right-0 top-0">
                        <Link to={`/edit-post/${post.$id}`}>
                            <button className="rounded bg-yellow-600 px-6 pb-2 pt-2.5 text-sm font-medium leading-normal text-white hover:text-yellow-600 shadow-yellow-400 transition duration-150 ease-in-out hover:bg-yellow-200 hover:font-nedium hover:shadow-yellow-400 focus:outline-none focus:ring-0 motion-reduce:transition-none ">
                                Edit
                            </button>
                        </Link>
                        <button className="rounded bg-red-600 px-6 pb-2 pt-2.5 text-sm font-medium leading-normal text-white hover:text-red-600 shadow-red-400 transition duration-150 ease-in-out hover:bg-red-200 hover:font-nedium hover:shadow-red-400 focus:outline-none focus:ring-0 motion-reduce:transition-none " onClick={deletePost}>
                            Delete
                        </button>
                    </div>
                )}
            </div>
            <div className="w-full mb-6">
                <h1 className="text-2xl font-bold">{post.title}</h1>
            </div>
            <div className="browser-css text-justify">
                {parse(post.description)}
            </div>
        </div>
    ) : null;
}