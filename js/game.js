'use strict';

window.onload = function () {
    var player = 1;
    var lineColor = "#ddd";

    var canvas = document.getElementById('gamefield');
    var context = canvas.getContext('2d');

    var longestLineCells = 9;

    var canvasSize = 500;
    var sectionSize = canvasSize / longestLineCells;
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    // context.translate(0.5, 0.5);

    function drawRhomb () {
        context.strokeStyle = "#000";
        context.lineWidth = 3;
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
};