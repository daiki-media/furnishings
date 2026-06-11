"use client";

import React from "react";

interface SquareLoaderProps {
  text?: string;
}

const SquareLoader: React.FC<SquareLoaderProps> = ({ text = "Loading..." }) => {
  // In-flow loader: must NOT be a fixed full-viewport overlay. As a fixed
  // overlay (fixed inset-0 z-[9999]) any section waiting on data covered the
  // whole site with a white screen — users saw only "Loading..." until the
  // CMS responded (or timed out after ~30s) even though the rest of the page
  // was already rendered underneath.
  return (
    <div className="flex w-full items-center justify-center py-16">
      <div className="text-center">
        <div className="relative w-[116px] h-[86px] mx-auto mb-4">
          <div className="square animate-square1" />
          <div className="square animate-square2" />
          <div className="square animate-square3" />
          <div className="square animate-square4" />
          <div className="square animate-square5" />
        </div>

        <h2 className="text-xl font-semibold text-gray-700">{text}</h2>
      </div>

      <style jsx>{`
        .square {
          position: absolute;
          width: 26px;
          height: 26px;
          background: #ea580c; /* Tailwind orange-600 */
          border-radius: 2px;
        }

        @keyframes square1 {
          0% {
            left: 0px;
            top: 0px;
          }
          8.333% {
            left: 0px;
            top: 30px;
          }
          100% {
            left: 0px;
            top: 30px;
          }
        }
        @keyframes square2 {
          0% {
            left: 0px;
            top: 30px;
          }
          8.333% {
            left: 0px;
            top: 60px;
          }
          16.67% {
            left: 30px;
            top: 60px;
          }
          25% {
            left: 30px;
            top: 30px;
          }
          83.33% {
            left: 30px;
            top: 30px;
          }
          91.67% {
            left: 30px;
            top: 0px;
          }
          100% {
            left: 0px;
            top: 0px;
          }
        }
        @keyframes square3 {
          0%,
          100% {
            left: 30px;
            top: 30px;
          }
          25% {
            left: 30px;
            top: 0px;
          }
          33.33% {
            left: 60px;
            top: 0px;
          }
          41.67% {
            left: 60px;
            top: 30px;
          }
          75% {
            left: 60px;
            top: 60px;
          }
          83.33% {
            left: 30px;
            top: 60px;
          }
          91.67% {
            left: 30px;
            top: 30px;
          }
        }
        @keyframes square4 {
          0% {
            left: 60px;
            top: 30px;
          }
          41.67% {
            left: 60px;
            top: 60px;
          }
          50% {
            left: 90px;
            top: 60px;
          }
          58.33% {
            left: 90px;
            top: 30px;
          }
          100% {
            left: 90px;
            top: 30px;
          }
        }
        @keyframes square5 {
          0% {
            left: 90px;
            top: 30px;
          }
          58.33% {
            left: 90px;
            top: 0px;
          }
          66.67% {
            left: 60px;
            top: 0px;
          }
          75% {
            left: 60px;
            top: 30px;
          }
          100% {
            left: 60px;
            top: 30px;
          }
        }
        @keyframes squarefadein {
          0% {
            transform: scale(0.75);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-square1 {
          animation: square1 2.4s ease-in-out infinite,
            squarefadein 0.4s ease-out both;
        }
        .animate-square2 {
          animation: square2 2.4s ease-in-out infinite,
            squarefadein 0.4s ease-out both;
        }
        .animate-square3 {
          animation: square3 2.4s ease-in-out infinite,
            squarefadein 0.4s ease-out both;
        }
        .animate-square4 {
          animation: square4 2.4s ease-in-out infinite,
            squarefadein 0.4s ease-out both;
        }
        .animate-square5 {
          animation: square5 2.4s ease-in-out infinite,
            squarefadein 0.4s ease-out both;
        }
      `}</style>
    </div>
  );
};

export default SquareLoader;
