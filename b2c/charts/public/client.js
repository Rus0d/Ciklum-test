$(document).ready(function() {

    var canvas = document.getElementById("graph"),
        ctx = canvas.getContext('2d'),
        graphConfig = {},
        width = 0,
        height = 0,
        widthMultiplier = 0,
        heightMultiplier = 0;

    ctx.fillStyle = 'gray';

    $.ajax({
        url: '/api/v1/config',
        success: function(CONFIG){
            graphConfig = CONFIG.POINTS,
            width = canvas.width,
            height = canvas.height,
            widthMultiplier = width/(graphConfig.QTY - 1),
            heightMultiplier = height/(graphConfig.MAX - graphConfig.MIN);

            setInterval(pointsArr, graphConfig.UPDATE_INTERVAL);
         }
    });

    function pointsArr() {
        $.ajax({
            url: '/api/v1/points',
            success: function (points) {

                ctx.fillRect(0, 0, width, height);
                ctx.beginPath();
                ctx.moveTo(0, points[0] * heightMultiplier + height/2);

                for (var i = 1; i < points.length; i++) {
                    graphConstructor(points, i);
                }
                ctx.stroke();
            }
        });
    }

    function graphConstructor(points, i) {
        var x = i * widthMultiplier,
            y = points[i] * heightMultiplier + height/2;
        return ctx.lineTo(x, y);
    }

});

