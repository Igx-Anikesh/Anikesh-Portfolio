document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.getElementById('portfolioWrapper');
    const container = document.getElementById('portfolioContainer');
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    
    let currentSlide = 0;
    let isScrolling = false;
    let hoverInterval = null;
    
    // Add loaded class to body for initial animation entry
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);

    /* -----------------------------------------
       1. Overrides Mapper (slidesData <- portfolioContent)
       ----------------------------------------- */
    function applyContentOverrides() {
        if (typeof slidesData === 'undefined' || typeof portfolioContent === 'undefined') {
            console.error("slidesData or portfolioContent is undefined!");
            return;
        }
        const c = portfolioContent;

        slidesData.forEach(slide => {
            const num = slide.slide_num;
            const elements = slide.elements;

            if (num === 1) {
                elements.forEach(el => {
                    if (el.type === 'image') {
                        el.image_file = c.slide1.image;
                    } else if (el.type === 'text' && el.paragraphs) {
                        el.paragraphs.forEach(p => {
                            p.runs.forEach(run => {
                                if (run && typeof run.text === 'string') {
                                    if (run.text.includes("My Portfolio")) run.text = c.slide1.title;
                                    if (run.text.includes("Lorem ipsum dolor sit")) run.text = c.slide1.description;
                                    if (run.text.includes("Explore Now")) run.text = c.slide1.exploreBtnText;
                                    if (run.text.includes("Play Video")) run.text = c.slide1.playBtnText;
                                }
                            });
                        });
                    }
                });
            }
            else if (num === 2) {
                let textIndex = 0;
                elements.forEach(el => {
                    if (el.type === 'image') {
                        el.image_file = c.slide2.image;
                    } else if (el.type === 'text' && el.paragraphs) {
                        el.paragraphs.forEach(p => {
                            p.runs.forEach(run => {
                                if (run && typeof run.text === 'string') {
                                    if (run.text.includes("Introduction")) run.text = c.slide2.title;
                                    else if (run.text.includes("Duis aute irure")) run.text = c.slide2.description;
                                    else if (run.text.includes("About Me") && run.size === 14.0) run.text = c.slide2.aboutMeTitle;
                                    else if (run.text.includes("About Portfolio") && run.size === 14.0) run.text = c.slide2.aboutPortfolioTitle;
                                    else if (run.text.includes("Lorem ipsum") && run.size === 12.0) {
                                        if (textIndex === 0) {
                                            run.text = c.slide2.aboutMeText;
                                            textIndex++;
                                        } else {
                                            run.text = c.slide2.aboutPortfolioText;
                                        }
                                    }
                                }
                            });
                        });
                    }
                });
            }
            else if (num === 3) {
                let imgIndex = 0;
                let textIndex = 0;
                elements.forEach(el => {
                    if (el.type === 'image' && c.slide3.images[imgIndex]) {
                        el.image_file = c.slide3.images[imgIndex++];
                    } else if (el.type === 'text' && el.paragraphs) {
                        el.paragraphs.forEach(p => {
                            p.runs.forEach(run => {
                                if (run && typeof run.text === 'string') {
                                    if (run.text.includes("About Me") && run.size === 60.0) run.text = c.slide3.title;
                                    else if (run.text.includes("My Vision") && run.size === 14.0) run.text = c.slide3.visionTitle;
                                    else if (run.text.includes("My Mission") && run.size === 14.0) run.text = c.slide3.missionTitle;
                                    else if (run.text.includes("Lorem ipsum") && run.size === 12.0) {
                                        if (textIndex === 0) {
                                            run.text = c.slide3.visionText;
                                            textIndex++;
                                        } else {
                                            run.text = c.slide3.missionText;
                                        }
                                    }
                                }
                            });
                        });
                    }
                });
            }
            else if (num === 4) {
                let textIndex = 0;
                elements.forEach(el => {
                    if (el.type === 'image') {
                        el.image_file = c.slide4.image;
                    } else if (el.type === 'text' && el.paragraphs) {
                        el.paragraphs.forEach(p => {
                            p.runs.forEach(run => {
                                if (run && typeof run.text === 'string') {
                                    if (run.text.includes("My Vision") && run.size === 60.0) run.text = c.slide4.title;
                                    else if (run.text.includes("velit") && run.size === 12.0) {
                                        if (textIndex === 0) {
                                            run.text = c.slide4.description;
                                        } else if (textIndex === 1) {
                                            run.text = c.slide4.point1;
                                        } else if (textIndex === 2) {
                                            run.text = c.slide4.point2;
                                        }
                                        textIndex++;
                                    }
                                }
                            });
                        });
                    }
                });
            }
            else if (num === 5) {
                let imgIndex = 0;
                let textIndex = 0;
                elements.forEach(el => {
                    if (el.type === 'image' && c.slide5.images[imgIndex]) {
                        el.image_file = c.slide5.images[imgIndex++];
                    } else if (el.type === 'text' && el.paragraphs) {
                        el.paragraphs.forEach(p => {
                            p.runs.forEach(run => {
                                if (run && typeof run.text === 'string') {
                                    if (run.text.includes("My Mission") && run.size === 60.0) run.text = c.slide5.title;
                                    else if (run.text.includes("laboris") && run.size === 12.0) {
                                        if (textIndex === 0) {
                                            run.text = c.slide5.description;
                                        } else if (textIndex === 1) {
                                            run.text = c.slide5.point1;
                                        } else if (textIndex === 2) {
                                            run.text = c.slide5.point2;
                                        } else if (textIndex === 3) {
                                            run.text = c.slide5.point3;
                                        } else if (textIndex === 4) {
                                            run.text = c.slide5.point4;
                                        }
                                        textIndex++;
                                    }
                                }
                            });
                        });
                    }
                });
            }
            else if (num === 6) {
                let textIndex = 0;
                elements.forEach(el => {
                    if (el.type === 'image') {
                        if (el.image_file && typeof el.image_file === 'string' && el.image_file.includes('14')) {
                            el.image_file = c.slide6.portfolio1Image;
                        } else {
                            el.image_file = c.slide6.portfolio2Image;
                        }
                    } else if (el.type === 'text' && el.paragraphs) {
                        el.paragraphs.forEach(p => {
                            p.runs.forEach(run => {
                                if (run && typeof run.text === 'string') {
                                    if (run.text.includes("My Favorite Portfolio")) run.text = c.slide6.title;
                                    else if (run.text.includes("Portfolio 01")) run.text = c.slide6.portfolio1Title;
                                    else if (run.text.includes("Portfolio 02")) run.text = c.slide6.portfolio2Title;
                                    else if (run.text.includes("Lorem ipsum") && run.size === 12.0) {
                                        if (textIndex === 0) {
                                            run.text = c.slide6.description;
                                        } else if (textIndex === 1) {
                                            run.text = c.slide6.portfolio1Text;
                                        } else if (textIndex === 2) {
                                            run.text = c.slide6.portfolio2Text;
                                        }
                                        textIndex++;
                                    }
                                }
                            });
                        });
                    }
                });
            }
            else if (num === 7) {
                let imgIndex = 0;
                let memberNameIndex = 0;
                let memberDescIndex = 0;
                elements.forEach(el => {
                    if (el.type === 'image' && c.slide7.members[imgIndex]) {
                        el.image_file = c.slide7.members[imgIndex++].image;
                    } else if (el.type === 'text' && el.paragraphs) {
                        el.paragraphs.forEach(p => {
                            p.runs.forEach(run => {
                                if (run && typeof run.text === 'string') {
                                    if (run.text.includes("Meet My Team")) {
                                        run.text = c.slide7.title;
                                    } else if (run.size === 14.0) {
                                        if (c.slide7.members[memberNameIndex]) {
                                            run.text = c.slide7.members[memberNameIndex++].name;
                                        }
                                    } else if (run.size === 12.0 && run.text.includes("Lorem ipsum")) {
                                        if (c.slide7.members[memberDescIndex]) {
                                            run.text = c.slide7.members[memberDescIndex++].description;
                                        }
                                    }
                                }
                            });
                        });
                    }
                });
            }
            else if (num === 8) {
                let imgIndex = 0;
                elements.forEach(el => {
                    if (el.type === 'image' && c.slide8.images[imgIndex]) {
                        el.image_file = c.slide8.images[imgIndex++];
                    } else if (el.type === 'text' && el.paragraphs) {
                        el.paragraphs.forEach(p => {
                            p.runs.forEach(run => {
                                if (run && typeof run.text === 'string') {
                                    if (run.text.includes("My Portfolio")) run.text = c.slide8.title;
                                    if (run.text.includes("Lorem ipsum")) run.text = c.slide8.description;
                                }
                            });
                        });
                    }
                });
            }
            else if (num === 9) {
                elements.forEach(el => {
                    if (el.type === 'image') {
                        el.image_file = c.slide9.image;
                    } else if (el.type === 'text' && el.paragraphs) {
                        el.paragraphs.forEach(p => {
                            p.runs.forEach(run => {
                                if (run && typeof run.text === 'string') {
                                    if (run.text.includes("My Contact")) run.text = c.slide9.title;
                                    else if (run.text.includes("Lorem ipsum")) run.text = c.slide9.description;
                                    else if (run.text.includes("+123")) run.text = c.slide9.phone;
                                    else if (run.text.includes("reallygreatsite.com") && !run.text.includes("hello")) run.text = c.slide9.website;
                                    else if (run.text.includes("hello")) run.text = c.slide9.email;
                                    else if (run.text.includes("Anywhere")) run.text = c.slide9.address;
                                }
                            });
                        });
                    }
                });
            }
            else if (num === 10) {
                let textIndex = 0;
                elements.forEach(el => {
                    if (el.type === 'image') {
                        el.image_file = c.slide10.image;
                    } else if (el.type === 'text' && el.paragraphs) {
                        el.paragraphs.forEach(p => {
                            p.runs.forEach(run => {
                                if (run && typeof run.text === 'string') {
                                    if (run.text.includes("Thank You")) run.text = c.slide10.title;
                                    else if (run.text.includes("Lorem ipsum") && run.size === 12.0) {
                                        if (textIndex === 0) {
                                            run.text = c.slide10.description1;
                                        } else {
                                            run.text = c.slide10.description2;
                                        }
                                        textIndex++;
                                    }
                                }
                            });
                        });
                    }
                });
            }
        });
    }

    /* -----------------------------------------
       2. Dynamic Desktop Slide HTML Generator
       ----------------------------------------- */
    function renderDesktopSlides() {
        if (typeof slidesData === 'undefined' || typeof portfolioContent === 'undefined') return;
        const c = portfolioContent;

        slidesData.forEach(slide => {
            const slideSection = document.getElementById(`slide-${slide.slide_num}`);
            if (!slideSection) return;
            
            const slideInner = slideSection.querySelector('.slide-inner');
            if (!slideInner) return;
            
            slideInner.innerHTML = ''; // Clear previous contents

            // Custom pixel-perfect layout for Slide 1
            if (slide.slide_num === 1) {
                const titleText = c.slide1.title.startsWith("My ") ? c.slide1.title.slice(3) : c.slide1.title;
                slideInner.innerHTML = `
                    <div class="slide1-desktop-layout">
                        <div class="slide1-col-left">
                            <img src="media/${c.slide1.image}" alt="Portrait" class="slide1-img-left">
                        </div>
                        <div class="slide1-col-mid"></div>
                        <div class="slide1-col-right">
                            <img src="media/${c.slide1.image}" alt="Background Portrait" class="slide1-img-bg">
                            <div class="slide1-overlay"></div>
                            
                            <div class="slide1-content">
                                <div class="slide1-title-container">
                                    <h1 class="slide1-title">
                                        <span class="slide1-title-my">
                                            ${c.slide1.subtitle ? c.slide1.title : 'My'}
                                            <span class="slide1-horizontal-line"></span>
                                        </span>
                                        <span class="slide1-title-portfolio" ${c.slide1.subtitle ? 'style="font-size: 0.35em; font-weight: 300; text-transform: uppercase; letter-spacing: 0.1em; line-height: 1.4; margin-top: 1.5rem;"' : ''}>
                                            ${c.slide1.subtitle ? c.slide1.subtitle : titleText}
                                        </span>
                                    </h1>
                                </div>
                                
                                <div class="slide1-btn-group">
                                    <a href="#slide-2" class="slide1-btn btn-explore">${c.slide1.exploreBtnText}</a>
                                    <button class="slide1-btn btn-play" id="slide1PlayBtn">
                                        <span class="play-icon">
                                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;color:currentColor;">
                                                <path d="M8 5v14l11-7z" fill="currentColor"/>
                                            </svg>
                                        </span>
                                        ${c.slide1.playBtnText}
                                    </button>
                                </div>
                            </div>
                            
                            <div class="slide1-vertical-text">
                                ${c.slide1.description}
                            </div>
                            
                            <div class="slide1-page-num">Page | 01</div>
                        </div>
                    </div>
                `;
                
                // Bind custom Slide 1 play video button
                const playBtn = slideInner.querySelector('#slide1PlayBtn');
                if (playBtn) {
                    playBtn.addEventListener('click', (e) => {
                        e.preventDefault();
                        openVideoModal();
                    });
                }
                return;
            }
            
            // Custom pixel-perfect layout for Slide 2
            if (slide.slide_num === 2) {
                slideInner.innerHTML = `
                    <div class="slide2-desktop-layout">
                        <div class="slide2-col-left">
                            <div class="slide2-header-container">
                                <h1 class="slide2-title">${c.slide2.title}</h1>
                                <div class="slide2-underline"></div>
                            </div>
                            <p class="slide2-desc">${c.slide2.description}</p>
                            <div class="slide2-columns">
                                <div class="slide2-col">
                                    <h3 class="slide2-col-title">${c.slide2.aboutMeTitle}</h3>
                                    <p class="slide2-col-text">${c.slide2.aboutMeText}</p>
                                </div>
                                <div class="slide2-col">
                                    <h3 class="slide2-col-title">${c.slide2.aboutPortfolioTitle}</h3>
                                    <p class="slide2-col-text">${c.slide2.aboutPortfolioText}</p>
                                </div>
                            </div>
                        </div>
                        <div class="slide2-col-right">
                            <div class="slide2-img-container">
                                <img src="media/${c.slide2.image}" alt="Intro Image" class="slide2-img">
                            </div>
                        </div>
                        <div class="slide2-page-num">Page | 02</div>
                    </div>
                `;

                // Bind hover state on custom image for Slide 2
                const img = slideInner.querySelector('.slide2-img');
                if (img) {
                    img.addEventListener('mouseenter', () => {
                        img.style.filter = 'grayscale(0%)';
                        img.style.transform = 'scale(1.03)';
                    });
                    img.addEventListener('mouseleave', () => {
                        img.style.filter = 'grayscale(100%)';
                        img.style.transform = 'scale(1)';
                    });
                }
                return;
            }
            
            // Custom pixel-perfect layout for Slide 3
            if (slide.slide_num === 3) {
                slideInner.innerHTML = `
                    <div class="slide3-desktop-layout">
                        <div class="slide3-top-gallery">
                            <div class="slide3-img-wrapper">
                                <img src="media/${c.slide3.images[2]}" alt="Gallery 1" class="slide3-img">
                            </div>
                            <div class="slide3-img-wrapper">
                                <img src="media/${c.slide3.images[1]}" alt="Gallery 2" class="slide3-img">
                            </div>
                            <div class="slide3-img-wrapper">
                                <img src="media/${c.slide3.images[0]}" alt="Gallery 3" class="slide3-img">
                            </div>
                        </div>
                        <div class="slide3-bottom-content">
                            <div class="slide3-col-left">
                                <h1 class="slide3-title">${c.slide3.title}</h1>
                                <div class="slide3-underline"></div>
                            </div>
                            <div class="slide3-col-mid">
                                <h3 class="slide3-sub-title">${c.slide3.visionTitle}</h3>
                                <p class="slide3-sub-desc">${c.slide3.visionText}</p>
                            </div>
                            <div class="slide3-col-right">
                                <h3 class="slide3-sub-title">${c.slide3.missionTitle}</h3>
                                <p class="slide3-sub-desc">${c.slide3.missionText}</p>
                            </div>
                        </div>
                        <div class="slide3-page-num">Page | 03</div>
                    </div>
                `;

                // Bind hover state on custom images for Slide 3
                const imgs = slideInner.querySelectorAll('.slide3-img');
                imgs.forEach(img => {
                    img.addEventListener('mouseenter', () => {
                        img.style.filter = 'grayscale(0%)';
                        img.style.transform = 'scale(1.03)';
                    });
                    img.addEventListener('mouseleave', () => {
                        img.style.filter = 'grayscale(100%)';
                        img.style.transform = 'scale(1)';
                    });
                });
                return;
            }
            
            // Custom pixel-perfect layout for Slide 4
            if (slide.slide_num === 4) {
                slideInner.innerHTML = `
                    <div class="slide4-desktop-layout">
                        <div class="slide4-collage-container">
                            <!-- Top banner block (binocular crop) -->
                            <div class="slide4-img-banner">
                                <img src="media/${c.slide4.image}" alt="Banner Binocular" class="slide4-img">
                            </div>
                            <!-- Left cropped block (binocular) -->
                            <div class="slide4-img-left-crop">
                                <img src="media/${c.slide4.image}" alt="Left Crop Binocular" class="slide4-img">
                            </div>
                            <!-- Pylon block -->
                            <div class="slide4-img-pylon">
                                <img src="media/image8.png" alt="Pylon" class="slide4-img">
                            </div>
                            <!-- Main binocular block -->
                            <div class="slide4-img-main">
                                <img src="media/${c.slide4.image}" alt="Main Binocular" class="slide4-img">
                            </div>
                        </div>
                        <div class="slide4-content-container">
                            <div class="slide4-header-container">
                                <h1 class="slide4-title">${c.slide4.title}</h1>
                                <div class="slide4-underline"></div>
                            </div>
                            
                            <div class="slide4-points-list">
                                <div class="slide4-point-item">
                                    <div class="slide4-point-num">01.</div>
                                    <p class="slide4-point-text">${c.slide4.point1}</p>
                                </div>
                                <div class="slide4-point-item">
                                    <div class="slide4-point-num">02.</div>
                                    <p class="slide4-point-text">${c.slide4.point2}</p>
                                </div>
                            </div>
                        </div>
                        <div class="slide4-page-num">Page | 04</div>
                    </div>
                `;

                // Bind hover state on custom images for Slide 4
                const s4imgs = slideInner.querySelectorAll('.slide4-img');
                s4imgs.forEach(img => {
                    img.addEventListener('mouseenter', () => {
                        img.style.filter = 'grayscale(0%)';
                        img.style.transform = 'scale(1.03)';
                    });
                    img.addEventListener('mouseleave', () => {
                        img.style.filter = 'grayscale(100%)';
                        img.style.transform = 'scale(1)';
                    });
                });
                return;
            }

            // Custom pixel-perfect layout for Slide 5
            if (slide.slide_num === 5) {
                slideInner.innerHTML = `
                    <div class="slide5-desktop-layout">
                        <div class="slide5-content-container">
                            <div class="slide5-header-container">
                                <h1 class="slide5-title">${c.slide5.title}</h1>
                                <div class="slide5-underline"></div>
                            </div>
                            
                            <div class="slide5-points-list">
                                <div class="slide5-point-item">
                                    <div class="slide5-point-num">01.</div>
                                    <p class="slide5-point-text">${c.slide5.description}</p>
                                </div>
                                <div class="slide5-point-item">
                                    <div class="slide5-point-num">02.</div>
                                    <p class="slide5-point-text">${c.slide5.point1}</p>
                                </div>
                                <div class="slide5-point-item">
                                    <div class="slide5-point-num">03.</div>
                                    <p class="slide5-point-text">${c.slide5.point2}</p>
                                </div>
                                <div class="slide5-point-item">
                                    <div class="slide5-point-num">04.</div>
                                    <p class="slide5-point-text">${c.slide5.point3}</p>
                                </div>
                            </div>
                        </div>
                        <div class="slide5-grid-container">
                            <div class="slide5-grid-item">
                                <img src="media/${c.slide5.images[0]}" alt="Mission 1" class="slide5-img">
                            </div>
                            <div class="slide5-grid-item">
                                <img src="media/${c.slide5.images[1]}" alt="Mission 2" class="slide5-img">
                            </div>
                            <div class="slide5-grid-item">
                                <img src="media/${c.slide5.images[2]}" alt="Mission 3" class="slide5-img">
                            </div>
                            <div class="slide5-grid-item">
                                <img src="media/${c.slide5.images[3]}" alt="Mission 4" class="slide5-img">
                            </div>
                        </div>
                        <div class="slide5-page-num">Page | 05</div>
                    </div>
                `;

                // Bind hover state on custom images for Slide 5
                const s5imgs = slideInner.querySelectorAll('.slide5-img');
                s5imgs.forEach(img => {
                    img.addEventListener('mouseenter', () => {
                        img.style.filter = 'grayscale(0%)';
                        img.style.transform = 'scale(1.03)';
                    });
                    img.addEventListener('mouseleave', () => {
                        img.style.filter = 'grayscale(100%)';
                        img.style.transform = 'scale(1)';
                    });
                });
                return;
            }

            // Custom pixel-perfect layout for Slide 6
            if (slide.slide_num === 6) {
                slideInner.innerHTML = `
                    <div class="slide6-desktop-layout">
                        <div class="slide6-header-container">
                            <h1 class="slide6-title">${c.slide6.title}</h1>
                            <div class="slide6-underline"></div>
                        </div>
                        
                        <div class="slide6-showcase-container">
                            <div class="slide6-col">
                                <div class="slide6-img-wrapper">
                                    <img src="media/${c.slide6.portfolio1Image}" alt="Portfolio 1" class="slide6-img">
                                </div>
                                <h3 class="slide6-col-title">${c.slide6.portfolio1Title}</h3>
                                <p class="slide6-col-text">${c.slide6.portfolio1Text}</p>
                            </div>
                            <div class="slide6-col">
                                <div class="slide6-img-wrapper">
                                    <img src="media/${c.slide6.portfolio2Image}" alt="Portfolio 2" class="slide6-img">
                                </div>
                                <h3 class="slide6-col-title">${c.slide6.portfolio2Title}</h3>
                                <p class="slide6-col-text">${c.slide6.portfolio2Text}</p>
                            </div>
                        </div>
                        <div class="slide6-page-num">Page | 06</div>
                    </div>
                `;

                // Bind hover state on custom images for Slide 6
                const s6imgs = slideInner.querySelectorAll('.slide6-img');
                s6imgs.forEach(img => {
                    img.addEventListener('mouseenter', () => {
                        img.style.filter = 'grayscale(0%)';
                        img.style.transform = 'scale(1.03)';
                    });
                    img.addEventListener('mouseleave', () => {
                        img.style.filter = 'grayscale(100%)';
                        img.style.transform = 'scale(1)';
                    });
                });
                return;
            }

            // Custom pixel-perfect layout for Slide 7
            if (slide.slide_num === 7) {
                slideInner.innerHTML = `
                    <div class="slide7-desktop-layout">
                        <div class="slide7-header-container">
                            <h1 class="slide7-title">${c.slide7.title}</h1>
                            <div class="slide7-underline"></div>
                        </div>
                        
                        <div class="slide7-team-container">
                            <!-- Column 1 (Brigitte - Lower) -->
                            <div class="slide7-col col-lower">
                                <div class="slide7-img-wrapper">
                                    <img src="media/${c.slide7.members[0].image}" alt="${c.slide7.members[0].name}" class="slide7-img">
                                </div>
                                <h3 class="slide7-member-name">${c.slide7.members[0].name}</h3>
                                <p class="slide7-member-desc">${c.slide7.members[0].description}</p>
                            </div>
                            <!-- Column 2 (Alfredo - Higher) -->
                            <div class="slide7-col col-higher">
                                <div class="slide7-img-wrapper">
                                    <img src="media/${c.slide7.members[1].image}" alt="${c.slide7.members[1].name}" class="slide7-img">
                                </div>
                                <h3 class="slide7-member-name">${c.slide7.members[1].name}</h3>
                                <p class="slide7-member-desc">${c.slide7.members[1].description}</p>
                            </div>
                            <!-- Column 3 (Adora - Lower) -->
                            <div class="slide7-col col-lower">
                                <div class="slide7-img-wrapper">
                                    <img src="media/${c.slide7.members[2].image}" alt="${c.slide7.members[2].name}" class="slide7-img">
                                </div>
                                <h3 class="slide7-member-name">${c.slide7.members[2].name}</h3>
                                <p class="slide7-member-desc">${c.slide7.members[2].description}</p>
                            </div>
                            <!-- Column 4 (Daniel - Higher) -->
                            <div class="slide7-col col-higher">
                                <div class="slide7-img-wrapper">
                                    <img src="media/${c.slide7.members[3].image}" alt="${c.slide7.members[3].name}" class="slide7-img">
                                </div>
                                <h3 class="slide7-member-name">${c.slide7.members[3].name}</h3>
                                <p class="slide7-member-desc">${c.slide7.members[3].description}</p>
                            </div>
                        </div>
                        <div class="slide7-page-num">Page | 07</div>
                    </div>
                `;

                // Bind hover state on custom images for Slide 7
                const s7imgs = slideInner.querySelectorAll('.slide7-img');
                s7imgs.forEach(img => {
                    img.addEventListener('mouseenter', () => {
                        img.style.filter = 'grayscale(0%)';
                        img.style.transform = 'scale(1.03)';
                    });
                    img.addEventListener('mouseleave', () => {
                        img.style.filter = 'grayscale(100%)';
                        img.style.transform = 'scale(1)';
                    });
                });
                return;
            }

            // Custom pixel-perfect layout for Slide 8
            if (slide.slide_num === 8) {
                slideInner.innerHTML = `
                    <div class="slide8-desktop-layout">
                        <div class="slide8-content-container">
                            <div class="slide8-header-container">
                                <h1 class="slide8-title">${c.slide8.title}</h1>
                                <div class="slide8-underline"></div>
                            </div>
                            <p class="slide8-desc">${c.slide8.description}</p>
                        </div>

                        <div class="slide8-collage-container">
                            <div class="slide8-img-col col-higher">
                                <div class="slide8-img-wrapper">
                                    <img src="media/${c.slide8.images[0]}" alt="Portfolio Highlight 1" class="slide8-img">
                                </div>
                            </div>
                            <div class="slide8-img-col col-lower">
                                <div class="slide8-img-wrapper">
                                    <img src="media/${c.slide8.images[1]}" alt="Portfolio Highlight 2" class="slide8-img">
                                </div>
                            </div>
                        </div>
                        <div class="slide8-page-num">Page | 08</div>
                    </div>
                `;

                // Bind hover state on custom images for Slide 8
                const s8imgs = slideInner.querySelectorAll('.slide8-img');
                s8imgs.forEach(img => {
                    img.addEventListener('mouseenter', () => {
                        img.style.filter = 'grayscale(0%)';
                        img.style.transform = 'scale(1.03)';
                    });
                    img.addEventListener('mouseleave', () => {
                        img.style.filter = 'grayscale(100%)';
                        img.style.transform = 'scale(1)';
                    });
                });
                return;
            }

            // Custom pixel-perfect layout for Slide 10
            if (slide.slide_num === 10) {
                slideInner.innerHTML = `
                    <div class="slide10-desktop-layout">
                        <div class="slide10-content-container">
                            <div class="slide10-header-container">
                                <h1 class="slide10-title">${c.slide10.title.toUpperCase()}</h1>
                                <div class="slide10-underline"></div>
                            </div>
                            <div class="slide10-text-container">
                                <p class="slide10-desc">${c.slide10.description1}</p>
                                <p class="slide10-desc">${c.slide10.description2}</p>
                            </div>
                        </div>
                        
                        <div class="slide10-img-container">
                            <img src="media/${c.slide10.image}" alt="Thank You Image" class="slide10-img">
                        </div>
                        <div class="slide10-page-num">Page | 10</div>
                    </div>
                `;

                // Bind hover state on custom image for Slide 10
                const img = slideInner.querySelector('.slide10-img');
                if (img) {
                    img.addEventListener('mouseenter', () => {
                        img.style.filter = 'grayscale(0%)';
                        img.style.transform = 'scale(1.03)';
                    });
                    img.addEventListener('mouseleave', () => {
                        img.style.filter = 'grayscale(100%)';
                        img.style.transform = 'scale(1)';
                    });
                }
                return;
            }
            
            slide.elements.forEach((el, index) => {
                // Skip rendering duplicate navigation bar header text from canvas elements
                if (el.type === 'text' && el.paragraphs && el.y_pct < 10) {
                    const isHeaderNavText = el.paragraphs.some(p => 
                        p.runs && p.runs.some(run => {
                            if (!run || typeof run.text !== 'string') return false;
                            const t = run.text.trim();
                            return t === "Adeline Palmerston" || t === "Anikesh" || t === "Home" || t === "Photo" || t === "About Me" || t === "Contact";
                        })
                    );
                    if (isHeaderNavText) return;
                }

                // Skip rendering misaligned menu indicator bars at top-left
                if (el.type === 'shape' && el.y_pct < 1.0 && el.x_pct < 1.0 && el.w_pct < 1.0) {
                    return;
                }

                const elDiv = document.createElement('div');
                elDiv.className = 'slide-element';
                
                // Position absolute percentages relative to inner container
                elDiv.style.left = `${el.x_pct}cqw`;
                elDiv.style.top = `${el.y_pct}cqh`;
                elDiv.style.width = `${el.w_pct}cqw`;
                elDiv.style.height = `${el.h_pct}cqh`;
                elDiv.style.position = 'absolute';
                elDiv.style.zIndex = index + 1;
                
                if (el.bg_color) {
                    elDiv.style.backgroundColor = el.bg_color;
                    elDiv.style.opacity = el.bg_opacity !== undefined ? el.bg_opacity : 1.0;
                }
                
                if (el.border) {
                    const borderW = el.border.width_px || 1;
                    const borderCol = el.border.color || '#ffffff';
                    
                    if (el.type === 'shape' && el.h_pct === 0) {
                        elDiv.style.height = '0';
                        elDiv.style.border = 'none';
                        elDiv.style.borderTop = `calc(${borderW} * 0.123cqh) solid ${borderCol}`;
                    } else if (el.type === 'shape' && el.w_pct === 0) {
                        elDiv.style.width = '0';
                        elDiv.style.border = 'none';
                        elDiv.style.borderLeft = `calc(${borderW} * 0.123cqh) solid ${borderCol}`;
                    } else {
                        elDiv.style.border = `calc(${borderW} * 0.123cqh) solid ${borderCol}`;
                    }
                }
                
                if (el.shadow) {
                    const sh = el.shadow;
                    elDiv.style.boxShadow = `${sh.dist_px}px ${sh.dist_px}px ${sh.blur_px}px rgba(0,0,0,${sh.opacity * 0.45})`;
                }
                
                if (el.type === 'image') {
                    const img = document.createElement('img');
                    img.className = 'element-img';
                    img.src = `media/${el.image_file}`;
                    img.alt = `Portfolio Image`;
                    img.style.width = '100%';
                    img.style.height = '100%';
                    img.style.objectFit = 'cover';
                    img.style.display = 'block';
                    img.style.filter = 'grayscale(100%)';
                    img.style.transition = 'filter 0.5s ease, transform 0.5s ease';
                    
                    elDiv.style.overflow = 'hidden';
                    img.addEventListener('mouseenter', () => {
                        img.style.filter = 'grayscale(0%)';
                        img.style.transform = 'scale(1.03)';
                    });
                    img.addEventListener('mouseleave', () => {
                        img.style.filter = 'grayscale(100%)';
                        img.style.transform = 'scale(1)';
                    });
                    
                    elDiv.appendChild(img);
                }
                else if (el.type === 'text' && el.paragraphs) {
                    elDiv.classList.add('text-element');
                    el.paragraphs.forEach(p => {
                        const pTag = document.createElement('p');
                        pTag.style.textAlign = p.align || 'left';
                        pTag.style.lineHeight = '1.3';
                        pTag.style.width = '100%';
                        
                        p.runs.forEach(run => {
                            const span = document.createElement('span');
                            span.textContent = (run && typeof run.text === 'string') ? run.text : '';
                            
                            if (run.size) {
                                span.style.fontSize = `calc(${run.size} * 0.123cqh)`;
                            }
                            if (run.bold) {
                                span.style.fontWeight = '700';
                            }
                            if (run.italic) {
                                span.style.fontStyle = 'italic';
                            }
                            if (run.color) {
                                span.style.color = run.color;
                            }
                            
                            span.style.fontFamily = "'Inter', sans-serif";
                            if (run.bold) span.style.fontWeight = '700';
                            
                            setupInteractiveText(span, elDiv, run.text);
                            pTag.appendChild(span);
                        });
                        elDiv.appendChild(pTag);
                    });
                }
                
                slideInner.appendChild(elDiv);
            });
        });
        
        bindInteractiveCursor();
    }

    /* -----------------------------------------
       3. Dynamic Mobile Slide HTML Generator
       ----------------------------------------- */
    function renderMobileSlides() {
        if (typeof portfolioContent === 'undefined') return;
        const c = portfolioContent;

        // Slide 1
        const s1 = document.querySelector('#slide-1 .mobile-inner');
        if (s1) {
            const mobileTitleHtml = c.slide1.subtitle 
                ? `${c.slide1.title}<span class="mobile-subtitle" style="display:block; font-size:0.5em; font-weight:300; margin-top:0.5rem; text-transform:uppercase; letter-spacing:0.05em; color:var(--gray-light);">${c.slide1.subtitle}</span>`
                : c.slide1.title;
            s1.innerHTML = `
                <div class="mobile-hero">
                    <img src="media/${c.slide1.image}" alt="Hero Image" class="mobile-hero-img">
                    <div class="mobile-content-box">
                        <h1 class="mobile-title" style="line-height:1.2;">${mobileTitleHtml}</h1>
                        <p class="mobile-text">${c.slide1.description}</p>
                        <div class="mobile-btn-group">
                            <a href="#slide-2" class="mobile-btn primary-btn" data-target="1">${c.slide1.exploreBtnText}</a>
                            <button class="mobile-btn secondary-btn play-video-btn">${c.slide1.playBtnText}</button>
                        </div>
                    </div>
                </div>
                <div class="mobile-page-num">Page | 01</div>
            `;
        }

        // Slide 2
        const s2 = document.querySelector('#slide-2 .mobile-inner');
        if (s2) {
            s2.innerHTML = `
                <div class="mobile-section-header">
                    <h2>${c.slide2.title}</h2>
                </div>
                <img src="media/${c.slide2.image}" alt="Intro Image" class="mobile-img-large">
                <div class="mobile-body-text">
                    <p>${c.slide2.description}</p>
                </div>
                <div class="mobile-columns">
                    <div class="mobile-col">
                        <h3>${c.slide2.aboutMeTitle}</h3>
                        <p>${c.slide2.aboutMeText}</p>
                    </div>
                    <div class="mobile-col">
                        <h3>${c.slide2.aboutPortfolioTitle}</h3>
                        <p>${c.slide2.aboutPortfolioText}</p>
                    </div>
                </div>
                <div class="mobile-page-num">Page | 02</div>
            `;
        }

        // Slide 3
        const s3 = document.querySelector('#slide-3 .mobile-inner');
        if (s3) {
            s3.innerHTML = `
                <div class="mobile-section-header">
                    <h2>${c.slide3.title}</h2>
                </div>
                <div class="mobile-gallery">
                    ${c.slide3.images.map(img => `<img src="media/${img}" alt="Gallery Image">`).join('')}
                </div>
                <div class="mobile-columns">
                    <div class="mobile-col">
                        <h3>${c.slide3.visionTitle}</h3>
                        <p>${c.slide3.visionText}</p>
                    </div>
                    <div class="mobile-col">
                        <h3>${c.slide3.missionTitle}</h3>
                        <p>${c.slide3.missionText}</p>
                    </div>
                </div>
                <div class="mobile-page-num">Page | 03</div>
            `;
        }

        // Slide 4
        const s4 = document.querySelector('#slide-4 .mobile-inner');
        if (s4) {
            s4.innerHTML = `
                <div class="mobile-section-header">
                    <h2>${c.slide4.title}</h2>
                </div>
                <div class="mobile-split-layout">
                    <div class="mobile-split-image">
                        <img src="media/${c.slide4.image}" alt="Vision Portrait" class="mobile-img-tall">
                    </div>
                    <div class="mobile-split-content">
                        <p class="intro-desc">${c.slide4.description}</p>
                        <div class="mobile-list-item">
                            <span class="list-num">01.</span>
                            <p>${c.slide4.point1}</p>
                        </div>
                        <div class="mobile-list-item">
                            <span class="list-num">02.</span>
                            <p>${c.slide4.point2}</p>
                        </div>
                    </div>
                </div>
                <div class="mobile-page-num">Page | 04</div>
            `;
        }

        // Slide 5
        const s5 = document.querySelector('#slide-5 .mobile-inner');
        if (s5) {
            s5.innerHTML = `
                <div class="mobile-section-header">
                    <h2>${c.slide5.title}</h2>
                </div>
                <div class="mobile-split-layout reverse">
                    <div class="mobile-split-image-grid">
                        ${c.slide5.images.map(img => `<img src="media/${img}" alt="Mission grid">`).join('')}
                    </div>
                    <div class="mobile-split-content">
                        <p class="intro-desc">${c.slide5.description}</p>
                        <div class="mobile-list-item">
                            <span class="list-num">01.</span>
                            <p>${c.slide5.point1}</p>
                        </div>
                        <div class="mobile-list-item">
                            <span class="list-num">02.</span>
                            <p>${c.slide5.point2}</p>
                        </div>
                        <div class="mobile-list-item">
                            <span class="list-num">03.</span>
                            <p>${c.slide5.point3}</p>
                        </div>
                        <div class="mobile-list-item">
                            <span class="list-num">04.</span>
                            <p>${c.slide5.point4}</p>
                        </div>
                    </div>
                </div>
                <div class="mobile-page-num">Page | 05</div>
            `;
        }

        // Slide 6
        const s6 = document.querySelector('#slide-6 .mobile-inner');
        if (s6) {
            s6.innerHTML = `
                <div class="mobile-section-header">
                    <h2>${c.slide6.title}</h2>
                </div>
                <div class="mobile-body-text">
                    <p>${c.slide6.description}</p>
                </div>
                <div class="mobile-portfolio-grid">
                    <div class="mobile-portfolio-item">
                        <img src="media/${c.slide6.portfolio1Image}" alt="Portfolio 1">
                        <h3>${c.slide6.portfolio1Title}</h3>
                        <p>${c.slide6.portfolio1Text}</p>
                    </div>
                    <div class="mobile-portfolio-item">
                        <img src="media/${c.slide6.portfolio2Image}" alt="Portfolio 2">
                        <h3>${c.slide6.portfolio2Title}</h3>
                        <p>${c.slide6.portfolio2Text}</p>
                    </div>
                </div>
                <div class="mobile-page-num">Page | 06</div>
            `;
        }

        // Slide 7
        const s7 = document.querySelector('#slide-7 .mobile-inner');
        if (s7) {
            s7.innerHTML = `
                <div class="mobile-section-header">
                    <h2>${c.slide7.title}</h2>
                </div>
                <div class="mobile-team-grid">
                    ${c.slide7.members.map(m => `
                        <div class="mobile-team-card">
                            <img src="media/${m.image}" alt="${m.name}">
                            <h4>${m.name}</h4>
                            <p>${m.description}</p>
                        </div>
                    `).join('')}
                </div>
                <div class="mobile-page-num">Page | 07</div>
            `;
        }

        // Slide 8
        const s8 = document.querySelector('#slide-8 .mobile-inner');
        if (s8) {
            s8.innerHTML = `
                <div class="mobile-section-header">
                    <h2>${c.slide8.title}</h2>
                </div>
                ${c.slide8.images.map(img => `<img src="media/${img}" alt="Highlight" class="mobile-img-large">`).join('')}
                <div class="mobile-body-text">
                    <p>${c.slide8.description}</p>
                </div>
                <div class="mobile-page-num">Page | 08</div>
            `;
        }

        // Slide 9
        const s9 = document.querySelector('#slide-9 .mobile-inner');
        if (s9) {
            s9.innerHTML = `
                <div class="mobile-section-header">
                    <h2>${c.slide9.title}</h2>
                </div>
                <img src="media/${c.slide9.image}" alt="Contact Page Image" class="mobile-img-large">
                <div class="mobile-body-text">
                    <p>${c.slide9.description}</p>
                </div>
                <div class="mobile-contact-list">
                    <a href="tel:${c.slide9.phone.replace(/[^0-9+]/g,'')}" class="mobile-contact-item" id="mobilePhoneLink">
                        <span class="contact-icon">📞</span>
                        <span class="contact-val">${c.slide9.phone}</span>
                    </a>
                    <a href="https://${c.slide9.website}" target="_blank" class="mobile-contact-item">
                        <span class="contact-icon">🌐</span>
                        <span class="contact-val">${c.slide9.website}</span>
                    </a>
                    <a href="mailto:${c.slide9.email}" class="mobile-contact-item">
                        <span class="contact-icon">✉️</span>
                        <span class="contact-val">${c.slide9.email}</span>
                    </a>
                    <a href="https://maps.google.com/?q=${encodeURIComponent(c.slide9.address)}" target="_blank" class="mobile-contact-item">
                        <span class="contact-icon">📍</span>
                        <span class="contact-val">${c.slide9.address}</span>
                    </a>
                </div>
                <div class="mobile-page-num">Page | 09</div>
            `;
        }

        // Slide 10
        const s10 = document.querySelector('#slide-10 .mobile-inner');
        if (s10) {
            s10.innerHTML = `
                <div class="mobile-hero">
                    <img src="media/${c.slide10.image}" alt="Thank you image" class="mobile-hero-img">
                    <div class="mobile-content-box">
                        <h2 class="mobile-thank-title">${c.slide10.title}</h2>
                        <p class="mobile-text">${c.slide10.description1}</p>
                        <p class="mobile-text">${c.slide10.description2}</p>
                        <a href="#slide-1" class="mobile-btn primary-btn btn-back-top" data-target="0">Back to Top</a>
                    </div>
                </div>
                <div class="mobile-page-num">Page | 10</div>
            `;
        }

        // Bind dynamic slide triggers in Mobile
        document.querySelectorAll('.mobile-inner [data-target]').forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                const targetIndex = parseInt(trigger.getAttribute('data-target'));
                scrollToSlide(targetIndex);
            });
        });

        const mobileBackToTop = document.querySelector('.mobile-inner .btn-back-top');
        if (mobileBackToTop) {
            mobileBackToTop.addEventListener('click', (e) => {
                e.preventDefault();
                scrollToSlide(0);
            });
        }
    }

    /* -----------------------------------------
       4. Event Listeners for Nav & Click Transitions
       ----------------------------------------- */
    function updateNavHighlight() {
        const navItems = document.querySelectorAll('.global-header .nav-item');
        if (navItems.length === 0) return;

        navItems.forEach(item => {
            item.style.opacity = '0.5';
            item.classList.remove('active');
        });

        if (currentSlide === 0 || currentSlide === 1) {
            navItems[0].style.opacity = '1';
            navItems[0].classList.add('active');
        } else if (currentSlide === 2 || currentSlide === 5 || currentSlide === 7) {
            navItems[1].style.opacity = '1';
            navItems[1].classList.add('active');
        } else if (currentSlide === 3 || currentSlide === 4 || currentSlide === 6) {
            navItems[2].style.opacity = '1';
            navItems[2].classList.add('active');
        } else if (currentSlide === 8 || currentSlide === 9) {
            navItems[3].style.opacity = '1';
            navItems[3].classList.add('active');
        }
    }

    /* -----------------------------------------
       5. Interactive Hotspot Text Setup
       ----------------------------------------- */
    function setupInteractiveText(span, elDiv, rawText) {
        if (typeof portfolioContent === 'undefined') return;
        if (!rawText || typeof rawText !== 'string') return;
        const text = rawText.trim();
        const y = parseFloat(elDiv.style.top);
        
        // Navigation bar click scroll triggers
        if (text === "Home" && y < 10) {
            elDiv.classList.add('clickable-nav-item');
            elDiv.addEventListener('click', (e) => {
                e.preventDefault();
                scrollToSlide(1);
            });
        } else if (text === "Photo" && y < 10) {
            elDiv.classList.add('clickable-nav-item');
            elDiv.addEventListener('click', (e) => {
                e.preventDefault();
                scrollToSlide(2);
            });
        } else if (text === "About Me" && y < 10) {
            elDiv.classList.add('clickable-nav-item');
            elDiv.addEventListener('click', (e) => {
                e.preventDefault();
                scrollToSlide(2);
            });
        } else if (text === "Contact" && y < 10) {
            elDiv.classList.add('clickable-nav-item');
            elDiv.addEventListener('click', (e) => {
                e.preventDefault();
                scrollToSlide(8);
            });
        } else if (text === "Adeline Palmerston" && y < 10) {
            elDiv.classList.add('clickable-nav-item');
            elDiv.addEventListener('click', (e) => {
                e.preventDefault();
                scrollToSlide(0);
            });
        } 
        // Slide 1 buttons
        else if (text === portfolioContent.slide1.exploreBtnText) {
            elDiv.classList.add('clickable-action-btn');
            elDiv.addEventListener('click', (e) => {
                e.preventDefault();
                scrollToSlide(1);
            });
        } else if (text === portfolioContent.slide1.playBtnText) {
            elDiv.classList.add('clickable-video-btn');
            elDiv.addEventListener('click', (e) => {
                e.preventDefault();
                openVideoModal();
            });
        }
        // Contact page elements (Slide 9)
        else if (text === portfolioContent.slide9.phone) {
            elDiv.classList.add('clickable-contact-link');
            elDiv.addEventListener('click', () => {
                window.location.href = `tel:${portfolioContent.slide9.phone.replace(/[^0-9+]/g,'')}`;
                showToast("Initiating phone dialer...");
            });
        } else if (text === portfolioContent.slide9.website) {
            elDiv.classList.add('clickable-contact-link');
            elDiv.addEventListener('click', () => {
                window.open(`https://${portfolioContent.slide9.website}`, '_blank');
                showToast("Redirecting to external website...");
            });
        } else if (text === portfolioContent.slide9.email) {
            elDiv.classList.add('clickable-contact-link');
            elDiv.addEventListener('click', () => {
                window.location.href = `mailto:${portfolioContent.slide9.email}`;
                showToast("Opening local email application...");
            });
        } else if (text === portfolioContent.slide9.address) {
            elDiv.classList.add('clickable-contact-link');
            elDiv.addEventListener('click', () => {
                window.open(`https://maps.google.com/?q=${encodeURIComponent(portfolioContent.slide9.address)}`, '_blank');
                showToast("Opening location in Google Maps...");
            });
        }
    }

    /* -----------------------------------------
       6. Desktop and Mobile Hybrid Scroll Core
       ----------------------------------------- */
    function scrollToSlide(index) {
        if (index < 0 || index >= totalSlides) return;
        currentSlide = index;
        
        wrapper.style.transform = `translateX(-${currentSlide * 100}vw)`;
        
        slides.forEach((slide, i) => {
            if (i === currentSlide) {
                slide.classList.add('active');
                const mobileInner = slide.querySelector('.mobile-inner');
                if (mobileInner) mobileInner.scrollTop = 0;
            } else {
                slide.classList.remove('active');
            }
        });
        
        // Hide global header on Slide 1 (index 0) and Slide 4 (index 3) to match PowerPoint layout
        const globalHeader = document.querySelector('.global-header');
        if (globalHeader) {
            const hasHeader = (index !== 0 && index !== 3);
            globalHeader.style.opacity = hasHeader ? '1' : '0';
            globalHeader.style.pointerEvents = hasHeader ? 'auto' : 'none';
        }
        
        const progressBar = document.getElementById('progressBar');
        if (progressBar) {
            progressBar.style.width = `${((currentSlide + 1) / totalSlides) * 100}%`;
        }
        
        updateNavHighlight();
    }

    window.addEventListener('wheel', (e) => {
        if (window.innerWidth >= 768) {
            e.preventDefault();
            if (isScrolling) return;

            if (Math.abs(e.deltaY) > 15 || Math.abs(e.deltaX) > 15) {
                isScrolling = true;
                if (e.deltaY > 0 || e.deltaX > 0) {
                    scrollToSlide(currentSlide + 1);
                } else {
                    scrollToSlide(currentSlide - 1);
                }
                setTimeout(() => { isScrolling = false; }, 850);
            }
        } else {
            const activeSlideInner = document.querySelector('.slide.active .mobile-inner');
            if (!activeSlideInner) return;

            // Handle horizontal trackpad scroll on mobile viewports
            if (Math.abs(e.deltaX) > 15 && Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
                e.preventDefault();
                if (isScrolling) return;
                isScrolling = true;
                if (e.deltaX > 0) {
                    scrollToSlide(currentSlide + 1);
                } else {
                    scrollToSlide(currentSlide - 1);
                }
                setTimeout(() => { isScrolling = false; }, 850);
                return;
            }

            const isAtTop = activeSlideInner.scrollTop === 0;
            const isAtBottom = activeSlideInner.scrollHeight - activeSlideInner.scrollTop <= activeSlideInner.clientHeight + 3;

            if (e.deltaY > 15 && isAtBottom) {
                e.preventDefault();
                if (isScrolling) return;
                isScrolling = true;
                scrollToSlide(currentSlide + 1);
                setTimeout(() => { isScrolling = false; }, 850);
            } else if (e.deltaY < -15 && isAtTop) {
                e.preventDefault();
                if (isScrolling) return;
                isScrolling = true;
                scrollToSlide(currentSlide - 1);
                setTimeout(() => { isScrolling = false; }, 850);
            }
        }
    }, { passive: false });

    // Prevent browser native anchor scroll from shifting the container
    container.addEventListener('scroll', () => {
        container.scrollLeft = 0;
        container.scrollTop = 0;
    });

    window.addEventListener('scroll', () => {
        if (window.scrollX !== 0 || window.scrollY !== 0) {
            window.scrollTo(0, 0);
        }
    });

    /* -----------------------------------------
       7. Desktop Edge Hover Autoscrolls
       ----------------------------------------- */
    const hoverLeft = document.getElementById('hoverLeft');
    const hoverRight = document.getElementById('hoverRight');

    hoverLeft.addEventListener('mouseenter', () => {
        if (window.innerWidth < 768) return;
        scrollToSlide(currentSlide - 1);
        hoverInterval = setInterval(() => {
            scrollToSlide(currentSlide - 1);
        }, 1200);
    });

    hoverLeft.addEventListener('mouseleave', () => {
        clearInterval(hoverInterval);
    });

    hoverRight.addEventListener('mouseenter', () => {
        if (window.innerWidth < 768) return;
        scrollToSlide(currentSlide + 1);
        hoverInterval = setInterval(() => {
            scrollToSlide(currentSlide + 1);
        }, 1200);
    });

    hoverRight.addEventListener('mouseleave', () => {
        clearInterval(hoverInterval);
    });

    /* -----------------------------------------
       8. Mobile Swipes Gesture Engine
       ----------------------------------------- */
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;

    window.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }, { passive: true });

    window.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        touchEndY = e.changedTouches[0].clientY;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const dx = touchEndX - touchStartX;
        const dy = touchEndY - touchStartY;
        const absDx = Math.abs(dx);
        const absDy = Math.abs(dy);

        if (absDx > 60 && absDx > absDy) {
            if (dx < 0) {
                scrollToSlide(currentSlide + 1);
            } else {
                scrollToSlide(currentSlide - 1);
            }
        } else if (absDy > 60 && absDy > absDx) {
            const activeSlideInner = document.querySelector('.slide.active .mobile-inner');
            if (!activeSlideInner) return;

            const isAtTop = activeSlideInner.scrollTop === 0;
            const isAtBottom = activeSlideInner.scrollHeight - activeSlideInner.scrollTop <= activeSlideInner.clientHeight + 5;

            if (dy < 0 && isAtBottom) {
                scrollToSlide(currentSlide + 1);
            } else if (dy > 0 && isAtTop) {
                scrollToSlide(currentSlide - 1);
            }
        }
    }

    /* -----------------------------------------
       9. Custom Cursor Coordinate Tracker
       ----------------------------------------- */
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.custom-cursor-follower');

    window.addEventListener('mousemove', (e) => {
        if (window.innerWidth >= 768) {
            cursor.style.display = 'block';
            follower.style.display = 'block';
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
            follower.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
        } else {
            cursor.style.display = 'none';
            follower.style.display = 'none';
        }
    });

    function bindInteractiveCursor() {
        const interactives = document.querySelectorAll('a, button, .clickable-nav-item, .clickable-action-btn, .clickable-video-btn, .clickable-contact-link, .mobile-contact-item');
        interactives.forEach(item => {
            item.addEventListener('mouseenter', () => document.body.classList.add('hovering-interactive'));
            item.addEventListener('mouseleave', () => document.body.classList.remove('hovering-interactive'));
        });
    }

    /* -----------------------------------------
       10. Video Modal Playback Controls
       ----------------------------------------- */
    const videoModal = document.getElementById('videoModal');
    const closeVideoModal = document.getElementById('closeVideoModal');
    const iframe = videoModal ? videoModal.querySelector('iframe') : null;
    const defaultIframeSrc = iframe ? iframe.src : '';

    function openVideoModal() {
        if (videoModal && iframe) {
            videoModal.classList.add('active');
            iframe.src = defaultIframeSrc + "&autoplay=1";
            showToast("Opening video presentation...");
        }
    }

    if (closeVideoModal) {
        closeVideoModal.addEventListener('click', () => closeModal());
    }

    const backdrop = document.querySelector('.video-modal-backdrop');
    if (backdrop) {
        backdrop.addEventListener('click', () => closeModal());
    }

    function closeModal() {
        if (videoModal && iframe) {
            videoModal.classList.remove('active');
            iframe.src = '';
        }
    }

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        } else if (e.key === 'ArrowRight' || e.key === 'PageDown') {
            if (window.innerWidth >= 768) scrollToSlide(currentSlide + 1);
        } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
            if (window.innerWidth >= 768) scrollToSlide(currentSlide - 1);
        }
    });

    /* -----------------------------------------
       11. Toast Notifications Feedback
       ----------------------------------------- */
    function showToast(message) {
        const toast = document.getElementById('toastNotification');
        if (toast) {
            const toastMsg = toast.querySelector('.toast-message');
            if (toastMsg) toastMsg.textContent = message;
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }
    }

    // Run dynamic merge and rendering sequence
    applyContentOverrides();
    renderDesktopSlides();
    renderMobileSlides();
    
    // Hash routing handler
    function handleHashChange() {
        const hash = window.location.hash;
        if (hash.startsWith('#slide-')) {
            const slideNum = parseInt(hash.replace('#slide-', ''));
            if (!isNaN(slideNum) && slideNum >= 1 && slideNum <= totalSlides) {
                scrollToSlide(slideNum - 1);
            }
        }
    }

    // Toggle Fullscreen Overlay Menu
    const menuToggle = document.getElementById('menuToggle');
    const overlayMenu = document.getElementById('overlayMenu');
    const overlayItems = document.querySelectorAll('.overlay-item');
    const globalHeaderWrapper = document.querySelector('.global-header');

    if (menuToggle && overlayMenu) {
        menuToggle.addEventListener('click', () => {
            const isOpen = overlayMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
            if (globalHeaderWrapper) globalHeaderWrapper.classList.toggle('menu-open');
        });

        overlayItems.forEach(item => {
            item.addEventListener('click', () => {
                overlayMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                if (globalHeaderWrapper) globalHeaderWrapper.classList.remove('menu-open');
            });
        });
    }

    // Bind hashchange listener
    window.addEventListener('hashchange', handleHashChange);

    // Initial check for hash on page load, fallback to slide 0
    if (window.location.hash) {
        handleHashChange();
    } else {
        scrollToSlide(0);
    }
});
