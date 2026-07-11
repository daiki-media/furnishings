"use client";

import { useState, useEffect, useRef } from "react";
import { X, Send } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const WHATSAPP_NUMBER = "60123498710";
const AGENT_NAME = "Furnishing Solutions";
const AGENT_ROLE = "Flooring Consultant";

const quickReplies = [
    "I'd like a free quote",
    "What suits my kitchen?",
    "Visit your showroom",
    "Do you install in my area?",
];

function getTimeString(): string {
    const now = new Date();
    return now.toLocaleTimeString("en-MY", { hour: "2-digit", minute: "2-digit", hour12: true });
}

const FloatingButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [currentUrl, setCurrentUrl] = useState("");
    const [timeNow, setTimeNow] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setCurrentUrl(window.location.href);
            setTimeNow(getTimeString());
        }
    }, []);

    useEffect(() => {
        if (isOpen) {
            setTimeNow(getTimeString());
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    const sendToWhatsApp = (text: string) => {
        const lines = [text, "", `Page: ${currentUrl}`];
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
        window.open(url, "_blank", "noopener,noreferrer");
        setMessage("");
        setIsOpen(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;
        sendToWhatsApp(message.trim());
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
            {isOpen && (
                <div className="w-[360px] max-w-[calc(100vw-3rem)] rounded-2xl shadow-2xl overflow-hidden">
                    {/* WhatsApp-style header — signature teal */}
                    <div
                        className="px-4 py-3 flex items-center gap-3"
                        style={{ background: "linear-gradient(135deg, #075e54, #128c7e)" }}
                    >
                        {/* Agent avatar */}
                        <div className="relative shrink-0">
                            <div className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center text-white font-semibold text-lg">
                                F
                            </div>
                            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-400 border-2 border-[#075e54]" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-white font-semibold text-sm truncate">{AGENT_NAME}</p>
                            <p className="text-white/70 text-xs">{AGENT_ROLE} · Online</p>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
                            aria-label="Close chat"
                        >
                            <X className="w-5 h-5 text-white/80" />
                        </button>
                    </div>

                    {/* Chat body — WhatsApp wallpaper style */}
                    <div
                        className="px-4 py-5 min-h-[200px]"
                        style={{ backgroundColor: "#ece5dd" }}
                    >
                        {/* Agent message bubble */}
                        <div className="max-w-[85%] relative">
                            {/* Bubble tail */}
                            <div
                                className="absolute top-0 -left-2 w-0 h-0"
                                style={{
                                    borderTop: "8px solid white",
                                    borderLeft: "8px solid transparent",
                                }}
                            />
                            <div className="bg-white rounded-lg rounded-tl-none px-3 py-2.5 shadow-sm">
                                <p className="text-[13px] text-[#303030] leading-relaxed">
                                    Hi there! 👋 Welcome to <strong>Furnishing Solutions</strong>.
                                </p>
                                <p className="text-[13px] text-[#303030] leading-relaxed mt-1.5">
                                    How can we help you today? Ask us about flooring, request a quote, or schedule a showroom visit.
                                </p>
                                <p className="text-[10px] text-[#999] text-right mt-1">{timeNow}</p>
                            </div>
                        </div>

                        {/* Quick reply chips */}
                        <div className="flex flex-wrap gap-1.5 mt-4">
                            {quickReplies.map((text) => (
                                <button
                                    key={text}
                                    onClick={() => sendToWhatsApp(text)}
                                    className="text-xs bg-white text-[#075e54] border border-[#075e54]/20 px-3 py-1.5 rounded-full hover:bg-[#075e54] hover:text-white transition-colors shadow-sm"
                                >
                                    {text}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Input bar — WhatsApp style */}
                    <form
                        onSubmit={handleSubmit}
                        className="px-3 py-2.5 flex items-center gap-2"
                        style={{ backgroundColor: "#f0f0f0" }}
                    >
                        <input
                            ref={inputRef}
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type a message"
                            className="flex-1 text-sm text-[#303030] placeholder:text-[#999] bg-white rounded-full px-4 py-2.5 border-none focus:outline-none focus:ring-1 focus:ring-[#128c7e]/40 shadow-sm"
                        />
                        <button
                            type="submit"
                            disabled={!message.trim()}
                            className="flex items-center justify-center w-10 h-10 rounded-full transition-colors shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
                            style={{ backgroundColor: "#128c7e" }}
                            aria-label="Send on WhatsApp"
                        >
                            <Send className="w-4 h-4 text-white" />
                        </button>
                    </form>

                    {/* Powered by label */}
                    <div className="bg-white text-center py-1.5 border-t border-zinc-100">
                        <p className="text-[10px] text-zinc-400 flex items-center justify-center gap-1">
                            <FaWhatsapp className="w-3 h-3 text-[#25d366]" />
                            Chat via WhatsApp
                        </p>
                    </div>
                </div>
            )}

            {/* WhatsApp FAB + badge */}
            <div className="flex items-center gap-2">
                {!isOpen && (
                    <button
                        onClick={() => setIsOpen(true)}
                        className="bg-white text-[#075e54] text-sm font-semibold pl-4 pr-3 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2 border border-zinc-100"
                    >
                        Chat on WhatsApp
                        <FaWhatsapp className="w-4 h-4 text-[#25d366]" />
                    </button>
                )}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="relative flex items-center justify-center w-[60px] h-[60px] rounded-full shadow-lg transition-all duration-300 hover:scale-105 shrink-0"
                    style={{ backgroundColor: "#25d366" }}
                    aria-label={isOpen ? "Close chat" : "Chat with us on WhatsApp"}
                >
                    {isOpen ? (
                        <X className="w-7 h-7 text-white" />
                    ) : (
                        <>
                            <FaWhatsapp className="w-8 h-8 text-white" />
                            <span className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ backgroundColor: "#25d366" }} />
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default FloatingButton;
