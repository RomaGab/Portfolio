import { FaLinkedinIn } from 'react-icons/fa';

import profile from '../../data/profile.json';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-column logo-column">
                    <img className="footer-logo"
                    src={profile.profilePicture.icon}
                    alt={profile.profilePicture.alt}
                />
                </div>
                <div className="footer-column">
                    <h3>Projects</h3>
                    <ul>
                        <li><a href="#games">Roller Loop</a></li>
                        <li><a href="#games">Transatlantique</a></li>
                        <li><a href="#team">Hot On The Trail</a></li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h3>Projects</h3>
                    <ul>
                        <li><a href="#games">Roller Loop</a></li>
                        <li><a href="#team">Hot On The Trail</a></li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h3>Contact Me</h3>
                    <div className="social-icons">
                        <a className="social-box" href={profile.contact} target="_blank"><FaLinkedinIn/></a>
                    </div>
                </div>
            </div>
                <div className="bg-white py-12 text-center text-slate-400 text-sm border-t border-gray-100">
                    <p>© {new Date().getFullYear()} Romain Gabrillargues. All rights reserved.</p>
                </div>
        </footer>
    );
};

export default Footer;