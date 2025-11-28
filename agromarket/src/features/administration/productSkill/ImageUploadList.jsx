import React from "react";
import { ImageUpload } from "./ImageUpload";
import "./ImageUpload.scss";

export function ImageUploadList({ onFileSelect, imageList, existingImages}) {
    return (
        <div className = "full-width">
        { imageList &&
            imageList.map(( text, idx ) => (
                <ImageUpload onFileSelect={ onFileSelect } idx = { idx }
                                                                text = { text }
                                                                existingImage= { existingImages?.[idx] }
                                                                key = { idx } />
            ))
        }
        </div>
    )
}