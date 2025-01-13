let player1 = "Player 1";
let player2 = "Player 2";
let flag1=true
let flag2=false
var num1=0;
var num2=0

//dice for player1
function rollTheDice1(){
    
    if(flag2){
        return;
    }
    console.log('dice1')
    flag2=true
    console.log('yes')
    num1=Math.floor(Math.random()*6)+1;
    document.querySelector('.img1').setAttribute("src","dice"+num1+".jpeg");
    
    flag1=false
}

function rollTheDice2(){
    
    if(flag1){
        return;
    }
    console.log('dice2 yes')
    num2=Math.floor(Math.random()*6)+1;
    document.querySelector('.img2').setAttribute("src","dice"+num2+".jpeg");
    

    if (num1 === num2) {
        document.querySelector("h1").innerHTML = "Draw!";
    }

    else if (num1 < num2) {
        document.querySelector("h1").innerHTML
            = (player2 + " WINS!");
    }

    else {
        document.querySelector("h1").innerHTML
            = (player1 + " WINS!");
    } 
    flag1=true
    flag2=false
}