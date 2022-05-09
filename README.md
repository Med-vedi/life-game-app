# Conway's Game of Life

It is a zero-player game, from 70'

A project for an interview which me gave a nice opportunity to play with TS and Redux Toolkit. Any further advise or PR is welcome 😉

## Demo

https://amazing-mochi-58fe8c.netlify.app/

## Implementation

The initial state (the current generation) can be provided via a text file(\*.txt) that specifies:

- The current generation number
- The grid size
- The population state (\* represents a live cell, . represents a dead cell)
  In the following input file example we can see an input file specifying the third generation on a 4 by 8 grid:

```
Generation 3:
4 8
........
....*...
...**...
........
```

The output should display the correct number of the resulting generation, the grid size (this will always be the same as the one specified in the input file) and the current population state. Given the example above, the expected output would be this:

```
Generation 4:
4 8
........
...**...
...**...
........
```

You can use the test.txt from '/assets'

## Rules

Any live cell with fewer than two live neighbours dies.
Any live cell with two or three live neighbours lives on to the next generation.
Any live cell with more than three live neighbours dies.
Any dead cell with exactly three live neighbours becomes a live cell.

## Inspired by

Beau Carnes
https://youtu.be/PM0_Er3SvFQ

Ben Awad
https://youtu.be/DvVt11mPuM0

The Net Ninja
https://youtu.be/iBUJVy8phqw

## Tech Stack

**Client:** React, TS, Redux Toolkit

## Installation

Install life-game-app with npm

```bash
  cd life-game-app
  npm i
```

## Scripts

In the project directory, you can run:

### `npm start`

## Roadmap

Some day i'll fix or update:

- the bug in the grid dimension condition

```
  width < height
```

- responsive UI
- userfriendly UI
- error handlers for uploaded(?) files
