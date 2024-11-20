const DOMHandler = (() => {
  function renderGameboard(gameboard, playerType) {
    const boardContainer = document.querySelector(`#${playerType}-board`);

    boardContainer.innerHTML = "";

    gameboard.grid.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const cellDiv = document.createElement("div");
        cellDiv.classList.add("cell");

        if (cell === "ship" && playerType === "player") {
          cellDiv.classList.add("ship");
        } else if (cell === "hit") {
          cellDiv.classList.add("hit");
        } else if (cell === "miss") {
          cellDiv.classList.add("miss");
        }

        cellDiv.dataset.coord = `${rowIndex},${colIndex}`;
        boardContainer.appendChild(cellDiv);
      });
    });
  }

  function setupAttackListener(callback) {
    const opponentBoard = document.querySelector("#opponent-board");

    opponentBoard.addEventListener("click", (e) => {
      const target = e.target;

      if (
        target.classList.contains("cell") &&
        !target.classList.contains("hit") &&
        !target.classList.contains("miss")
      ) {
        if (target.dataset.coord) {
          const [row, col] = target.dataset.coord.split(",").map(Number);

          if (!isNaN(row) && !isNaN(col)) {
            callback([row, col]);
          }
        }
      }
    });
  }

  function updateGameboard(gameboard, playerType) {
    renderGameboard(gameboard, playerType);
  }

  function displayWinner(winner) {
    const message = document.querySelector("#winner-message");
    message.textContent = `${winner} wins`;
    message.style.display = "block";
  }

  return {
    renderGameboard,
    setupAttackListener,
    updateGameboard,
    displayWinner,
  };
})();

export default DOMHandler;
