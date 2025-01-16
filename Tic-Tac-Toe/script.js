let currentPlayer='X';
let flag=false

// making an empty array which will store player's name who clicked the box
let array=Array(9).fill(null)

//storing the winning conditions
const winningConditions = [
    [0, 1, 2], 
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6], 
];

function checkWinner() {
  
    for (const condition of winningConditions) {
        const [a, b, c] = condition;
        if (array[a] !== null && array[a] === array[b] && array[b] === array[c]) {
            document.getElementById('displayWinner').innerText = `WINNER IS ${currentPlayer}`;
            flag = true;
            return; // Exit the function once a winner is found
        }
    }

    if (!array.some((e) => e === null)) {
        document.getElementById('displayWinner').innerText = `It's a Draw !!`;
    }
}


function handleClick(el){
    if(flag){
        return;
    }
    const id=Number(el.id)

    if (array[id]!==null) return;  //to prevent user from overridding old response

    array[id]=currentPlayer;
    el.innerText=currentPlayer // displays the player name in game
    checkWinner()
    

    currentPlayer=currentPlayer==="X"?"O":"X"  //agr current player x hai to O kr do vice versa

}
//restart button
function restart(){
    currentPlayer = 'X';
    flag = false;
    array=Array(9).fill(null)
    document.querySelectorAll('.col').forEach(e => {e.innerText = ''});
    // Clear the winner display
    document.getElementById('displayWinner').innerText = '';
}