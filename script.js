const startVsPlayerButton = document.querySelector(".vs-player-btn")
const startVsAiButton = document.querySelector(".vs-ai-btn")
const characters = document.querySelectorAll(".character")
const info = document.querySelector("#info")

// Settings
info.innerText = ""
info.classList.add("hidden")
//

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

        if(e.target.classList[0]=="vs-player-btn") startGame(0)
        if(e.target.classList[0]=="vs-ai-btn") return
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

function startGame(mode){
    if(mode==0){

    }
}