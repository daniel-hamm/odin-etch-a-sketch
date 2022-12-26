// global variables
let is_mouse_down = false;      // store the status if the mouse is clicked or not
let square_size = 32;           // square size in px; 16, 32, 64
let grid_max_width = 512;       // max width of the grid
let grid_max_height = 512;      // max height of the grid

// select the grid outline
const grid_container = document.querySelector('.grid-outline');


// 16 * 2 (borders) = 32; 32px / 32 = 1 px borders
// 32 * 2 (borders) = 64; 32px / 64 = 0,5 px borders
// 64 * 2 (borders) = 128; 32px / 128 = 0,25 px borders

// ##### ACHTUNG: Border kann nicht kleiner 0,5 px sein !!! -> ggf. durch Farbe anpassen bzw. neue Grid Skalierung
// ##### von 256 auf 512? Dann kann ich mit größeren Bordern arbeiten.

grid_container.style.width = `${grid_max_width + 32}px`;   /* inner width => 16*16 = 256; plus 32px max for borders */
grid_container.style.height = `${grid_max_height + 32}px`; /* inner height => 16*16 = 256; plus 32px max for borders */

// generate the square grid
// we generate a 16x16 square with 16*16px of each square
// as we use css flexbox wrap there only fit 16 squares in one row, because the width is respected
// so we can generate all 256 squares at once
for(let square_id = 0; square_id < (square_size * square_size); square_id ++) {
    const square = document.createElement('div');                   // set the square as div
    square.classList.add('square');                                 // add the same class to each square, so we can use them as group
    square.setAttribute('id', `square-${square_id}`);               // give each square a unique id
    console.log(square.style.width = `${grid_max_width / square_size}px`);       // 256px is the grid width without borders and should stay the same
    console.log(square.style.height = `${grid_max_height / square_size}px`);     // so adjust the square width and height depending on the max grid values
    console.log(square.style.border = `${32 / (square_size * 2)}px solid black`);
    grid_container.appendChild(square);                             // append the squares to the main grid
}

// select all squares as group 
// must be declared AFTER the for loop
const grid_squares = grid_container.querySelectorAll('div.square');

// is the mouse clicked / down in the window?
window.onmousedown = () => {

    // set the global mouse down variable true
    is_mouse_down = true;

}

// is the mouse not clicked / up in the window?
window.onmouseup = () => {

    // set the global mouse down variable false
    is_mouse_down = false;

}

// select all squares in the square grid
grid_squares.forEach((square) => {

    // add an mousemove event listener to every square in the grid
    square.addEventListener(('mousemove'), () => {

        // only change the color of the square if the square is square is also clicked, not only by mouse movement
        if(is_mouse_down) {

            // give the clicked square the clicked css class
            square.classList.add('clicked');

        }

    });

    // add an mouseclick event listener to every square in the grid
    // so we don't have to move the mouse to change a single square
    square.addEventListener(('mousedown'), () => {

        // give the clicked square the clicked css class
        square.classList.add('clicked');

    });

});
