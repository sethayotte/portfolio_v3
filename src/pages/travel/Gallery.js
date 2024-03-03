import React from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
const images = require.context("../../assets/peru-pics", true);
const imageList = images.keys().map((image) => images(image));

const Gallery = () => {
  return (
    <div className="travel-gallery">
      <PhotoProvider maskOpacity={0.7}>
        <div className="image-grid">
          {imageList.map((item, index) => (
            <PhotoView key={index} src={item}>
              <img src={item} alt="" />
            </PhotoView>
          ))}
        </div>
      </PhotoProvider>
    </div>
  );
};

export { Gallery };
