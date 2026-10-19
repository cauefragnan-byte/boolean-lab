/* Substitui o contorno ilustrativo pelo mapa real do Brasil, com divisão estadual. */
const brazilMapUrl='https://upload.wikimedia.org/wikipedia/commons/b/b6/Blank_Map_of_Brazil.svg';
function upgradeBrazilMap(){const svg=$('.brazil-map-svg'),shape=svg?.querySelector('.brazil-shape');if(!svg||!shape)return;const image=document.createElementNS('http://www.w3.org/2000/svg','image');image.setAttribute('class','brazil-real-map');image.setAttribute('href',brazilMapUrl);image.setAttribute('x','70');image.setAttribute('y','0');image.setAttribute('width','700');image.setAttribute('height','520');image.setAttribute('preserveAspectRatio','xMidYMid meet');shape.replaceWith(image);const note=document.createElement('small');note.className='map-attribution';note.textContent='Mapa geográfico do Brasil · Wikimedia Commons (CC BY-SA 4.0)';svg.parentElement.insertBefore(note,svg)}
const renderGraphWithMap=renderGraph;
renderGraph=function(){renderGraphWithMap();upgradeBrazilMap()};
renderAll();
