gsap.registerPlugin(ScrollTrigger);
let lenis;

const goToTop = document.querySelector(".top");

const initLenis = () => {
  lenis = new Lenis({
    smoothWheel: true,
    smoothTouch: true,
  });

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  lenis.scrollTo(0, { immediate: true });
  initScrollTrigger();
};

const initScrollTrigger = () => {
  const images = document.querySelectorAll(".client-hero-image img, .footer-img img");

  gsap.utils.toArray(images).forEach((image) => {
    gsap.set(image, { scale: 1.2 });

    const imageRect = image.getBoundingClientRect();
    const heightDifference =
      imageRect.height - image.parentElement.offsetHeight;

    gsap.fromTo(
      image,
      {
        y: -heightDifference,
      },
      {
        scrollTrigger: {
          trigger: image,
          start: "top center+=30%",
          end: "bottom+=10% top",
          scrub: true,
        },
        y: heightDifference,
        ease: "none",
      }
    );
  });
};

const addEventListeners = () => {
  goToTop.addEventListener("click", (e) => {
    e.preventDefault();

    lenis.scrollTo(0, { lerp: 0.05 });
  });
};

document.addEventListener("DOMContentLoaded", function () {
  function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  const rows = document.querySelectorAll(".scroll");
  rows.forEach((row) => {
    if (isInViewport(row)) {
      const img = row.querySelector(".img-container img");
      if (row.querySelector(".left")) {
        gsap.to(img, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        });
      } else {
        gsap.to(img, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        });
      }
    }
  });

  gsap.utils.toArray(".img-container.right img").forEach((img) => {
    gsap.to(img, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      scrollTrigger: {
        trigger: img,
        start: "top 75%",
        end: "bottom 70%",
        scrub: true,
      },
    });
  });

  gsap.utils.toArray(".img-container.left img").forEach((img) => {
    gsap.to(img, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      scrollTrigger: {
        trigger: img,
        start: "top 75%",
        end: "bottom 70%",
        scrub: true,
      },
    });
  });

  gsap.utils.toArray(".img-container p").forEach((text) => {
    gsap.from(text, {
      opacity: 0,
      y: 20,
      scrollTrigger: {
        trigger: text,
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
    });
  });
});

window.onload = () => {
  initLenis();
  addEventListeners();
};

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
  })
})

// Hover Info
const infoPages = document.querySelectorAll('.info-page-link');
const infoPagesOverlay = document.querySelectorAll('.info-page-overlay');
const infoPagesLinks = document.querySelectorAll('.info-page-link > a');

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