// Cria e gerencia o menu principal do jogo
function createMenu() {
  // Cria o overlay do menu
  const menu = document.createElement('div');
  menu.id = 'game-menu';
  menu.style.position = 'fixed';
  menu.style.top = 0;
  menu.style.left = 0; 
  menu.style.width = '100vw';
  menu.style.height = '100vh';
  menu.style.background = 'rgba(26, 23, 23, 0.92)';
  menu.style.display = 'flex';
  menu.style.flexDirection = 'column';
  menu.style.justifyContent = 'center';
  menu.style.alignItems = 'center';
  menu.style.zIndex = 1000;

  // Título
  const title = document.createElement('h1');
  title.textContent = 'Math Survivors';
  title.style.color = '#fff';
  title.style.fontFamily = 'monospace';
  menu.appendChild(title);

  // Botão de iniciar
  const startBtn = document.createElement('button');
  startBtn.textContent = 'Iniciar Jogo!';
  startBtn.style.fontSize = '1.5em';
  startBtn.style.padding = '0.5em 2em';
  startBtn.style.margin = '1em';
  startBtn.style.cursor = 'pointer';
  startBtn.onclick = () => {
    menu.remove();
    if (typeof onMenuStart === 'function') onMenuStart();
  };
  menu.appendChild(startBtn);

  // Instruções
  const instr = document.createElement('div');
  instr.innerHTML = '<p style="color:#fff;font-family:monospace;">WASD para mover<br>O jogo começa após clicar em Iniciar</p>';
  menu.appendChild(instr);

  // Botão de personalização
  const customBtn = document.createElement('button');
  customBtn.textContent = 'Personalização';
  customBtn.style.fontSize = '1.2em';
  customBtn.style.padding = '0.5em 1.5em';
  customBtn.style.margin = '0.5em';
  customBtn.style.cursor = 'pointer';
  menu.appendChild(customBtn);

  // Aba de personalização (inicialmente oculta)
  const customDiv = document.createElement('div');
  customDiv.style.display = 'none';
  customDiv.style.flexDirection = 'column';
  customDiv.style.alignItems = 'center';
  customDiv.style.marginTop = '1em';
  customDiv.style.background = '#222';
  customDiv.style.padding = '1em 2em';
  customDiv.style.borderRadius = '10px';

  // Cor do personagem
  const playerColorLabel = document.createElement('label');
  playerColorLabel.textContent = 'Cor do 0: ';
  playerColorLabel.style.color = '#fff';
  const playerColorInput = document.createElement('input');
  playerColorInput.type = 'color';
  playerColorInput.value = '#ffffff';
  playerColorInput.style.margin = '0 0.5em';
  playerColorLabel.appendChild(playerColorInput);
  customDiv.appendChild(playerColorLabel);

  // Cor do tiro
  const bulletColorLabel = document.createElement('label');
  bulletColorLabel.textContent = 'Cor do tiro: ';
  bulletColorLabel.style.color = '#fff';
  const bulletColorInput = document.createElement('input');
  bulletColorInput.type = 'color';
  bulletColorInput.value = '#5cf5ff';
  bulletColorInput.style.margin = '0 0.5em';
  bulletColorLabel.appendChild(bulletColorInput);
  customDiv.appendChild(bulletColorLabel);

  // Formato do tiro
  const bulletShapeLabel = document.createElement('label');
  bulletShapeLabel.textContent = 'Formato do tiro: ';
  bulletShapeLabel.style.color = '#fff';
  const bulletShapeSelect = document.createElement('select');
  ['Círculo','Quadrado','Losango','Triângulo'].forEach((shape, idx) => {
    const opt = document.createElement('option');
    opt.value = ['circle','square','diamond','triangle'][idx];
    opt.textContent = shape;
    bulletShapeSelect.appendChild(opt);
  });
  bulletShapeLabel.appendChild(bulletShapeSelect);
  customDiv.appendChild(bulletShapeLabel);

  // Mensagem informativa
  const infoMsg = document.createElement('div');
  infoMsg.textContent = 'Personalização é apenas visual e não afeta o poder do personagem.';
  infoMsg.style.color = '#aaa';
  infoMsg.style.fontSize = '0.9em';
  infoMsg.style.marginTop = '0.7em';
  customDiv.appendChild(infoMsg);

  // Botão de voltar
  const backBtn = document.createElement('button');
  backBtn.textContent = 'Voltar';
  backBtn.style.margin = '1em';
  backBtn.onclick = () => {
    customDiv.style.display = 'none';
    startBtn.style.display = '';
    instr.style.display = '';
    customBtn.style.display = '';
  };
  customDiv.appendChild(backBtn);

  // Eventos para aplicar personalização
  playerColorInput.addEventListener('input', () => {
    if (window.applyCustomization) window.applyCustomization({playerColor: playerColorInput.value});
  });
  bulletColorInput.addEventListener('input', () => {
    if (window.applyCustomization) window.applyCustomization({bulletColor: bulletColorInput.value});
  });
  bulletShapeSelect.addEventListener('change', () => {
    if (window.applyCustomization) window.applyCustomization({bulletShape: bulletShapeSelect.value});
  });

  // Mostra a aba de personalização
  customBtn.onclick = () => {
    customDiv.style.display = 'flex';
    startBtn.style.display = 'none';
    instr.style.display = 'none';
    customBtn.style.display = 'none';
  };
  menu.appendChild(customDiv);

  document.body.appendChild(menu);
}

// Função de callback para iniciar o jogo (deve ser definida no HTML principal)
// window.onMenuStart = function() { ... }

// Cria o menu ao carregar o script
window.addEventListener('DOMContentLoaded', createMenu);
