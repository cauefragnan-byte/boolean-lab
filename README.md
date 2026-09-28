# STOCK IA — Estoque Inteligente

Sistema web acadêmico de gerenciamento de estoque que aplica Álgebra Booleana em decisões reais de uma pequena empresa.

## Objetivo

Demonstrar que `true` e `false` não precisam ficar em uma página teórica: eles controlam venda, reposição, alertas, classificação de estoque e recomendações.

## Tecnologias

- HTML5, CSS3 e JavaScript puro
- `localStorage` para persistência no navegador
- Sem framework ou banco externo; backend Node opcional para a OpenAI

## Como executar

 Abra `index.html` no navegador ou use o Live Server do VS Code para o modo local. Para habilitar o chat com a OpenAI, use o backend: `$env:OPENAI_API_KEY="sua-chave"; node server.js`. Os produtos de demonstração são criados automaticamente na primeira execução.

## Funcionalidades

- Dashboard com indicadores, gráfico de movimentações e distribuição por categoria
- Cadastro, edição, ativação/desativação, pesquisa, filtros e exclusão confirmada de produtos
- Entradas e saídas de estoque com validação de quantidade disponível
- Histórico de movimentações e atualização automática dos indicadores
- Central de alertas gerados pelos dados atuais
- Central de inteligência com insights locais e integração opcional segura com OpenAI
- Página de Regras Booleanas com avaliação de um produto real
- Simulador didático de AND, OR e NOT
- Tema claro, escuro e Modo Fluminense, salvos no navegador
- Layout responsivo para celular, tablet e desktop

## Regras booleanas utilizadas

```js
produtoPodeSerVendido = produtoAtivo && estoqueAtual > 0;
gerarAlerta = produtoAtivo && estoqueAtual <= estoqueMinimo;
permitirReposicao = estoqueAtual <= estoqueMinimo && fornecedorAtivo;
recomendarCompra = estoqueBaixo && historicoDeVendasAlto && fornecedorAtivo;
produtoEmSituacaoCritica = produtoAtivo && (semEstoque || estoqueBaixo);
produtoEmExcesso = estoqueAtual > estoqueMaximo;
```

As funções ficam centralizadas em `logic/booleanRules.js`.

## Persistência e dados

Os dados ficam em `localStorage` com a chave `stock-ia-database-v1`, portanto permanecem após atualizar a página. A opção “Restaurar dados iniciais” recomeça com os produtos fictícios da demonstração.

## Análise inteligente

A área “Análise Inteligente” calcula recomendações reais usando estoque, mínimo, máximo, fornecedor ativo e indicador de vendas altas. Ela foi separada da interface para que uma API de IA possa ser adicionada futuramente sem alterar as regras atuais.

## Heurísticas de Nielsen aplicadas

O sistema mostra status imediatamente, usa termos do domínio de estoque, permite voltar e desfazer por restauração, mantém padrões de navegação, bloqueia saídas inválidas, oferece pesquisa e filtros, mantém o layout enxuto, exibe mensagens de erro explicativas e possui estados vazios, feedback de sucesso e foco visível.

## Estrutura

```text
boolean-lab/
├── index.html
├── style.css
├── script.js
├── logic/booleanRules.js
├── data/demoData.js
├── services/storage.js
└── server.js
```
# API opcional da Central de Inteligência

Para habilitar respostas pela OpenAI sem expor a chave no navegador, execute o servidor com a variável de ambiente configurada:

```powershell
$env:OPENAI_API_KEY="sua-chave"
node server.js
```

Sem `OPENAI_API_KEY`, os insights proativos continuam funcionando localmente, mas o chat informa que a IA precisa ser configurada — nenhuma resposta fixa substitui uma consulta à OpenAI. A chave nunca é enviada ao frontend; o navegador chama apenas `POST /api/ai`.
