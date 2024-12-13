gsap.registerPlugin(ScrollTrigger);
let lenis;

const initLenis = () => {
    lenis = new Lenis({
        smoothWheel: true,
        smoothTouch: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
}

window.onload = () => {
    initLenis();
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
});

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
});

// Hover Client
const items = document.querySelectorAll('.item');
const itemWrappers = document.querySelectorAll('.item-wrapper');


items.forEach((item, index) => {
  item.addEventListener('mouseenter', () => {
    // Correctly target the overlay within the specific item wrapper
    const itemOverlay = items[index].querySelectorAll('.item-overlay');

    gsap.to(itemOverlay, {
      duration: .75,
      width: '100%',
      ease: "power3.inOut",
      stagger: 0.05,
    });

    // Target the title *within the specific item wrapper*
    const itemTitle = items[index].querySelectorAll('p');

    gsap.to(itemTitle, {
      duration: .95,
      color: '#fff',
      stagger: 0.05,
    });
  });

  item.addEventListener('mouseleave', () => { 
    const itemOverlay = items[index].querySelectorAll('.item-overlay');

    gsap.to(itemOverlay, {
      duration: .75,
      width: '0%',
      ease: "power3.inOut",
    });

    // Target the title *within the specific item wrapper*
    const itemTitle = items[index].querySelectorAll('p');

    gsap.to(itemTitle, {
      duration: .95,
      color: '#000',
    });
  });
});