'use strict';

window.onload = function () {
    var player = 1;
    var lineColor = "#ddd";

    var canvas = document.getElementById('gamefield');
    var context = canvas.getContext('2d');

    var longestLineCells = 9;

    var canvasSize = 600;
    var sectionSize = canvasSize / longestLineCells;
    canvas.width = canvasSize + 4;
    canvas.height = canvasSize + 4;
    context.translate(2, 2);

    function drawCellsInRhomb () {
        context.strokeStyle = "#ddd";
        context.lineWidth = 5;
        context.beginPath();

        for (var x = 1; x < longestLineCells; x++) {
            var upperFrom = sectionSize * 4; 
            if (x < longestLineCells / 2) {
                var left = upperFrom - sectionSize * (x-1);
                var right = upperFrom + sectionSize * x;
            } else {
                var left = upperFrom - sectionSize * (longestLineCells-x-1);
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

    function drawRhomb () {
        context.strokeStyle = "#000";
        context.lineWidth = 5;
        context.lineCap = "round";
        context.beginPath();

        for (var x = 0; x <= longestLineCells; x++) {
            
            var upperFrom = sectionSize * 4; 
            if (x < longestLineCells / 2) {
                var fromLeft = upperFrom - sectionSize * (x-1);
                var fromRight = upperFrom + sectionSize * x;

                var toLeft = upperFrom - sectionSize * x;
                var toRight = upperFrom + sectionSize * (x+1);
            } else {
                var toLeft = upperFrom - sectionSize * (longestLineCells-x-1);
                var toRight = upperFrom + sectionSize * (longestLineCells - x);

                var fromLeft = upperFrom - sectionSize * (longestLineCells - x);
                var fromRight = upperFrom + sectionSize * (longestLineCells - x+1);
                
            }
            context.moveTo(fromLeft, sectionSize * x);
            context.lineTo(toLeft, sectionSize * x);

            context.moveTo(fromRight, sectionSize * x);
            context.lineTo(toRight, sectionSize * x);

            context.moveTo(toLeft, sectionSize * x);
            context.lineTo(toLeft, sectionSize * (x+1));

            context.moveTo(toRight, sectionSize * x);
            context.lineTo(toRight, sectionSize * (x+1));
            
        }

        context.stroke();
    }

    drawRhomb();

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

    var isXPlayer = true;
    var playerColor = "#f1be32";
    drawX(0, 0);
    
    function changePlayer() {
        isXPlayer = !isXPlayer;
        playerColor = isXPlayer ? "#f1be32" : "#01bBC2";
        context.clearRect(0, 0, sectionSize, sectionSize);
        if (isXPlayer) {
            drawX(0, 0);
        } else {
            drawO(0, 0);
        }
    }

    onmouseup = function (e) {
        changePlayer();
    }
};