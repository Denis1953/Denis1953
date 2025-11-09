import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ImageSlider from "./ImageSlider";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
interface HeaderProps {
  onShowNews?: () => void;
}
const Header: React.FC<HeaderProps> = ({
  onShowNews
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProgrammeDialogOpen, setIsProgrammeDialogOpen] = useState(false);
  const isMobile = useIsMobile();
  const [isLandscape, setIsLandscape] = useState(false);
  const [isCoarse, setIsCoarse] = useState(false);
  useEffect(() => {
    const mqlOrientation = window.matchMedia("(orientation: landscape)");
    const mqlPointer = window.matchMedia("(pointer: coarse)");
    const update = () => {
      // Fallback to window dimensions to ensure orientation updates on all devices
      const landscapeBySize = window.innerWidth > window.innerHeight;
      setIsLandscape(mqlOrientation.matches || landscapeBySize);
      setIsCoarse(mqlPointer.matches);
    };
    mqlOrientation.addEventListener("change", update);
    mqlPointer.addEventListener("change", update);
    window.addEventListener("resize", update);
    update();
    return () => {
      mqlOrientation.removeEventListener("change", update);
      mqlPointer.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // In landscape on small devices, force the landscape header variant without requiring a full reload
  const isPhoneLandscape = isMobile && isLandscape;
  const showMobileHeader = isMobile && !isPhoneLandscape;
  const menuItems = [{
    label: "Accueil",
    path: "/",
    mobileLandscapeLabel: "Accueil"
  }, {
    label: "Biographie",
    path: "/biographie",
    mobileLandscapeLabel: "Bio"
  }, {
    label: "Nos soutiens",
    path: "/equipe",
    mobileLandscapeLabel: "Soutiens"
  }, {
    label: "Bilan",
    path: "/bilan",
    mobileLandscapeLabel: "Bilan"
  }, {
    label: "Programme",
    path: "#",
    mobileLandscapeLabel: "Programme",
    isProgramme: true
  }, {
    label: "Procurations",
    path: "/procurations",
    mobileLandscapeLabel: "Procurations"
  }, {
    label: "Recevoir des infos/S'investir",
    path: "/divers",
    mobileLandscapeLabel: "S'investir"
  }];
  const handleMenuClick = (item: (typeof menuItems)[0], e: React.MouseEvent) => {
    if (item.isProgramme) {
      e.preventDefault();
      setIsProgrammeDialogOpen(true);
      setIsMobileMenuOpen(false);
    }
  };
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  return <header className="w-screen overflow-x-hidden">
      {/* Mobile Header - Small screens only */}
      <div className={`${showMobileHeader ? "block" : "hidden"} w-screen`}>
        {/* Orange Banner with Profile */}
        <div className="bg-primary h-[110px] flex items-center justify-center px-5 w-screen relative">
          <h1 className="text-white font-allura font-bold text-6xl" style={{
          textShadow: "2px 2px 8px rgba(0, 0, 0, 0.6)",
          paddingRight: "55px"
        }}>
            Franck Longo
          </h1>

          {/* Menu Button positioned in top right */}
          <button onClick={toggleMobileMenu} style={{
          position: "absolute",
          top: "50%",
          right: "15px",
          width: "40px",
          height: "40px",
          backgroundColor: "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0",
          cursor: "pointer",
          border: "none",
          transform: "translateY(-50%)"
        }} aria-label="Menu">
            <Menu size={24} color="#000000" strokeWidth={3} />
          </button>
        </div>

        {/* News Button Only */}
        <div className="flex justify-center py-[30px] bg-background w-screen">
          {onShowNews && <Button onClick={onShowNews} variant="outline" size="lg" className="rounded-lg text-lg bg-primary text-primary-foreground border-primary/60 hover:bg-background hover:text-foreground hover:border-primary/40" aria-label="Actualités">
              Actualités
            </Button>}
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={toggleMobileMenu}>
            <div className={`flex justify-center items-start ${isLandscape ? "pt-2" : "pt-20"}`}>
              <div className={`bg-white shadow-lg rounded-lg animate-scale-in origin-top mx-4 overflow-hidden ${isLandscape ? "w-[92vw] h-[94vh]" : "max-w-xs w-full h-[80vh]"}`} onClick={e => e.stopPropagation()}>
                <div className={`flex justify-between items-center border-b ${isLandscape ? "p-1.5 sticky top-0 bg-white z-10" : "p-4"}`}>
                  <h2 className={`font-semibold text-primary ${isLandscape ? "text-sm" : "text-lg"}`}>Menu</h2>
                  <button onClick={toggleMobileMenu} className={`mobile-close-button ${isLandscape ? "w-7 h-7" : ""}`} style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                border: "2px solid #000000",
                backgroundColor: "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0",
                cursor: "pointer",
                position: "relative"
              }}>
                    <X size={16} color="#000000" strokeWidth={3} style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)"
                }} />
                  </button>
                </div>
                <nav className={`pr-2 overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch] ${isLandscape ? "py-1 pb-4 max-h-[calc(94vh-44px)]" : "py-2 pb-3 max-h-[calc(80vh-56px)]"}`} style={{
              paddingBottom: "max(env(safe-area-inset-bottom), 10px)"
            }}>
                  {menuItems.map((item, index) => <Link key={index} to={item.path} className={`block font-medium text-foreground hover:bg-gray-100 ${isLandscape ? "px-2 py-px text-[9px] leading-tight" : "px-4 py-2 text-base"}`} onClick={e => {
                handleMenuClick(item, e);
                if (!item.isProgramme) toggleMobileMenu();
              }}>
                      <span>{isLandscape ? item.mobileLandscapeLabel ?? item.label : item.label}</span>
                    </Link>)}
                </nav>
              </div>
            </div>
          </div>}
      </div>

      {/* Desktop Header - Tablets and larger screens */}
      <div className={`${showMobileHeader ? "hidden" : "block"}`}>
        {/* Election Banner */}
        <div className="bg-primary flex items-center w-screen" style={{
        height: "clamp(80px, 7.69vw, 100px)"
      }}>
          <div className="w-full px-4">
            <h2 className="section-title text-center">Élections municipales des 15 & 22 mars 2026</h2>
          </div>
        </div>

        {/* Image Slider with Overlay */}
        <div className="relative bg-primary w-screen" style={{
        height: "clamp(200px, 23.08vw, 300px)"
      }}>
          <ImageSlider />
          <div className="absolute bottom-0 left-0">
            <h1 style={{
            fontSize: "clamp(40px, 7vw, 90px)",
            paddingLeft: "clamp(20px, 6vw, 78px)",
            paddingBottom: "clamp(8px, 1.2vw, 15px)",
            textShadow: "2px 2px 8px rgba(0, 0, 0, 0.9)"
          }} className="text-white font-allura font-bold leading-tight">Franck   Longo</h1>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="bg-primary w-screen" style={{
        height: "clamp(40px, 3.85vw, 50px)"
      }}>
          <div className="w-full h-full flex justify-center items-center">
            {isPhoneLandscape ? <button onClick={toggleMobileMenu} aria-label="Menu" className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-white/80 bg-transparent">
                <Menu size={24} color="#ffffff" strokeWidth={3} />
              </button> : <ul className="flex items-center h-full justify-center flex-wrap" style={{
            gap: "clamp(10px, 3vw, 50px)",
            maxWidth: "100%"
          }}>
                {menuItems.map((item, index) => <li key={index}>
                    <Link to={item.path} className="menu-item whitespace-nowrap" onClick={e => handleMenuClick(item, e)}>
                      {item.label}
                    </Link>
                  </li>)}
              </ul>}
          </div>
        </nav>

        {/* Phone landscape menu overlay (same as portrait mobile) */}
        {isPhoneLandscape && isMobileMenuOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={toggleMobileMenu}>
            <div className="flex justify-center items-center h-full">
              <div className="bg-white shadow-lg rounded-lg animate-scale-in max-w-md w-[46vw] overflow-hidden" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center border-b p-4">
                  <h2 className="font-semibold text-primary text-lg">Menu</h2>
                  <button onClick={toggleMobileMenu} className="mobile-close-button" style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                border: "2px solid #000000",
                backgroundColor: "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0",
                cursor: "pointer",
                position: "relative"
              }}>
                    <X size={16} color="#000000" strokeWidth={3} style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)"
                }} />
                  </button>
                </div>
                <nav className="py-2 pb-3 overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch] max-h-[70vh]" style={{
              paddingBottom: "max(env(safe-area-inset-bottom), 10px)"
            }}>
                  {menuItems.map((item, index) => <Link key={index} to={item.path} className="block px-4 py-2 text-base font-medium text-foreground hover:bg-gray-100" onClick={e => {
                handleMenuClick(item, e);
                if (!item.isProgramme) toggleMobileMenu();
              }}>
                      <span>{item.label}</span>
                    </Link>)}
                </nav>
              </div>
            </div>
          </div>}
      </div>

      {/* Programme Dialog */}
      <Dialog open={isProgrammeDialogOpen} onOpenChange={setIsProgrammeDialogOpen}>
        <DialogContent style={{
        backgroundColor: "hsl(32 100% 95%)"
      }}>
          <DialogHeader>
            <DialogTitle className="text-primary">Programme 2026-2032</DialogTitle>
            <DialogDescription className="pt-4 text-base text-foreground">
              Notre programme de mandat sera bientôt disponible ici. Merci pour votre patience.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </header>;
};
export default Header;