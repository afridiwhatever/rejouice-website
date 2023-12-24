function locoScroll() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
locoScroll();

function cursorEffect() {
  const heroSection = document.querySelector("#hero-section");
  const cursor = document.querySelector("#cursor");

  heroSection.addEventListener("mousemove", (event) => {
    gsap.to(cursor, {
      x: event.x - heroSection.offsetWidth / 2,
      y: event.y - heroSection.offsetHeight / 2.1,
      // x: event.x,
      // y: event.y,
    });
  });

  heroSection.addEventListener("mouseenter", () => {
    console.log("hero");
    gsap.to(cursor, {
      scale: 1,
      opacity: 1,
    });
  });

  heroSection.addEventListener("mouseleave", () => {
    console.log("non-hero");
    gsap.to(cursor, {
      scale: 0,
      opacity: 0,
    });
  });
}
cursorEffect();

function page2Animation() {
  gsap.to("#scroll", {
    scaleX: 1,
    ease: "power2.out",
    duration: 1.6,
    scrollTrigger: {
      trigger: "#scroll",
      scroller: "#main",
    },
  });

  gsap.from(["#content-header", "#desc"], {
    y: 120,
    duration: 0.7,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#content-header",
      scroller: "#main",
    },
  });
}
page2Animation();
