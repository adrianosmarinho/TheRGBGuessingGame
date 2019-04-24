var pickedColor;
var colors          = [];
var numberOfSquares = 6;
var colorDisplay    = document.getElementById("colorDisplay");
var messageDisplay  = document.querySelector("#message");
var h1              = document.querySelector("h1");
var modeButtons     = document.querySelectorAll(".mode");
var squares         = document.querySelectorAll(".square");
var resetButton     = document.querySelector("#reset");

// adds a click listener for the reset button
resetButton.addEventListener("click", function(){
    reset();
});

init();

/**
 * Sets up the mode buttons, the squares and initializes the game.
 */
function init(){
    setUpModeButtons();
    setUpSquares();
    reset();
}

/**
 * Adds click listener to the mode buttons.
 */
function setUpModeButtons(){

    for (var i = 0; i < modeButtons.length; i++){
        modeButtons[i].addEventListener("click", function(){
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            this.textContent === "Easy" ? numberOfSquares = 3 : numberOfSquares = 6;
            reset();
        });
    }
}

/**
 * Adds click listeners to the squares
 */
function setUpSquares(){
    for(var i = 0; i < squares.length; i++){
        squares[i].addEventListener("click", function(){
            // grab color
            var clickedColor = this.style.backgroundColor;
            // compare to pickedColor
            if (clickedColor === pickedColor){
                messageDisplay.textContent = "Correct!";
                changeColors(clickedColor);
                h1.style.backgroundColor = clickedColor;
                resetButton.textContent = "Play Again?";
            }
            else{
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "Try Again";
            }
        });
    }
}

/**
 * Resets the game
 */
function reset(){
    // generate all new colors
    colors = generateRandomColors(numberOfSquares);
    // pick new random color
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    // change the colors of the squares
    for(var i = 0; i < squares.length; i++){
        if (colors[i]){
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        }
        else{
            squares[i].style.display = "none";
        }
        
    }
    h1.style.backgroundColor   = "steelblue";
    resetButton.textContent    = "New Colors";
    messageDisplay.textContent = "";
}

/**
 * Loops over the array of squares and change their colors to the picked color.
 * @param {Number} color the target color.
 */
function changeColors(color){
    for (var i = 0; i < colors.length; i++){
        squares[i].style.backgroundColor = color;
    }
}

/**
 * Randomly picks a color from the array of colors.
 */
function pickColor(){
    var random = Math.floor(Math.random() * colors.length); 
    return colors[random];
}

/**
 * Generate an array of random colors.
 * @param {Number} numberOfColors the number of colors to be stored in the array.
 */
function generateRandomColors(numberOfColors){
    var retArr = [];

    for (var i = 0; i < numberOfColors; i++){
        retArr.push(randomColor());
    }

    return retArr;
}

/**
 * Constructs a random RGB color.
 */
function randomColor(){
    // pick a red from 0 to 255
    var r = Math.floor(Math.random() * 256);
    // pick a green from 0 to 255
    var g = Math.floor(Math.random() * 256);
    // pick a blue from 0 to 255
    var b = Math.floor(Math.random() * 256);
    return ("rgb(" + r + ", " + g + ", " + b + ")");
}