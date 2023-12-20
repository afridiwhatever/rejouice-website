const heroSection = document.querySelector("#hero-section");

const cursor = document.querySelector("#cursor");

heroSection.addEventListener("mousemove", (event) => {
  gsap.to(cursor, {
    x: event.x,
    y: event.y,
  });
});
