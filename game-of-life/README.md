# Game of Life

Conway's Game of Life.

Nothing fancy, just some simple app to do the game.

You can simulate it, you can also "tick" iteration manually.

You need to set the seed first from the seed page (you won't miss it as it is the first page you see).

### Development

Environment:
```
node -v
v6.10.0
```
```
npm -v
4.0.5
```

*Please make sure that you have the appropriate node and npm versions first if you happen to not be able to run the app*

Clone the repo.
Navigate into `game-of-life` directory.

```
npm install
npm start
```

Go to `localhost:3000` to view the app.

The UI should be self-explanatory.

Run tests?
```
npm run test
```

Lint?
```
npm run lint
```
Running test will also run linting.

### Wishlist
* Clean up states on the container -- need more thoughts on this. Mentioning this mainly because it looks messy?
* More tests
* Able to set seed with `textarea`, by specifying the array instead of clicking the dots one by one like what I have currently.
* Seed content has many edge cases that haven't been covered yet. For example:
  * Select a config -> change the board size, and the config dropdown stays at the same value.
* Of course, more styling to make it look prettier
* We could use redux, but I see no value for this simple app though. 
