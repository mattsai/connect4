$(document).ready(function() {
    var p1Color = "rgb(9, 123, 191)";
    var p2Color = "rgb(237, 28, 9)";

    var playing = true;
    var board = $('.board tr')
    var greyColor = 'rgb(128, 128, 128)';


    let currentPlayer = 1; 
    let currentPlayerName = "Player 1"
    // let playerTwoName = "Player 2"
    let currentColor = p1Color;


    console.log('b',board)
    function winner(row,col) {
        console.log(currentPlayerName,' won on -> ',row,col)
    }

    function changeBackground(row,col,color) {
        return board.eq(row).find('td').eq(col).find('button').css('background-color',color);
    }

    function getColor(row,col) {
        let color = board.eq(row).find('td').eq(col).find('button').css('background-color');
        return color;

    }

    function checkBottom(col) {
        let colorR  = getColor(5,col);
        console.log('col',col)
        for (let row = 5; row  >= 0; row--) {
            let colorR = getColor(row,col);
            // console.log('colorR ',colorR)
            if(colorR === greyColor) {
                return row
            }
        }
    }

    function colorCheck(one,two,three,four){
        console.log('colorcheck ',one,two,one===greyColor,greyColor,one !== undefined)
        console.log('47',one === two && one === three  && one === four && one !== greyColor && one !== undefined)
        return one === two && one === three  && one === four && one !== greyColor && one !== undefined
    }


    /* win checks 😿 */
    function horizontalCheck() {
        // return
        for (let row = 0; row < 6; row++) {
            for (let col = 0; col < 4; col++) { // 0,1,2,3 - [7]
                if (colorCheck(
                    getColor(row,col),
                    getColor(row,col+1),
                    getColor(row,col+2),
                    getColor(row,col+3),
                )){
                    console.log('horizontal win')
                    winner(row,col)
                    return true
                }else{
                    continue
                }
            }
        }
    }

    function verticalCheck() {
        // return
        for (let col = 0; col< 7; col++) {
            for (let row = 0; row < 3; row++) { // 0-6, 
                if (colorCheck(                 // 0 1,2,3, -> 
                    getColor(row,col),          //r  0,1,2,4 || 1,2,3,4 || 2,3,4,5 || 3,4,5,6 
                    getColor(row+1,col),
                    getColor(row+2,col),
                    getColor(row+3,col),
                )){
                    console.log('vertical win')
                    winner(row,col)
                    return true
                }else{
                    continue
                }
            }
        }
    }

    function diagonalCheck() {
        for (let col = 0; col< 5; col++) {
            for (let row = 0; row < 7; row++) { 
                if (colorCheck(                 
                    getColor(row,col),          
                    getColor(row+1,col),
                    getColor(row+2,col),
                    getColor(row+3,col)
                )){
                    winner(row,col)
                    console.log('diagonal 1 win')
                    return true
                }else if(colorCheck(     
                    getColor(row,col),          
                    getColor(row-1,col+1),
                    getColor(row-2,col+2),
                    getColor(row-3,col+3)
                )){
                    console.log('diagonal 2 win')            

                    winner(row,col)
                    return true
                }else{
                    continue
                }
            }
        }
    }



    $('h3').text(currentPlayerName + "Your turn");
    $(".board button").on('click',function () {
        
        console.log('click')
        let col = $(this).closest('td').index();
        let bottomAvailable = checkBottom(col);
        changeBackground(bottomAvailable,col,currentColor);

        if(horizontalCheck() || verticalCheck() || diagonalCheck() ){
            $("h1").text(currentPlayerName + " won 😸");
            $("h3").fadeOut("fast");
            $("h2").fadeOut("fast");
        }

        currentPlayer =  currentPlayer === 1 ? 2:1;
        currentPlayerName = currentPlayerName === "Player 1" ? "Player 2" : "Player 1";
        currentColor = currentColor ===  p1Color ? p2Color: p1Color;
        $('h3').text(currentPlayerName + " Your turn");

    })



});
