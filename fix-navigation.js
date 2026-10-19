/* Correção dos nós do mapa: cada nó precisa de id, tipo, rótulo e dados próprios. */
function renderGraph(){
  const g=graphData(), type=$('#graphType')?.value||'all', query=($('#graphSearch')?.value||'').toLowerCase();
  const products=g.products.filter(p=>(type==='all'||type==='product')&&(!query||p.name.toLowerCase().includes(query)||p.sku.toLowerCase().includes(query)||(p.supplier||'').toLowerCase().includes(query)));
  const suppliers=g.suppliers.filter(s=>(type==='all'||type==='supplier')&&(!query||s.name.toLowerCase().includes(query)));
  const ids=new Set([...products.map(p=>`p-${p.id}`),...suppliers.map(s=>`s-${g.suppliers.indexOf(s)}`)]);
  const edges=g.edges.filter(e=>ids.has(e.from)&&ids.has(e.to));
  const nodes=[...products.map((p,i)=>({id:`p-${p.id}`,type:'product',label:p.name,data:p,x:130+(i%4)*190,y:100+Math.floor(i/4)*125})),...suppliers.map((s,i)=>({id:`s-${g.suppliers.indexOf(s)}`,type:'supplier',label:s.name,data:s,x:130+(i%4)*190,y:Math.max(190,100+Math.ceil(products.length/4)*125)}))];
  const pos=new Map(nodes.map(n=>[n.id,n]));
  const svg=`<svg class="dependency-svg" viewBox="0 0 900 540" role="img" aria-label="Mapa de relações entre produtos e fornecedores">${edges.map(e=>{const a=pos.get(e.from),b=pos.get(e.to);return `<line class="dependency-edge" x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}"></line>`}).join('')}${nodes.map(n=>`<g class="graph-node ${n.type} ${n.data.active===false||n.data.supplierActive===false?'problem':''}" data-graph-node="${n.id}" tabindex="0" transform="translate(${n.x} ${n.y})"><circle r="${n.type==='supplier'?28:23}"></circle><text y="43" text-anchor="middle">${esc(n.label.length>22?n.label.slice(0,20)+'…':n.label)}</text></g>`).join('')}</svg>`;
  $('#view-graph').innerHTML=heading('ESTRUTURA DO ESTOQUE','Visualize as relações reais entre produtos e seus fornecedores.')+`<div class="toolbar graph-toolbar"><label for="graphSearch">Pesquisar</label><input id="graphSearch" value="${esc(query)}" placeholder="Produto ou fornecedor..."><select id="graphType"><option value="all" ${type==='all'?'selected':''}>Todos os nós</option><option value="product" ${type==='product'?'selected':''}>Somente produtos</option><option value="supplier" ${type==='supplier'?'selected':''}>Somente fornecedores</option></select><button class="btn secondary small" data-action="clear-graph">Limpar</button></div><div class="graph-layout"><div class="panel graph-panel">${nodes.length?svg:'<div class="graph-empty">⌘<strong>Não há dados suficientes para montar o mapa</strong>Cadastre produtos com fornecedor para criar conexões.</div>'}</div><aside class="panel graph-details" id="graphDetails"><span class="ai-section-kicker">DETALHE DO NÓ</span><h3>Selecione um produto ou fornecedor</h3><p>Clique em um nó para ver suas conexões e dados atuais.</p><div class="graph-legend"><span><i class="product-key"></i>Produto</span><span><i class="supplier-key"></i>Fornecedor</span><span><i class="edge-key"></i>Fornece</span></div></aside></div>`;
}

/* O script principal registrava listeners depois do primeiro render. Reexecutamos
   a renderização com a função corrigida e mantemos os filtros interativos. */
renderAll();
document.addEventListener('input',e=>{if(e.target.id==='graphSearch')renderGraph()});
document.addEventListener('change',e=>{if(e.target.id==='riskFilter')renderRisk();if(e.target.id==='graphType')renderGraph()});
document.addEventListener('click',e=>{const node=e.target.closest('[data-graph-node]');if(node)renderGraphDetails(node.dataset.graphNode);if(e.target.closest('[data-action="clear-graph"]')){$('#graphSearch').value='';$('#graphType').value='all';renderGraph()}});
