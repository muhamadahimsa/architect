document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(CustomEase);
  CustomEase.create(
    "hop",
    "M0,0 C0.071,0.505 0.192,0.726 0.318,0.852 0.45,0.984 0.504,1 1,1"
  );

  const sliderImages = document.querySelector(".slider-images");
  const counter = document.querySelector(".counter");
  const titles = document.querySelector(".slider-title-wrapper");
  const indicators = document.querySelectorAll(".slider-indicators p");
  const prevSlides = document.querySelectorAll(".slider-preview .preview");
  const sliderPreview = document.querySelector(".slider-preview");

  let currentImg = 1;
  const totalSlides = 6;
  let indicatorRotation = 0;

  const updateCounterAndTitlePosition = () => {
    const counterY = -20 * (currentImg - 1);
    const titleY = -60 * (currentImg - 1);

    gsap.to(counter, {
      y: counterY,
      duration: 1,
      ease: "hop",
    });

    gsap.to(titles, {
      y: titleY,
      duration: 1,
      ease: "hop",
    });
  };

  const updateActiveSlidePreview = () => {
    prevSlides.forEach((prev) => prev.classList.remove("active"));
    prevSlides[currentImg - 1].classList.add("active");
  };

  const animateSlide = (direction) => {
    const currentSlide =
      document.querySelectorAll(".img")[
        document.querySelectorAll(".img").length - 1
      ];

    const slideImg = document.createElement("div");
    slideImg.classList.add("img");

    const slideImgElem = document.createElement("img");
    slideImgElem.src = `./Images/hero/img${currentImg}.jpg`;
    gsap.set(slideImgElem, { x: direction === "left" ? -300 : 300 });

    slideImg.appendChild(slideImgElem);
    sliderImages.appendChild(slideImg);

    gsap.to(currentSlide.querySelector("img"), {
      x: direction === "left" ? 300 : -300,
      duration: 1.5,
      ease: "power4.out",
    });

    gsap.fromTo(
      slideImg,
      {
        clipPath:
          direction === "left"
            ? "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"
            : "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
      },
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1.5,
        ease: "power4.out",
      }
    );

    gsap.to(slideImgElem, {
      x: 0,
      duration: 1.5,
      ease: "power4.out",
    });

    cleanupSlides();

    indicatorRotation += direction === "left" ? -90 : 90;
    gsap.to(indicators, {
      rotate: indicatorRotation,
      duration: 1,
      ease: "hop",
    });
  };

  document.addEventListener("click", (event) => {
    const sliderWidth = document.querySelector(".slider").clientWidth;
    const clickPosition = event.clientX;

    if (sliderPreview.contains(event.target)) {
      const clickedPrev = event.target.closest(".preview");

      if (clickedPrev) {
        const clickedIndex = Array.from(prevSlides).indexOf(clickedPrev) + 1;

        if (clickedIndex !== currentImg) {
          if (clickedIndex < currentImg) {
            currentImg = clickedIndex;
            animateSlide("left");
          } else {
            currentImg = clickedIndex;
            animateSlide("right");
          }
          updateActiveSlidePreview();
          updateCounterAndTitlePosition();
        }
      }
      return;
    }

    if (clickPosition < sliderWidth / 2 && currentImg !== 1) {
      currentImg--;
      animateSlide("left");
    } else if (clickPosition > sliderWidth / 2 && currentImg !== totalSlides) {
      currentImg++;
      animateSlide("right");
    }

    updateActiveSlidePreview();
    updateCounterAndTitlePosition();
  });

  const cleanupSlides = () => {
    const imgElements = document.querySelectorAll(".slider-images .img");
    if (imgElements.length > totalSlides) {
      imgElements[0].remove();
    }
  };
});

const overlay = document.querySelector(".info");
const closeBtn = document.querySelector(".close-btn");

const tl = gsap.timeline({ paused: true, overwrite: "auto" });
gsap.set('.overflow p, .info-page-link', { y: '100%' });

tl.to(overlay, {
  duration: .75,
  display: "block",
  backdropFilter: "blur(20px)",
  ease: "power3.inOut",
});

tl.to('.info-wrapper', {
  duration: .1,
  display: "flex",
  ease: "power3.inOut",
});

tl.to('.overflow p, .info-page-link', {
  y: '0%',
  duration: 1,
  stagger: 0.05,
  ease: 'power3.inOut',
});

const open = document.querySelector(".nav-info");
open.addEventListener("click", function () {
  tl.play();
});

closeBtn.addEventListener("click", () => {
  tl.reverse();
});


// Hover nav
open.addEventListener('mouseenter', () => {
  gsap.to('.nav-btn-overlay', {
    duration: .5,
    width: '100%',
    ease: "power3.inOut",
  });

  gsap.to('.open-btn', {
    duration: .7,
    color: '#000',
  })

  gsap.to('.cursor', {
    scale: 0,
    duration: .75,
    ease: 'power3.out',
  })
})

open.addEventListener('mouseleave', () => {
  gsap.to('.nav-btn-overlay', {
    duration: .5,
    width: '0%',
    ease: "power3.inOut",
  });

  gsap.to('.open-btn', {
    duration: .7,
    color: '#fff',
  });

  gsap.to('.cursor', {
    scale: 1,
    duration: .75,
    ease: 'power3.out',
  })
});

// Hover Info
const infoPages = document.querySelectorAll('.info-page-link');
const infoPagesOverlay = document.querySelectorAll('.info-page-overlay');
const infoPagesLinks = document.querySelectorAll('.info-page-link a');

infoPages.forEach((link, index) => {
  link.addEventListener('mouseenter', () => {
    gsap.to(infoPagesOverlay[index], {
      duration: .5,
      width: '100%',
      ease: "power3.inOut",
    });
  
    gsap.to(infoPagesLinks[index], {
      duration: .7,
      color: '#fff',
    })
  })
})

infoPages.forEach((link, index) => {
  link.addEventListener('mouseleave', () => {
    gsap.to(infoPagesOverlay[index], {
      duration: .5,
      width: '0%',
      ease: "power3.inOut",
    });
  
    gsap.to(infoPagesLinks[index], {
      duration: .7,
      color: '#000',
    })
  })
})

// Hover Image
const dockContainer = document.querySelector(".slider-preview");
const dockItems = document.querySelectorAll(".preview");

const defaultItemScale = 1;
const hoverItemScale = 2;
const neighborItemScale = 1.5;

const defaultMargin = "0";
const expandedMargin = "1.5vw";

// const updateDockItems = () => {
//   dockItems.forEach((item, index) => {
//     let scale = defaultItemScale;
//     let margin = defaultMargin;

//     if (item.isHovered) {
//       scale = hoverItemScale;
//       margin = expandedMargin;
//     } else if (item.isNeighbor) {
//       scale = neighborItemScale;
//       margin = expandedMargin;
//     }

//     item.style.transform = `scale(${scale})`;
//     item.style.margin = `0 ${margin}`;
//   });
// };

// dockItems.forEach((item) => {
//   item.addEventListener("mousemove", () => {
//     dockItems.forEach((otherItem) => {
//       otherItem.isHovered = otherItem === item;
//       otherItem.isNeighbor =
//         Math.abs(
//           Array.from(dockItems).indexOf(otherItem) -
//             Array.from(dockItems).indexOf(item)
//         ) === 1;
//     });

//     updateDockItems();
//   });
// });

// dockContainer.addEventListener("mouseleave", () => {
//   dockItems.forEach((item) => {
//     item.isHovered = item.isNeighbor = false;
//   });

//   updateDockItems();
// });


// Intro
const tlIntro = gsap.timeline({ paused: false, overwrite: "auto" });

gsap.set('.slider-title-wrapper > div h1, .slider-counter div p, .preview, nav > div p', { y: '200%' });

tlIntro.to('.slider-images', {
  duration: 1.5,
  ease: 'power3.inOut',
  clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
});

tlIntro.to('.slider-title-wrapper > div h1', {
  y: '0%',
  duration: 1,
  ease: 'power3.inOut',
  stagger: 0.15,
});

gsap.to('nav > div p', {
  y: '0%',
  duration: 1,
  ease: 'power3.inOut',
  stagger: 0.15,
  delay: 1,
});

gsap.to('.slider-counter div p', {
  y: '0%',
  duration: 1,
  ease: 'power3.inOut',
  stagger: 0.05,
  delay: 2,
});

tlIntro.to('.preview', {
  y: '0%',
  duration: 1,
  ease: 'power3.inOut',
  stagger: 0.05,
})

// Cursor
const cursor = document.querySelector('.cursor');
const cursorText = cursor.querySelector('p');

const cursorWidth = cursor.offsetWidth / 2;
const cursorHeight = cursor.offsetHeight / 2;

let currentSlide = 1;
const totalSlides = 6;

const updateCursorClass = (xPosition) => {
  const halfPageWidth = window.innerWidth / 2;
  if (xPosition > halfPageWidth) {
    if (currentSlide = totalSlides) {
      cursorText.textContent = 'Next';
      // cursorText.classList.add('ph-caret-circle-right');
      cursor.style.display = 'flex';
    } else {
      cursor.style.display = 'none';
    }
  } else {
    if (currentSlide > 1) {
      cursorText.textContent = 'Prev';
      // cursorText.classList.add('ph-caret-circle-left');
      cursor.style.display = 'flex';
    } else {
      cursor.style.display = 'none';
    }
  }
}

document.addEventListener('mousemove', (e) => {
  gsap.to(cursor, {
    x: e.clientX - cursorWidth,
    y: e.clientY - cursorHeight,
    duration: 1,
    opacity: 1,
    ease: 'power3.out',
  });

  updateCursorClass(e.clientX);
});

document.querySelector('.slider-preview').addEventListener('mouseenter', () => {
  gsap.to('.cursor', {
    scale: 0,
    duration: .75,
    ease: 'power3.out',
  })
});

document.querySelector('.slider-preview').addEventListener('mouseleave', () => {
  gsap.to('.cursor', {
    scale: 1,
    duration: .75,
    ease: 'power3.out',
  })
})