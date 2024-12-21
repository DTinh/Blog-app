
import { useEffect, useState } from 'react';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { getDetailPosts } from '../../services/apiServices';
import { Buffer } from 'buffer';
import './PostDetail.scss';
const PostDetail = (props) => {
    const [detailPost, setDetailPost] = useState([]);
    const { id } = props.match.params;

    // const [isShowModalPost, setIsShowModalPost] = useState(false);

    useEffect(() => {
        fetchDetailPosts();
    }, [id])

    const fetchDetailPosts = async () => {
        let res = await getDetailPosts(id);
        if (res && res.errCode === 0) {
            setDetailPost([res.data]);
        }
    }
    return (
        <>
            <div className="container mt-4 pt-5">
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

                                                            {/* Image Section */}
                                                            <div
                                                                className='image-detail mb-4'
                                                                style={{ backgroundImage: `url(${imageBase64})` }}
                                                            ></div>

                                                            {/* Post Metadata */}
                                                            <p className="text-muted">Tác giả: {"Admin"} | Ngày đăng: {formattedDate}</p>

                                                            {/* Post Content */}
                                                            <div className="content">
                                                                <div dangerouslySetInnerHTML={{ __html: item.contentHTML }}></div>
                                                            </div>

                                                            {/* Back Button */}
                                                            <div className="mt-4 text-end">
                                                                <button
                                                                    className="btn btn-secondary"
                                                                    onClick={() => window.history.back()}
                                                                >
                                                                    Quay lại
                                                                </button>
                                                            </div>
                                                        </div>
                                                    );
                                                })
                                            }
                                        </div>
                                    </div>
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