import {
  faInstagram,
  faFacebook,
  faYoutube,
  faLinkedin,
  faWhatsapp,
  faPinterest,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const navLinks = [
    { id: 1, title: "About Us", path: "/" },
    { id: 2, title: "Contact Us", path: "/contact" },
    { id: 3, title: "Careers", path: "/careers" },
    { id: 4, title: "Blogs", path: "/blogs" },
    { id: 5, title: "Get Help", path: "/help" },
  ];

  const socialLinks = [
    { href: "https://www.instagram.com/urvann.india", icon: faInstagram },
    { href: "https://www.facebook.com/groups/217942056914835", icon: faFacebook },
    { href: "https://www.youtube.com/c/UrvannAcademy", icon: faYoutube },
    { href: "https://www.linkedin.com/company/urvann/", icon: faLinkedin },
    { href: "https://api.whatsapp.com/send/?phone=919599585773", icon: faWhatsapp },
    { href: "mailto:customersupport@urvann.com", icon: faEnvelope },
    { href: "https://in.pinterest.com/urvann_india/", icon: faPinterest },
    { href: "https://twitter.com/urvannindia", icon: faTwitter },
  ];

  return (
    <footer className="bg-[#276139] text-white font-sans relative z-[40] py-10 px-5">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row md:justify-between gap-10">
        {/* Logo & Tagline */}
        <div className="flex flex-col md:flex-1 gap-6">
            <img
              src="/logo.png"
              alt="Parkkruthi Logo"
              className="h-40 object-contain mix-blend-multiply" 
            />
          <p className="text-[#d0e8d0] max-w-sm leading-relaxed text-lg font-medium">
            Parkkruthi – Bringing Nature to Your Doorstep with Fresh Plants & Expert Care.
          </p>

          {/* Contact Info */}
          <div className="space-y-2 text-sm text-[#b8d9b8]">
            <p className="flex items-center gap-3">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="text-[#a2cca2]" />
              Bangalore, Karnataka, India
            </p>
            <p className="flex items-center gap-3">
              <FontAwesomeIcon icon={faPhone} className="text-[#a2cca2]" />
              +91 98765 43210
            </p>
            <p className="flex items-center gap-3">
              <FontAwesomeIcon icon={faEnvelope} className="text-[#a2cca2]" />
              support@parkkruthi.com
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col md:flex-1">
          <h3 className="text-[#a8d5a8] font-semibold mb-4 text-xl border-b border-[#3c7d3c] pb-2 w-max">
            Quick Links
          </h3>
          <ul className="space-y-3">
            {navLinks.map(({ id, title, path }) => (
              <li
                key={id}
                onClick={() => navigate(path)}
                className="cursor-pointer hover:text-[#c3f1c3] transition-colors duration-300 text-base"
              >
                {title}
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:flex-1 h-fit flex flex-col justify-between max-w-md bg-white rounded-lg p-6 shadow-lg text-[#276139]">
          <h3 className="text-[#276139] font-bold text-xl">
            Subscribe to Our Newsletter
          </h3>
          <p className="mb-4 text-sm text-[#3b6b3b]">
            Get the latest updates, exclusive deals, and gardening tips right in your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="flex-grow px-4 py-3 border border-[#276139] rounded focus:outline-none focus:ring-2 focus:ring-[#3c7d3c]"
            />
            <button
              type="submit"
              className="bg-[#276139] hover:bg-[#3c7d3c] text-white font-semibold px-6 py-3 rounded transition-colors duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Social Media Icons */}
      <div className="max-w-[1200px] mx-auto mt-12 flex justify-center gap-8 text-white text-2xl">
        {socialLinks.map(({ href, icon }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#a8d5a8] transition-colors duration-300"
            aria-label="social media link"
          >
            <FontAwesomeIcon icon={icon} />
          </a>
        ))}
      </div>

      {/* Copyright */}
      <div className="max-w-[1200px] mx-auto mt-10 border-t border-[#3c7d3c] pt-6 text-center text-sm text-[#a8d5a8] select-none">
        © {new Date().getFullYear()} Parkkruthi India Private Limited. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
