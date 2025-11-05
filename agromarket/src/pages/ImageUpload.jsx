import React, { useState } from "react";
import "./ImageUpload.css";

export function ImageUpload({ onFileSelect }) {
    const [image, setImage] = useState(null);

    // 이미지 파일 변경 시 이벤트
    const handleFileChange = (e) => { 
        const selectedFile = e.target.files[0];
        // 파일이 존재할경우
        if (selectedFile) {
            // 이미지의 URL설정
            setImage(URL.createObjectURL(selectedFile));

            // ProductAdd에 파일 전송
            if (onFileSelect) {
                onFileSelect(selectedFile);
            }
        }
     };

    return (
    <div className="image-upload-container">
      <h2 className="image-upload-title">📸 이미지 선택</h2>

      <input
        type="file"
        accept="image/*"
        onChange={ handleFileChange }
        className="image-upload-input"
      />

      { image && (
        <div className="image-preview-container">
          <img src={ image } alt="미리보기" className="image-preview" />
        </div>
      )}
    </div>
  );
}