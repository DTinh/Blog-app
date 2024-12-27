import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import _ from 'lodash';
import { createNewPost, updatePost } from '../../services/apiServices';
import { toast } from 'react-toastify';
import CommonUtils from '../../utils/CommonUtils';
import 'react-image-lightbox/style.css';
import './ModalPost.scss';
import { Buffer } from 'buffer';

const mdParser = new MarkdownIt(/* Markdown-it options */);

const ModalPost = (props) => {
    const { action, dataModalPost } = props;

    const defaultPostData = {
        title: '',
        description: '',
        contentMarkdown: '',
        contentHTML: '',
        image: ''
    }
    const validInputsDefault = {
        title: true,
        description: true,
        contentMarkdown: true,
        image: true,
    }
    const [postData, setPostData] = useState(defaultPostData);
    const [validInputs, setValiInputs] = useState(validInputsDefault);


    // const [isOpenReviewImg, setIsOpenReviewImg] = useState(false);
    useEffect(() => {
        if (action === 'UPDATE' && dataModalPost) {
            let imageBase64 = '';
            if (dataModalPost.image) {
                imageBase64 = new Buffer(dataModalPost.image, 'base64').toString('binary');
            }
            setPostData({
                ...dataModalPost,
                image: imageBase64,
            });
            console.log('check dataModalPost', dataModalPost);

        }
    }, [dataModalPost])
    const handleEditorChange = ({ html, text }) => {
        setPostData((prev) => ({
            ...prev,
            contentHTML: html,
            contentMarkdown: text
        }));
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

    const handleCloseModalPost = () => {
        props.handleClose();
    }
    const handleOnChangeInput = (value, name) => {
        let _postData = _.cloneDeep(postData);
        _postData[name] = value;
        setPostData(_postData);
    }
    const checkValidateInput = () => {
        if (action === 'UPDATE') return true;
        setValiInputs(validInputsDefault);
        let check = true;
        let arr = ['title', 'image', 'description', 'contentMarkdown'];
        for (let i = 0; i < arr.length; i++) {
            if (!postData[arr[i]]) {
                let _validInputs = _.cloneDeep(validInputsDefault);
                _validInputs[arr[i]] = false;
                setValiInputs(_validInputs);
                toast.error(`Empty input ${arr[i]}`)
                check = false;
                break;
            }
        }
        return check;
    }
    const handleConfirmPost = async () => {
        let check = checkValidateInput();
        if (check === true) {
            let res = action === 'UPDATE' ?
                await updatePost(postData)
                : await createNewPost(postData);
            if (res && res.errCode === 0) {
                toast.success(res.errMessage);
                setPostData(defaultPostData);
                props.handleClose();
                {
                    action === 'UPDATE' ?
                        props.fetchDetailPosts()
                        :
                        props.fetchPosts()
                }
            }
        }

    }

    return (
        <>
            <Modal size="lg" show={props.show} onHide={() => handleCloseModalPost()} className="modal-user">
                <Modal.Header closeButton>
                    <Modal.Title>
                        <span>{props.action === 'UPDATE' ? 'Update post' : 'Create a new post'}</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='content-body row'>
                        <div className="col-12 col-sm-6 form-group">
                            <label>
                                Title (<span className="text-danger">*</span>):
                            </label>
                            <input
                                className={validInputs.title ? 'form-control' : 'form-control is-invalid'}
                                type="text"
                                value={postData?.title || ''}
                                onChange={(event) => handleOnChangeInput(event.target.value, 'title')}
                            />
                        </div>
                        <div className='preview-img-container col-6 mt-3'>
                            <input id='previewImg' type='file' hidden
                                onChange={(event) => handleOnchangeImage(event)}
                            />
                            <label className='label-upload' htmlFor="previewImg">Tải ảnh <i className="fa fa-upload"></i></label>
                            <div className='preview-image'
                                style={{ backgroundImage: `url(${postData?.image || ''})` }}
                            // onClick={() => openPreviewImage()}
                            >
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 mt-3 form-group">
                            <label>
                                Description (<span className="text-danger">*</span>):
                            </label>
                            <textarea
                                className={validInputs.description ? 'form-control' : 'form-control is-invalid'}
                                rows="3"
                                value={postData?.description || ''}
                                onChange={(event) => handleOnChangeInput(event.target.value, 'description')}

                            />
                            {/* </div> */}
                        </div>
                    </div>

                    <MdEditor style={{ height: '300px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={handleEditorChange}
                        value={postData?.contentMarkdown || ''}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary"
                        onClick={() => handleCloseModalPost()}
                    >
                        Close
                    </Button>
                    <Button variant={props.action === 'UPDATE' ? 'warning' : "primary"}
                        onClick={() => handleConfirmPost()}
                    >
                        {props.action === 'UPDATE' ? 'Update' : 'Create'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalPost;