"use client";

import React, { useState, useEffect, useRef } from "react";
import { portfolioContent } from "../data/portfolioContent";

// HoverableImage handles visual grayscale transitions and custom cursor callbacks
interface HoverableImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

const HoverableImage: React.FC<HoverableImageProps> = ({ src, alt, style, className, ...props }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <img
      src={src}
      alt={alt}
      onMouseEnter={() => {
        setHovered(true);
        document.body.classList.add("hovering-interactive");
      }}
      onMouseLeave={() => {
        setHovered(false);
        document.body.classList.remove("hovering-interactive");
      }}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block",
        filter: hovered ? "grayscale(0%)" : "grayscale(100%)",
        transform: hovered ? "scale(1.03)" : "scale(1)",
        transition: "filter 0.5s ease, transform 0.5s ease",
        ...style,
      }}
      className={className}
      {...props}
    />
  );
};

const slideOrder = [1, 2, 7, 4, 5, 3, 8, 6, 9, 10];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [toastText, setToastText] = useState("");
  const [toastShow, setToastShow] = useState(false);

  const isScrollingRef = useRef(false);
  const currentSlideRef = useRef(0);
  const hoverIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const touchStartXRef = useRef(0);
  const touchStartYRef = useRef(0);





  // Sync state with ref to avoid stale closures in event listeners
  useEffect(() => {
    currentSlideRef.current = currentSlide;
  }, [currentSlide]);

  // Entry animation class
  useEffect(() => {
    const timer = setTimeout(() => {
      document.body.classList.add("loaded");
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Toast notification trigger
  const triggerToast = (message: string) => {
    setToastText(message);
    setToastShow(true);
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    toastTimeoutRef.current = setTimeout(() => {
      setToastShow(false);
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
      if (hoverIntervalRef.current) clearInterval(hoverIntervalRef.current);
    };
  }, []);

  // Custom Cursor Coordinate Tracker
  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth >= 768 && cursor && follower) {
        cursor.style.display = "block";
        follower.style.display = "block";
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
        follower.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
      } else if (cursor && follower) {
        cursor.style.display = "none";
        follower.style.display = "none";
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Scroll logic wheel listener
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (window.innerWidth >= 768) {
        e.preventDefault();
        if (isScrollingRef.current) return;

        if (Math.abs(e.deltaY) > 3 || Math.abs(e.deltaX) > 3) {
          isScrollingRef.current = true;
          if (e.deltaY > 0 || e.deltaX > 0) {
            setCurrentSlide(prev => Math.min(prev + 1, 9));
          } else {
            setCurrentSlide(prev => Math.max(prev - 1, 0));
          }
          setTimeout(() => {
            isScrollingRef.current = false;
          }, 1250);
        }
      } else {
        const activeSlideInner = document.querySelector(".slide.active .mobile-inner") as HTMLElement;
        if (!activeSlideInner) return;

        if (Math.abs(e.deltaX) > 3 && Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
          e.preventDefault();
          if (isScrollingRef.current) return;
          isScrollingRef.current = true;
          if (e.deltaX > 0) {
            setCurrentSlide(prev => Math.min(prev + 1, 9));
          } else {
            setCurrentSlide(prev => Math.max(prev - 1, 0));
          }
          setTimeout(() => {
            isScrollingRef.current = false;
          }, 1250);
          return;
        }

        const isAtTop = activeSlideInner.scrollTop === 0;
        const isAtBottom = activeSlideInner.scrollHeight - activeSlideInner.scrollTop <= activeSlideInner.clientHeight + 3;

        if (e.deltaY > 3 && isAtBottom) {
          e.preventDefault();
          if (isScrollingRef.current) return;
          isScrollingRef.current = true;
          setCurrentSlide(prev => Math.min(prev + 1, 9));
          setTimeout(() => {
            isScrollingRef.current = false;
          }, 1250);
        } else if (e.deltaY < -3 && isAtTop) {
          e.preventDefault();
          if (isScrollingRef.current) return;
          isScrollingRef.current = true;
          setCurrentSlide(prev => Math.max(prev - 1, 0));
          setTimeout(() => {
            isScrollingRef.current = false;
          }, 1250);
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  // Keyboard navigation & Esc to close video modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setVideoModalOpen(false);
      } else if (e.key === "ArrowRight" || e.key === "PageDown") {
        if (window.innerWidth >= 768) {
          setCurrentSlide(prev => Math.min(prev + 1, 9));
        }
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        if (window.innerWidth >= 768) {
          setCurrentSlide(prev => Math.max(prev - 1, 0));
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Touch Swipe engine with passive: false check to prevent native mobile cancellations
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartXRef.current = e.touches[0].clientX;
      touchStartYRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touchMoveX = e.touches[0].clientX;
      const touchMoveY = e.touches[0].clientY;

      const dx = touchMoveX - touchStartXRef.current;
      const dy = touchMoveY - touchStartYRef.current;
      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);

      // If the touch started inside the mobile gallery, let it scroll horizontally natively
      const isInsideGallery = (e.target as HTMLElement)?.closest(".mobile-gallery");
      if (isInsideGallery) {
        return;
      }

      // Prevent native horizontal operations (back/forward navigation swipe, horizontal scroll)
      if (absDx > absDy && absDx > 8) {
        if (e.cancelable) e.preventDefault();
        return;
      }

      // Prevent native vertical pull-to-refresh and page bounce at top/bottom of scroll bounds
      if (absDy > absDx && absDy > 8) {
        const activeSlideInner = document.querySelector(".slide.active .mobile-inner") as HTMLElement;
        if (activeSlideInner) {
          const isAtTop = activeSlideInner.scrollTop === 0;
          const isAtBottom = activeSlideInner.scrollHeight - activeSlideInner.scrollTop <= activeSlideInner.clientHeight + 3;
          if ((dy > 0 && isAtTop) || (dy < 0 && isAtBottom)) {
            if (e.cancelable) e.preventDefault();
          }
        }
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;

      const dx = touchEndX - touchStartXRef.current;
      const dy = touchEndY - touchStartYRef.current;
      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);

      // If the gesture was inside the mobile gallery, ignore slide changes for horizontal swipes
      const isInsideGallery = (e.target as HTMLElement)?.closest(".mobile-gallery");

      if (absDx > 60 && absDx > absDy) {
        if (isInsideGallery) return;

        if (dx < 0) {
          setCurrentSlide(prev => Math.min(prev + 1, 9));
        } else {
          setCurrentSlide(prev => Math.max(prev - 1, 0));
        }
      } else if (absDy > 60 && absDy > absDx) {
        const activeSlideInner = document.querySelector(".slide.active .mobile-inner") as HTMLElement;
        if (!activeSlideInner) return;

        const isAtTop = activeSlideInner.scrollTop === 0;
        const isAtBottom = activeSlideInner.scrollHeight - activeSlideInner.scrollTop <= activeSlideInner.clientHeight + 5;

        if (dy < 0 && isAtBottom) {
          setCurrentSlide(prev => Math.min(prev + 1, 9));
        } else if (dy > 0 && isAtTop) {
          setCurrentSlide(prev => Math.max(prev - 1, 0));
        }
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("touchcancel", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("touchcancel", handleTouchEnd);
    };
  }, []);



  // Hash route change listener
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith("#slide-")) {
        const slideNum = parseInt(hash.replace("#slide-", ""));
        if (!isNaN(slideNum)) {
          const targetIndex = slideOrder.indexOf(slideNum);
          if (targetIndex !== -1) {
            setCurrentSlide(targetIndex);
          }
        }
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  // Autoscroll triggers on desktop edge hovers
  const handleLeftHoverEnter = () => {
    if (window.innerWidth < 768) return;
    setCurrentSlide(prev => Math.max(prev - 1, 0));
    hoverIntervalRef.current = setInterval(() => {
      setCurrentSlide(prev => Math.max(prev - 1, 0));
    }, 1200);
  };

  const handleLeftHoverLeave = () => {
    if (hoverIntervalRef.current) clearInterval(hoverIntervalRef.current);
  };

  const handleRightHoverEnter = () => {
    if (window.innerWidth < 768) return;
    setCurrentSlide(prev => Math.min(prev + 1, 9));
    hoverIntervalRef.current = setInterval(() => {
      setCurrentSlide(prev => Math.min(prev + 1, 9));
    }, 1200);
  };

  const handleRightHoverLeave = () => {
    if (hoverIntervalRef.current) clearInterval(hoverIntervalRef.current);
  };

  const handleMouseEnter = () => {
    document.body.classList.add("hovering-interactive");
  };

  const handleMouseLeave = () => {
    document.body.classList.remove("hovering-interactive");
  };

  // Header display parameters
  const isHeaderVisible = currentSlide !== 0 && currentSlide !== 3;

  // Video modal source
  const defaultIframeSrc = "https://player.vimeo.com/video/335805561?color=ffffff&title=0&byline=0&portrait=0";
  const iframeSrc = videoModalOpen ? `${defaultIframeSrc}&autoplay=1` : "";

  return (
    <>
      {/* Custom Cursor */}
      <div className="custom-cursor" ref={cursorRef}></div>
      <div className="custom-cursor-follower" ref={followerRef}></div>

      {/* Progress Indicator */}
      <div className="portfolio-progress">
        <div 
          className="progress-bar" 
          id="progressBar"
          style={{ width: `${((currentSlide + 1) / 10) * 100}%` }}
        ></div>
      </div>

      {/* Sticky Global Header */}
      <header 
        className={`global-header ${menuOpen ? "menu-open" : ""}`}
        style={{
          opacity: isHeaderVisible ? 1 : 0,
          pointerEvents: isHeaderVisible ? "auto" : "none",
          transition: "opacity 0.4s ease-in-out",
        }}
      >
        <a 
          href="#slide-1" 
          className="logo" 
          onClick={(e) => {
            e.preventDefault();
            setCurrentSlide(0);
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Anikesh
        </a>
        <div className="nav-container">
          <nav className="nav-links">
            <a 
              href="#slide-2" 
              className={`nav-item ${(currentSlide === 0 || currentSlide === 1) ? "active" : ""}`}
              style={{ opacity: (currentSlide === 0 || currentSlide === 1) ? 1 : 0.5 }}
              onClick={(e) => {
                e.preventDefault();
                setCurrentSlide(1);
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Home
            </a>
            <a 
              href="#slide-8" 
              className={`nav-item ${(currentSlide === 5 || currentSlide === 6 || currentSlide === 7) ? "active" : ""}`}
              style={{ opacity: (currentSlide === 5 || currentSlide === 6 || currentSlide === 7) ? 1 : 0.5 }}
              onClick={(e) => {
                e.preventDefault();
                setCurrentSlide(6);
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Photo
            </a>
            <a 
              href="#slide-7" 
              className={`nav-item ${(currentSlide === 2 || currentSlide === 3 || currentSlide === 4) ? "active" : ""}`}
              style={{ opacity: (currentSlide === 2 || currentSlide === 3 || currentSlide === 4) ? 1 : 0.5 }}
              onClick={(e) => {
                e.preventDefault();
                setCurrentSlide(2);
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              About Me
            </a>
            <a 
              href="#slide-9" 
              className={`nav-item ${(currentSlide === 8 || currentSlide === 9) ? "active" : ""}`}
              style={{ opacity: (currentSlide === 8 || currentSlide === 9) ? 1 : 0.5 }}
              onClick={(e) => {
                e.preventDefault();
                setCurrentSlide(8);
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Contact
            </a>
          </nav>
          <div 
            className={`menu-toggle ${menuOpen ? "active" : ""}`} 
            id="menuToggle" 
            aria-label="Toggle Menu" 
            role="button"
            onClick={() => setMenuOpen(!menuOpen)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </div>
      </header>

      {/* Fullscreen Overlay Navigation Menu */}
      <div className={`overlay-menu ${menuOpen ? "active" : ""}`} id="overlayMenu">
        <nav className="overlay-nav">
          {[
            { num: "01", title: "Home", target: 0, hash: "#slide-1" },
            { num: "02", title: "Introduction", target: 1, hash: "#slide-2" },
            { num: "03", title: "About Me", target: 2, hash: "#slide-7" },
            { num: "04", title: "Vision", target: 3, hash: "#slide-4" },
            { num: "05", title: "Projects", target: 5, hash: "#slide-3" },
            { num: "06", title: "Skills", target: 4, hash: "#slide-5" },
            { num: "07", title: "Contact", target: 8, hash: "#slide-9" },
            { num: "08", title: "Download Resume", target: -1, hash: "/resume.pdf" }
          ].map((item, idx) => (
            <a 
              key={idx}
              href={item.hash} 
              className="overlay-item" 
              onClick={(e) => {
                if (item.target !== -1) {
                  e.preventDefault();
                  setCurrentSlide(item.target);
                  setMenuOpen(false);
                } else {
                  setMenuOpen(false);
                }
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              {...(item.target === -1 ? { download: true, target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              <span className="num">{item.num}</span>
              <span className="title">{item.title}</span>
            </a>
          ))}
        </nav>
      </div>

      {/* Edge Scroll Hover Zones (Desktop) */}
      <div 
        className="hover-scroll-zone hover-scroll-left" 
        id="hoverLeft"
        onMouseEnter={handleLeftHoverEnter}
        onMouseLeave={handleLeftHoverLeave}
      >
        <div className="hover-chevron"></div>
      </div>
      <div 
        className="hover-scroll-zone hover-scroll-right" 
        id="hoverRight"
        onMouseEnter={handleRightHoverEnter}
        onMouseLeave={handleRightHoverLeave}
      >
        <div className="hover-chevron"></div>
      </div>

      {/* Main Scroll Container */}
      <div className="portfolio-container" id="portfolioContainer">
        <div 
          className="portfolio-wrapper" 
          id="portfolioWrapper"
          style={{ transform: `translateX(-${currentSlide * 100}vw)` }}
        >
          {/* SLIDE 1 (Hero) */}
          <section className={`slide ${currentSlide === 0 ? "active" : ""}`} id="slide-1" data-index="0">
            <div className="slide-inner">
              <div className="slide1-desktop-layout">
                <div className="slide1-col-left">
                  <HoverableImage src={`/media/${portfolioContent.slide1.image}`} alt="Portrait" className="slide1-img-left" />
                </div>
                <div className="slide1-col-mid"></div>
                <div className="slide1-col-right">
                  <HoverableImage src={`/media/${portfolioContent.slide1.image}`} alt="Background Portrait" className="slide1-img-bg" />
                  <div className="slide1-overlay"></div>
                  
                  <div className="slide1-content">
                    <div className="slide1-title-container">
                      <h1 className="slide1-title">
                        <span className="slide1-title-my">
                          {portfolioContent.slide1.title}
                          <span className="slide1-horizontal-line"></span>
                        </span>
                        <span 
                          className="slide1-title-portfolio" 
                          style={portfolioContent.slide1.subtitle ? {
                            fontSize: "0.35em",
                            fontWeight: 300,
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                            lineHeight: 1.4,
                            marginTop: "1.5rem",
                          } : undefined}
                          dangerouslySetInnerHTML={{ __html: portfolioContent.slide1.subtitle || "" }}
                        >
                        </span>
                      </h1>
                    </div>
                    
                    <div className="slide1-btn-group">
                      <button 
                        className="slide1-btn btn-explore"
                        onClick={() => {
                          setCurrentSlide(1);
                        }}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      >
                        {portfolioContent.slide1.exploreBtnText}
                      </button>
                      <button 
                        className="slide1-btn btn-play" 
                        onClick={(e) => {
                          e.preventDefault();
                          setVideoModalOpen(true);
                          triggerToast("Opening video presentation...");
                        }}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      >
                        <span className="play-icon">
                          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", color: "currentColor" }}>
                            <path d="M8 5v14l11-7z" fill="currentColor"/>
                          </svg>
                        </span>
                        {portfolioContent.slide1.playBtnText}
                      </button>
                    </div>
                  </div>
                  
                  <div className="slide1-vertical-text">
                    {portfolioContent.slide1.description}
                  </div>
                  
                  <div className="slide1-page-num">Page | 01</div>
                </div>
              </div>
            </div>
            <div className="mobile-inner mobile-inner-hero">
              <div className="mobile-hero">
                <img src={`/media/${portfolioContent.slide1.image}`} alt="Hero Image" className="mobile-hero-img" />
                <div className="mobile-content-box">
                  <h1 className="mobile-title" style={{ lineHeight: 1.2 }}>
                    {portfolioContent.slide1.title}
                    <span className="mobile-subtitle" style={{ display: "block", fontSize: "0.5em", fontWeight: 300, marginTop: "0.5rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--gray-light)" }} dangerouslySetInnerHTML={{ __html: portfolioContent.slide1.subtitle || "" }}></span>
                  </h1>
                  <p className="mobile-text">{portfolioContent.slide1.description}</p>
                  <div className="mobile-btn-group">
                    <button 
                      className="mobile-btn primary-btn" 
                      onClick={() => {
                        setCurrentSlide(1);
                      }}
                    >
                      {portfolioContent.slide1.exploreBtnText}
                    </button>
                    <button 
                      className="mobile-btn secondary-btn play-video-btn"
                      onClick={() => {
                        setVideoModalOpen(true);
                        triggerToast("Opening video presentation...");
                      }}
                    >
                      {portfolioContent.slide1.playBtnText}
                    </button>
                  </div>
                </div>
              </div>
              <div className="mobile-page-num">Page | 01</div>
            </div>
          </section>

          {/* SLIDE 2 (Introduction) */}
          <section className={`slide ${currentSlide === 1 ? "active" : ""}`} id="slide-2" data-index="1">
            <div className="slide-inner">
              <div className="slide2-desktop-layout">
                <div className="slide2-col-left">
                  <div className="slide2-header-container">
                    <h1 className="slide2-title">{portfolioContent.slide2.title}</h1>
                    <div className="slide2-underline"></div>
                  </div>
                  <p className="slide2-desc" dangerouslySetInnerHTML={{ __html: portfolioContent.slide2.description }}></p>
                </div>
                <div className="slide2-col-right">
                  <div className="slide2-img-container">
                    <HoverableImage src={`/media/${portfolioContent.slide2.image}`} alt="Intro Image" className="slide2-img" />
                  </div>
                </div>
                <div className="slide2-page-num">Page | 02</div>
              </div>
            </div>
            <div className="mobile-inner">
              <div className="mobile-section-header">
                <h2>{portfolioContent.slide2.title}</h2>
              </div>
              <img src={`/media/${portfolioContent.slide2.image}`} alt="Intro Image" className="mobile-img-large" />
              <div className="mobile-body-text">
                <p dangerouslySetInnerHTML={{ __html: portfolioContent.slide2.description }}></p>
              </div>
              <div className="mobile-page-num">Page | 02</div>
            </div>
          </section>

          {/* SLIDE 7 (About Me) */}
          <section className={`slide ${currentSlide === 2 ? "active" : ""}`} id="slide-7" data-index="2">
            <div className="slide-inner">
              <div className="slide3-desktop-layout">
                <div className="slide3-top-gallery">
                  <div className="slide3-img-wrapper">
                    <HoverableImage src={`/media/${portfolioContent.slide7.images[2]}`} alt="Gallery 1" className="slide3-img" />
                  </div>
                  <div className="slide3-img-wrapper">
                    <HoverableImage src={`/media/${portfolioContent.slide7.images[1]}`} alt="Gallery 2" className="slide3-img" />
                  </div>
                  <div className="slide3-img-wrapper">
                    <HoverableImage src={`/media/${portfolioContent.slide7.images[0]}`} alt="Gallery 3" className="slide3-img" />
                  </div>
                </div>
                <div className="slide3-bottom-content">
                  <div className="slide3-col-left">
                    <h1 className="slide3-title">{portfolioContent.slide7.title}</h1>
                    <div className="slide3-underline"></div>
                  </div>
                  <div className="slide3-col-mid">
                    <h3 className="slide3-sub-title">{portfolioContent.slide7.visionTitle}</h3>
                    <p className="slide3-sub-desc">{portfolioContent.slide7.visionText}</p>
                  </div>
                  <div className="slide3-col-right">
                    <h3 className="slide3-sub-title">{portfolioContent.slide7.missionTitle}</h3>
                    <p className="slide3-sub-desc">{portfolioContent.slide7.missionText}</p>
                  </div>
                </div>
                <div className="slide3-page-num">Page | 03</div>
              </div>
            </div>
            <div className="mobile-inner">
              <div className="mobile-section-header">
                <h2>{portfolioContent.slide7.title}</h2>
              </div>
              <div className="mobile-gallery">
                {portfolioContent.slide7.images.map((img, idx) => (
                  <img key={idx} src={`/media/${img}`} alt="Gallery Image" />
                ))}
              </div>
              <div className="mobile-columns">
                <div className="mobile-col">
                  <h3>{portfolioContent.slide7.visionTitle}</h3>
                  <p>{portfolioContent.slide7.visionText}</p>
                </div>
                <div className="mobile-col">
                  <h3>{portfolioContent.slide7.missionTitle}</h3>
                  <p>{portfolioContent.slide7.missionText}</p>
                </div>
              </div>
              <div className="mobile-page-num">Page | 03</div>
            </div>
          </section>

          {/* SLIDE 4 (My Vision) */}
          <section className={`slide ${currentSlide === 3 ? "active" : ""}`} id="slide-4" data-index="3">
            <div className="slide-inner">
              <div className="slide4-desktop-layout">
                <div className="slide4-collage-container">
                  <div className="slide4-img-banner">
                    <HoverableImage src={`/media/${portfolioContent.slide4.image}`} alt="Banner Binocular" className="slide4-img" />
                  </div>
                  <div className="slide4-img-left-crop">
                    <HoverableImage src={`/media/${portfolioContent.slide4.image}`} alt="Left Crop Binocular" className="slide4-img" />
                  </div>
                  <div className="slide4-img-pylon">
                    <HoverableImage src="/media/image8.png" alt="Pylon" className="slide4-img" />
                  </div>
                  <div className="slide4-img-main">
                    <HoverableImage src={`/media/${portfolioContent.slide4.image}`} alt="Main Binocular" className="slide4-img" />
                  </div>
                </div>
                <div className="slide4-content-container">
                  <div className="slide4-header-container">
                    <h1 className="slide4-title">{portfolioContent.slide4.title}</h1>
                    <div className="slide4-underline"></div>
                  </div>
                  <div className="slide4-points-list">
                    <div className="slide4-point-item">
                      <div className="slide4-point-num">01.</div>
                      <p className="slide4-point-text">{portfolioContent.slide4.point1}</p>
                    </div>
                    <div className="slide4-point-item">
                      <div className="slide4-point-num">02.</div>
                      <p className="slide4-point-text">{portfolioContent.slide4.point2}</p>
                    </div>
                  </div>
                </div>
                <div className="slide4-page-num">Page | 04</div>
              </div>
            </div>
            <div className="mobile-inner">
              <div className="mobile-section-header">
                <h2>{portfolioContent.slide4.title}</h2>
              </div>
              <div className="mobile-split-layout">
                <div className="mobile-split-image">
                  <img src={`/media/${portfolioContent.slide4.image}`} alt="Vision Portrait" className="mobile-img-tall" />
                </div>
                <div className="mobile-split-content">
                  <p className="intro-desc">{portfolioContent.slide4.description}</p>
                  <div className="mobile-list-item">
                    <span className="list-num">01.</span>
                    <p>{portfolioContent.slide4.point1}</p>
                  </div>
                  <div className="mobile-list-item">
                    <span className="list-num">02.</span>
                    <p>{portfolioContent.slide4.point2}</p>
                  </div>
                </div>
              </div>
              <div className="mobile-page-num">Page | 04</div>
            </div>
          </section>

          {/* SLIDE 5 (My Mission) */}
          <section className={`slide ${currentSlide === 4 ? "active" : ""}`} id="slide-5" data-index="4">
            <div className="slide-inner">
              <div className="slide5-desktop-layout">
                <div className="slide5-content-container">
                  <div className="slide5-header-container">
                    <h1 className="slide5-title">{portfolioContent.slide5.title}</h1>
                    <div className="slide5-underline"></div>
                  </div>
                  <div className="slide5-points-list">
                    <div className="slide5-point-item">
                      <div className="slide5-point-num">01.</div>
                      <p className="slide5-point-text">{portfolioContent.slide5.description}</p>
                    </div>
                    <div className="slide5-point-item">
                      <div className="slide5-point-num">02.</div>
                      <p className="slide5-point-text">{portfolioContent.slide5.point1}</p>
                    </div>
                    <div className="slide5-point-item">
                      <div className="slide5-point-num">03.</div>
                      <p className="slide5-point-text">{portfolioContent.slide5.point2}</p>
                    </div>
                    <div className="slide5-point-item">
                      <div className="slide5-point-num">04.</div>
                      <p className="slide5-point-text">{portfolioContent.slide5.point3}</p>
                    </div>
                  </div>
                </div>
                <div className="slide5-grid-container">
                  {portfolioContent.slide5.images.map((img, idx) => (
                    <div key={idx} className="slide5-grid-item">
                      <HoverableImage src={`/media/${img}`} alt={`Mission ${idx + 1}`} className="slide5-img" />
                    </div>
                  ))}
                </div>
                <div className="slide5-page-num">Page | 05</div>
              </div>
            </div>
            <div className="mobile-inner">
              <div className="mobile-section-header">
                <h2>{portfolioContent.slide5.title}</h2>
              </div>
              <div className="mobile-split-layout reverse">
                <div className="mobile-split-image-grid">
                  {portfolioContent.slide5.images.map((img, idx) => (
                    <img key={idx} src={`/media/${img}`} alt="Mission grid" />
                  ))}
                </div>
                <div className="mobile-split-content">
                  <p className="intro-desc">{portfolioContent.slide5.description}</p>
                  <div className="mobile-list-item">
                    <span className="list-num">01.</span>
                    <p>{portfolioContent.slide5.point1}</p>
                  </div>
                  <div className="mobile-list-item">
                    <span className="list-num">02.</span>
                    <p>{portfolioContent.slide5.point2}</p>
                  </div>
                  <div className="mobile-list-item">
                    <span className="list-num">03.</span>
                    <p>{portfolioContent.slide5.point3}</p>
                  </div>
                  <div className="mobile-list-item">
                    <span className="list-num">04.</span>
                    <p>{portfolioContent.slide5.point4}</p>
                  </div>
                </div>
              </div>
              <div className="mobile-page-num">Page | 05</div>
            </div>
          </section>

          {/* SLIDE 3 (Highlighted Projects) */}
          <section className={`slide ${currentSlide === 5 ? "active" : ""}`} id="slide-3" data-index="5">
            <div className="slide-inner">
              <div className="slide7-desktop-layout">
                <div className="slide7-header-container">
                  <h1 className="slide7-title">{portfolioContent.slide3.title}</h1>
                  <div className="slide7-underline"></div>
                </div>
                
                <div className="slide7-team-container">
                  {portfolioContent.slide3.projects.map((project, idx) => (
                    <div key={idx} className={`slide7-col ${idx % 2 === 0 ? "col-lower" : "col-higher"}`}>
                      <div className="slide7-img-wrapper">
                        <HoverableImage src={`/media/${project.image}`} alt={project.name} className="slide7-img" />
                      </div>
                      <h3 className="slide7-member-name">{project.name}</h3>
                      <p className="slide7-member-desc">{project.description}</p>
                    </div>
                  ))}
                </div>
                <div className="slide7-page-num">Page | 06</div>
              </div>
            </div>
            <div className="mobile-inner">
              <div className="mobile-section-header">
                <h2>{portfolioContent.slide3.title}</h2>
              </div>
              <div className="mobile-team-grid">
                {portfolioContent.slide3.projects.map((project, idx) => (
                  <div key={idx} className="mobile-team-card">
                    <img src={`/media/${project.image}`} alt={project.name} />
                    <h4>{project.name}</h4>
                    <p>{project.description}</p>
                  </div>
                ))}
              </div>
              <div className="mobile-page-num">Page | 06</div>
            </div>
          </section>

          {/* SLIDE 8 (Portfolio Highlights) */}
          <section className={`slide ${currentSlide === 6 ? "active" : ""}`} id="slide-8" data-index="6">
            <div className="slide-inner">
              <div className="slide8-desktop-layout">
                <div className="slide8-content-container">
                  <div className="slide8-header-container">
                    <h1 className="slide8-title">{portfolioContent.slide8.title}</h1>
                    <div className="slide8-underline"></div>
                  </div>
                  <p className="slide8-desc">{portfolioContent.slide8.description}</p>
                </div>

                <div className="slide8-collage-container">
                  <div className="slide8-img-col col-higher">
                    <div className="slide8-img-wrapper">
                      <HoverableImage src={`/media/${portfolioContent.slide8.images[0]}`} alt="Portfolio Highlight 1" className="slide8-img" />
                    </div>
                  </div>
                  <div className="slide8-img-col col-lower">
                    <div className="slide8-img-wrapper">
                      <HoverableImage src={`/media/${portfolioContent.slide8.images[1]}`} alt="Portfolio Highlight 2" className="slide8-img" />
                    </div>
                  </div>
                </div>
                <div className="slide8-page-num">Page | 07</div>
              </div>
            </div>
            <div className="mobile-inner">
              <div className="mobile-section-header">
                <h2>{portfolioContent.slide8.title}</h2>
              </div>
              {portfolioContent.slide8.images.map((img, idx) => (
                <img key={idx} src={`/media/${img}`} alt="Highlight" className="mobile-img-large" />
              ))}
              <div className="mobile-body-text">
                <p>{portfolioContent.slide8.description}</p>
              </div>
              <div className="mobile-page-num">Page | 07</div>
            </div>
          </section>

          {/* SLIDE 6 (My Favorite Portfolio) */}
          <section className={`slide ${currentSlide === 7 ? "active" : ""}`} id="slide-6" data-index="7">
            <div className="slide-inner">
              <div className="slide6-desktop-layout">
                <div className="slide6-header-container">
                  <h1 className="slide6-title">{portfolioContent.slide6.title}</h1>
                  <div className="slide6-underline"></div>
                </div>
                
                <div className="slide6-showcase-container">
                  <div className="slide6-col">
                    <div className="slide6-img-wrapper">
                      <HoverableImage src={`/media/${portfolioContent.slide6.portfolio1Image}`} alt="Portfolio 1" className="slide6-img" />
                    </div>
                    <h3 className="slide6-col-title">{portfolioContent.slide6.portfolio1Title}</h3>
                    <p className="slide6-col-text">{portfolioContent.slide6.portfolio1Text}</p>
                  </div>
                  <div className="slide6-col">
                    <div className="slide6-img-wrapper">
                      <HoverableImage src={`/media/${portfolioContent.slide6.portfolio2Image}`} alt="Portfolio 2" className="slide6-img" />
                    </div>
                    <h3 className="slide6-col-title">{portfolioContent.slide6.portfolio2Title}</h3>
                    <p className="slide6-col-text">{portfolioContent.slide6.portfolio2Text}</p>
                  </div>
                </div>
                <div className="slide6-page-num">Page | 08</div>
              </div>
            </div>
            <div className="mobile-inner">
              <div className="mobile-section-header">
                <h2>{portfolioContent.slide6.title}</h2>
              </div>
              <div className="mobile-body-text">
                <p>{portfolioContent.slide6.description}</p>
              </div>
              <div className="mobile-portfolio-grid">
                <div className="mobile-portfolio-item">
                  <img src={`/media/${portfolioContent.slide6.portfolio1Image}`} alt="Portfolio 1" />
                  <h3>{portfolioContent.slide6.portfolio1Title}</h3>
                  <p>{portfolioContent.slide6.portfolio1Text}</p>
                </div>
                <div className="mobile-portfolio-item">
                  <img src={`/media/${portfolioContent.slide6.portfolio2Image}`} alt="Portfolio 2" />
                  <h3>{portfolioContent.slide6.portfolio2Title}</h3>
                  <p>{portfolioContent.slide6.portfolio2Text}</p>
                </div>
              </div>
              <div className="mobile-page-num">Page | 08</div>
            </div>
          </section>

          {/* SLIDE 9 (My Contact) */}
          <section className={`slide ${currentSlide === 8 ? "active" : ""}`} id="slide-9" data-index="8">
            <div className="slide-inner">
              <div className="slide9-desktop-layout">
                <div className="slide9-col-left">
                  <HoverableImage src={`/media/${portfolioContent.slide9.image}`} alt="Contact Image" className="slide9-img" />
                </div>
                <div className="slide9-col-right">
                  <div className="slide9-content-container">
                    <div className="slide9-header-container">
                      <h1 className="slide9-title">{portfolioContent.slide9.title}</h1>
                      <div className="slide9-underline"></div>
                    </div>
                    <p className="slide9-desc">{portfolioContent.slide9.description}</p>
                    <div className="slide9-contact-list">
                      <div 
                        className="slide9-contact-item" 
                        onClick={() => {
                          window.location.href = `tel:${portfolioContent.slide9.phone.replace(/[^0-9+]/g,"")}`;
                          triggerToast("Initiating phone dialer...");
                        }}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      >
                        <img src="/media/image24.svg" alt="Phone Icon" className="slide9-contact-icon" />
                        <span className="slide9-contact-text">{portfolioContent.slide9.phone}</span>
                      </div>
                      <div 
                        className="slide9-contact-item" 
                        onClick={() => {
                          window.open(`https://${portfolioContent.slide9.website}`, "_blank");
                          triggerToast("Redirecting to external website...");
                        }}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      >
                        <img src="/media/image26.svg" alt="Website Icon" className="slide9-contact-icon" />
                        <span className="slide9-contact-text">{portfolioContent.slide9.website}</span>
                      </div>
                      <div 
                        className="slide9-contact-item" 
                        onClick={() => {
                          window.location.href = `mailto:${portfolioContent.slide9.email}`;
                          triggerToast("Opening local email application...");
                        }}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      >
                        <img src="/media/image28.svg" alt="Email Icon" className="slide9-contact-icon" />
                        <span className="slide9-contact-text">{portfolioContent.slide9.email}</span>
                      </div>
                      <div 
                        className="slide9-contact-item" 
                        onClick={() => {
                          window.open(`https://maps.google.com/?q=${encodeURIComponent(portfolioContent.slide9.address)}`, "_blank");
                          triggerToast("Opening location in Google Maps...");
                        }}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      >
                        <img src="/media/image30.svg" alt="Location Icon" className="slide9-contact-icon" />
                        <span className="slide9-contact-text">{portfolioContent.slide9.address}</span>
                      </div>
                    </div>
                  </div>
                  <div className="slide9-page-num">Page | 09</div>
                </div>
              </div>
            </div>
            <div className="mobile-inner">
              <div className="mobile-section-header">
                <h2>{portfolioContent.slide9.title}</h2>
              </div>
              <img src={`/media/${portfolioContent.slide9.image}`} alt="Contact Page Image" className="mobile-img-large" />
              <div className="mobile-body-text">
                <p>{portfolioContent.slide9.description}</p>
              </div>
              <div className="mobile-contact-list">
                <a href={`tel:${portfolioContent.slide9.phone.replace(/[^0-9+]/g,"")}`} className="mobile-contact-item">
                  <span className="contact-icon">📞</span>
                  <span className="contact-val">{portfolioContent.slide9.phone}</span>
                </a>
                <a href={`https://${portfolioContent.slide9.website}`} target="_blank" className="mobile-contact-item">
                  <span className="contact-icon">🌐</span>
                  <span className="contact-val">{portfolioContent.slide9.website}</span>
                </a>
                <a href={`mailto:${portfolioContent.slide9.email}`} className="mobile-contact-item">
                  <span className="contact-icon">✉️</span>
                  <span className="contact-val">{portfolioContent.slide9.email}</span>
                </a>
                <a href={`https://maps.google.com/?q=${encodeURIComponent(portfolioContent.slide9.address)}`} target="_blank" className="mobile-contact-item">
                  <span className="contact-icon">📍</span>
                  <span className="contact-val">{portfolioContent.slide9.address}</span>
                </a>
              </div>
              <div className="mobile-page-num">Page | 09</div>
            </div>
          </section>

          {/* SLIDE 10 (Thank You) */}
          <section className={`slide ${currentSlide === 9 ? "active" : ""}`} id="slide-10" data-index="9">
            <div className="slide-inner">
              <div className="slide10-desktop-layout">
                <div className="slide10-content-container">
                  <div className="slide10-header-container">
                    <h1 className="slide10-title">{portfolioContent.slide10.title.toUpperCase()}</h1>
                    <div className="slide10-underline"></div>
                  </div>
                  <div className="slide10-text-container">
                    <p className="slide10-desc">{portfolioContent.slide10.description1}</p>
                    <p className="slide10-desc">{portfolioContent.slide10.description2}</p>
                  </div>
                </div>
                
                <div className="slide10-img-container">
                  <HoverableImage src={`/media/${portfolioContent.slide10.image}`} alt="Thank You Image" className="slide10-img" />
                </div>
                <div className="slide10-page-num">Page | 10</div>
              </div>
            </div>
            <div className="mobile-inner">
              <div className="mobile-hero">
                <img src={`/media/${portfolioContent.slide10.image}`} alt="Thank you image" className="mobile-hero-img" />
                <div className="mobile-content-box">
                  <h2 className="mobile-thank-title">{portfolioContent.slide10.title}</h2>
                  <p className="mobile-text">{portfolioContent.slide10.description1}</p>
                  <p className="mobile-text">{portfolioContent.slide10.description2}</p>
                  <a 
                    href="#slide-1" 
                    className="mobile-btn primary-btn btn-back-top" 
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentSlide(0);
                    }}
                  >
                    Back to Top
                  </a>
                </div>
              </div>
              <div className="mobile-page-num">Page | 10</div>
            </div>
          </section>
        </div>
      </div>

      {/* Video Modal Player */}
      <div className={`video-modal ${videoModalOpen ? "active" : ""}`} id="videoModal">
        <div className="video-modal-backdrop" onClick={() => setVideoModalOpen(false)}></div>
        <div className="video-modal-content">
          <button 
            className="video-modal-close" 
            id="closeVideoModal" 
            aria-label="Close Modal"
            onClick={() => setVideoModalOpen(false)}
          >
            &times;
          </button>
          <div className="video-wrapper">
            {videoModalOpen && (
              <iframe 
                src={iframeSrc} 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                allow="autoplay; fullscreen; picture-in-picture" 
                allowFullScreen
              ></iframe>
            )}
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <div className={`toast ${toastShow ? "show" : ""}`} id="toastNotification">
        <span className="toast-message">{toastText}</span>
      </div>
    </>
  );
}
