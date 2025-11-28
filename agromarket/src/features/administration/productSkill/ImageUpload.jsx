import React, { useState, useEffect } from "react";
import "./ImageUpload.scss";

export function ImageUpload({ onFileSelect, idx, text, existingImage }) {
    const [image, setImage] = useState(null);
    useEffect(() => {
      setImage(existingImage || null);
    }, [existingImage]);

    // 이미지 파일 변경 시 이벤트
    const handleFileChange = (e) => { 
        const selectedFile = e.target.files[0];
        // 파일이 존재할경우
        if (selectedFile) {
            // 이미지의 URL설정
            setImage(URL.createObjectURL(selectedFile));

            // ProductAdd에 파일 전송
            if (onFileSelect) {
                onFileSelect(idx, selectedFile);
            }
        }
     };

    return (
    <div className="image-upload-container">
      <h2 className="image-upload-title">📸 { text } 선택</h2>

      <input
        type="file"
        accept="image/*"
        onChange={ handleFileChange }
        className="image-upload-input"
      />
      { image && (
        <div className="image-preview-container">
          <img src={image} alt="미리보기" className="image-preview" />
        </div>
      )}
    </div>
  );
}