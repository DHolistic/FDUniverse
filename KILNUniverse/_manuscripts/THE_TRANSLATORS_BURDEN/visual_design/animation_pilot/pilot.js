// Lightweight POC interactions: parallax on scroll, tablet pulse on click, ledger reveal on hover
(function(){
  const layers = document.querySelectorAll('.layer');
  window.addEventListener('scroll', ()=>{
    const scrolled = window.scrollY;
    layers.forEach(layer=>{
      const speed = parseFloat(layer.dataset.speed||0);
      layer.style.transform = `translateY(${scrolled * speed * -0.05}px)`;
    })
  },{passive:true});

  const tablet = document.querySelector('.tablet');
  if(tablet){
    tablet.addEventListener('click', ()=>{
    tablet.animate([
      {boxShadow: '0 8px 30px rgba(79,209,197,0.05)'},
      {boxShadow: '0 18px 60px rgba(79,209,197,0.35)'}
    ],{duration:420,iterations:1,easing:'ease-out'});
    // small glyph pulse (visual only)
    tablet.style.borderColor = 'rgba(79,209,197,0.35)';
    setTimeout(()=>tablet.style.borderColor='rgba(79,209,197,0.06)',600);
    });
  }

  const ledger = document.querySelector('.ledger');
  if(ledger){
    ledger.addEventListener('mouseenter', ()=>{
      ledger.classList.add('hovered');
    // reveal placeholder seed text
    let reveal = document.createElement('div');
    reveal.className='seed-reveal';
    reveal.textContent='Seed found: coin-sized clay curl (rubi mark)';
    reveal.style.position='absolute';
    reveal.style.bottom='1.8rem';
    reveal.style.left='50%';
    reveal.style.transform='translateX(-50%)';
    reveal.style.background='rgba(0,0,0,0.45)';
    reveal.style.padding='8px 12px';
    reveal.style.borderRadius='6px';
    reveal.style.color='#cfe';
    ledger.appendChild(reveal);
    requestAnimationFrame(()=>{
      reveal.style.opacity='1';
      reveal.style.transform='translate(-50%,0)';
    })
    });
    ledger.addEventListener('mouseleave', ()=>{
      ledger.classList.remove('hovered');
      const r = ledger.querySelector('.seed-reveal');
      if(r){ r.remove(); }
    });
  }
})();
