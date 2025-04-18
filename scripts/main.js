import { commands } from './commands.js';
import { getCurrentUser } from './users.js';

const out = document.getElementById('terminalOutput');
const cmdIn = document.getElementById('commandInput');
const cdElem = document.getElementById('countdown');

// Countdown Timer
const target = new Date(Date.UTC(2025, 3, 23, 17, 0, 0)); // 19:00 CEST = 17:00 UTC

function updateCountdown() {
  const now = new Date();
  const diff = target - now;
  if (diff <= 0) {
    cdElem.textContent = '⏳ Alpha Start: NOW ⏳';
    clearInterval(cdInterval);
    return;
  }
  const days    = Math.floor(diff / 86400000);
  const hours   = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  cdElem.textContent =
    `Alpha starts in: ${days}d ${hours}h ${minutes}m ${seconds}s`;
}

const cdInterval = setInterval(updateCountdown, 1000);
updateCountdown();

// Terminal Logic
function print(txt) {
  // Create a new message element
  const line = document.createElement('div');
  line.innerHTML = txt;
  out.appendChild(line);

  // Get computed line height (fallback to 20 if not available)
  const style = window.getComputedStyle(out);
  let lineHeight = parseInt(style.lineHeight);
  if (isNaN(lineHeight)) {
    lineHeight = 20;
  }

  // Calculate maximum number of lines that fit in the terminal output area.
  const maxLines = Math.floor(out.clientHeight / lineHeight);

  // Remove older lines if exceeding maxLines.
  while (out.childNodes.length > maxLines) {
    out.removeChild(out.firstChild);
  }
}

function withThinking(fn){
  const id = `think-${Date.now()}`;
  out.innerHTML += `<span id="${id}" class="spinner"></span> Processing...<br>`;
  out.scrollTop = out.scrollHeight;
  setTimeout(() => {
    const el = document.getElementById(id);
    el && el.remove();
    fn();
  }, 500 + Math.random()*1000);
}

cmdIn.addEventListener('keypress', e => {
  if (e.key !== 'Enter') return;
  const cmd = e.target.value.trim();
  e.target.value = '';
  print(`>> ${cmd}`);
  withThinking(() => handle(cmd));
});

function handle(input){
    const [cmd, ...args] = input.toLowerCase().split(' ');
    const command = commands[cmd];
    if (!command) {
      print(`ERROR: Unknown command. Type "help".`);
      return;
    }
    const user = getCurrentUser();
    if (command.access === 'restricted' && !user.hasAccess) {
      print(`ACCESS DENIED: Insufficient privileges for '${cmd}'.`);
      return;
    }
    command.execute(args, print, user);
  }
  
  function promptPassword(message, callback) {
    const input = document.getElementById('commandInput');
    const output = document.getElementById('terminalOutput');
  
    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.placeholder = message;
    passwordInput.className = 'password-input';
  
    output.appendChild(passwordInput);
    passwordInput.focus();
  
    passwordInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const password = passwordInput.value;
        output.removeChild(passwordInput);
        callback(password);
      }
    });
  }
