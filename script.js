const keys = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P','A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L','Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Space', 'Backspace'
  ];
  
  const keyboard = document.getElementById('keyboard');

  const output = document.getElementById('output');

  const themeToggle = document.getElementById('theme-toggle');

  const capsToggle = document.getElementById('caps-toggle');

  const wpmDisplay = document.getElementById('cpm');

  let capsLock = false;
  let startTime = null;
  
  keys.forEach(key => {

    const keyElement = document.createElement('button');

    keyElement.textContent = key === 'Space' ? '␣' : key;
    
         keyElement.classList.add('key');
    keyElement.addEventListener('click', () => handleKeyPress(key));

    keyElement.addEventListener('contextmenu', (e) => customizeKey(e, keyElement));

    keyboard.appendChild(keyElement);
            });
  
  function handleKeyPress(key) {

    if (!startTime) startTime = Date.now();
  
    if (key === 'Backspace') {

      output.value = output.value.slice(0, -1);

    } 
    
    else if (key === 'Space') {
      output.value += ' ';
    } 
    else {
      output.value += capsLock ? key.toUpperCase() : key.toLowerCase();
    }
  
    updateCPM();
    animateKeyPress(key);
  }
  
  function customizeKey(event, keyElement) {

    event.preventDefault();

    const newLabel = prompt('Enter new label for this key:');

    if (newLabel && newLabel.trim()) {

      keyElement.textContent = newLabel.trim();

    }
  }
  
  
  function animateKeyPress(key) {

    const keyElement = Array.from(document.getElementsByClassName('key')).find(el => el.textContent === key || (key === 'Space' && el.textContent === '␣'));

    if (keyElement) {

            keyElement.classList.add('active');

      setTimeout(() => keyElement.classList.remove('active'), 200);
                    }
  }
  
  capsToggle.addEventListener('click', () => 
    {
    capsLock = !capsLock;
    capsToggle.textContent = `Caps Lock: ${capsLock ? 'On' : 'Off'}`;
  });
  
  themeToggle.addEventListener('click', () => {
    const randomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
    
    document.documentElement.style.setProperty('--key-bg', randomColor());

    document.documentElement.style.setProperty('--key-hover', randomColor());
  });
  
  function updateCPM() 
  {

    const Minutes = (Date.now() - startTime) / 60000;

    const wordCount = output.value.split(/\s+/).filter(word => word).length;

    wpmDisplay.textContent = Math.floor(wordCount / Minutes);

  }
  

