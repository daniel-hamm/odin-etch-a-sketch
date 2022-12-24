// select the grid outline
const grid_container = document.querySelector('.grid-outline');

// generate the square grid
// we generate a 16x16 square with 16*16px of each square
// as we use css flexbox wrap there only fit 16 squares in one row, because the width is respected
// so we can generate all 256 squares at once
for(let square_id = 0; square_id < 256; square_id ++) {
    const square = document.createElement('div');         // set the square as div
    square.classList.add('square');                       // add the same class to each square, so we can use them as group
    square.setAttribute('id', `square-${square_id}`);     // give each square a unique id
    grid_container.appendChild(square);                   // append the squares to the main grid
}

// select all squares as group 
// must be declared AFTER the for loop
const grid_squares = grid_container.querySelectorAll('div.square');

// select all squares in the square grid
grid_squares.forEach((square) => {

    // add an event listener to every square in the grid
    square.addEventListener(('mousedown'), () => {

        // give the clicked square the clicked css class
        square.classList.add('clicked');

    });

});
