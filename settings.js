let form = document.querySelector('#settings')
let rowsCols = document.querySelector('#number')
let complete1 = document.querySelector('.complete1')
let replay = document.querySelector('.replay')
let close = document.querySelector('.close')
let complete2 = document.querySelector('.complete2')
let play = document.querySelector('.play')
let solve = document.querySelector('.solve')
let back = document.querySelector('.back')
let complete3 = document.querySelector('.complete3')
let back1 = document.querySelector('.back1')
let complete4 = document.querySelector('.complete4')

let newMaze
let seconds = 0;
let timerInterval;
let bestScore = localStorage.getItem("bestScore") || 0;

document.getElementById("bestScore").innerText =
"Best: " + bestScore;
function startTimer()
{
    timerInterval = setInterval(() =>
    {
        seconds++;

        let mins = Math.floor(seconds / 60);
        let secs = seconds % 60;

        document.getElementById("timer").innerText =
            "Time: " +
            String(mins).padStart(2, '0') +
            ":" +
            String(secs).padStart(2, '0');

    }, 1000);
}

form.addEventListener('submit', generateMaze)

document.addEventListener('keydown', move)

replay.addEventListener('click', () =>
{
    location.reload()
})

close.addEventListener('click', () =>
{
    complete1.style.display = 'none'
})

play.addEventListener('click', () =>
{
    complete2.style.display = 'none'
    
    complete4.style.display = 'block'

    setTimeout(() =>
    {
        complete4.style.display = 'none'    
    }, 2000);
})

solve.addEventListener('click', () =>
{
    complete2.style.display = 'none'
    newMaze.solveSetup()
    newMaze.solve()
})

back.addEventListener('click', () =>
{
    location.reload()
})

back1.addEventListener('click', () =>
{
    location.reload()
})

function generateMaze(e)
{
    e.preventDefault()

    if(rowsCols.value == '')
    {
        return alert('Please enter all fields')
    }

    let mazeSize = 400
let number = rowsCols.value

    if(number > 50)
    {
        alert('Maze too large!')

        return
    }

    form.style.display = 'none'

    newMaze = new Maze(mazeSize, number, number)

    newMaze.setup()
    newMaze.draw()
}

function move(e)
{
     let moved = false;
    if(!generationComplete) return

    let key = e.key
    let row = current.rowNum
    let col = current.colNum

    switch(key)
    {
      case 'ArrowUp':
        if(!current.walls.topWall)
        {
            let next = newMaze.grid[row - 1][col]
            current = next
            moved = true;
            

            newMaze.draw()
            current.highlight(newMaze.columns)

            if(current.goal)
{
    clearInterval(timerInterval);

    if(score > bestScore)
    {
        bestScore = score;

        localStorage.setItem("bestScore", bestScore);

        document.getElementById("bestScore").innerText =
        "Best: " + bestScore;
    }

    complete1.style.display = 'block';
}
        }

        break

      case 'ArrowRight':
        if(!current.walls.rightWall)
        {
            let next = newMaze.grid[row][col + 1]
            current = next
            moved = true;
            newMaze.draw()
            current.highlight(newMaze.columns)

            if(current.goal)
{
    clearInterval(timerInterval);

    if(score > bestScore)
    {
        bestScore = score;

        localStorage.setItem("bestScore", bestScore);

        document.getElementById("bestScore").innerText =
        "Best: " + bestScore;
    }

    complete1.style.display = 'block';
}
        }

        break

      case 'ArrowDown':
        if(!current.walls.bottomWall)
        {
            let next = newMaze.grid[row + 1][col]
            current = next
            moved = true;
            newMaze.draw()
            current.highlight(newMaze.columns)

           if(current.goal)
{
    clearInterval(timerInterval);

    if(score > bestScore)
    {
        bestScore = score;

        localStorage.setItem("bestScore", bestScore);

        document.getElementById("bestScore").innerText =
        "Best: " + bestScore;
    }

    complete1.style.display = 'block';
}
        }

        break

      case 'ArrowLeft':
        if(!current.walls.leftWall)
        {
            let next = newMaze.grid[row][col - 1]
            current = next
            moved = true;
            newMaze.draw()
            current.highlight(newMaze.columns)

            if(current.goal)
{
    clearInterval(timerInterval);

    if(score > bestScore)
    {
        bestScore = score;

        localStorage.setItem("bestScore", bestScore);

        document.getElementById("bestScore").innerText =
        "Best: " + bestScore;
    }

    complete1.style.display = 'block';
}
        }

        break
    }
    if(moved && !current.goal)
{
    moves++;
    score += 10;

    document.getElementById("moves").innerText = "Moves: " + moves;
    document.getElementById("score").innerText = "Score: " + score;
}
}