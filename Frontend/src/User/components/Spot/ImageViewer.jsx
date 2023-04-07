import React from "react";
import "./imageViewer.css";
const images = [
  "https://m.media-amazon.com/images/I/81RHHnGydgL._SL1500_.jpg",
  "https://m.media-amazon.com/images/I/71Pl5NJJKAL._SL1500_.jpg",
  "https://m.media-amazon.com/images/I/61zRHx6l45L._SL1500_.jpg",
  "https://m.media-amazon.com/images/I/61R8OwIVy-L._SL1500_.jpg",
  "https://m.media-amazon.com/images/I/51EAt70Kn-L._SL1500_.jpg",
];
function ImageViewer() {
  return (
    <div className="container">
      <div className="left">
        <div className="left_1">
          {images.map((image, i) => {
            return (
              <div className="img_wrap" key={i}>
                <img src={image} alt="" />
              </div>
            );
          })}
        </div>
        <div className="left_2">
          <img src={images[0]} alt="" />
        </div>
      </div>
      <div className="right"></div>
    </div>
  );
}

export default ImageViewer;
