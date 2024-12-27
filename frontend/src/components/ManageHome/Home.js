import './Home.scss';
import { getAllPosts, searchPostService } from '../../services/apiServices';
import { useEffect, useState } from 'react';
import ModalPost from '../ManageHome/ModalPost';
import { Buffer } from 'buffer';
import { useHistory } from "react-router-dom";
import _ from 'lodash';
import { toast } from 'react-toastify';

const Home = (props) => {
    const [listPost, setListPost] = useState([]);
    const [isShowModalPost, setIsShowModalPost] = useState(false);
    const [account, setAccount] = useState({});
    const [searchPost, setSearchPost] = useState();
    useEffect(() => {
        fetchPosts();
    }, [])
    const handleOnChangeSearch = (value) => {
        setSearchPost(value);
    };

    const handleSearch = async () => {
        let search = searchPost;
        if (!search) {
            toast.warning("Vui lòng nhập từ khóa tìm kiếm!");
            return;
        }
        let res = await searchPostService(search);
        if (res && res.errCode === 0) {
            setListPost(res.data);
        } else {
            toast.error("Không tìm thấy bài viết phù hợp!");
        }
    }
    const fetchPosts = async () => {
        let res = await getAllPosts();
        if (res && res.errCode === 0) {
            setListPost(res.data);
        }
    }
    useEffect(() => {
        let session = sessionStorage.getItem("account");
        if (session) {
            setAccount(JSON.parse(session));
        }
    })

    const handleCreatePost = async () => {
        if (account && !_.isEmpty(account) && account.isAuthenticated) {
            setIsShowModalPost(true)
        } else {
            history.push(`/login`);
            toast.warning('Please login')
        }

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
            <div className="container mt-5 pt-4">
                <>
                    <div className='row mb-3'>
                        <div className='col-md-6 mx-auto'>
                            <div className='input-group search'>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Tìm kiếm bài viết..."
                                    onChange={(e) => handleOnChangeSearch(e.target.value)}
                                />
                                <button className="btn btn-infor" onClick={() => handleSearch()}>
                                    <i class="fa fa-search"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        {listPost && listPost.length > 0 ?
                            <>
                                {listPost.map((item, index) => {
                                    let imageBase64 = '';
                                    if (item.image) {
                                        imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                    }
                                    return (
                                        <>
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
                                        </>
                                    )
                                })}
                            </>
                            :
                            <>
                                KO cos bài đăng nào
                            </>
                        }
                    </div>
                </>
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