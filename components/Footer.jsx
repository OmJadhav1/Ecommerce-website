import React from "react";
import {
  AiFillInstagram,
  AiOutlineGithub,
  AiOutlineTwitter,
} from "react-icons/ai";

const Footer = () => {
  return (
    <div className="footer-container">
      <p>@Copright Reserved</p>
      <p className="icons">
        <AiFillInstagram />
        <AiOutlineTwitter />
        <a href="https://github.com/OmJadhav1/Ecommerce-website">
          <AiOutlineGithub />
        </a>
      </p>
    </div>
  );
};

export default Footer;
