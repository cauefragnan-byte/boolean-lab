const renderRiskOriginal=renderRisk;
renderRisk=function(){
  renderRiskOriginal();
  const view=$('#view-risk');if(!view||$('#riskGuidance'))return;
  view.insertAdjacentHTML('afterbegin',`<section class="panel risk-guidance" id="riskGuidance"><div><span class="ai-section-kicker">COMO USAR ESTA TELA</span><h3>Comece pelos produtos em risco alto</h3><p>Veja a explicação de cada item, confira a duração estimada e registre uma saída para manter a análise atualizada.</p></div><button class="btn secondary" data-view="probRules">Entender o cálculo</button></section>`);
  $$('.risk-badge',view).forEach(b=>b.title='Nível calculado a partir do estoque e do histórico');
};
const renderAllWithImprovedRisk=renderAll;
renderAll=function(){renderAllWithImprovedRisk()};
renderAll();
