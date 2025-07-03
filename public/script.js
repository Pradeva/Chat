let socket;
let username = 'Anonim';

function joinChat(anon = false) {
  const nameInput = document.getElementById('username');
  const nameValue = nameInput.value.trim();

  if (!anon && nameValue) {
    username = nameValue;
  }

  socket = io();
  socket.emit('set-username', username);

  document.getElementById('join').style.display = 'none';
  document.getElementById('chat').style.display = 'block';

  const form = document.getElementById('form');
  const input = document.getElementById('input');
  const messages = document.getElementById('messages');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value) {
      const msg = input.value;
      addMessage(`🧍‍♂️ Kamu: ${msg}`);
      socket.emit('chat-message', msg);
      input.value = '';
    }
  });

  socket.on('chat-message', ({ name, msg }) => {
    addMessage(`👤 ${name}: ${msg}`);
  });
}

function addMessage(text) {
  const el = document.createElement('div');
  el.textContent = text;
  messages.appendChild(el);
  messages.scrollTop = messages.scrollHeight;
}
