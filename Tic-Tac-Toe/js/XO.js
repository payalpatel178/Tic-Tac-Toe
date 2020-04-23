console.log("XO.js has loaded");
function setupPage() {

    var header = document.createElement('h1');
    header.id = "header";
    header.innerText = "Tic-Tac-Toe\n Please, Try to get three squares aligned first";
    header.style.cssText = "font-size: 30px;color: #900C3F;text-shadow: 1px 1px 0 teal;"

    document.getElementsByTagName('body')[0].appendChild(header);

    for (var b = 1; b < 10; b++) {     // adding 9 buttons
        var buttons = document.createElement('button');
        buttons.id = b;
        buttons.setAttribute("data-choice", b);
        buttons.type = "button";
        document.getElementById('container').appendChild(buttons);
    }
    var resets = document.createElement('button');         //adding the restart button
    resets.id = "restart";
    resets.setAttribute("data-choice", "reset");
    resets.type = "button";
    resets.innerText = "START NEW GAME";
    document.getElementById('container').appendChild(resets);

}
userChoice = "";
compChoice = "";
choceCounter = 0;
winerflag = false;
matches = 0;
var userwin = 0;
var compwin = 0;
var countTies = 0
var tieMatch = 0;

$(document).ready(function () {


    $("button").click(function () {

        if (!("reset".includes($(this).data("choice")))) {

            //  this while loop verify that neither me nor the computer choose a previous selected button
            while (!(userChoice.includes($(this).data("choice"))) && (!compChoice.includes($(this).data("choice")))) {   //this condition garantee no user repetition
                userChoice = userChoice + $(this).data("choice")              // creating accumaltive string of user choices

                $(this).css("background-image", "url(" + "images/x.png" + ")");    //to change the background when user select
                console.log(userChoice);
                choceCounter++;                                     //increase choosed buttons counter
                youWin();                                           // go and chech if user wins and set winer flag
                if (winerflag == true) {
                    setTimeout(alert, 200, "Congratulations ! You Won");
                    break;                                                  //if user wins break the loop
                }
                if (choceCounter == 9) {                                    // if we reached nine selected buttons it is tie and break
                    setTimeout(alert, 200, "Atleast you don't Loose");
                    tieMatch++;
                    document.getElementById('tie').innerText = tieMatch;
                    break;
                }

                random = Math.floor(Math.random() * 9) + 1;                             //get  random between 1 -9

                while (compChoice.includes(random) || userChoice.includes(random)) {     // random button never been selected before
                    random = Math.floor(Math.random() * 9) + 1;                          // if selected try to search for random no agaon
                }
                console.log("random: " + random);
                document.getElementById(random).style.backgroundImage = "url('images/o.png')";          //convert back ground to o
                compChoice = compChoice + random;                                                       // create computer choice string
                console.log("compchoice: " + compChoice);
                choceCounter++;                                                                 // increase selection counter
                console.log("choceCounter: " + choceCounter);
                youLose();                                                                      // check if computer wins
                console.log("winerflag: " + winerflag);                                         // and have a winer flag 
                if (winerflag == true) {                                                         // if there is a winer 
                    setTimeout(alert, 200, "Sorry You Loose");
                    break;
                }

            }
        }
        else {                                                  // if restart button cliced reset allexcept win lose tie counters
            console.log("restart");
            for (var r = 1; r < 10; r++) {
                document.getElementById(r).disabled = false;
                userChoice = "";
                compChoice = "";
                choceCounter = 0;
                winerflag = false;
                matches = 0;
                document.getElementById(r).style.background = "#D25068";

            }

        }

    })

})


/**
 * function to check if you wins agins an array wins
 */
function youWin() {

    wins = ["123", "456", "789", "147", "258", "369", "159", "357"]         //this is the winning order array

    if (testMatch(wins, sortString(userChoice)) == 3) {        // any time there are three matchs regard less the order there is a winner
        winerflag = true;
        //countLose++;
        userwin++;
        document.getElementById('win').innerText = userwin;
        resetGame();                                                    // disable buttons if you win except reset button

    }
}

/**
 * finction to check if computer wins
 */
function youLose() {
    wins = ["123", "456", "789", "147", "258", "369", "159", "357"]

    if (testMatch(wins, sortString(compChoice)) == 3) {
        winerflag = true;
        // countLose++;
        compwin++;
        document.getElementById('lose').innerText = compwin;
        resetGame();                                                                 // disable buttons if you loose except reset button

    }
}

function sortString(str) {
    var arr = str.split('');
    var sorted = arr.sort();
    return sorted.join('');
}

/**
 *  function to check user or compter choice aginst wining array
 * 
 * @param {*} wins      array of winnig arder
 * @param {*} str2      string of user choice os pc choice
 * @returns  matches
 */
function testMatch(wins, str2) {                                    // function of 3 inner for loops that checks charcter by
    for (var y = 0; y < wins.length; y++) {                         // character for a winning order match
        var matches = 0;
        var winsItem = wins[y].split("");      //[1,2,3]                 splits each element od wins array to an array of chars
        var choiceItem = str2.split("");       //[1]                    splits each  into an array of chars
        for (var i = 0; i < choiceItem.length; i++) {                   //loops the string (computer || user) array of cars
            for (var x = 0; x < winsItem.length; x++) {                     // loops each array of element of win array 
                if (choiceItem[i] == winsItem[x]) matches++;         // increase matches counter
            }
        }
        if (matches == 3) break;                                // break when you catch 3 matches
    }
    return matches;                                             // return 3 matches as maximum or less
}

/**
 *  function to disable buttons
 */
function resetGame() {
    for (var r = 1; r < 10; r++) {
        document.getElementById(r).disabled = true;
    }

}
