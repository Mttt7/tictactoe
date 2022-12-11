const startVsPlayerButton = document.querySelector(".vs-player-btn")
const startVsAiButton = document.querySelector(".vs-ai-btn")
const characters = document.querySelectorAll(".character")
const info = document.querySelector("#info")

const gameSettings = document.querySelector(".game-settings")
const gameArea = document.querySelector(".game")
const restartButton = document.querySelector(".restart")

const gameBoard = document.querySelector(".game-board")
const cells = document.querySelectorAll(".cell")


const playerImage = document.querySelector("#player-image")
const aiImage = document.querySelector("#ai-image")


const gameEndModal = document.querySelector("#end-game-modal")
const winnerText = document.querySelector("#winner")


// Settings
info.innerText = ""
info.classList.add("hidden")
gameArea.classList.add("hidden")
gameEndModal.classList.add("hidden")
//


restartButton.addEventListener('click',()=>{
    
    info.innerText = ""
    info.classList.add("hidden")
    gameArea.classList.add("hidden")
    gameSettings.classList.remove("hidden")

    //playerImage.src=`${ch1}`
    //aiImage.src = `${ch2}`
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
        //console.log(ch1)
        ch2=document.querySelector(`[data-character-id="${selectedArrAi[0]}"]`).children[0].src
       // console.log(ch2)

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
    player.resetPoints()
    ai.resetPoints()
    updatePoints()

    if(mode==0){


        gameSettings.classList.add("hidden")
        gameArea.classList.remove("hidden")
        game(ch1,ch2,mode)
    }
    if(mode==1){
        info.classList.remove("hidden")
        info.innerText = "Coming soon :P"
    }
    
}   


const playerFactory = (playerId) =>{
    let arr = []
    let points=0

    const win = ()=>{
        points++
    }
    const getPoints = ()=>{
        return points
    }
    const drawFigure = (cellId) =>{
        if(playerId==0){
                arr.push(Number(cellId))
                gameBoard.children[cellId].children[0].src="/images/X.png"
                gameBoard.children[cellId].dataset.selected="1"
                if(arr.length>=3) checkWinner(playerId,arr)
                //console.log("PLAYER ARR:",arr)
        }

        if(playerId==1){
                arr.push(Number(cellId))
                gameBoard.children[cellId].children[0].src="/images/O.png"
                gameBoard.children[cellId].dataset.selected="1"
                if(arr.length>=3) checkWinner(playerId,arr)
                //console.log("AI ARR:",arr)
        }

    }

    const resetPoints = ()=>{
            points=0
    }
    const reset = (cellId)=>{
        
        arr=[]
        cells.forEach(c=>{
            c.children[0].src=""
            c.dataset.selected="0"
        })
    }

    return {drawFigure,reset,getPoints,win,resetPoints}
}


const toogleTurnFactory = ()=>{

    let turn = 0

    const newGame =()=>{
        //zmienic zeby co runde inny gracz zaczynal
        turn=0
    }
    const reset = ()=>{
        turn=0
    }
    const changeTurn = ()=>{
        if(turn==0){
            turn = 1
            
        } 
        else if(turn==1){
            turn=0
            
        }
    }

    const getTurn = ()=> turn
    return {getTurn,changeTurn,newGame,reset}
    
}

const player = playerFactory(0)
const ai = playerFactory(1)
let tChanger = toogleTurnFactory()


function checkWinner(id,arr){
    let winningMethod=[]
    //console.log(arr)
    let gameOver =false

    

    if(arr.includes(0) && arr.includes(1) && arr.includes(2)){
        winningMethod=[0,1,2]
        gameOver=true
    }
    else if(arr.includes(3) && arr.includes(4) && arr.includes(5)){
        winningMethod=[3,4,5]
        gameOver=true
    }
    else if(arr.includes(6) && arr.includes(7) && arr.includes(8)){
        winningMethod=[6,7,8]
        gameOver=true
    }
    else if(arr.includes(0) && arr.includes(3) && arr.includes(6)){
        winningMethod=[0,3,6]
        gameOver=true
    }
    else if(arr.includes(1) && arr.includes(4) && arr.includes(7)){
        winningMethod=[1,4,7]
        gameOver=true
    }
    else if(arr.includes(2) && arr.includes(5) && arr.includes(8)){
        winningMethod=[2,5,8]
        gameOver=true
    }
    else if(arr.includes(0) && arr.includes(4) && arr.includes(8)){
        winningMethod=[0,4,8]
        gameOver=true
    }

    else if(arr.includes(2) && arr.includes(4) && arr.includes(6)){
        winningMethod=[2,4,6]
        gameOver=true
    }
    else if(arr.length==5){
        console.log("LENGHT %%%%")
        gameOver=true
        winningMethod=[]
    }

    if(gameOver){
        cells.forEach(c => c.removeEventListener('click',handleEvent))
        scaleWinningFiguresON(winningMethod)
        //console.log("gameover")
        setTimeout(() => {  resetRound(winningMethod,id) }, 1000);
        setTimeout(() => {  scaleWinningFiguresOFF(winningMethod) }, 1000);
        setTimeout(() => {  cells.forEach(c => c.addEventListener('click',handleEvent)) }, 1000);
        

        
    }
    
        
}
  

function scaleWinningFiguresON(winningMethod){
   
    if(winningMethod.length==0) return
    else{
        for(let i=0;i<3;i++){
            gameBoard.children[winningMethod[i]].children[0].classList.add("winner")
        }
    }
    
}
function scaleWinningFiguresOFF(winningMethod){
    if(winningMethod.length==0) return
    else{
        for(let i=0;i<3;i++){
            gameBoard.children[winningMethod[i]].children[0].classList.remove("winner")
        }
    }
}
   
    
function handleEvent(e){

    let turn = tChanger.getTurn()
    tChanger.changeTurn()
    
    if(turn==0){
        
        if(e.target.dataset.selected=="1") return
        player.drawFigure(e.target.dataset.cellId)
    }
    if(turn==1){
        if(e.target.dataset.selected=="1") return
        ai.drawFigure(e.target.dataset.cellId)

    }
    
}


function game(ch1,ch2,mode){

    playerImage.src=`${ch1}`
    aiImage.src = `${ch2}`
    tChanger.reset()
    player.reset()
    ai.reset()
    

    cells.forEach(c =>{
        c.addEventListener('click',handleEvent)
    })
   
}

//Resets:

function resetRound(winningMethod,id){
    console.log("WINNING<METHOD>LENGTH", winningMethod.length)
    if(winningMethod.length==0){
        console.log("DRAWDARADRADRADRA")
        //0-player 1-ai 2-draw
        displayOutcome(2)
    }
    else if(id==0){
        displayOutcome(0)
        player.win()
        updatePoints()
    }
    else if(id==1){
        displayOutcome(1)
        ai.win()
        updatePoints()
    }
    player.reset()
    ai.reset()
    winningMethod = []
    checkIfWarOver()
}





function showEndGameModal(id){
    setTimeout(() => {  gameEndModal.classList.add("hidden") }, 1500);
    cells.forEach(c => c.addEventListener('click',handleEvent))
    info.innerText = ""
    info.classList.add("hidden")
    gameArea.classList.add("hidden")
    gameSettings.classList.remove("hidden")
    gameEndModal.classList.remove("hidden")
    player.resetPoints()
    ai.resetPoints()
    updatePoints()
    if(id==0){
        winnerText.innerText="Player"
    }
    if(id==1){
        winnerText.innerText="Ai"
    }
    if(id==2){
        winnerText.innerText="Draw!"
    }


}


function checkIfWarOver(){
    if(player.getPoints()==3 && ai.getPoints()<3){
        setTimeout(() => {  showEndGameModal(0) }, 500);
        
    }
    if(ai.getPoints()==3 &&player.getPoints()<3){
        setTimeout(() => {  showEndGameModal(1) }, 500);
        
    }
    if(ai.getPoints()==3 && player.getPoints()==3){
        setTimeout(() => {  showEndGameModal(2) }, 500);
    }

}

function showWarOutcome(){

}

const outcomeArea = document.querySelector(".outcome")

function displayOutcome(outcome){
    if(outcome==0){
        outcomeArea.innerText="PLAYER WON!"
    }
    if(outcome==1){
        outcomeArea.innerText="AI WON!"
    }
    if(outcome==2){
        outcomeArea.innerText="DRAW"
    }
    setTimeout(() => {  outcomeArea.innerText="" }, 1000);
}

function updatePoints(){
    document.querySelector("#player-points-display").innerText=player.getPoints()
    document.querySelector("#ai-points-display").innerText=ai.getPoints()
}



