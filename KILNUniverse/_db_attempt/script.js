const $ = sel => document.querySelector(sel);
const tabs = Array.from(document.querySelectorAll('.tabs button'));
const editors = { html: $('#html'), css: $('#css'), js: $('#js') };
const preview = $('#preview');
const runBtn = $('#run');
const clearBtn = $('#clear');
const autosaveEl = $('#autosave');

function setActive(tab){
  tabs.forEach(t=>t.classList.toggle('active', t.dataset.tab===tab));
  Object.keys(editors).forEach(k=>editors[k].classList.toggle('hidden', k!==tab));
}

tabs.forEach(t=>t.addEventListener('click', ()=>setActive(t.dataset.tab)));

function buildPage(){
  const html = editors.html.value || '';
  const css = editors.css.value || '';
  const js = editors.js.value || '';

  return `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body>${html}<script>\ntry{\n${js}\n}catch(e){console.error(e);}\n<\/script></body></html>`;
}

function run(){
  const doc = preview.contentWindow.document;
  doc.open();
  doc.write(buildPage());
  doc.close();
  if(autosaveEl.checked) save();
}

function clear(){
  editors.html.value = '';
  editors.css.value = '';
  editors.js.value = '';
  run();
}

function save(){
  const data = { html: editors.html.value, css: editors.css.value, js: editors.js.value };
  localStorage.setItem('db_attempt_sandbox', JSON.stringify(data));
}

function restore(){
  try{
    const raw = localStorage.getItem('db_attempt_sandbox');
    if(!raw) return;
    const data = JSON.parse(raw);
    editors.html.value = data.html || editors.html.value;
    editors.css.value = data.css || editors.css.value;
    editors.js.value = data.js || editors.js.value;
    run();
  }catch(e){console.warn('Restore failed', e)}
}

runBtn.addEventListener('click', run);
clearBtn.addEventListener('click', clear);
window.addEventListener('beforeunload', ()=>{ if(autosaveEl.checked) save(); });

// quick keyboard shortcut: Ctrl+Enter to run
window.addEventListener('keydown', (e)=>{ if((e.ctrlKey || e.metaKey) && e.key==='Enter'){ e.preventDefault(); run(); } });

// initialise
setActive('html');
restore();
