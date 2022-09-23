import React from "react";
import "./css/Footer.css";

const Footer = () => {
    return (
        <footer>
            <div className="footerTop">
                <div>National Taipei University of Technology,<br/>Computer Science and Information engineering</div>
                <a href={ "https://www.ntut.edu.tw/" }>NTUT</a>
            </div>
            <div className="footerBottom">
                <div>Copyright © 2022 NTUT.team,Ltd. All Rights Reserved.</div>
            </div>
        </footer>
    )
}

export default Footer;