let mapZoom=1;
function applyMapZoom(){const svg=$('.brazil-map-svg');if(svg)svg.style.transform=`scale(${mapZoom})`;if($('#mapZoomValue'))$('#mapZoomValue').textContent=`${Math.round(mapZoom*100)}%`}
const renderAllWithZoom=renderAll;
renderAll=function(){renderAllWithZoom();const panel=$('.graph-panel');if(panel&&!$('#mapZoomControls'))panel.insertAdjacentHTML('afterbegin','<div class="map-zoom-controls" id="mapZoomControls"><button data-map-zoom="out" aria-label="Diminuir zoom">−</button><span id="mapZoomValue">100%</span><button data-map-zoom="in" aria-label="Aumentar zoom">＋</button><button data-map-zoom="reset" aria-label="Restaurar zoom">↺</button></div>');applyMapZoom()};
document.addEventListener('click',e=>{const btn=e.target.closest('[data-map-zoom]');if(!btn)return;mapZoom=btn.dataset.mapZoom==='in'?Math.min(1.8,mapZoom+.1):btn.dataset.mapZoom==='out'?Math.max(.7,mapZoom-.1):1;applyMapZoom()});
renderAll();
