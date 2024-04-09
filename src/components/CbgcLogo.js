import React,  { Component } from "react";

import CBGCLogoImg from "../imgIcon/CBGC_logo.png";


class CBGCLogo extends Component {
    render() {
        return (


  <img
    src={CBGCLogoImg} // Update this with the path to your PNG file
    alt="CBGC Logo"
    height="100" // Maintain the same height as specified in the SVG
    width="100" // Maintain the same width as specified in the SVG
  />
)}}

export default CBGCLogo;
