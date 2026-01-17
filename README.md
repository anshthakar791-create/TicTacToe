🎮 Advanced Tic Tac Toe Game

A feature-rich Tic Tac Toe game built using HTML, CSS, and JavaScript, featuring hard-level computer AI, dark/light mode, sound effects, score tracking, and a clean modern UI.

This project focuses on game logic, decision-making algorithms, and user experience, not just visuals.

🚀 Features

✅ Player vs Player mode

🤖 Player vs Computer (Hard Mode AI)

🌙 Dark Mode & ☀️ Light Mode toggle

🔊 Sound effects for clicks, wins, and draws

🏆 Score tracking (O wins, X wins, Draws)

✨ Winning line highlight + confetti animation

♻️ New Game & Reset functionality

📱 Responsive and clean UI

🧠 AI Logic (Hard Mode)

The computer opponent uses smart decision logic, not random moves:

Winning move – AI completes a winning pattern if possible

Blocking move – Prevents the player from winning

Center priority – Takes center if available

Corner strategy – Chooses corners strategically

Fallback random move – Used only when no better option exists

This makes the AI challenging and competitive.

🛠️ Technologies Used

HTML5 – Game structure

CSS3 – Modern UI, dark/light themes

JavaScript (Vanilla) – Game logic & AI

Audio API – Sound effects

📁 Project Structure
├── index.html
├── style.css
├── tic_tac_toe.js
├── click.wav
├── win.wav
├── draw.wav
└── assets / images


JavaScript logic is fully contained in
tic_tac_toe.js (IIFE-based, no global pollution)
