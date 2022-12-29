// global variables
let is_mouse_down = false;      // store the status if the mouse is clicked or not
let square_size = 16;           // square size in px; 16, 32, 64
let grid_max_width = 512;       // max width of the grid
let grid_max_height = 512;      // max height of the grid
let additional_grid_with = 64;  // set the additional grid width, so we can generate borders on the squares
let square_border_size = 2;     // set the squares border size default to 1 px

// select the html querys
const grid_container = document.querySelector('.grid-outline');
const grid_buttons = document.querySelector('.grid-buttons');

// adjust the outer width of the buttons flexbox according to the grid size
grid_buttons.style.width = `${grid_max_width}px`;

// add a query selector for the grid size buttons
const grid_buttons_single = document.querySelectorAll('.grid-buttons button');

// build the first grid with default values
build_grid();

// function to remove all square on rebuild of the grid
function removeSquares() {

    // query all squares at once
    const grid_squares = document.querySelectorAll('.grid .grid-outline .square');

    // remove all square div's in a loop
    grid_squares.forEach((square) => {
        square.remove();
    });

}

// add an event listener to every grid sizing button
grid_buttons_single.forEach((button) => {
    button.addEventListener(('click'), () => {

        // depending on the clicked buttons id change the square size
        // and call the function to function to rebuild the grid
        switch(button.id) {
            case "grid-button-16":      // the 16x16 button was pressed
                square_size = 16;       // set the global square size to 16x16
                removeSquares();        // remove all squares before generating new ones
                build_grid();           // rebuild the grid with the new size
                break;
            case "grid-button-32":      // same as above
                square_size = 32;       
                removeSquares();        
                build_grid();           
                break;
            case "grid-button-64":      // same as above
                square_size = 64;       
                removeSquares();        
                build_grid();           
                break;
        }
    });
});

function build_grid() {
    
    // generate the border size depending on the grid size
    // 16 * 2 (borders) = 32;   64px / 32 = 2 px borders
    // 32 * 2 (borders) = 64;   64px / 64 = 1 px borders
    // 64 * 2 (borders) = 128;  64px / 128 = 0,5 px borders

    square_border_size = additional_grid_with / (square_size * 2);

    // set the grid container width
    // inner width => 16*16 = 256; plus 64px max for borders

    grid_container.style.width = `${grid_max_width + additional_grid_with}px`;   
    
    // set the grid container height
    // inner height => 16*16 = 256; plus 64px max for borders

    grid_container.style.height = `${grid_max_height + additional_grid_with}px`; 

    // set the grid containers border size the same as the squares border size
    grid_container.style.border = `${square_border_size}px solid black`;


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
        square.style.border = `${square_border_size}px solid black`;    // set the squares border size depending on the calculation
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
