var c = document.getElementById("myCanvas");
/** @type {CanvasRenderingContext2D} */
var ctx = c.getContext("2d");

var gameHeight = 200;
var gameWidth = 600;
var isAI = false;
var showNearest = false;
var aiWantMove;
var score = 0;
var sb = document.getElementById("sb");
var playerSize = 50;
var playerX = Math.floor(Math.random() * (gameWidth - playerSize)); 
var playerY = gameHeight / 6;
var playerVelocity = [0, 0];
var playerGrounded;
var goalSize;
var goalX;
var goalY;
var aiGiveUp = false;
var enemies = [];
var enemyCount = 3;
var giveUpTime;
var timerRate = 1;
var timer = setInterval(draw, timerRate);
var hasReset = false;
var uiShow = false;

var keys = {};
window.onkeyup = function(e) { keys[e.keyCode] = false; }
window.onkeydown = function(e) { keys[e.keyCode] = true; }

newGoal();
createEnemies(Math.floor(Math.random() * enemyCount));

function toggleUI()
{
    var ui = document.getElementById("boxStuff");
    if (uiShow)
        ui.className = "box";
    else
        ui.className = "box2";
    uiShow = !uiShow
}

function checkRate()
{
    var rate = document.getElementById("rateBox");
    if (rate.value > 100)
    {
        rate.value = 100;
    }
    if (rate.value <= 0 && rate.value)
    {
        rate.value = 0;
    }
}

function restart()
{
    score = 0;
    sb.innerHTML = "Score: " + score;
    playerX = Math.floor(Math.random() * (gameWidth - playerSize)); 
    playerY = gameHeight / 6;
    playerVelocity = [0, 0];
    newGoal();
    createEnemies(Math.floor(Math.random() * enemyCount));
    clearInterval(giveUpTime);
    aiGiveUp = false;
    if (isAI)
        giveUpTime = setInterval(function() { aiGiveUp = true }, 5000);
}

//Main display/game loop
function draw() 
{   
    if (timerRate != document.getElementById("rateBox").value)
    {
        timerRate = document.getElementById("rateBox").value;
        clearInterval(timer);
        timer = setInterval(draw, timerRate);
    }
    //Reset the game when 'R' is pressed
    if (keys["82"] && !hasReset)
    {
        hasReset = true;
        setTimeout(function() { hasReset = false }, 500);
        restart();
    }
    //Draw the background
    ctx.lineWidth = 1.5;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, gameWidth, gameHeight);

    //Update the game objects
    goal();
    player();
    updateEnemies();
}

function fixEnemy(fixID)
{
    enemies[fixID] = 
    {
        size: 10 + Math.floor(Math.random() * 10),
        xPos: Math.floor(Math.random() * (gameWidth - goalSize)),
        yPos: 15 + Math.floor(Math.random() * (gameHeight - 45))
    }
    checkEnemy(fixID);
}

function checkEnemy(k)
{
    if (enemies[k] != undefined)
    {
        if (enemies[k].xPos <= goalX + goalSize + 40 && enemies[k].xPos + enemies[k].size > goalX - 40)
        {
            fixEnemy(k);
        }
        if (enemies[k].xPos <= playerX + playerSize + 20 && enemies[k].xPos + enemies[k].size > playerX - 20)
        {
            fixEnemy(k);
        }
        if (enemies[k].xPos <= goalX + goalSize && enemies[k].xPos + enemies[k].size > goalX)
        {
            if (enemies[k].yPos <= goalY + goalSize && enemies[k].yPos + enemies[k].size > goalY)
            {
                fixEnemy(k);
            }
        }
    }
}

function createEnemies(num)
{
    enemies = [];
    for (i = 0; i < num; i++)
    {
        enemies[i] = 
        {
            size: 10 + Math.floor(Math.random() * 10),
            xPos: Math.floor(Math.random() * (gameWidth - goalSize)),
            yPos: 15 + Math.floor(Math.random() * (gameHeight - 45))
        }

        fixEnemy(i);
    }
    enemies = enemies.filter(function () { return true });
}

function updateEnemies()
{
    for (i = 0; i < enemies.length; i++)
    {
        if (enemies[i] != null)
        {
            ctx.fillStyle = "red";
            ctx.fillRect(enemies[i].xPos, enemies[i].yPos, enemies[i].size, enemies[i].size);
            ctx.strokeRect(enemies[i].xPos, enemies[i].yPos, enemies[i].size, enemies[i].size);
        }
    }
    if (showNearest)
    {
        var closest = spotEnemy();
        if (closest)
        {
            ctx.fillStyle = "yellow";
            ctx.fillRect(closest.xPos, closest.yPos, closest.size, closest.size);
            ctx.strokeRect(closest.xPos, closest.yPos, closest.size, closest.size);
        }
    }
}

//Create a new goal in a random position
function newGoal() 
{
    goalSize = 25;
    goalX = Math.floor(Math.random() * (gameWidth - goalSize));
    goalY = gameHeight / 3 + Math.floor(Math.random() * (gameHeight - goalSize - gameHeight / 3));
    
    if (playerX <= goalX + goalSize && playerX + playerSize > goalX)
    {
        newGoal();
    }
}

//Draw the goal
function goal()
{
    ctx.fillStyle = "lime";
    ctx.fillRect(goalX, goalY, goalSize, goalSize);
    ctx.strokeRect(goalX, goalY, goalSize, goalSize);
}

function player()
{
    //Draw the player
    ctx.fillStyle = "magenta";
    ctx.fillRect(playerX, playerY, playerSize, playerSize);
    ctx.strokeRect(playerX, playerY, playerSize, playerSize)

    //Apply gravity when in the air, and bounce when hitting the ground or ceiling
    if (playerY + playerSize < gameHeight)
    {
        playerGrounded = false;
        playerVelocity[1] += 0.025;
    }
    else if (playerY + playerSize >= gameHeight)
    {
        playerGrounded = true;
        playerVelocity[1] = -playerVelocity[1] / 6;
        //playerVelocity[1] = 0;
        playerY = gameHeight - playerSize;
    }
    if (playerY <= 0)
    {
        playerVelocity[1] = -playerVelocity[1] / 6;
        playerY = 0;
    }
    
    //Move player based on keyboard inputs
    if ((playerVelocity[1] == 0 && (keys["32"] || keys["87"])) && !isAI)
        playerVelocity[1] -= 2.3;
    if ((keys["65"] && !keys["68"]) && !isAI)
        playerVelocity[0] -= 0.04;
    if ((keys["68"] && !keys["65"]) && !isAI)
        playerVelocity[0] += 0.04;

    //If controlled by AI, get the cubes location and decide how to move.
    if (isAI)
    {
        if (spotEnemy() && !aiGiveUp)
        {
            var myEnemy = spotEnemy();
            if (playerGrounded && playerVelocity[1] == 0)
            {
                if (playerY <= myEnemy.yPos + myEnemy.size)
                {
                    if (playerX + (playerSize / 2) <= goalX + (goalSize / 2))
                    {
                        aiWantMove = true;
                        playerVelocity[0] += 0.04;
                    }
                    else if (playerX + (playerSize / 2) >= goalX + (goalSize / 2))
                    {
                        aiWantMove = true;
                        playerVelocity[0] -= 0.04;
                    }
                    if ((playerX - 50 <=  myEnemy.xPos + myEnemy.size && playerX + playerSize + 50 >=  myEnemy.xPos) || (playerX <= goalX + goalSize && playerX + playerSize >= goalX))
                        playerVelocity[1] -= 2.3;
                }
                else if (playerY > myEnemy.yPos + myEnemy.size)
                {
                    if (playerX + (playerSize / 2) <= goalX + (goalSize / 2))
                    {
                        aiWantMove = true;
                        playerVelocity[0] += 0.04;
                    }
                    else if (playerX + (playerSize / 2) > goalX + (goalSize / 2))
                    {
                        aiWantMove = true;
                        playerVelocity[0] -= 0.04;
                    }
                    if (playerY >= goalY + goalSize && playerVelocity[1] == 0)
                    {
                        if (playerX <= goalX + goalSize && playerX + playerSize >= goalX)
                            playerVelocity[1] -= 2.3;
                    }
                }
            }
            else
            {
                if (playerY - 25 <= myEnemy.yPos + myEnemy.size && playerY + playerSize + 10 > myEnemy.yPos && playerX <= myEnemy.xPos + myEnemy.size + 35 && playerX + playerSize + 35 > myEnemy.xPos)
                {
                    if (playerX < myEnemy.xPos)
                    {
                        aiWantMove = true;
                        playerVelocity[0] -= 0.04;
                    }
                    else if (playerX > myEnemy.xPos)
                    {
                        aiWantMove = true;
                        playerVelocity[0] += 0.04;
                    }
                }
                else
                {
                    if (playerX + (playerSize / 2) <= goalX + (goalSize / 2))
                    {
                        aiWantMove = true;
                        if (playerVelocity[0] >= 0.01)
                            playerVelocity[0] += 0.04;
                    }
                    else if (playerX + (playerSize / 2) >= goalX + (goalSize / 2))
                    {
                        aiWantMove = true;
                        if (playerVelocity[0] <= - 0.01)
                            playerVelocity[0] -= 0.04;
                    }
                    if (playerY >= goalY + goalSize && playerVelocity[1] == 0 && playerGrounded)
                    {
                        if (playerX - 30 <=  goalX + goalSize && playerX + playerSize + 30 >=  goalX)
                            playerVelocity[1] -= 2.3;
                    }
                }
            }
        }
        else
        {
            if (playerX + (playerSize / 2) <= goalX + (goalSize / 2))
            {
                aiWantMove = true;
                playerVelocity[0] += 0.04;
            }
            else if (playerX + (playerSize / 2) >= goalX + (goalSize / 2))
            {
                aiWantMove = true;
                playerVelocity[0] -= 0.04;
            }
            if (playerY >= goalY + goalSize && playerVelocity[1] == 0 && playerGrounded)
            {
                if (playerX - 30 <=  goalX + goalSize && playerX + playerSize + 30 >=  goalX)
                    playerVelocity[1] -= 2.3;
            }
        }
    }
    
    //Apply drag/friction
    if (playerVelocity[0] != 0)
    {
        if (playerVelocity[0] < 0)
            playerVelocity[0] += 0.03;
        else if (playerVelocity[0] > 0)
            playerVelocity[0] -= 0.03;
    }

    //Round velocity and then set it to zero if its too low to be noticed
    playerVelocity[0] = parseFloat(playerVelocity[0].toFixed(2))
    if (playerVelocity[0] > -0.05 && playerVelocity[0] < 0.05)
    {
        if (!isAI && !keys["68"] && !keys["65"])
            playerVelocity[0] = 0;
        else if (isAI && !aiWantMove)
            playerVelocity[0] = 0;
    }
    playerVelocity[1] = parseFloat(playerVelocity[1].toFixed(2))
    if ((playerVelocity[1] > -0.02 && playerVelocity[1] < 0.02))
        playerVelocity[1] = 0;

    //Bounce the player off the side walls
    if (playerX <= 0)
    {
        playerVelocity[0] = -playerVelocity[0] / 3;
        playerX = 0.1;
    }
    else if (playerX + playerSize >= gameWidth)
    {
        playerVelocity[0] = -playerVelocity[0] / 3;
        playerX = gameWidth - playerSize -0.1;
    }

    //Keep velocity under a certain value (terminal velocity)
    if (playerVelocity[0] > 2)
        playerVelocity[0] = 2;
    if (playerVelocity[0] < -2)
        playerVelocity[0] = -2;
        
    //Apply movement
    playerX += playerVelocity[0];
    playerY += playerVelocity[1];

    //Check if player collides with goal
    if (playerX <= goalX + goalSize && playerX + playerSize > goalX)
    {
        if (playerY <= goalY + goalSize && playerY + playerSize > goalY)
        {
            clearInterval(giveUpTime);
            aiGiveUp = false;
            if (isAI)
                giveUpTime = setInterval(function() { aiGiveUp = true }, 5000);
            newGoal();
            createEnemies(Math.floor(Math.random() * enemyCount));
            score++;
            sb.innerHTML = "Score: " + score;
        }
    }
    
    //Check if player collides with enemy
    for (i = 0; i < enemies.length; i++)
    {
        if (playerX <= enemies[i].xPos + enemies[i].size && playerX + playerSize > enemies[i].xPos)
        {
            if (playerY <= enemies[i].yPos + enemies[i].size && playerY + playerSize > enemies[i].yPos)
            {
                restart();
            }
        }
    }
}

function spotEnemy()
{
    var playerCenterX = playerX + playerSize;
    var enemyCenterX = [];
    if (enemies.length > 1)
    {
        for (i = 0; i < enemies.length; i++)
        {
            enemyCenterX[i] = enemies[i].xPos + enemies[i].size
            for (k = 0; k < enemies.length; k++)
            {
                enemyCenterX[k] = enemies[k].xPos + enemies[k].size
                if (k != i)
                {
                    if ((enemyCenterX[k] > playerCenterX && enemyCenterX[k] - playerCenterX > 275) || (enemyCenterX[k] < playerCenterX && playerCenterX -enemyCenterX[k]  > 275))
                    {
                        return false;
                    }
                    if (playerCenterX <= enemyCenterX[i])
                    {
                        if (enemyCenterX[k] > enemyCenterX[i])
                            return enemies[i];
                        else if (playerCenterX - enemyCenterX[k] < enemyCenterX[i] - playerCenterX)
                        {
                            if (enemies[k].yPos > playerY - 50)
                                return enemies[k];
                            else if (enemies[i].yPos > playerY - 50)
                                return enemies[i];
                            else return enemies[k];
                        }
                        else
                        {
                            if (enemies[i].yPos > playerY - 50)
                                return enemies[i];
                            else if (enemies[k].yPos > playerY - 50)
                                return enemies[k];
                            else return enemies[i];
                        }
                    }
                    else if (playerCenterX > enemyCenterX[i])
                    {
                        if (enemyCenterX[k] < enemyCenterX[i])
                            return enemies[i];
                        else if (playerCenterX - enemyCenterX[i] > enemyCenterX[k] - playerCenterX)
                        {
                            if (enemies[k].yPos > playerY - 50)
                                return enemies[k];
                            else if (enemies[i].yPos > playerY - 50)
                                return enemies[i];
                            else return enemies[k];
                        }
                        else 
                        {
                            if (enemies[i].yPos > playerY - 50)
                                return enemies[i];
                            else if (enemies[k].yPos > playerY - 50)
                                return enemies[k];
                            else return enemies[i];
                        }
                    }
                }
            }
        }
    }
    else if (enemies.length == 1)
    {
        enemyCenterX[1] = enemies[0].xPos + enemies[0].size;
        if ((enemyCenterX[1] > playerCenterX && enemyCenterX[1] - playerCenterX > 225) || (enemyCenterX[1] < playerCenterX && playerCenterX - enemyCenterX[1] > 225))
            return false;
        else return enemies[0];
    }
}