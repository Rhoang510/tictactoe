const Gameboard = () => {
    let board = new Array(9).fill('')
    const getBoard = () => { [...board], console.log([...board])}
    const setValue = (index, marker) => { board[index] = marker, console.log([...board]) }
    const resetBoard = () => { board.fill('') }
    return {
        setValue,
        resetBoard,
        getBoard
    }
}

const Player = (name, marker) => {
    const getName = () => name
    const getMarker = () => marker
    return { getName, getMarker }
}

const gameFlow = (player1Name, player2Name) => {
    const square = Array.from(document.querySelectorAll('.square'))
    let gameboard = Gameboard()
    let player1 = Player(player1Name, 'X')
    let player2 = Player(player2Name, 'O')
    let currentPlayer = player1

    const seePlayer =(() => {
        console.log(player1.getName())
        console.log(player1.getMarker())
        console.log(player2.getName())
        console.log(player2.getMarker())
    })()
    
    const switchPlayers = () => {
        if(currentPlayer === player1) {
            currentPlayer = player2
        } else {
            currentPlayer = player1
        }
    }

    const checkForWin = (marker) => {
        const winner = winConditions.find(winCondition => winCondition.every(index => gameboard[index] === marker))
        winner === null ? false : true
    }

    const winConditions = [
        [0, 1, 2],
        [3, 4 ,5],
        [6, 7 ,8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]

    
    const choosingSquare = square.forEach(square => {
        square.addEventListener('click', (e) => {
            let index = e.target.dataset.index
            gameboard.setValue(index, currentPlayer.getMarker())
            square.textContent = currentPlayer.getMarker()
            switchPlayers()
            checkForWin(currentPlayer.getMarker())
            console.log(currentPlayer.getName())
            console.log(index)
        })
    })
    
    return {
        switchPlayers,
        currentPlayer,
        checkForWin,
        gameboard,
        choosingSquare
    }
}

const game = gameFlow('Jack', 'Bill')

// const displayController = (() => {
//     const square = Array.from(document.querySelectorAll('.square'))
    
//     const choosingSquare = square.forEach(square => {
//         square.addEventListener('click', (e) => {
//             let index = e.target.dataset.index
//             // getValue(index)
//             // setValue(index, getMarker())
//             console.log(index)
//             square.textContent = index
//         })
//     })
//     return {
//         choosingSquare,
//     }

// })()







