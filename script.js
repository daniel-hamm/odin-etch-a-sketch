const grid_container = document.querySelector('.grid-outline');

for(let square = 0; square < 256; square ++) {
    const grid = document.createElement('div');
    grid.classList.add('square');
    grid.setAttribute('id', `square-${square}`);
    grid_container.appendChild(grid);
}

const grid_squares = document.querySelectorAll('.square');