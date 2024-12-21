import { stories } from "./data.js";

let activeStory = 0;
const storyDuration = 4000;
const contentUpdateDelay = 0.4;
let direction = "next";
let storyTimeout;

const cursor = document.querySelector(".cursor");
const cursorText = cursor.querySelector("p");

function changeStory() {
  const previousStory = activeStory;
  if (direction === "next") {
    activeStory = (activeStory + 1) % stories.length;
  } else {
    activeStory = (activeStory - 1 + stories.length) % stories.length;
  }

  const story = stories[activeStory];

  gsap.to(".profile-name p", {
    y: direction === "next" ? -24 : 24,
    duration: 0.5,
    delay: contentUpdateDelay,
  });

  gsap.to(".title-row h1", {
    y: direction === "next" ? -20 : 20,
    duration: 0.5,
    delay: contentUpdateDelay,
  });

  const currentImgContainer = document.querySelector(".story-img .img");
  const currentImg = currentImgContainer.querySelector("img");

  setTimeout(() => {
    const newProfileName = document.createElement("p");
    newProfileName.innerText = story.profileName;
    newProfileName.style.transform =
      direction === "next" ? "translateY(24px)" : "translateY(-24px)";

    const profileNameDiv = document.querySelector(".profile-name");
    profileNameDiv.appendChild(newProfileName);

    gsap.to(newProfileName, {
      y: 0,
      duration: 0.5,
      delay: contentUpdateDelay,
    });

    const titleRows = document.querySelectorAll(".title-row");
    story.title.forEach((line, index) => {
      if (titleRows[index]) {
        const newTitle = document.createElement("h1");
        newTitle.innerText = line;
        newTitle.style.transform =
          direction === "next" ? "translateY(20px)" : "translateY(-20px)";
        titleRows[index].appendChild(newTitle);

        gsap.to(newTitle, {
          y: 0,
          duration: 0.5,
          delay: contentUpdateDelay,
        });
      }
    });

    const newImgContainer = document.createElement("div");
    newImgContainer.classList.add("img");
    const newStoryImg = document.createElement("img");
    newStoryImg.src = story.storyImg;
    newStoryImg.alt = story.profileName;
    newImgContainer.appendChild(newStoryImg);

    const storyImgDiv = document.querySelector(".story-img");
    storyImgDiv.appendChild(newImgContainer);

    animateNewImage(newImgContainer);

    const upcomingImg = newStoryImg;
    // animateImageScale(currentImg, upcomingImg);

    resetIndexHighlight(previousStory);
    animateIndexHighlight(activeStory);

    clearUpElements();

    clearTimeout(storyTimeout);
    storyTimeout = setTimeout(changeStory, storyDuration);
  }, 200);

  setTimeout(() => {
    const profileImg = document.querySelector(".profile-icon img");
    profileImg.src = story.profileImg;

    const link = document.querySelector(".link a");
    link.textContent = story.linkLabel;
    link.href = story.linkSrc;
  }, 600);
}

function animateNewImage(imgContainer) {
  gsap.set(imgContainer, {
    clipPath:
      direction === "next"
        ? "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)"
        : "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
  });

  gsap.to(imgContainer, {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    duration: 1,
    ease: "power4.inOut",
  });
}

function animateImageScale(currentImg, upcomingImg) {
  gsap.fromTo(
    currentImg,
    {
      scale: 1,
      rotate: 0,
    },
    {
      scale: .7,
      rotate: direction === "next" ? -25 : 25,
      duration: 1,
      ease: "power4.inOut",
      onComplete: () => {
        currentImg.parentElement.remove();
      },
    }
  );
  gsap.fromTo(
    upcomingImg,
    {
      scale: .7,
      rotate: direction === "next" ? 25 : -25,
    },
    {
      scale: 1,
      rotate: 0,
      duration: 1,
      ease: "power4.inOut",
    }
  );
}

function resetIndexHighlight(index) {
  const highlight = document.querySelectorAll('.index .index-highlight')[index];
  gsap.killTweensOf(highlight);
  gsap.to(highlight, {
    width: direction === 'next' ? '100%' : '0%',
    duration: 0.3,
    onStart: () => {
      gsap.to(highlight, {
        transformOrigin: 'right center',
        scaleX: 0,
        duration: 0.3,
      })
    }
  })
}

function animateIndexHighlight(index) {
  const highlight = document.querySelectorAll('.index .index-highlight')[index];
  gsap.set(highlight, {
    width: '0%',
    scaleX: 1,
    transformOrigin: 'right center',
  });
  gsap.to(highlight, {
    width: '100%',
    duration: storyDuration / 1000,
    ease: 'none',
  })
}

function clearUpElements() {
  const profileNameDiv = document.querySelector('.profile-name');
  const titleRows = document.querySelectorAll('.title-row');

  while (profileNameDiv.childElementCount > 2) {
    profileNameDiv.removeChild(profileNameDiv.firstChild);
  }

  titleRows.forEach((titleRow) => {
    while (titleRow.childElementCount > 2) {
      titleRow.removeChild(titleRow.firstChild);
    }
  });
}

document.addEventListener('mousemove', (event) => {
  const { clientX, clientY } = event;
  gsap.to(cursor, {
    x: clientX - cursor.offsetWidth / 2,
    y: clientY - cursor.offsetHeight / 2,
    ease: 'power2.out',
    duration: .3,
  });

  const viewportWidth = window.innerWidth;
  if (clientX < viewportWidth / 2) {
    cursorText.textContent = 'Prev';
    direction = 'prev';
  } else {
    cursorText.textContent = 'Next';
    direction = 'next';
  }
});

document.addEventListener('click', () => {
  clearTimeout(storyTimeout);
  resetIndexHighlight(activeStory);
  changeStory();
});

storyTimeout = setTimeout(changeStory, storyDuration);
animateIndexHighlight(activeStory);

const overlay = document.querySelector(".info");
const closeBtn = document.querySelector(".close-btn");

const tl = gsap.timeline({ paused: true, overwrite: "auto" });
gsap.set('.overflow p, .info-page-link', { y: '100%' });

tl.to('body', {
  cursor: 'default',
  duration: .01,
})

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

document.querySelector('.row:nth-child(2)').addEventListener('mouseenter', () => {
  gsap.to('.cursor', {
    scale: 0,
    duration: .75,
    ease: 'power3.out',
  })
});

document.querySelector('.row:nth-child(2)').addEventListener('mouseleave', () => {
  gsap.to('.cursor', {
    scale: 1,
    duration: .75,
    ease: 'power3.out',
  })
})

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