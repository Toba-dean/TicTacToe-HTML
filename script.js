// getting all the reference to the DOM

const selectBox = document.querySelector('.select-box');
const selectXBtn = selectBox.querySelector('.playerX');
const selectOBtn = selectBox.querySelector('.playerO');
const playBoard = document.querySelector('.playboard');
const allBox = document.querySelectorAll('section span');
const allPlayer = document.querySelector('.players');


const playGame = () => {
  if (selectOBtn.classList[0] === 'playerO') {
    allPlayer.classList.add('active')
  }
  selectBox.classList.add('hide');
  playBoard.classList.add('show');

}

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
    element.innerHTML = 'O'
    allPlayer.classList.add('active')
  } else {
    element.innerHTML = 'X'
    allPlayer.classList.add('active')
  }
  element.style.pointerEvents = 'none'

  // get a random no from 0 - 1000 plus 200
  let randomDelay = ((Math.random() * 1000) + 200).toFixed()

  // console.log(randomDelay);

  // make bot delay before playing
  setTimeout(() => {
    botClick()
  }, randomDelay)
}

// Bot click function
function botClick() {
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
    } else {
      allBox[randomBox].innerHTML = 'O'
      allPlayer.classList.remove('active')
    }
  }

  allBox[randomBox].style.pointerEvents = 'none'
}