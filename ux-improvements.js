/* Refinos de usabilidade sem alterar as regras de negócio. */
function syncAccessibility(){
  $$('.nav-item').forEach(item=>{if(item.dataset.view===app.view)item.setAttribute('aria-current','page');else item.removeAttribute('aria-current')});
  $$('.graph-node').forEach(node=>{const label=node.querySelector('text')?.textContent||'item do mapa';node.setAttribute('aria-label',`Abrir detalhes de ${label}`);node.setAttribute('role','button')});
}
const renderAllWithUX=renderAll;
renderAll=function(){renderAllWithUX();syncAccessibility()};
document.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.closest('.graph-node')){e.preventDefault();renderGraphDetails(e.target.closest('.graph-node').dataset.graphNode)}});
syncAccessibility();
