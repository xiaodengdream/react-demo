import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
export default function Picture(props) {
  const [previewOpen, setPreviewOpen] = useState(false);//图片modal框是否显示
  const [previewImage, setPreviewImage] = useState('');//modal中的图片src
  const [fileList, setFileList] = useState([]);  //所有上传图片信息
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  //点击预览图片
  const handlePreview = async (file) => {
    /*     console.log(file); */
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  //上传图片发生变化
  const handleChange = ({ fileList }) => {
    setFileList(fileList)
  };
  //定义图片转base64方法
  const customRequest = (option) => {
    const formData = new FormData();
    formData.append("files[]", option.file);
    const reader = new FileReader();
    reader.readAsDataURL(option.file);
    reader.onloadend = function (e) {
      /* console.log(e.target.result); */// 打印图片的base64
      props.setImgSrc(e.target.result)
      if (e && e.target && e.target.result) {
        option.onSuccess();
      }
    };
  }
  //定义上传图片按钮
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <>
      <Upload
        listType="picture-card"
        fileList={fileList}
        name='image'
        customRequest={customRequest}  //调用base64方法
        showUploadList={true} // 页面展示文件列表
        onPreview={handlePreview}  //点击预览图片
        onChange={handleChange}//上传图片触发
      >
        {fileList.length >= 1 ? null : uploadButton}
      </Upload >
      <Modal open={previewOpen} footer={null} onCancel={() => setPreviewOpen(false)}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};