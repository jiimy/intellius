import React from "react";

type ImgTypes = {
  onClick?: (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
  fill?: string;
}

const MessageButton34 = ({ onClick, fill = "#D8D8D8" }: ImgTypes) => {
  return (
    <svg width="34" height="35" viewBox="0 0 34 35" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={onClick}>
      <path d="M17.2223 34.145C26.3043 34.145 33.6667 26.6323 33.6667 17.365C33.6667 8.09767 26.3043 0.585007 17.2223 0.585007C8.14026 0.585007 0.777832 8.09767 0.777832 17.365C0.777832 26.6323 8.14026 34.145 17.2223 34.145Z" fill={fill} />
      <path fillRule="evenodd" clipRule="evenodd" d="M17.2222 8.97501V26.594V8.97501Z" fill={fill} />
      <path d="M23.6972 15.5821L17.2222 8.97501M17.2222 8.97501L10.7472 15.5821M17.2222 8.97501V26.594" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>

  );
};

export default MessageButton34;
