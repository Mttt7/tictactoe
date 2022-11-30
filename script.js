const startVsPlayerButton = document.querySelector(".vs-player-btn")
const startVsAiButton = document.querySelector(".vs-ai-btn")
const characters = document.querySelectorAll(".character")
const info = document.querySelector("#info")

const gameSettings = document.querySelector(".game-settings")
const gameArea = document.querySelector(".game")
const restartButton = document.querySelector(".restart")

const playerImage = document.querySelector("#player-image")
const aiImage = document.querySelector("#ai-image")

// Settings
info.innerText = ""
info.classList.add("hidden")
gameArea.classList.add("hidden")
//


restartButton.addEventListener('click',()=>{
    info.innerText = ""
    info.classList.add("hidden")
    gameArea.classList.add("hidden")
    gameSettings.classList.remove("hidden")
    
    playerImage.src=`${ch1}`
    aiImage.src = `${ch2}`
})

characters.forEach(ch=>{
    ch.addEventListener('click',markChoose)
})


function markChoose(e){
    info.innerText = ""
    info.classList.add("hidden")
    let char = e.target
    let charId
    if(e.target.nodeName == 'DIV'){
        
        charId = char.dataset.characterId
    }
    if(e.target.nodeName == 'IMG'){
        
        charId = char.parentNode.dataset.characterId
    }
    console.log(charId)
    mark(charId)

}
let selectedArrPl = []
let selectedArrAi = []

function mark(charId){
    let selected = document.querySelector(`[data-character-id="${charId}"]`)
    if(selectedArrPl.includes(charId) || selectedArrAi.includes(charId)){
       if(charId==0 || charId==1 || charId==2){
        selectedArrPl = selectedArrPl.filter(ch => ch!=charId)
       }
        if(charId==3 || charId==4 || charId==5){
            selectedArrAi = selectedArrAi.filter(ch => ch!=charId)
        }

        selected.children[0].classList.remove("selected")
    }else{
        if(charId==0 || charId==1 || charId==2){
            if(selectedArrPl.length>=1){
                let old = document.querySelector(`[data-character-id="${selectedArrPl[0]}"]`)
                old.children[0].classList.remove("selected")
                selectedArrPl=[]
            }
            selectedArrPl.push(charId)
        }
        if(charId==3 || charId==4 || charId==5){
            if(selectedArrAi.length>=1){
                let old = document.querySelector(`[data-character-id="${selectedArrAi[0]}"]`)
                old.children[0].classList.remove("selected")
                selectedArrAi=[]
            }
           
            selectedArrAi.push(charId)
        }
        
        selected.children[0].classList.add("selected")
    }
    
}


startVsPlayerButton.addEventListener('click',chooseMode)
startVsAiButton.addEventListener('click',chooseMode)

function characterChosen(){
    if (selectedArrPl.length==1 && selectedArrAi.length==1) return 0 //git
    if (selectedArrPl.length==1 && selectedArrAi.length!=1) return 1 //wybrac evila
    if (selectedArrPl.length!=1 && selectedArrAi.length==1) return 2 // wybrac playera
    else return -1 //wybrac wszystko
}

function chooseMode(e){
    //player - 0
    //ai - 1
    
    if(characterChosen()==0){
        
        ch1= document.querySelector(`[data-character-id="${selectedArrPl[0]}"]`).children[0].src
        console.log(ch1)
        ch2=document.querySelector(`[data-character-id="${selectedArrAi[0]}"]`).children[0].src
        console.log(ch2)

        if(e.target.classList[0]=="vs-player-btn") startGame(0,ch1,ch2)
        if(e.target.classList[0]=="vs-ai-btn") startGame(1,ch1,ch2)
    }
    if(characterChosen()==2){
        info.classList.remove("hidden")
        console.log("Wybierz bohatera dla gracza!")
        info.innerText = "Wybierz bohatera dla gracza!"
    }
    if(characterChosen()==1){
        info.classList.remove("hidden")
        console.log("wybierz bohatera dla ai!")
        info.innerText = "Wybierz bohatera dla ai!"
    }
    if(characterChosen()==-1){
        info.classList.remove("hidden")
        console.log("Wybierz bohaterow!")
        info.innerText = "Wybierz bohaterow!"
    }
    
}

function startGame(mode,ch1,ch2){
    //vsplayer  = 0
    if(mode==0){
        gameSettings.classList.add("hidden")
        gameArea.classList.remove("hidden")
        game(ch1,ch2)
    }
    if(mode==1){
        info.classList.remove("hidden")
        info.innerText = "Coming soon :P"
    }
    
}   

function game(ch1,ch2){

    playerImage.src=`${ch1}`
    aiImage.src = `${ch2}`
   
}