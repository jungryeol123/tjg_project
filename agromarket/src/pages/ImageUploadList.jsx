import React, { useState } from "react";
import { ImageUpload } from "./ImageUpload";
import "./ImageUpload.css";

export function ImageUploadList({ onFileSelect, size, imageList}) {
    return (
        <div className = "full-width">
        { imageList &&
            imageList.map(( text, idx ) => (
                <ImageUpload onFileSelect={ onFileSelect } idx = { idx }
                                                                text = { text }/>
            ))
        }
        </div>
    )
}