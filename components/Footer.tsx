"use client";

import Link from "next/link";
import { Heart, Github, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="px-5 py-4 backdrop-blur-xl bg-white/80 border-t border-pink-100/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          
          {/* Developed By Section */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Developed with</span>
            <Heart className="size-4 text-pink-500 animate-pulse" />
            <span>by</span>
            <span className="font-semibold text-pink-600">Husnain Mazhar</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <Link 
              href="https://github.com" 
              className="group p-2 rounded-full hover:bg-pink-50 transition-all duration-300 hover:scale-110"
            >
              <Github className="size-4 text-gray-600 group-hover:text-pink-600 transition-colors duration-300" />
            </Link>
            
            <Link 
              href="https://twitter.com" 
              className="group p-2 rounded-full hover:bg-pink-50 transition-all duration-300 hover:scale-110"
            >
              <Twitter className="size-4 text-gray-600 group-hover:text-pink-600 transition-colors duration-300" />
            </Link>
            
            <Link 
              href="https://linkedin.com" 
              className="group p-2 rounded-full hover:bg-pink-50 transition-all duration-300 hover:scale-110"
            >
              <Linkedin className="size-4 text-gray-600 group-hover:text-pink-600 transition-colors duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;