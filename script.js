const startVsPlayerButton = document.querySelector(".vs-player-btn")
const startVsAiButton = document.querySelector("vs-ai-btn")

const characters = document.querySelectorAll(".character")



characters.forEach(ch=>{
    ch.addEventListener('click',MarkChoose)
})


function MarkChoose(e){
    let char = e.target
    let charId
    if(e.target.nodeName == 'DIV'){
        
        charId = char.dataset.characterId
    }
    if(e.target.nodeName == 'IMG'){
        
        charId = char.parentNode.dataset.characterId
    }
    console.log(charId)
}