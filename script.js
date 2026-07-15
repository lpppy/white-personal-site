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

const route = document.querySelector('.route-map path');
if (route) {
  const length = route.getTotalLength();
  route.style.strokeDasharray = `${length} ${length}`;
  route.style.strokeDashoffset = length;
  const drawRoute = () => {
    const progress = Math.min(window.scrollY / (document.body.scrollHeight - window.innerHeight), 1);
    route.style.strokeDashoffset = length * (1 - progress);
  };
  window.addEventListener('scroll', drawRoute, { passive: true });
  drawRoute();
}
