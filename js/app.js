// Enemies our player must avoid
let Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    //initial location
    this.x = x;
    this.y = y;
    //speed
    this.speed = speed;
    //size
    this.width = 70;
    this.height = 40;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    //all computers.
    this.x = this.x + this.speed * dt;
    //does not go off screen
    if (this.x > 500) {
        this.x = 0;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function(x, y) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-horn-girl.png';
    this.width = 75;
    this.height = 40;
    this.score = 0;
    this.lives = 3;
};

Player.prototype.update = function() {
    if (this.x < 0 || this.x > 400) {
        if (this.x < 0) {
            this.x = 0;
        } else {
            this.x = 400;
        }
    }
    if (this.y < 0 || this.y > 400) {
        if (this.y < 0) {
            this.score++;
            document.getElementsByClassName('score')[0].innerHTML = this.score;
            if (this.score >= 10){
                WinGame();
            }
            this.reset();
        } else {
            this.y = 400;
        }
    }
    this.checkCollisions();
}

Player.prototype.render = function(x, y) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(direction) {
    if (direction === "up") {
        this.y = this.y - 83;
    } else if (direction === "down") {
        this.y = this.y + 83;
    } else if (direction === "left") {
        this.x = this.x - 101;
    } else if (direction === "right") {
        this.x = this.x + 101;
    }
};

Player.prototype.checkCollisions = function() {
    for (let i = 0, len = allEnemies.length; i < len; i++) { 
        /**  e.g. var i = 0, len = <object/array>.length */
        /** Statements */
        if (this.x < allEnemies[i].x + allEnemies[i].width &&
            this.x + this.width > allEnemies[i].x &&
            this.y < allEnemies[i].y + allEnemies[i].height &&
            this.height + this.y > allEnemies[i].y) {
            console.log("collision detected");
            this.lives --;
            document.getElementsByClassName('lives')[0].innerHTML = this.lives;
            if (this.lives === 0){
                LoseGame();
            }
        this.reset();  
    }
    // for (let i = 0; i < allEnemies.length; i++) {
    //     if (this.x < allEnemies[i].x + allEnemies[i].width &&
    //         this.x + this.width > allEnemies[i].x &&
    //         this.y < allEnemies[i].y + allEnemies[i].height &&
    //         this.height + this.y > allEnemies[i].y) {
    //         console.log("collision detected");
    //         this.lives --;
    //         document.getElementsByClassName('lives')[0].innerHTML = this.lives;
    //         if (this.lives === 0){
    //             LoseGame();
    //         }
    //         this.reset();
    //     }
    }
};

//Win Game
WinGame = function (){
    let body= document.getElementsByClassName('body')[0];
    body.innerHTML = "";    
    let para = document.createElement("h6");               // Create a <p> element
    let text = document.createTextNode("You Won!!!");      // Create a text node
    para.appendChild(text);                                // Append the text to <p>
    body.appendChild(para);                                // Append <p> to body
    var but = document.createElement("button");    
    but.value="replay";
    let replay = document.createTextNode("Play Again");
    but.appendChild(replay);
    but.setAttribute("onclick","reload()");
    but.onclick = reload;
    body.appendChild(but);    
}

reload = function  (){
    location.reload();    
}

LoseGame = function(){
    let body= document.getElementsByClassName('body')[0];
    body.innerHTML = "";    
    let para = document.createElement("h6");               // Create a <p> element
    let text = document.createTextNode("You LOST!!!");      // Create a text node
    para.appendChild(text);                                // Append the text to <p>
    body.appendChild(para);                                // Append <p> to body
    var but = document.createElement("button");    
    but.value="replay";
    let replay = document.createTextNode("Play Again");
    but.appendChild(replay);
    but.setAttribute("onclick","reload()");
    but.onclick = reload;
    body.appendChild(but);  
}

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 450;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [
    new Enemy(-200, 65, 50),
    new Enemy(-200, 65, 85),
    new Enemy(-200, 142, 60),
    new Enemy(-200, 142, 95),
    new Enemy(-200, 225, 75),
    new Enemy(-200, 225, 55)
];

var player = new Player(200, 450);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
