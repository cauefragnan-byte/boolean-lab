const CREDENTIALS = { email: 'aluno@booleanlab.com', password: 'boolean123' };
const loginScreen = document.querySelector('#loginScreen');
const lessonScreen = document.querySelector('#lessonScreen');
const loginForm = document.querySelector('#loginForm');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const formError = document.querySelector('#formError');

// Esta é a função real mostrada na captura de código da explicação.
function validateLogin(email, password) {
  const usuarioCorreto = email === CREDENTIALS.email;
  const senhaCorreta = password === CREDENTIALS.password;
  const acessoPermitido = usuarioCorreto && senhaCorreta;

  return { usuarioCorreto, senhaCorreta, acessoPermitido };
}

function updateBooleanPreview() {
  const result = validateLogin(emailInput.value.trim(), passwordInput.value);
  document.querySelector('#previewUser').textContent = String(result.usuarioCorreto);
  document.querySelector('#previewPassword').textContent = String(result.senhaCorreta);
  document.querySelector('#previewAccess').textContent = String(result.acessoPermitido);
  const status = document.querySelector('#emailStatus');
  status.className = `field-status ${emailInput.value ? (result.usuarioCorreto ? 'valid' : 'invalid') : ''}`;
  const scenario = document.querySelector('#previewScenario');
  const preview = document.querySelector('#logicPreview');
  preview.classList.toggle('approved', result.acessoPermitido);
  preview.classList.toggle('rejected', Boolean(emailInput.value || passwordInput.value) && !result.acessoPermitido);
  if (!emailInput.value && !passwordInput.value) scenario.textContent = 'CENÁRIO INICIAL · CAMPOS VAZIOS';
  else if (result.acessoPermitido) scenario.textContent = 'CENÁRIO CORRETO · ACESSO LIBERADO';
  else scenario.textContent = 'CENÁRIO INCORRETO · ACESSO NEGADO';
}

function showLesson() {
  loginScreen.hidden = true; lessonScreen.hidden = false;
  window.scrollTo({ top: 0, behavior: 'instant' });
  document.title = 'A3 Álgebra Booleana — Como o login funciona';
}

function showLogin() {
  lessonScreen.hidden = true; loginScreen.hidden = false; loginForm.reset();
  formError.textContent = ''; updateBooleanPreview();
  document.title = 'A3 Álgebra Booleana — Login'; emailInput.focus();
}

function showToast(message) {
  const toast = document.querySelector('#toast'); toast.textContent = message; toast.classList.add('visible');
  window.setTimeout(() => toast.classList.remove('visible'), 2600);
}

loginForm.addEventListener('submit', (event) => {
  event.preventDefault(); formError.textContent = '';
  if (!emailInput.value.trim() || !passwordInput.value) { formError.textContent = 'Preencha o e-mail e a senha para continuar.'; return; }
  const result = validateLogin(emailInput.value.trim(), passwordInput.value);
  const button = loginForm.querySelector('.login-button'); button.disabled = true; button.classList.add('loading'); button.querySelector('span').textContent = 'Verificando...';
  window.setTimeout(() => {
    button.disabled = false; button.classList.remove('loading'); button.querySelector('span').textContent = 'Entrar';
    if (result.acessoPermitido) showLesson();
    else { formError.textContent = 'E-mail ou senha incorretos. Confira os dados de demonstração.'; loginForm.animate([{ transform:'translateX(0)' },{ transform:'translateX(-7px)' },{ transform:'translateX(7px)' },{ transform:'translateX(0)' }], { duration:260 }); }
  }, 650);
});

document.querySelector('#fillDemo').addEventListener('click', () => { emailInput.value = CREDENTIALS.email; passwordInput.value = CREDENTIALS.password; formError.textContent = ''; updateBooleanPreview(); showToast('Cenário correto preparado. Clique em Entrar.'); });
document.querySelector('#fillWrong').addEventListener('click', () => { emailInput.value = CREDENTIALS.email; passwordInput.value = 'senha-incorreta'; updateBooleanPreview(); formError.textContent = 'Demonstração: a senha incorreta faz o resultado final ser FALSE.'; showToast('Cenário incorreto preparado. Clique em Entrar.'); });
document.querySelector('#showPassword').addEventListener('click', (event) => { const showing = passwordInput.type === 'text'; passwordInput.type = showing ? 'password' : 'text'; event.currentTarget.setAttribute('aria-label', showing ? 'Mostrar senha' : 'Ocultar senha'); });
document.querySelector('#forgotButton').addEventListener('click', () => showToast('Use a senha de demonstração: boolean123'));
document.querySelector('#logoutButton').addEventListener('click', showLogin);
emailInput.addEventListener('input', updateBooleanPreview); passwordInput.addEventListener('input', updateBooleanPreview); updateBooleanPreview();
