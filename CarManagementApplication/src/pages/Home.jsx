import React, { useEffect, useState } from 'react'
import appwriteService from '../appwrite/databaseConfig'
import { Contanier, Cards } from '../components/index.js'
import { HomeSection } from '../components/index.js'
import { useSelector } from 'react-redux';


function Home() {

    const [posts, setPosts] = useState([])
    const userData = useSelector((state) => state.auth.userData);
    const status = useSelector((state) => state.auth.status);
    console.log(status);



    // console.log(userData);

    useEffect(() => {
        if (userData) {
            appwriteService.getAllPost()
                .then((posts) => {
                    // console.log(posts);
                    if (posts) {
                        setPosts(posts.documents);
                    }
                })
        }
    }, [])


    if (posts.length === 0) {
        return (
            <>
                <HomeSection />
            </>
        )
    }
    else {
        return (
            <>
                <HomeSection />
                <div className="w-full py-8">
                    <Contanier>
                        <div className="w-full grid grid-cols-3 ">
                            {posts.map((post) => (
                                <div key={post.$id} className="p-2 w-full my-3">
                                    <Cards {...post} />
                                </div>
                            ))}
                        </div>
                    </Contanier>
                </div>
            </>

        )
    }


}

export default Home
