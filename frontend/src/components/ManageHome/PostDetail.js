
import { useEffect, useState } from 'react';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { getDetailPosts, deletePost } from '../../services/apiServices';
import { Buffer } from 'buffer';
import './PostDetail.scss';
import ModalDelete from './ModalDelete';
import ModalPost from '../ManageHome/ModalPost';
import { useHistory } from "react-router-dom";

const PostDetail = (props) => {
    const [detailPost, setDetailPost] = useState([]);
    const { id } = props.match.params;
    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [dataModalDelete, setDataModalDelete] = useState({});
    const [dataModalPost, setDataModalPost] = useState();
    const [isShowModalPost, setIsShowModalPost] = useState(false);
    const [actionModalPost, setActionModalPost] = useState('UPDATE');
    const [account, setAccount] = useState({});
    const [isShow, setIsShow] = useState(true);

    const history = useHistory();

    useEffect(() => {
        fetchDetailPosts();
    }, [id])
    useEffect(() => {
        let session = sessionStorage.getItem("account");
        if (session) {
            setAccount(JSON.parse(session));
        }
    }, [])
    useEffect(() => {
        isShowDeUp();
    }, [account])
    const isShowDeUp = () => {
        if (account && !_.isEmpty(account) && account.isAuthenticated) {
            setIsShow(true)
        } else {
            setIsShow(false)
        }
        console.log(isShow);
    }
    const fetchDetailPosts = async () => {
        let res = await getDetailPosts(id);
        if (res && res.errCode === 0) {
            setDetailPost([res.data]);
        }
    }
    const handleDeletePost = async (post) => {
        setIsShowModalDelete(true);
        setDataModalDelete(post);
    }
    const handleClose = async () => {
        setIsShowModalDelete(false);
        setIsShowModalPost(false);
        await fetchDetailPosts();
    }
    const confirmDeletePost = async () => {
        let res = await deletePost(dataModalDelete);
        if (res && res.errCode === 0) {
            history.push("/");
            setIsShowModalDelete(false);
            toast.success(res.errMessage);
        } else {
            toast.error(res.errMessage);
        }
    }
    const handleEditPost = (post) => {
        setDataModalPost(post);
        setIsShowModalPost(true);
        setActionModalPost('UPDATE');
    }
    return (
        <>
            <div className="container mt-4 pt-3">
                <div className="row">
                    {detailPost && detailPost.length > 0 &&
                        detailPost.map((item, index) => {
                            let imageBase64 = '';
                            if (item.image) {
                                imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                            }
                            return (
                                <>
                                    <div className="container mt-5">
                                        <div className="row justify-content-center">
                                            {detailPost && detailPost.length > 0 &&
                                                detailPost.map((item, index) => {
                                                    const date = new Date(item.createdAt);
                                                    const formattedDate = date.toLocaleDateString('vi-VN');
                                                    let imageBase64 = '';
                                                    if (item.image) {
                                                        imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                                    }

                                                    return (
                                                        <div key={index} className="col-lg-12">
                                                            <h1 className="mb-4">{item.title}</h1>
                                                            <div
                                                                className='image-detail mb-4'
                                                                style={{ backgroundImage: `url(${imageBase64})` }}
                                                            ></div>
                                                            <p className="text-muted">Tác giả: {"User"} | Ngày đăng: {formattedDate}</p>
                                                            <div className="content">
                                                                <div dangerouslySetInnerHTML={{ __html: item.contentHTML }}></div>
                                                            </div>

                                                            <div className="mt-4 text-end">
                                                                {isShow ?
                                                                    <>
                                                                        <button
                                                                            className="btn btn-danger"
                                                                            onClick={() => handleDeletePost(item)}
                                                                        >
                                                                            Xóa
                                                                        </button>
                                                                        <button
                                                                            className="btn btn-warning mx-2"
                                                                            onClick={() => handleEditPost(item)}
                                                                        >
                                                                            Sửa
                                                                        </button>
                                                                        <button
                                                                            className="btn btn-secondary"
                                                                            onClick={() => window.history.back()}
                                                                        >
                                                                            Quay lại
                                                                        </button>
                                                                    </> :
                                                                    <>
                                                                        <button
                                                                            className="btn btn-secondary"
                                                                            onClick={() => window.history.back()}
                                                                        >
                                                                            Quay lại
                                                                        </button>
                                                                    </>
                                                                }
                                                            </div>
                                                        </div>
                                                    );
                                                })
                                            }
                                        </div>
                                    </div>
                                    <ModalDelete
                                        show={isShowModalDelete}
                                        handleClose={handleClose}
                                        confirmDeletePost={confirmDeletePost}
                                        dataModalDelete={dataModalDelete}
                                    />
                                    <ModalPost
                                        show={isShowModalPost}
                                        handleClose={handleClose}
                                        action={actionModalPost}
                                        dataModalPost={dataModalPost}
                                        fetchDetailPosts={fetchDetailPosts}
                                    />
                                </>
                            );
                        })
                    }
                </div>
            </div>
        </>

    );
}

export default PostDetail;