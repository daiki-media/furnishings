"use client";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { useEffect, useState } from "react";

const FloatingButton = () => {
    const [currentUrl, setCurrentUrl] = useState("");

    useEffect(() => {
        if (typeof window !== "undefined") {
            setCurrentUrl(window.location.href);
        }
    }, []);

    const phoneNumber = "60123498710";
    const textMessage = currentUrl
        ? `Hi, I need more details about this page: ${currentUrl}`
        : "Hi, I need more details about this page.";


    const waLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(textMessage)}`;

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <Link
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-14 h-14 rounded-full bg-green-500 shadow-lg hover:bg-green-600 transition duration-300 relative"
                title="Click to open WhatsApp and send the message"
                aria-label="Chat with us on WhatsApp"
            >
                <FaWhatsapp className="w-7 h-7 text-white" />
            </Link>
        </div>
    );
};

export default FloatingButton;
