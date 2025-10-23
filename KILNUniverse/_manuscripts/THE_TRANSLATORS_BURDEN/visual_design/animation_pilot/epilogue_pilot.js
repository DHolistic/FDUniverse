// Epilogue pilot interactions: scroll parallax + intersection glyph animation
(function(){
  const panels = document.querySelectorAll('.panel');
  const glyphs = document.querySelectorAll('.glyph');

  // Parallax on scroll
  window.addEventListener('scroll', ()=>{
    const scrolled = window.scrollY;
    panels.forEach(p =>{
      const bg = p.querySelector('.bg');
      const speed = parseFloat(bg.dataset.speed||0);
      bg.style.transform = `translateY(${scrolled * speed * -0.1}px)`;
    });
  }, {passive:true});

  // Glyph intersection animation
  if('IntersectionObserver' in window){
    const obs = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        const el = e.target;
        if(e.isIntersecting){
          el.animate([
            {transform:'scale(0.9) rotate(-6deg)', opacity:0.6},
            {transform:'scale(1.06) rotate(0deg)', opacity:1}
          ],{duration:600, easing:'ease-out', fill:'forwards'});
        } else {
          el.style.opacity = '';
          el.style.transform = '';
        }
      });
    }, {threshold:0.35});
    glyphs.forEach(g => obs.observe(g));
  } else {
    // fallback pulse
    glyphs.forEach(g=>{
      g.style.transition='transform 420ms ease, opacity 420ms ease';
      g.addEventListener('mouseenter', ()=>{ g.style.transform='scale(1.04)'; g.style.opacity='1';});
      g.addEventListener('mouseleave', ()=>{ g.style.transform=''; g.style.opacity='';});
    });
  }

})();
