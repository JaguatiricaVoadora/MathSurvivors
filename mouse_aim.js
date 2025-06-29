// mouse_aim.js
// Lida com a mira manual do jogador usando o mouse

let mouseX = 0;
let mouseY = 0;

// Atualiza a posição do mouse relativa ao canvas
document.addEventListener('mousemove', function(e) {
  const rect = canvas.getBoundingClientRect();
  mouseX = (e.clientX - rect.left) * (canvas.width / rect.width);
  mouseY = (e.clientY - rect.top) * (canvas.height / rect.height);
});

// Função para atirar na direção do mouse
function shootTowardsMouse() {
  const dx = mouseX - player.x;
  const dy = mouseY - player.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist === 0) return;
  // Dano proporcional ao valor do player
  let damage;
  if (player.value >= 0) {
    damage = Math.max(1, Math.floor(player.value / 2) + 1);
  } else {
    damage = Math.max(0.5, 1 + player.value * 0.5);
  }
  // Espalhamento dos tiros se value >= 10
  let spread = 0;
  if (player.value >= 10) spread = Math.min((player.value - 9) * 2, 18); // até 18px
  let px = player.x, py = player.y;
  if (spread > 0) {
    const angle = Math.atan2(dy, dx) + (Math.random() - 0.5) * (spread / 80);
    const distSpread = Math.random() * spread;
    px += Math.cos(angle + Math.PI/2) * distSpread;
    py += Math.sin(angle + Math.PI/2) * distSpread;
  }
  bullets.push({
    x: px,
    y: py,
    dx: (dx / dist) * 6,
    dy: (dy / dist) * 6,
    damage: damage,
    trailColor: getBulletTrailColor(player.value)
  });
}

// Listener para atirar ao clicar com o mouse
canvas.addEventListener('mousedown', function(e) {
  shootTowardsMouse();
});

// Se quiser permitir segurar o mouse para atirar:
let mouseDown = false;
canvas.addEventListener('mousedown', () => { mouseDown = true; });
canvas.addEventListener('mouseup', () => { mouseDown = false; });

// Chame shootTowardsMouse() no loop se mouseDown estiver true
function manualShootLoop() {
  if (mouseDown) shootTowardsMouse();
}
// No seu loop principal, chame manualShootLoop() em vez de autoShoot()
