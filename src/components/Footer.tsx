import React, { useState } from "react";
import { PhoneCall } from "lucide-react";
import facebookIcon from "../assets/facebook-icon.png";
import instagramIcon from "../assets/instagram-icon.png";
import youtubeIcon from "../assets/youtube-icon.png";
import twitterIcon from "../assets/twitter-icon.png";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useIsMobile } from "@/hooks/use-mobile";
const Footer: React.FC = () => {
  const isMobile = useIsMobile();
  return (
    <TooltipProvider>
      <footer
        className="w-full"
        style={{
          marginTop: "0px",
        }}
      >
        {/* Separator */}
        <div className="flex justify-center">
          <div className="w-3/4 h-px bg-separator shadow-sm"></div>
        </div>

        {/* Support Text */}
        <div
          className="text-center"
          style={{
            marginTop: "clamp(30px, 3.85vw, 50px)",
          }}
        >
          <p className="responsive-text-lg font-normal">Soutenez Franck Longo et son équipe</p>
        </div>

        {/* Email */}
        <div
          className="text-center"
          style={{
            marginTop: "clamp(20px, 4.62vw, 30px)",
          }}
        >
          <a
            href="mailto:ensemblepourfontaine2026@gmail.com"
            className="responsive-text-lg text-primary hover:underline"
          >
            ensemblepourfontaine2026@gmail.com
          </a>
        </div>

        {/* Social Media Icons */}
        <div
          className="mt-6 flex justify-center"
          style={{
            gap: "clamp(8px, 0.77vw, 10px)",
          }}
        >
          <Popover>
            <Tooltip>
              <TooltipTrigger asChild>
                <PopoverTrigger asChild>
                  <button className="hover:opacity-80 transition-opacity">
                    <PhoneCall
                      className="text-primary"
                      style={{
                        width: "clamp(24px, 2.31vw, 30px)",
                        height: "clamp(24px, 2.31vw, 30px)",
                      }}
                    />
                  </button>
                </PopoverTrigger>
              </TooltipTrigger>
              <TooltipContent
                className="max-w-xs text-center flex items-center justify-center bg-[hsl(var(--tooltip-bg))]"
                side="left"
                sideOffset={5}
              >
                <p className="text-popover-foreground">Pour joindre l'équipe de campagne, appeler le 07 44 73 77 43.</p>
              </TooltipContent>
            </Tooltip>
            <PopoverContent
              className="w-auto max-w-xs text-center flex items-center justify-center bg-[hsl(var(--tooltip-bg))]"
              side={isMobile ? "top" : "left"}
              align="center"
              sideOffset={5}
            >
              <p className="text-popover-foreground">Pour joindre l'équipe de campagne, appeler le 07 44 73 77 43.</p>
            </PopoverContent>
          </Popover>
          <a href="https://www.facebook.com/profile.php?id=100063565074943" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
            <img
              src={facebookIcon}
              alt="Facebook"
              style={{
                width: "clamp(24px, 2.31vw, 30px)",
                height: "clamp(24px, 2.31vw, 30px)",
              }}
            />
          </a>
        </div>

        {/* Bottom Banner */}
        <div
          className="bg-primary w-full flex items-center justify-center"
          style={{
            marginTop: "clamp(20px, 2.31vw, 30px)",
            height: "clamp(35px, 3.46vw, 45px)",
          }}
        >
          <a href="/plegal" className="text-black text-sm hover:underline">
            Mentions légales
          </a>
        </div>
      </footer>
    </TooltipProvider>
  );
};
export default Footer;
