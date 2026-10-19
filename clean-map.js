/* O mapa fica focado nos fornecedores; os produtos aparecem no painel do fornecedor. */
const renderGraphWithSuppliersOnly=renderGraph;
function cleanMapControls(){
  $('#graphType option[value="product"]')?.remove();
  $$('.dependency-edge').forEach(el=>el.remove());
  $$('.graph-node.product,.map-dot.product,.graph-legend .product-key').forEach(el=>el.closest('g')?.remove()||el.closest('span')?.remove()||el.remove());
}
renderGraph=function(){renderGraphWithSuppliersOnly();cleanMapControls()};
renderAll();
