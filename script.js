document.addEventListener('DOMContentLoaded', function () {
    const emojis = ['🐱', '🐶', '🐰', '🐻', '🐼', '🐨', '🐯', '🦁'];
  
    const gameBoard = document.getElementById('game-board');
    const gameOverText = document.getElementById('gameOver');
    const logoText = document.querySelector('.logo-text'); 
    let flippedCards = [];
    let matchedCards = [];
  
    function createBoard() {
      const shuffledEmojis = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
  
      for (let emoji of shuffledEmojis) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.addEventListener('click', flipCard);
  
        const cardInner = document.createElement('div');
        cardInner.classList.add('card-inner');
  
        const frontFace = document.createElement('div');
        frontFace.classList.add('card-face', 'front');
        frontFace.textContent = '🤔';
  
        const backFace = document.createElement('div');
        backFace.classList.add('card-face', 'back');
        backFace.textContent = emoji;
  
        cardInner.appendChild(frontFace);
        cardInner.appendChild(backFace);
  
        card.appendChild(cardInner);
  
        gameBoard.appendChild(card);
      }
  
      setTimeout(() => {
        // After a few seconds, reveal the emojis
        document.querySelectorAll('.card').forEach(card => {
          card.classList.add('flipped');
        });
  
        setTimeout(() => {
          // After another few seconds, turn the cards back
          document.querySelectorAll('.card').forEach(card => {
            card.classList.remove('flipped');
          });
        }, 2000);
      }, 1000);
    }
  
    function flipCard() {
      // Exclude the logo text from the card-related operations
      if (
        flippedCards.length < 2 &&
        !this.classList.contains('flipped') &&
        !this.classList.contains('matched') &&
        !this.contains(logoText)
      ) {
        this.classList.add('flipped');
        flippedCards.push(this);
  
        if (flippedCards.length === 2) {
          setTimeout(checkMatch, 500);
        }
      }
    }
  
    function checkMatch() {
      const [card1, card2] = flippedCards;
      const emoji1 = card1.lastElementChild.lastElementChild.textContent;
      const emoji2 = card2.lastElementChild.lastElementChild.textContent;
  
      if (emoji1 === emoji2) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        card1.style.backgroundColor = '#8eff8e';
        card2.style.backgroundColor = '#8eff8e';
        matchedCards.push(card1, card2);
  
        if (matchedCards.length === emojis.length * 2) {
          // All cards are matched, trigger game over animation
          gameOver();
        }
      } else {
        setTimeout(() => {
          card1.classList.remove('flipped');
          card2.classList.remove('flipped');
        }, 500);
      }
  
      flippedCards = [];
    }
  
    function gameOver() {
      const cards = document.querySelectorAll('.card');
      cards.forEach(card => card.classList.add('game-over-fade'));
  
      // Display "Game Over" text with animation
      gameOverText.style.opacity = 1;
      gameOverText.style.animation = 'fadeIn 1s ease-in-out 2s';
  
      // Automatically restart the game after a delay
      setTimeout(() => {
        restartGame();
      }, 3000);
    }
  
    function restartGame() {
      const cards = document.querySelectorAll('.card');
      cards.forEach(card => card.parentNode.removeChild(card));
      gameOverText.style.opacity = 0;
  
      matchedCards = [];
      createBoard();
    }
  
    createBoard();
  });
  
