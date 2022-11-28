var $start = document.querySelector('#start')
var $blockBackground = document.querySelector('#block_background')
var $time = document.querySelector('#time')
var $timeHeader = document.querySelector('#time-header')
var $resultHeader = document.querySelector('#result-header')
var $resultSpan = document.querySelector('#result')
var $gameTime = document.querySelector('#game-time')

var score = 0;
var getStartGame = false

$start.addEventListener('click', startGame)
$blockBackground.addEventListener('click', handleBox)
$gameTime.addEventListener('input', setGameTime)

function startGame(){
    score = 0
    setGameTime()
    $gameTime.setAttribute('disabled', 'false')
    getStartGame = true;
    $blockBackground.style.backgroundColor = '#fff'
    $start.classList.add('hide')

    var interval = setInterval(function(){
        var time = parseFloat($time.textContent)

        if(time <= 0){
            clearInterval(interval)
            endGame()
        } else {
            $time.textContent = (time - 0.1).toFixed(1)
        }
    }, 100)
    
   createBox()
}   

function setGameScore(){
    $resultSpan.textContent = ' '  + score.toString()
}

function setGameTime(){
    var time = parseInt($gameTime.value)
    $time.textContent = time.toFixed(1)
    $timeHeader.classList.remove('hide')
    $resultHeader.classList.add('hide')
}

function endGame(){
    getStartGame = false
    $gameTime.removeAttribute('disabled')
    $start.classList.remove('hide')
    $blockBackground.style.backgroundColor = '#00e000'
    $blockBackground.innerHTML = ''
    $timeHeader.classList.add('hide')
    $resultHeader.classList.remove('hide')
    setGameScore()

}
function handleBox(event){
    if(!getStartGame){
        return
    }
    if(event.target.dataset.box){
        createBox()
        score++
        
    }
}

function createBox(){
    var box = document.createElement('div')
    $blockBackground.innerHTML = ''
    var random = getRandom(30,100)
    var randomColor = getRandomColor(10000, 90000)
    var blockSize = $blockBackground.getBoundingClientRect()
    var maxTop = blockSize.height - random
    var maxLeft = blockSize.width - random 

    box.style.width = box.style.height = random + 'px'
    box.style.backgroundColor = '#f' + randomColor
    box.style.position = 'absolute'
    box.style.top = getRandom(0, maxTop) + 'px'
    box.style.left = getRandom(0, maxLeft) + 'px'
    box.style.cursor = 'pointer'
    box.setAttribute('data-box', 'true')

    $blockBackground.insertAdjacentElement('afterbegin', box)

}

function getRandom(min,max){
    return Math.floor(Math.random() * (max-min) + min)
}

function getRandomColor(min,max){
    return Math.floor(Math.random() * (max-min) + min)
}