// getting all the reference to the DOM

const selectBox = document.querySelector('.select-box');
const selectXBtn = selectBox.querySelector('.playerX');
const selectOBtn = selectBox.querySelector('.playerO');
const playBoard = document.querySelector('.playboard');
const allBox = document.querySelectorAll('section span');
const allPlayer = document.querySelector('.players');
const result = document.querySelector('.result-box');
const resultText = document.querySelector('.won-text');
const resultBtn = result.querySelector('.btn');


let playerSign = 'x'
let runBot = true

window.onload = () => {
  allBox.forEach(box => {
    box.setAttribute('onclick', 'clickedBox(this)')
  });

  selectXBtn.onclick = () => {
    selectBox.classList.add('hide');
    playBoard.classList.add('show');
  };
  selectOBtn.onclick = () => {
    selectBox.classList.add('hide');
    playBoard.classList.add('show');
    allPlayer.setAttribute('class', 'players active player')
  };
}


// User click function
function clickedBox(element) {
  if (allPlayer.classList.contains('player')) {
    playerSign = 'o'
    element.innerHTML = 'O'
    allPlayer.classList.add('active')
    element.setAttribute('id', playerSign)
  } else {
    element.innerHTML = 'X'
    playBoard.style.pointerEvents = 'none'
    element.setAttribute('id', playerSign)
  }

  selectWinner()
  playBoard.classList.add('active')
  element.style.pointerEvents = 'none'

  // get a random no from 0 - 1000 plus 200
  let randomDelay = ((Math.random() * 1000) + 200).toFixed()

  // console.log(randomDelay);

  // make bot delay before playing
  setTimeout(() => {
    botClick(runBot)
  }, randomDelay)
}

// Bot click function
function botClick(runBot) {
  if (runBot) {
    let array = []

    // for all the boxes check if they have any text, if not push their indexes to the empty array.
    allBox.forEach((ele, i) => {
      if (ele.innerText == '') {
        array.push(i)
      }
    })

    // get a random no btw 0 and the array length no
    let randomNo = Math.floor(Math.random() * array.length)

    // select a random box from the index in the array
    let randomBox = array[randomNo]
    // console.log(randomBox);

    // if element is in the array play accordingly.
    if (array.length > 0) {
      if (allPlayer.classList.contains('player')) {
        allBox[randomBox].innerHTML = 'X'
        allPlayer.classList.add('active')
        allBox[randomBox].setAttribute('id', playerSign)
      } else {
        playerSign = 'o'
        allBox[randomBox].innerHTML = 'O'
        allPlayer.classList.remove('active')
        allBox[randomBox].setAttribute('id', playerSign)
      }

      selectWinner()
    }

    allBox[randomBox].style.pointerEvents = 'none'
    playBoard.style.pointerEvents = 'auto'
    playerSign = 'x'
  }
}


// Select winner function
function getId(idNo) {
  return document.querySelector('.box' + idNo).id
}

function checkThreeIds(val1, val2, val3, sign) {
  if (getId(val1) == sign && getId(val2) == sign && getId(val3) == sign) {
    return true;
  }
}

function selectWinner() {
  if (checkThreeIds(1, 2, 3, playerSign) || checkThreeIds(4, 5, 6, playerSign) || checkThreeIds(7, 8, 9, playerSign) || checkThreeIds(1, 4, 7, playerSign) || checkThreeIds(2, 5, 8, playerSign) || checkThreeIds(3, 6, 9, playerSign) || checkThreeIds(1, 5, 9, playerSign) || checkThreeIds(3, 5, 7, playerSign)) {
    console.log(playerSign + " is the winner.");
    runBot = false
    botClick(runBot)

    setTimeout(() => {
      playBoard.classList.remove('show');
      result.classList.add('show');
    }, 500);

    resultText.innerHTML = `Player <span> ${playerSign} </span> won the game.`
  } else {
    if(getId(1) !== '' && getId(2) !== '' && getId(3) !== '' && getId(4) !== '' && getId(5) !== '' && getId(6) !== '' && getId(7) !== '' && getId(8) !== '' && getId(9) !== '') {
      runBot = false
      botClick(runBot)
  
      setTimeout(() => {
        playBoard.classList.remove('show');
        result.classList.add('show');
      }, 500);
  
      resultText.innerText = `The game has ended in a draw..`
    }
  }
}

resultBtn.onclick = () => {
  window.location.reload()
}