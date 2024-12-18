

const Footer = (props) => {
    return (
        <>
            <footer class="bg-info text-black py-3 mt-3">
                <div class="container">
                    <div class="row">
                        <div class="col-md-4 text-center text-md-start">
                            <h5 class="fw-bold">My Blog</h5>
                            <p>&copy; 2024. Mọi thắc mắc xin liên hệ.</p>
                        </div>

                        <div class="col-md-4 text-center">
                            <h6 class="fw-bold">Liên kết nhanh</h6>
                            <ul class="list-unstyled">
                                <li><a href="#" class="text-black text-decoration-none">Trang chủ</a></li>
                            </ul>
                        </div>

                        <div class="col-md-4 text-center text-md-end">
                            <h6 class="fw-bold">Kết nối với chúng tôi</h6>
                            <a href="#" class="text-black text-decoration-none me-3">
                                <i class="bi bi-facebook"></i>
                            </a>
                            <a href="#" class="text-black text-decoration-none me-3">
                                <i class="bi bi-twitter"></i>
                            </a>
                            <a href="#" class="text-black text-decoration-none">
                                <i class="bi bi-instagram"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </footer>

        </>
    )
}

export default Footer;