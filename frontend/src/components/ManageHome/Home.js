import './Home.scss';
import { getAllPosts } from '../../services/apiServices';
import { useEffect, useState } from 'react';
import ModalPost from '../ManageHome/ModalPost';
import { Buffer } from 'buffer';
import { useHistory } from "react-router-dom";

const Home = (props) => {
    const [listPost, setListPost] = useState([]);
    const [isShowModalPost, setIsShowModalPost] = useState(false);

    useEffect(() => {
        fetchPosts();
    }, [])
    const fetchPosts = async () => {
        let res = await getAllPosts();
        if (res && res.errCode === 0) {
            setListPost(res.data);
        }
    }
    const handleCreatePost = () => {
        setIsShowModalPost(true);
        fetchPosts();
    }
    const handleClose = () => {
        setIsShowModalPost(false)
    }
    let history = useHistory();
    const handleViewDetailPost = (post) => {
        history.push(`/detail/${post.id}`);
    }

    return (
        <>
            <div className="container mt-5 pt-3">
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                    {listPost && listPost.length > 0 ?
                        <>
                            {listPost.map((item, index) => {
                                let imageBase64 = '';
                                if (item.image) {
                                    imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                }
                                return (
                                    <div className="col">
                                        <div className="card h-100" >
                                            <div className='image-post'
                                                style={{ backgroundImage: `url(${imageBase64})` }}
                                            ></div>
                                            <div className="card-body">
                                                <h5 className="card-title">{item.title}</h5>
                                                <p className="card-text">
                                                    {item.description}
                                                </p>
                                                <a className="btn btn-info"
                                                    onClick={() => handleViewDetailPost(item)}
                                                >Chi tiết</a>
                                            </div>
                                        </div>
                                    </div>

                                )
                            })}
                        </>
                        :
                        <>
                            KO cos bài đăng nào
                        </>
                    }
                </div>
            </div>
            <button
                className="add-post-btn position-fixed"
                onClick={() => handleCreatePost()}
            >
                <i class="fa fa-plus"></i>
            </button>
            <ModalPost
                show={isShowModalPost}
                handleClose={handleClose}
                fetchPosts={fetchPosts}
            />

        </>



    )
}
export default Home;