import React, {useState, useEffect} from 'react'
import appwriteService from '../appwrite/databaseConfig';
import {Cards, Contanier} from '../components/index';

function AllCars() {

    const [posts, setPosts] = useState([]);
    useEffect(() => {
        appwriteService.getAllPost([]).then((posts) => {
            if (posts) {
                // console.log(posts);
                setPosts(posts.documents);
            }
        });
    }, []);



    return (
        <div className='w-full py-8'>
            <Contanier>
                <div className='w-full grid grid-cols-3'>
                    {posts.map((post) =>(
                        <div className='p-2 w-full' key={post.$id}>
                            <Cards {...post} />
                        </div>
                    ))}
                </div>
            </Contanier>
        </div>
    )
}

export default AllCars
