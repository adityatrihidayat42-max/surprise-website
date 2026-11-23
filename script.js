const intro=document.getElementById("intro");
const app=document.getElementById("app");
function startSite(){
  if(!intro||!app||intro.classList.contains("hidden"))return;
  const envelope=document.getElementById("introEnvelope");
  const hint=document.getElementById("introEnvelopeHint");
  const button=document.getElementById("skipIntro");
  if(envelope?.classList.contains("opened"))return;
  envelope?.classList.add("opened");
  if(hint)hint.textContent="hadiah kecilmu sudah menunggu";
  if(button)button.textContent="SELAMAT DATANG";
  setTimeout(()=>{intro.style.opacity="0";setTimeout(()=>{intro.classList.add("hidden");app.classList.remove("hidden");window.scrollTo({top:0,behavior:"instant"});},650);},1050);
}
document.getElementById("skipIntro")?.addEventListener("click",startSite);
const screens=[...document.querySelectorAll(".screen")];
function showScreen(id){
  screens.forEach(screen=>screen.classList.toggle("active",screen.id===id));
  document.body.classList.toggle("playlist-open",id==="playlist");
  window.scrollTo({top:0,behavior:"smooth"});
}
document.querySelectorAll("[data-go]").forEach(button=>button.addEventListener("click",()=>showScreen(button.dataset.go)));
document.querySelectorAll(".back").forEach(button=>button.addEventListener("click",()=>showScreen("home")));
const giftButton=document.getElementById("openGift");
giftButton?.addEventListener("click",()=>{
  const note=document.getElementById("giftNote");
  const open=note?.classList.toggle("show")??false;
  note?.setAttribute("aria-hidden",String(!open));
  giftButton.setAttribute("aria-expanded",String(open));
  giftButton.querySelector("span:last-child").textContent=open?"TUTUP CATATAN":"BUKA CATATAN KECIL";
});
document.getElementById("playMini")?.addEventListener("click",()=>showScreen("playlist"));
document.getElementById("playMain")?.addEventListener("click",()=>{
  const screen=document.querySelector("#playlist .tv-screen");
  const button=document.getElementById("playMain");
  if(!screen||!button)return;
  const current=screen.querySelector("iframe.tv-youtube");
  if(current){current.remove();screen.classList.remove("is-playing");button.textContent="▶ PUTAR";return;}
  const player=document.createElement("iframe");
  player.className="tv-youtube";
  player.src="https://www.youtube-nocookie.com/embed/UppBA4u9pyQ?autoplay=1&start=120&end=191&playsinline=1&rel=0";
  player.title="LANY - you!";
  player.allow="autoplay; encrypted-media";
  player.setAttribute("aria-hidden","true");
  screen.appendChild(player);
  requestAnimationFrame(()=>screen.classList.add("is-playing"));
  button.textContent="■ BERHENTI";
});
const sparkle=document.querySelector(".sparkles");
if(sparkle){
  for(let i=0;i<26;i++){
    const dot=document.createElement("span");
    dot.setAttribute("aria-hidden","true");
    dot.className="ambient-dot";
    dot.style.left=(Math.random()*100)+"%";
    dot.style.top=(Math.random()*100)+"%";
    dot.style.animationDelay=(Math.random()*5)+"s";
    sparkle.appendChild(dot);
  }
}
