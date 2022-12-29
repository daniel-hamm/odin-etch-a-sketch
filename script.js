// global variables
let is_mouse_down = false;      // store the status if the mouse is clicked or not
let square_size = 16;           // square size in px; 16, 32, 64
let grid_max_width = 256;       // max width of the grid
let grid_max_height = 256;      // max height of the grid
let additional_grid_with = 32;   // set the additional grid width
let square_border_size = 1;     // set the squares border size default to 1 px

// select the html querys
const grid_buttons = document.querySelector('.grid-buttons');

// adjust the outer width of the buttons flexbox according to the grid size
grid_buttons.style.width = `${grid_max_width}px`;

// add a query selector for the grid size buttons
const grid_buttons_single = document.querySelectorAll('.grid-buttons button');

build_grid();

// function to remove all square on rebuild of the grid
function removeSquares() {

    const grid_squares = document.querySelectorAll('.grid .grid-outline .square');

    grid_squares.forEach((square) => {
        square.remove();
    });

}

// add an event listener to every grid size button
grid_buttons_single.forEach((button) => {
    button.addEventListener(('click'), () => {

        // depending on the clicked buttons id change the square size
        // and call the function to function to rebuild the grid
        switch(button.id) {
            case "grid-button-16":
                square_size = 16;
                // remove all squares as we might generate new ones with a different size
                removeSquares();
                build_grid();
                break;
            case "grid-button-32":
                square_size = 32;
                removeSquares();
                build_grid();
                break;
            case "grid-button-64":
                square_size = 64;
                removeSquares();
                build_grid();
                break;
        }
    });
});

function build_grid() {

    // ### NEXT: generate the grid_container here and NOT in the html
    // ### NEXT: so we can adjust the grid size depending on the squares

    const grid_container = document.querySelector('.grid-outline');
    
    // 16 * 2 (borders) = 32; 32px / 32 = 1 px borders
    // 32 * 2 (borders) = 64; 32px / 64 = 0,5 px borders
    // 64 * 2 (borders) = 128; 32px / 128 = 0,25 px borders

    // we want the grid to be 256 + 32 px
    // we adjust the border of the squares, so it fits this rule
    // this is NOT possible with a 64x64 grid, as the border would be 0,25 px thick
    // 0,25 px is too small for a border
    // so we have to adjust the additional grid size from 32 to 64 when the user wants to use 64x64
    if(square_size >= 64)
        additional_grid_with = 64;
    else
        32;

    // we also catch borders smaller 0.5 px to prevent errors
    // so we have a 0.5 px border at the 64x64 grid
    square_border_size = 32 / (square_size * 2);

    if(square_border_size <= 0.5) {
        square_border_size = 0.5;
    }

    grid_container.style.width = `${grid_max_width + additional_grid_with}px`;   /* inner width => 16*16 = 256; plus 32px max for borders */
    grid_container.style.height = `${grid_max_height + additional_grid_with}px`; /* inner height => 16*16 = 256; plus 32px max for borders */


    // generate the square grid
    // we generate a 16x16 square with 16*16px of each square
    // as we use css flexbox wrap there only fit 16 squares in one row, because the width is respected
    // so we can generate all 256 squares at once
    for(let square_id = 0; square_id < (square_size * square_size); square_id ++) {
        const square = document.createElement('div');                   // set the square as div
        square.classList.add('square');                                 // add the same class to each square, so we can use them as group
        square.setAttribute('id', `square-${square_id}`);               // give each square a unique id
        square.style.width = `${grid_max_width / square_size}px`;       // 256px is the grid width without borders and should stay the same
        square.style.height = `${grid_max_height / square_size}px`;     // so adjust the square width and height depending on the max grid values
        square.style.border = `${square_border_size}px solid black`;
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
}
