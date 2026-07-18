const revealItems = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index * 55, 330)}ms`;
  observer.observe(item);
});

const route = document.querySelector('.route-map .route-line');
if (route) {
  const length = route.getTotalLength();
  route.style.strokeDasharray = `${length} ${length}`;
  route.style.strokeDashoffset = length;
  const drawRoute = () => {
    const routeTop = route.getBoundingClientRect().top;
    const start = window.innerHeight * 0.9;
    const end = window.innerHeight * 0.25;
    const progress = Math.min(Math.max((start - routeTop) / (start - end), 0), 1);
    route.style.strokeDashoffset = length * (1 - progress);
  };
  window.addEventListener('scroll', drawRoute, { passive: true });
  drawRoute();
}
