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
    Mark(charId)

}
let selectedArrPl = []
let selectedArrAi = []

function Mark(charId){
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