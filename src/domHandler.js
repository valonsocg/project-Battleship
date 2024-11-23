const DOMHandler = (() => {
  function renderGameboard(gameboard, boardType, playerType) {
    const boardContainer = document.querySelector(
      `#${playerType}-${boardType}`
    );
    boardContainer.innerHTML = "";

    gameboard.grid.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const cellDiv = document.createElement("div");
        cellDiv.classList.add("cell");

        if (boardType === "board") {
          if (playerType.startsWith("player") && cell === "ship") {
            cellDiv.classList.add("ship");
          }
        } else if (boardType === "attacks") {
          if (cell === "hit") {
            cellDiv.classList.add("hit");
          } else if (cell === "miss") {
            cellDiv.classList.add("miss");
          }
        }

        cellDiv.dataset.coord = `${rowIndex},${colIndex}`;
        boardContainer.appendChild(cellDiv);
      });
    });
  }

  function setupAttackListener(player1Callback, player2Callback) {
    const player1Board = document.querySelector("#player1-attacks");
    const player2Board = document.querySelector("#player2-attacks");

    player1Board.addEventListener("click", (e) => {
      const target = e.target;

      if (
        target.classList.contains("cell") &&
        !target.classList.contains("hit") &&
        !target.classList.contains("miss")
      ) {
        if (target.dataset.coord) {
          const [row, col] = target.dataset.coord.split(",").map(Number);

          if (!isNaN(row) && !isNaN(col)) {
            player1Callback([row, col]);
          }
        }
      }
    });

    player2Board.addEventListener("click", (e) => {
      const target = e.target;

      if (
        target.classList.contains("cell") &&
        !target.classList.contains("hit") &&
        !target.classList.contains("miss")
      ) {
        if (target.dataset.coord) {
          const [row, col] = target.dataset.coord.split(",").map(Number);

          if (!isNaN(row) && !isNaN(col)) {
            player2Callback([row, col]);
          }
        }
      }
    });
  }

  function updateGameboards(playerGameboard, opponentGameboard, playerType) {
    renderGameboard(playerGameboard, "board", playerType);
    renderGameboard(opponentGameboard, "attacks", playerType);
  }

  function displayWinner(winner) {
    const message = document.querySelector("#winner-message");
    message.textContent = `${winner} wins`;
    message.style.display = "block";
  }

  return {
    renderGameboard,
    setupAttackListener,
    updateGameboards,
    displayWinner,
  };
})();

export default DOMHandler;
