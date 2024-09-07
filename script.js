let x="_", y="_";
let i = 0; // Turn counter
const turn = document.getElementById("turn");
const container = document.querySelector(".container");

const choice = document.getElementById("choice");
const indivElements = document.getElementsByClassName("indiv"); //this is an array

// Initialize indiv array to hold game state
let indiv = Array(indivElements.length).fill(null);
container.addEventListener("click",()=>{
    if(x=="_")
    {
        alert("Choose symbol first");

        location.reload(true);
    }
})
function chosen(inn) {
    if (inn == 1) {
        x = "X";
        y = "O";
    } else {
        x = "O";
        y = "X";
    }
    choice.style.display = "none";
    turn.innerHTML = `Turn of player 1`;
}

function win() {
    const winConditions = [
        [0, 1, 2], // Row 1
        [3, 4, 5], // Row 2
        [6, 7, 8], // Row 3
        [0, 3, 6], // Column 1
        [1, 4, 7], // Column 2
        [2, 5, 8], // Column 3
        [0, 4, 8], // Diagonal 1
        [2, 4, 6]  // Diagonal 2
    ];

    for (let condition of winConditions) {
        const [a, b, c] = condition; //destructing
        if (indiv[a] && indiv[a] === indiv[b] && indiv[a] === indiv[c]) {
            setTimeout(() => {
                alert(`PLAYER ${indiv[a] === x ? 1 : 2} WON`);
                location.reload(true);

            }, 0);
            return true; // Stop checking further
        }
    }
    return false;
}

// function assign(i, prop) {
//     indiv[prop] = (i % 2 === 0) ? y : x;
//     setTimeout(() => {
//         indivElements[prop].innerHTML = indiv[prop];

//     }, 0);
// }
function assign(i, prop) {
  return new Promise((resolve) => {
    indiv[prop] = (i % 2 === 0) ? y : x;
    indivElements[prop].innerHTML = indiv[prop];
    resolve();
  }).then(() => {
    // Check for win after DOM update
    if (win()) {
      return;
    }
  });
}

function TieCheck() {
    if (indiv.every(cell => cell) && !win()) {
        alert("It's a TIE");
        location.reload(true);
    }
}

function touched(prop) {
   
    if (indiv[prop]) {
        alert("This cell is already taken");
        return;
    }

    ++i; // Increment turn count

    // Assign the symbol to the box
     assign(i, prop).then(() => {
        TieCheck(i);
      });

    // Check for win after assigning
    // if (win()) {
    //     return; // Stop further checks if there's a win
    // }

    // Update the turn message
    turn.innerHTML = `Turn of player ${i % 2 === 0 ? 1 : 2}`;

    // Use setTimeout to ensure the DOM is updated
    
    
}
