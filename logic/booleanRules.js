/* Todas as decisões do sistema passam por estas funções booleanas. */
window.BooleanRules = {
  productCanBeSold: (p) => p.active && p.stock > 0,
  stockLow: (p) => p.stock <= p.minStock,
  outOfStock: (p) => p.stock === 0,
  generateAlert: (p) => p.active && p.stock <= p.minStock,
  allowRestock: (p) => p.stock <= p.minStock && p.supplierActive,
  recommendPurchase: (p) => p.stock <= p.minStock && p.salesHigh && p.supplierActive,
  critical: (p) => p.active && (p.stock === 0 || p.stock <= p.minStock),
  excess: (p) => p.stock > p.maxStock,
  nearMinimum: (p) => p.stock > p.minStock && p.stock <= p.minStock * 1.25,
  normal: (p) => p.stock > p.minStock && p.stock <= p.maxStock
};
window.BooleanRuleCatalog = [
  { key:'productCanBeSold', title:'Produto pode ser vendido', formula:'Produto ativo AND estoque > 0', code:'produtoAtivo && estoqueAtual > 0', help:'O item precisa estar ativo e possuir pelo menos uma unidade.' },
  { key:'generateAlert', title:'Gerar alerta', formula:'Estoque baixo AND produto ativo', code:'produtoAtivo && estoqueAtual <= estoqueMinimo', help:'Um alerta é criado quando o estoque chega ao mínimo.' },
  { key:'allowRestock', title:'Permitir reposição', formula:'Estoque baixo AND fornecedor ativo', code:'estoqueAtual <= estoqueMinimo && fornecedorAtivo', help:'A reposição só é recomendada quando existe fornecedor disponível.' },
  { key:'recommendPurchase', title:'Recomendar compra', formula:'Estoque baixo AND vendas altas AND fornecedor ativo', code:'estoqueBaixo && historicoDeVendasAlto && fornecedorAtivo', help:'Combina três sinais reais para priorizar uma compra.' },
  { key:'critical', title:'Situação crítica', formula:'Ativo AND (sem estoque OR estoque baixo)', code:'produtoAtivo && (estoqueAtual === 0 || estoqueAtual <= estoqueMinimo)', help:'Diferencia produtos que exigem atenção imediata.' },
  { key:'excess', title:'Produto em excesso', formula:'Estoque atual > estoque máximo', code:'estoqueAtual > estoqueMaximo', help:'Identifica capital parado acima do limite planejado.' }
];
