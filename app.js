const games = [
  {name:"Grand Theft Auto V", genre:"Open World / Action", icon:"🚗"},
  {name:"Red Dead Redemption", genre:"Action / Adventure", icon:"🤠"},
  {name:"Red Dead Redemption 2", genre:"Action / Adventure", icon:"🐎"},
  {name:"Human Fall Flat", genre:"Puzzle / Platformer", icon:"🧍"},
  {name:"Cricket 24", genre:"Sports / Cricket", icon:"🏏"}
];

const gamesEl=document.getElementById("games");
const search=document.getElementById("search");
const libraryList=document.getElementById("library-list");

function renderGames(list=games){
  gamesEl.innerHTML=list.length?list.map((g,i)=>`
    <article class="game">
      <div>
        <div class="game-art">${g.icon}</div>
        <h3>${g.name}</h3><small>${g.genre}</small>
      </div>
      <div class="game-actions">
        <button onclick="playGame('${g.name}')">▶ Play</button>
        <button onclick="saveGame('${g.name}')">＋ Save</button>
      </div>
    </article>`).join(""):`<p class="muted">No games found.</p>`;
}
function playGame(name){alert(name+" is ready! Connect your real game/browser-game system here.");}
function saveGame(name){
  let saved=JSON.parse(localStorage.getItem("gamecloud-library")||"[]");
  if(!saved.includes(name)) saved.push(name);
  localStorage.setItem("gamecloud-library",JSON.stringify(saved));
  renderLibrary();
}
function removeGame(name){
  let saved=JSON.parse(localStorage.getItem("gamecloud-library")||"[]").filter(x=>x!==name);
  localStorage.setItem("gamecloud-library",JSON.stringify(saved)); renderLibrary();
}
function renderLibrary(){
  const saved=JSON.parse(localStorage.getItem("gamecloud-library")||"[]");
  libraryList.innerHTML=saved.length?saved.map(n=>`<div class="saved"><strong>${n}</strong><button onclick="removeGame('${n}')">Remove</button></div>`).join(""):`<p class="muted">No games saved yet. Tap “Save” on a game to add it here.</p>`;
}
search.addEventListener("input",e=>{
  const q=e.target.value.toLowerCase();
  renderGames(games.filter(g=>(g.name+" "+g.genre).toLowerCase().includes(q)));
});
document.querySelectorAll(".pass-btn").forEach(btn=>btn.addEventListener("click",()=>{
  const plan=btn.dataset.plan, price=btn.dataset.price;
  document.getElementById("pass-status").textContent=`Selected: ${plan} GameCloud Pass — ${price}. Payment can be connected here.`;
  localStorage.setItem("gamecloud-pass",JSON.stringify({plan,price}));
}));
renderGames(); renderLibrary();
