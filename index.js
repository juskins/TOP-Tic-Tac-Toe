const startGameBtn = document.querySelector('.startGame');
const restartGameBtn = document.querySelector('.restartGame')
const GameSurface = document.querySelector('.gameboard')
const player1 = document.querySelector('.player1')
const player2 = document.querySelector('.player2')
const message = document.querySelector('.message')



const createPlayer = (name,mark)=>{
     return {name,mark}
}

const showMessage = (()=>{
     const displayWinner = (displayedMessage)=>{
          message.textContent = displayedMessage
          message.style.display = 'block'
               setTimeout(() => {
                    message.style.display = 'none'
               }, 3000);
     }
     return {displayWinner}
})()

const Game = (()=>{
     let players = [];
     let currentPlayerIndex;
     let gameOver;



     const start = ()=>{
          players = [createPlayer(player1.value,'X'),createPlayer(player2.value,'O')]
          currentPlayerIndex = 0
          gameOver = false;
          GameBoard.render();
     }

     const restart = ()=>{
          for(let i=0;i<9;i++){
               GameBoard.update(i,"")
          }
          gameOver = false

     }

     const checkWinner = ()=>{
          for (const combination of GameBoard.winningCombinations) {
               const [a, b, c] = combination;
               const firstElement = GameBoard.gameboard[a];
               if (firstElement && GameBoard.gameboard[b] === firstElement && GameBoard.gameboard[c] === firstElement) {
                    return true;
               }
             }
          
          return false;
     }

     const checkForTie = (board)=>{
          return board.every(cell=> cell !== "")
     }
    

     const handleClick = (e)=>{
          if(gameOver){
               restart()
          }
          let index = parseInt(e.target.id.split('-')[1])
          if(GameBoard.gameboard[index] !== ""){
               return;
          }
          GameBoard.update(index,players[currentPlayerIndex].mark)
          if(checkWinner()){
               gameOver = true;
              showMessage.displayWinner(`${players[currentPlayerIndex].name} (${players[currentPlayerIndex].mark}) wins`)
          }
          else if(checkForTie(GameBoard.gameboard)){
               gameOver = true;
              showMessage.displayWinner('It\'s a tie')
          }

          currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;


     }
     
     return {gameOver,start,restart,handleClick,checkWinner}
})()

startGameBtn.onclick =()=>{
     Game.start()
}
restartGameBtn.onclick =()=>{
     Game.restart()
}





const GameBoard = (()=>{
     let gameboard = ['','','','','','','','',''];

     const winningCombinations = [
          [0, 1, 2], // Rows
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6], // Columns
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8], // Diagonals
          [2, 4, 6]
        ];

     const render = ()=>{
          let boardHTML = ''
          gameboard.map((item,index)=>{
               boardHTML += `<div class='square' id='square-${index}'>${item}</div>`

          })
          GameSurface.innerHTML = boardHTML
          const allSquares = document.querySelectorAll('.square');
          allSquares.forEach(square=>{
               square.addEventListener('click',Game.handleClick)
          })
     }

     const update = (index,playerMark) =>{
          gameboard[index] = playerMark;
          render();
          
     }

     return {winningCombinations,gameboard,render,update}
})()


