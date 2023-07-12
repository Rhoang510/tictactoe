const Gameboard = (() => {
  let board = new Array(9).fill("");
  const getBoard = () => board;
  const getValue = index => board[index];
  const setValue = (index, marker) => (board[index] = marker);
  const resetBoard = () => board.fill("");
  return { getBoard, setValue, resetBoard, getValue };
})();

const Player = (name, marker) => {
  let score = 0;
  const getName = () => name;
  const getMarker = () => marker;
  const getScore = () => score;
  const winner = () => ++score;
  return { getName, getMarker, getScore, winner };
};

const gameFlow = (player1Name, player2Name) => {
  const square = document.querySelectorAll(".square");
  const resetBtn = document.querySelector(".reset-btn");
  const changeName = document.querySelector(".changeNames");
  let gameboard = Gameboard;
  let player1 = Player(player1Name, "X");
  let player2 = Player(player2Name, "O");
  let currentPlayer = player1;
  let gameover = false;

  const switchPlayers = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  const alertPlayerTurn = () => {
    currentPlayer === player1
      ? displayController.alertPlayer1turn()
      : displayController.alertPlayer2turn();
  };

  const checkForWin = player => {
    const draw = gameboard.getBoard().every(square => square != "");
    const winner = winConditions.find(winCondition =>
      winCondition.every(
        index => gameboard.getBoard()[index] === player.getMarker()
      )
    );

    if (winner != null) {
      gameover = true;
      displayController.openModal();
      displayController.displayWinner(currentPlayer);
      addWinTotal(currentPlayer);
      resetGameModal();
    }
    if (winner == null && draw) {
      gameover = true;
      displayController.openModal();
      displayController.displayDraw();
      resetGameModal();
    }
  };

  const addWinTotal = player => {
    player.winner();
    currentPlayer =
      currentPlayer === player1
        ? displayController.updatePlayer1Score(currentPlayer)
        : displayController.updatePlayer2Score(currentPlayer);
  };

  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const choosingSquare = square.forEach(square => {
    square.addEventListener("click", e => {
      let index = e.target.dataset.index;
      if (square.textContent === "" && gameover === false) {
        gameboard.setValue(index, currentPlayer.getMarker());
        displayController.renderBoard();
        checkForWin(currentPlayer);
        switchPlayers();
      }
      if (square.textContent != "" && gameover === false) {
        alertPlayerTurn();
      }
    });
  });

  const resetGame = () => {
    gameboard.resetBoard();
    displayController.closeModal();
    currentPlayer = player1;
    gameover = false;
    alertPlayerTurn();
    square.forEach(square => {
      square.textContent = "";
    });
  };

  const resetGameBtn = (() => {
    resetBtn.addEventListener("click", e => {
      resetGame();
    });
  })();

  const resetGameModal = () => {
    const modal = document.querySelector(".modal");
    window.addEventListener("click", e => {
      if (e.target === modal) {
        resetGame();
      }
    });
  };

  const renderDisplay = (() => {
    displayController.displayPlayer1Name(player1);
    displayController.displayPlayer2Name(player2);
    alertPlayerTurn();
  })();

  const changePlayersName = (() => {
    changeName.addEventListener("click", () => {
      location.reload();
    });
  })();

  return {
    switchPlayers,
    currentPlayer,
    gameboard,
    choosingSquare,
    checkForWin,
  };
};

const displayController = (() => {
  const square = document.querySelectorAll(".square");
  const display = document.querySelector(".display");
  const modal = document.querySelector(".modal");
  const playerModal = document.querySelector(".playerModal");
  const p1Name = document.querySelector(".p1Name");
  const p1Score = document.querySelector(".p1Score");
  const p2Name = document.querySelector(".p2Name");
  const p2Score = document.querySelector(".p2Score");
  const player1Turn = document.querySelector(".player1Turn");
  const player2Turn = document.querySelector(".player2Turn");

  const renderBoard = () => {
    for (let i = 0; i < 9; i++) {
      square[i].textContent = Gameboard.getValue(i);
    }
  };

  const displayPlayer1Name = player => {
    p1Name.textContent = player.getName();
  };

  const displayPlayer2Name = player => {
    p2Name.textContent = player.getName();
  };

  const updatePlayer1Score = player => {
    p1Score.textContent = player.getScore();
  };

  const updatePlayer2Score = player => {
    p2Score.textContent = player.getScore();
  };

  const alertPlayer1turn = () => {
    player1Turn.style.scale = "1.1";
    player2Turn.style.scale = "0.9";
    player1Turn.style.color = "rgb(149, 72, 168)";
    player2Turn.style.color = "#fff";
  };

  const alertPlayer2turn = () => {
    player1Turn.style.scale = "0.9";
    player2Turn.style.scale = "1.1";
    player1Turn.style.color = "#fff";
    player2Turn.style.color = "rgb(149, 72, 168)";
  };

  const displayWinner = player => {
    display.textContent = `${player.getName().toUpperCase()} has won!`;
  };

  const displayDraw = () => {
    display.textContent = `It's a draw!`;
  };

  const openModal = () => {
    modal.style.opacity = "1";
    modal.style.visibility = "visible";
  };

  const closeModal = () => {
    modal.style.opacity = "0";
    modal.style.visibility = "hidden";
  };

  const openPlayerModal = () => {
    playerModal.style.opacity = "1";
    playerModal.style.visibility = "visible";
  };

  const closePlayerModal = () => {
    playerModal.style.opacity = "0";
    playerModal.style.visibility = "hidden";
  };

  return {
    renderBoard,
    displayWinner,
    displayDraw,
    openModal,
    closeModal,
    openPlayerModal,
    closePlayerModal,
    displayPlayer1Name,
    displayPlayer2Name,
    updatePlayer1Score,
    updatePlayer2Score,
    alertPlayer1turn,
    alertPlayer2turn,
  };
})();

const startGame = (() => {
  const submitBtn = document.querySelector(".submit-btn");
  const player1Name = document.querySelector(".player1");
  const player2Name = document.querySelector(".player2");

  submitBtn.addEventListener("click", e => {
    let player1 = player1Name.value;
    let player2 = player2Name.value;
    if (player1 === "" || player2 === "") {
      return;
    } else {
      e.preventDefault();
      displayController.closePlayerModal();
      gameFlow(player1, player2);
    }
  });
})();
