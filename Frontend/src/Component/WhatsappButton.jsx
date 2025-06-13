import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

const WhatsappButton = () => {
  const whatsappNumber = "919599585773"; // Your WhatsApp number (with country code)
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-10 right-10 animate-pulse bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-colors duration-300 z-50"
    >
      <FontAwesomeIcon icon={faWhatsapp} size="2x" />
    </a>
  );
};

export default WhatsappButton;
