"use client";
import { useState, ChangeEvent } from "react";

export default function ImageCaption() {

  const [uploadImage, setUploadImage] = useState('');
  const [message, setMessage] = useState('');

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setMessage('');
      return;
    }

    const fileType = file.type;
    const fileName = file.name;
    if (fileType !== 'image/jpeg' || !fileName.toLowerCase().endsWith('.jpg')) {
      setMessage('只允許上傳 JPG 格式的圖片（副檔名為 .jpg）');
      e.target.value = ''; // 清空選擇
    } else {
      const text = await handleUpload(file)
      console.log(file)
      console.log(typeof file)
      setMessage(text);
      // const url = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc9APxkj0xClmrU3PpMZglHQkx446nQPG6lA&s"
      const url = URL.createObjectURL(file)
      setUploadImage(url)
    }
  };

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    // 時間因素 就不包到 nextjs 的後端了
    const res = await fetch('http://localhost:8000/v1/imagecaption/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    return data.message
  };

  return (
    <div>
      <div style={{ marginTop: '50px' }}>
        <div className="template-base" style={{ backgroundColor: '#E0E0E0' }}>
          <div className="title">上傳圖片生成圖像描述</div>
          <br />
          <br />
          <input type="file" accept=".jpg,image/jpeg" onChange={handleFileChange} />
          {uploadImage ? <img style={{width: '70%'}} src={uploadImage} /> : <div></div>}
        </div>
        {
          message
            ?
            <div className="template-base" style={{ backgroundColor: '#E0E0E0', marginTop: '20px' }}>
              <div>生成結果: {message}</div>
            </div>
            : <div></div>
        }
      </div>
    </div>
  );
}
