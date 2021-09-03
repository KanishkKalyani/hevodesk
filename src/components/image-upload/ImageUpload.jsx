import React, { Component } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { toast } from 'react-toastify';
import Layout from '../layout/Layout';
import Image from './Image';
import { isAuth } from '../../utils/helpers';

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileUpload: undefined,
    };
  }

  handleFileUpload = (event) => {
    this.setState({ fileUpload: event.target.files[0] });
  };

  onUpload = () => {
    if (this.state.fileUpload !== undefined) {
      const data = new FormData();
      const userId = isAuth()._id;

      data.append('profile-image', this.state.fileUpload);
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };

      trackPromise(
        // axios
        //   .post(`/v1/files/image-upload/${userId}`, data, config)
        //   .then((res) => {
        //     toast.success(`Image Upload Success`);
        //     this.props.history.push('/');
        //   })
        //   .catch((err) => {
        //     if (err && err.response && err.response.data) {
        //       toast.error(err.response.data.error);
        //     } else {
        //       toast.error(`Image Upload Failed`);
        //     }
        //   }),
        'image-upload'
      );
    }
  };

  deleteImage = (e) => {
    const userId = isAuth()._id;

    trackPromise(
      // axios
      //   .delete(`/v1/files/delete-image/${userId}`)
      //   .then((res) => {
      //     toast.success(`Image Deleted Successfully`);
      //     this.setState({ fileUpload: undefined });
      //     this.props.history.push('/');
      //   })
      //   .catch((err) => {
      //     if (err && err.response && err.response.data) {
      //       toast.error(err.response.data.error);
      //     } else {
      //       toast.error(`Image Deletion Failed`);
      //     }
      //   }),
      'image-delete'
    );
  };

  render() {
    return (
      <Layout>
        <div className='image-upload-page-container'>
          <div className='profile-pic-container'>
            <Image className='profile-pic-display'></Image>
          </div>
          <form className='add-image-form-body'>
            <input
              className='add-image-button'
              type='file'
              name='profile-image'
              onChange={this.handleFileUpload}
            />
            <button
              type='button'
              className='upload-image-button'
              onClick={() => {
                if (this.state.fileUpload !== undefined) {
                  this.onUpload();
                }
              }}
            >
              Upload
            </button>
          </form>
          <button
            onClick={(e) => this.deleteImage(e)}
            className='upload-image-button delete-image-button'
          >
            Delete Picture
          </button>
        </div>
      </Layout>
    );
  }
}

export default ImageUpload;
