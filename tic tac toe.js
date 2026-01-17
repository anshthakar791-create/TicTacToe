// tic_tac_toe.js  (use this exact filename, no spaces)
(() => {
  // DOM references
  const boxes = Array.from(document.querySelectorAll(".box"));
  const resetBtn = document.querySelector("#rb");
  const newGameBtn = document.querySelector("#new");
  const popup = document.querySelector("#popup");
  const msg = document.querySelector("#msg");
  const mode = document.querySelector("#mode");
  const turnText = document.querySelector("#turnText");
  const oScoreEl = document.getElementById("oScore");
  const xScoreEl = document.getElementById("xScore");
  const drawScoreEl = document.getElementById("drawScore");
  const modeBtn = document.querySelector("#modeBtn");

  // Audio (correct)
  let clickSound = new Audio("click.wav");
  let winSound = new Audio("win.wav");
  let drawSound = new Audio("draw.wav");

  // game state
  let turnO = true; // O starts
  let oScore = 0, xScore = 0, drawScore = 0;

  const winningPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  // Helpers
  function play(sound){
    if(!sound) return;
    try { sound.currentTime = 0; sound.play(); } catch(e){}
  }

  function setTurnText(){
    turnText.innerText = `Turn: ${turnO ? "O" : "X"}`;
  }

  function updateScoresUI(){
    oScoreEl.innerText = oScore;
    xScoreEl.innerText = xScore;
    drawScoreEl.innerText = drawScore;
  }

  function resetBoard(){
    boxes.forEach(b => {
      b.innerText = "";
      b.disabled = false;
      b.classList.remove("win");
    });
    popup.classList.add("hide");
    turnO = true;
    setTurnText();
  }

  function disableBoxes(){
    boxes.forEach(b => b.disabled = true);
  }

  function announceWinner(winner, pattern){
    // highlight
    pattern.forEach(i => boxes[i].classList.add("win"));

    // update scores
    if(winner === "O") oScore++;
    if(winner === "X") xScore++;

    updateScoresUI();

    msg.innerText = `WINNER IS: ${winner}`;
    popup.classList.remove("hide");

    play(winSound);

    if(window.confetti){
      confetti({ particleCount: 160, spread: 140, origin: { y: 0.4 } });
      setTimeout(()=>confetti({particleCount:80, spread:100, origin:{y:0.6}}), 200);
      setTimeout(()=>confetti({particleCount:50, spread:80, origin:{y:0.5}}), 500);
    }
  }

  function announceDraw(){
    drawScore++;
    updateScoresUI();
    msg.innerText = "MATCH DRAW!";
    popup.classList.remove("hide");

    play(drawSound);
  }

  function checkWinnerReturn(){
    for(const pattern of winningPatterns){
      const [a,b,c] = pattern;
      const v1 = boxes[a].innerText;
      const v2 = boxes[b].innerText;
      const v3 = boxes[c].innerText;

      if(v1 !== "" && v1 === v2 && v2 === v3){
        return { winner: v1, pattern };
      }
    }

    const allFilled = boxes.every(b => b.innerText !== "");
    if(allFilled) return { winner: "DRAW" };

    return null;
  }

  // AI smart logic
  function aiMoveSmart(){
    const board = boxes.map(b => b.innerText || "");

    const tryFind = (symbol) => {
      for(const pattern of winningPatterns){
        const [a,b,c] = pattern;
        const vals = [board[a], board[b], board[c]];
        const countSym = vals.filter(v => v === symbol).length;
        const emptyIndex = [a,b,c].find(i => board[i] === "");
        if(countSym === 2 && emptyIndex !== undefined) return emptyIndex;
      }
      return -1;
    };

    // 1) AI tries to win
    let idx = tryFind("X");
    if(idx !== -1) return placeMove(idx, "X");

    // 2) AI blocks O
    idx = tryFind("O");
    if(idx !== -1) return placeMove(idx, "X");

    // 3) Center
    if(board[4] === "") return placeMove(4, "X");

    // 4) Corner
    const corners = [0,2,6,8].filter(i => board[i] === "");
    if(corners.length){
      const pick = corners[Math.floor(Math.random()*corners.length)];
      return placeMove(pick, "X");
    }

    // 5) Random
    const empties = board.map((v,i)=> v==="" ? i : -1).filter(i=>i!==-1);
    if(empties.length){
      const pick = empties[Math.floor(Math.random()*empties.length)];
      return placeMove(pick, "X");
    }
  }

  function placeMove(index, symbol){
    const btn = boxes[index];
    if(btn.innerText !== "") return;

    btn.innerText = symbol;
    btn.disabled = true;

    play(clickSound);

    const res = checkWinnerReturn();
    if(res){
      if(res.winner === "DRAW"){
        announceDraw();
        disableBoxes();
      } else {
        announceWinner(res.winner, res.pattern);
        disableBoxes();
      }
      return;
    }

    turnO = (symbol === "X") ? true : false;
    setTurnText();
  }

  boxes.forEach((b, idx) => {
    b.addEventListener("click", () => {
      if(b.innerText !== "") return;

      const current = turnO ? "O" : "X";
      placeMove(idx, current);

      // AI move
      if(mode.value === "ai" && !turnO){
        setTimeout(aiMoveSmart, 300);
      }
    });
  });

  newGameBtn.addEventListener("click", resetBoard);
  resetBtn.addEventListener("click", resetBoard);

  popup.addEventListener("click", e => {
    if(e.target === popup) popup.classList.add("hide");
  });

  let dark = true;
  modeBtn.addEventListener("click", () => {
    dark = !dark;
    document.body.className = dark ? "dark" : "light";
    modeBtn.innerText = dark ? "Light Mode" : "Dark Mode";
  });

  function init(){
    resetBoard();
    updateScoresUI();
    setTurnText();
  }

  init();

})();
