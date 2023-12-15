import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetching } from '../components/hooks/useFetching';
import PostService from '../API/PostService';
import Loader from '../components/UI/Loader/Loader';

const PostIdPage = () => {

    const params = useParams()
    const [post, setPost] = useState({})
    const [comments, setCommetns] = useState([])
    const [fetchPostById, isLoading, error] = useFetching( async (id) => {
        const response = await PostService.getById(params.id)
        setPost(response.data)
    })
    const [fetchComments, isComLoading, comError] = useFetching( async (id) => {
        const response = await PostService.getCommentsById(params.id)
        setCommetns(response.data) 
    })

    useEffect(() => {
        fetchPostById(params.id)
        fetchComments(params.id)
    }, [])
    return (
        <div>
            <h1 style={{textAlign: 'center'}}>Вы открыли страницу поста №{params.id}</h1>
            <div style={{margin: '30px'}}>
               <h1>Post: </h1>  
            {isLoading
            ? <Loader/>
            : <div>{post.id}. {post.title}</div>
            }
            
            <h1 style={{marginTop: '20px', marginBottom: '20px'}}>
                Comments: 
            </h1>
            {isComLoading
                ? <Loader/>
                : <div style={{width: '500px', border: '5px solid white', padding: '30px'}}>
                    {comments.map(comm => 
                           <div key={comm.id} style={{marginTop: '15px'}}>
                            
                                <h5>{comm.email}</h5>
                                <hr style={{marginTop: '5px'}}/>
                                <div>{comm.body}</div>
                           </div> 
                        )}
                </div>
            }
            </div>
        </div>
    );
};

export default PostIdPage;