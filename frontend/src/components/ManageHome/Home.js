import './Home.scss';

const Home = (props) => {
    return (
        <div className="container mt-4">
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                <div className="col">
                    <div className="card h-100">
                        <img src="https://via.placeholder.com/300x200" className="card-img-top" alt="Post Image" />
                        <div className="card-body">
                            <h5 className="card-title">Tiêu đề bài viết</h5>
                            <p className="card-text">
                                Đây là một đoạn mô tả ngắn cho bài viết. Nhấn "Đọc thêm" để xem chi tiết.
                            </p>
                            <a href="#" className="btn btn-info">Đọc thêm</a>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card h-100">
                        <img src="https://via.placeholder.com/300x200" className="card-img-top" alt="Post Image" />
                        <div className="card-body">
                            <h5 className="card-title">Tiêu đề bài viết</h5>
                            <p className="card-text">
                                Đây là một đoạn mô tả ngắn cho bài viết. Nhấn "Đọc thêm" để xem chi tiết.
                            </p>
                            <a href="#" className="btn btn-primary">Đọc thêm</a>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card h-100">
                        <img src="https://via.placeholder.com/300x200" className="card-img-top" alt="Post Image" />
                        <div className="card-body">
                            <h5 className="card-title">Tiêu đề bài viết</h5>
                            <p className="card-text">
                                Đây là một đoạn mô tả ngắn cho bài viết. Nhấn "Đọc thêm" để xem chi tiết.
                            </p>
                            <a href="#" className="btn btn-primary">Đọc thêm</a>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card h-100">
                        <img src="https://via.placeholder.com/300x200" className="card-img-top" alt="Post Image" />
                        <div className="card-body">
                            <h5 className="card-title">Tiêu đề bài viết</h5>
                            <p className="card-text">
                                Đây là một đoạn mô tả ngắn cho bài viết. Nhấn "Đọc thêm" để xem chi tiết.
                            </p>
                            <a href="#" className="btn btn-primary">Đọc thêm</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}
export default Home;