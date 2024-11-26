document.addEventListener('DOMContentLoaded', () => {
  const playerChoiceDisplay = document.getElementById('player-choice');
  const computerChoiceDisplay = document.getElementById('computer-choice');
  const resultDisplay = document.getElementById('result');
  const scoreDisplay = document.getElementById('score');
  const choiceButtons = document.querySelectorAll('.choice-btn');
  const resetButton = document.getElementById('reset');

  let score = 0;
  let isAnimating = false;

  const choices = {
    rock: '✊',
    paper: '✋',
    scissors: '✌️'
  };

  function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    return choices[Math.floor(Math.random() * choices.length)];
  }

  function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) return 'draw';
    
    const wins = {
      rock: 'scissors',
      paper: 'rock',
      scissors: 'paper'
    };
    
    return wins[playerChoice] === computerChoice ? 'win' : 'lose';
  }

  function updateScore(result) {
    if (result === 'win') score++;
    else if (result === 'lose') score = Math.max(0, score - 1);
    scoreDisplay.textContent = score;
  }

  function displayResult(result) {
    resultDisplay.textContent = result === 'win' ? 'You Win!' :
                               result === 'lose' ? 'You Lose!' :
                               'Draw!';
    resultDisplay.className = 'result ' + result;
  }

  function resetDisplays() {
    playerChoiceDisplay.textContent = '?';
    computerChoiceDisplay.textContent = '?';
    resultDisplay.textContent = '';
    resultDisplay.className = 'result';
  }

  function handleChoice(e) {
    if (isAnimating) return;
    
    isAnimating = true;
    const playerChoice = e.currentTarget.dataset.choice;
    
    // Update selected button state
    choiceButtons.forEach(btn => btn.classList.remove('selected'));
    e.currentTarget.classList.add('selected');
    
    // Disable buttons during animation
    choiceButtons.forEach(btn => btn.disabled = true);
    
    // Show player's choice
    playerChoiceDisplay.textContent = choices[playerChoice];
    computerChoiceDisplay.textContent = '?';
    resultDisplay.textContent = '';
    
    // Simulate computer thinking
    setTimeout(() => {
      const computerChoice = getComputerChoice();
      computerChoiceDisplay.textContent = choices[computerChoice];
      
      const result = determineWinner(playerChoice, computerChoice);
      displayResult(result);
      updateScore(result);
      
      // Re-enable buttons
      choiceButtons.forEach(btn => btn.disabled = false);
      isAnimating = false;
    }, 1000);
  }

  function resetGame() {
    score = 0;
    scoreDisplay.textContent = '0';
    resetDisplays();
    choiceButtons.forEach(btn => {
      btn.classList.remove('selected');
      btn.disabled = false;
    });
    isAnimating = false;
  }

  // Event Listeners
  choiceButtons.forEach(button => {
    button.addEventListener('click', handleChoice);
  });

  resetButton.addEventListener('click', resetGame);
});