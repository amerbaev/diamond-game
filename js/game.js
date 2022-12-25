'use strict';

window.onload = function () {
    var canvas = document.getElementById('gamefield');
    var context = canvas.getContext('2d');

    var longestLineCells = 9;

    var canvasSize = 600;
    var sectionSize = canvasSize / longestLineCells;
    canvas.width = canvasSize + 4;
    canvas.height = canvasSize + 4;
    context.translate(2, 2);

    function drawCellsInRhomb() {
        context.strokeStyle = "#ddd";
        context.lineWidth = 5;
        context.beginPath();

        for (var x = 1; x < longestLineCells; x++) {
            var upperFrom = sectionSize * 4;
            if (x < longestLineCells / 2) {
                var left = upperFrom - sectionSize * (x - 1);
                var right = upperFrom + sectionSize * x;
            } else {
                var left = upperFrom - sectionSize * (longestLineCells - x - 1);
                var right = upperFrom + sectionSize * (longestLineCells - x);
            }

            context.moveTo(left, sectionSize * x);
            context.lineTo(right, sectionSize * x);

            context.moveTo(sectionSize * x, left);
            context.lineTo(sectionSize * x, right);
        }

        context.stroke();
    }

    drawCellsInRhomb();

    function drawRhomb() {
        context.strokeStyle = "#000";
        context.lineWidth = 5;
        context.lineCap = "round";
        context.beginPath();

        for (var x = 0; x <= longestLineCells; x++) {
            var upperFrom = sectionSize * 4;
            if (x < longestLineCells / 2) {
                var fromLeft = upperFrom - sectionSize * (x - 1);
                var fromRight = upperFrom + sectionSize * x;

                var toLeft = upperFrom - sectionSize * x;
                var toRight = upperFrom + sectionSize * (x + 1);
            } else {
                var toLeft = upperFrom - sectionSize * (longestLineCells - x - 1);
                var toRight = upperFrom + sectionSize * (longestLineCells - x);

                var fromLeft = upperFrom - sectionSize * (longestLineCells - x);
                var fromRight = upperFrom + sectionSize * (longestLineCells - x + 1);
            }
            context.moveTo(fromLeft, sectionSize * x);
            context.lineTo(toLeft, sectionSize * x);

            context.moveTo(fromRight, sectionSize * x);
            context.lineTo(toRight, sectionSize * x);

            context.moveTo(toLeft, sectionSize * x);
            context.lineTo(toLeft, sectionSize * (x + 1));

            context.moveTo(toRight, sectionSize * x);
            context.lineTo(toRight, sectionSize * (x + 1));

        }

        context.stroke();
    }

    drawRhomb();
    var gameMatrix = {
        horizontal: [],
        vertical: []
    }
    function initGameMatrix(gameMatrix) {
        for (var i = 0; i < longestLineCells; i++) {
            gameMatrix.horizontal.push(Array(longestLineCells + 1).fill(true));
        }

        for (var i = 0; i <= longestLineCells; i++) {
            gameMatrix.vertical.push(Array(longestLineCells).fill(true));
        }

        for (var i = 0; i < longestLineCells; i++) {
            if (i < longestLineCells / 2) {
                for (var j = 5 - i; j < 5 + i; j++) {
                    gameMatrix.horizontal[i][j] = false;
                    gameMatrix.vertical[j][i] = false;
                }
            } else {
                for (var j = 5 - (longestLineCells - i - 1); j < 5 + (longestLineCells - i - 1); j++) {
                    gameMatrix.horizontal[i][j] = false;
                    gameMatrix.vertical[j][i] = false;
                }
            }
        }

        for (var i = 0; i < longestLineCells; i++) {
            if (i < longestLineCells / 2) {
                for (var j = 5 - i; j < 5 + i; j++) {
                    gameMatrix.vertical[j][i] = false;
                }
            } else {
                for (var j = 5 - (longestLineCells - i - 1); j < 5 + (longestLineCells - i - 1); j++) {

                    gameMatrix.vertical[j][i] = false;
                }
            }
        }


    }
    initGameMatrix(gameMatrix);
    console.log(gameMatrix);

    function drawO(xCordinate, yCordinate) {
        var halfSectionSize = (0.5 * sectionSize);
        var centerX = xCordinate + halfSectionSize;
        var centerY = yCordinate + halfSectionSize;
        var radius = (sectionSize - halfSectionSize) * 0.8;
        var startAngle = 0 * Math.PI;
        var endAngle = 2 * Math.PI;

        context.lineWidth = 5;
        context.strokeStyle = "#01bBC2";
        context.beginPath();
        context.arc(centerX, centerY, radius, startAngle, endAngle);
        context.stroke();
    }

    function drawX(xCordinate, yCordinate) {
        context.strokeStyle = "#f1be32";
        context.lineWidth = 5;
        context.beginPath();

        // var offset = (0.5 * sectionSize);
        var offset = sectionSize / 8;
        context.moveTo(xCordinate + offset, yCordinate + offset);
        context.lineTo(xCordinate + sectionSize - offset, yCordinate + sectionSize - offset);

        context.moveTo(xCordinate + offset, yCordinate + sectionSize - offset);
        context.lineTo(xCordinate + sectionSize - offset, yCordinate + offset);

        context.stroke();
    }
    var xPlayerScore = 0;
    var oPlayerScore = 0;

    function increaseScore() {
        if (isXPlayer) {
            xPlayerScore++;
        } else {
            oPlayerScore++;
        }
    }

    var isXPlayer = true;
    var playerColor = "#f1be32";
    var currentPlayerDraw = drawX;
    currentPlayerDraw(0, 0);

    function changePlayer() {
        isXPlayer = !isXPlayer;
        playerColor = isXPlayer ? "#f1be32" : "#01bBC2";
        context.clearRect(0, 0, sectionSize, sectionSize);
        if (isXPlayer) {
            currentPlayerDraw = drawX;
        } else {
            currentPlayerDraw = drawO;
        }
        currentPlayerDraw(0, 0);
    }

    takeVertical(1, 4);
    drawX(0, sectionSize * 4);
    changePlayer();

    takeHorizontal(4, 1);
    drawO(sectionSize * 4, 1);
    changePlayer();

    takeVertical(8, 4);
    drawX(sectionSize * 8, sectionSize * 4);
    changePlayer();

    takeHorizontal(4, 8);
    drawO(sectionSize * 4, sectionSize * 8);
    changePlayer();

    drawRhomb();

    function takeHorizontal(x, y) {
        if (gameMatrix.horizontal[x][y]) {
            console.log(x, y, "horizontal already taken")
            return false;
        }
        drawLine(sectionSize * x + 2, sectionSize * y, sectionSize * (x + 1) - 2, sectionSize * y);
        drawRhomb();
        gameMatrix.horizontal[x][y] = true;

        if (gameMatrix.horizontal[x][y + 1] && gameMatrix.vertical[x][y] && gameMatrix.vertical[x + 1][y]) {
            currentPlayerDraw(sectionSize * x, sectionSize * y);
            increaseScore();
            checkNeighbours(x, y);
        }
        if (gameMatrix.horizontal[x][y - 1] && gameMatrix.vertical[x][y - 1] && gameMatrix.vertical[x + 1][y - 1]) {
            currentPlayerDraw(sectionSize * x, sectionSize * (y - 1));
            increaseScore();
            checkNeighbours(x, y - 1);
        }
        return true;
    }

    function checkNeighbours(x, y) {
        // upper neighbour
        if (y > 0) {
            if (gameMatrix.horizontal[x][y - 1]) {
                if (gameMatrix.vertical[x][y - 1] && !gameMatrix.vertical[x + 1][y - 1]) {
                    takeVertical(x + 1, y - 1);
                } else if (!gameMatrix.vertical[x][y - 1] && gameMatrix.vertical[x + 1][y - 1]) {
                    takeVertical(x, y - 1);
                }
            } else if (gameMatrix.vertical[x][y - 1] && gameMatrix.vertical[x + 1][y - 1]) {
                takeHorizontal(x, y - 1);
            }
        }
        // lower neighbour
        if (y < gameMatrix.horizontal[x].lenght - 1) {
            if (gameMatrix.horizontal[x][y + 1]) {
                if (gameMatrix.vertical[x][y] && !gameMatrix.vertical[x + 1][y]) {
                    takeVertical(x + 1, y);
                } else if (!gameMatrix.vertical[x][y] && gameMatrix.vertical[x + 1][y]) {
                    takeVertical(x, y);
                }
            } else if (gameMatrix.vertical[x][y] && gameMatrix.vertical[x + 1][y]) {
                takeHorizontal(x, y + 1);
            }
        }
        // left neighbour
        if (x > 0) {
            if (gameMatrix.vertical[x - 1][y]) {
                if (gameMatrix.horizontal[x - 1][y] && !gameMatrix.horizontal[x - 1][y + 1]) {
                    takeHorizontal(x - 1, y + 1);
                } else if (!gameMatrix.horizontal[x - 1][y] && gameMatrix.horizontal[x - 1][y + 1]) {
                    takeHorizontal(x - 1, y);
                }
            } else if (gameMatrix.horizontal[x - 1][y] && gameMatrix.horizontal[x - 1][y + 1]) {
                takeVertical(x - 1, y);
            }
        }
        // right neighbour
        if (x < gameMatrix.vertical.lenght - 1) {
            if (gameMatrix.vertical[x + 1][y]) {
                if (gameMatrix.horizontal[x][y] && !gameMatrix.horizontal[x][y + 1]) {
                    takeHorizontal(x, y + 1);
                } else if (!gameMatrix.horizontal[x][y] && gameMatrix.horizontal[x][y + 1]) {
                    takeHorizontal(x, y);
                }
            } else if (gameMatrix.horizontal[x][y] && gameMatrix.horizontal[x][y + 1]) {
                takeVertical(x + 1, y);
            }
        }
    }

    function takeVertical(x, y) {
        if (gameMatrix.vertical[x][y]) {
            console.log(x, y, "vertical already taken")
            return false;
        }
        gameMatrix.vertical[x][y] = true;
        drawLine(sectionSize * x, sectionSize * y + 2, sectionSize * x, sectionSize * (y + 1) - 2);
        drawRhomb();

        if (gameMatrix.vertical[x + 1][y] && gameMatrix.horizontal[x][y] && gameMatrix.horizontal[x][y + 1]) {
            currentPlayerDraw(sectionSize * x, sectionSize * y);
            increaseScore();
            checkNeighbours(x, y);
        }
        if (gameMatrix.vertical[x - 1][y] && gameMatrix.horizontal[x - 1][y] && gameMatrix.horizontal[x - 1][y + 1]) {
            currentPlayerDraw(sectionSize * (x - 1), sectionSize * y);
            increaseScore();
            checkNeighbours(x - 1, y);
        }
        return true;
    }

    onclick = function (e) {
        var x = e.offsetX;
        var y = e.offsetY;

        var nearX = nearestBorder(x);
        var nearY = nearestBorder(y);
        var horizontal = Math.abs(x - nearX) > Math.abs(y - nearY);
        var xSection = nearX / sectionSize;
        var ySection = nearY / sectionSize;
        if (horizontal) {
            if (x < nearX) {
                xSection--;
            }
            if (!takeHorizontal(xSection, ySection)) {
                return;
            }
        } else {
            if (y < nearY) {
                ySection--;
            }
            if (!takeVertical(xSection, ySection)) {
                return;
            }
        }
        console.log(gameMatrix);

        changePlayer();
    }

    function nearestBorder(p) {
        for (var i = 0; i <= longestLineCells; i++) {
            var border = sectionSize * i;
            if (p < border) {
                if (i == longestLineCells) {
                    return border;
                }
                var prevBorder = sectionSize * (i - 1);
                if (p - prevBorder < border - p) {
                    return prevBorder;
                }
                return border;
            }
        }
    }

    function drawLine(x1, y1, x2, y2) {
        context.strokeStyle = playerColor;
        context.lineWidth = 5;
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.stroke();
    }
};