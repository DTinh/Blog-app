import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import _ from 'lodash';
import { createNewPost } from '../../services/apiServices';
import { toast } from 'react-toastify';
import CommonUtils from '../../utils/CommonUtils';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import './ModalPost.scss';

const mdParser = new MarkdownIt(/* Markdown-it options */);

const ModalPost = (props) => {
    // const [title, setTitle] = useState("");
    // const [description, setDescription] = useState("");
    // const [contentMarkdown, setContentMarkdown] = useState("");
    // const [contentHTML, setContentHTMl] = useState("");

    const defaultPostData = {
        title: '',
        description: '',
        contentMarkdown: '',
        contentHTML: '',
        image: ''
    }
    const [postData, setPostData] = useState(defaultPostData);
    const [isOpenReviewImg, setIsOpenReviewImg] = useState(false);

    const handleEditorChange = ({ html, text }) => {
        setPostData((prev) => ({
            ...prev,
            contentHTML: html,
            contentMarkdown: text
        }));
        // console.log('handleEditorChange', html, text);
    }
    const handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            // console.log('check base64 image: ', base64)
            const objectUrl = URL.createObjectURL(file)
            setPostData((prev) => ({
                ...prev,
                previewImgURL: objectUrl,
                image: base64
            }));
        }
    }
    const openPreviewImage = () => {
        if (!postData.previewImgURL) return;
        setIsOpenReviewImg(true)
        // console.log('Opening lightbox with image:', postData.previewImgURL);
        console.log("check isOpenReviewImg", isOpenReviewImg);

    }
    const handleCloseModalPost = () => {
        props.handleClose();
    }
    const handleOnChangeInput = (value, name) => {
        let _postData = _.cloneDeep(postData);
        _postData[name] = value;
        setPostData(_postData);
    }
    const handleConfirmPost = async () => {
        let res = await createNewPost(postData);
        if (res && res.errCode === 0) {
            toast.success(res.errMessage);
            setPostData(defaultPostData);
            props.handleClose();
        }
    }
    return (
        <>
            <Modal size="lg" show={props.show} onHide={() => handleCloseModalPost()} className="modal-user">
                <Modal.Header closeButton>
                    <Modal.Title>
                        <span>Create a new post</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='content-body row'>
                        <div className="col-12 col-sm-6 form-group">
                            <label>
                                Title (<span className="text-danger">*</span>):
                            </label>
                            <input
                                className="form-control"
                                type="text"
                                value={postData.title}
                                onChange={(event) => handleOnChangeInput(event.target.value, 'title')}

                            />
                        </div>
                        <div className='preview-img-container col-6 mt-3'>
                            <input id='previewImg' type='file' hidden
                                onChange={(event) => handleOnchangeImage(event)}
                            />
                            <label className='label-upload' htmlFor="previewImg">Tải ảnh <i className="fa fa-upload"></i></label>
                            <div className='preview-image'
                                style={{ backgroundImage: `url(${postData.previewImgURL})` }}
                                onClick={() => openPreviewImage()}
                            >
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 mt-3 form-group">
                            <label>
                                Description (<span className="text-danger">*</span>):
                            </label>
                            <textarea
                                className="form-control"
                                rows="3"
                                value={postData.description}
                                onChange={(event) => handleOnChangeInput(event.target.value, 'description')}

                            />
                            {/* </div> */}
                        </div>
                    </div>

                    <MdEditor style={{ height: '300px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={handleEditorChange}
                        value={postData.contentMarkdown}
                    />
                    {/* {isOpenReviewImg && (
                        <Lightbox
                            mainSrc={postData.previewImgURL}
                            onCloseRequest={() => setIsOpenReviewImg(false)}
                        />
                    )} */}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary"
                        onClick={() => handleCloseModalPost()}
                    >
                        Close
                    </Button>
                    <Button variant="primary"
                        onClick={() => handleConfirmPost()}
                    >
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalPost;