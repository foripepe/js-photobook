var add = (function () {

    var container = null;
    var placeholders = [];

    var counter = 0;
    var maxCounter = 100;
    var myTimeout = 10;

    var originalImage = null;

    function init() {
        console.warn('Booting');
        var container = document.getElementById('container');

        placeholders.push( createPlaceholder({
            container: container,
            top: 10,
            left: 30,
            width: 350,
            height: 300,
            src: '1.jpg'
        }) );
        placeholders.push( createPlaceholder({
            container: container,
            top: 400,
            left: 400,
            width: 350,
            height: 300,
            src: '2.jpg'
        }) );
        placeholders.push( createPlaceholder({
            container: container,
            top: 20,
            left: 500,
            width: 250,
            height: 200,
            src: '3.jpg'
        }) );
        placeholders.push( createPlaceholder({
            container: container,
            top: 320,
            left: 50,
            width: 300,
            height: 250,
            src: '5.jpg'
        }) );

        document.body.style.perspective = '800px';
        document.body.style.perspectiveOrigin = '50% 200px';

        setInterval(function () {
            counter++;
            counter %= maxCounter;

            placeholders[0].style.width = (350 + counter) + 'px';
            placeholders[0].style.height = (300 + counter) * 1.1 + 'px';

            placeholders[1].style.transform = 'rotate(' + (360 * counter/maxCounter)  + 'deg)';

            placeholders[2].childNodes[0].style.width = (250 + counter) + 'px';
            placeholders[2].childNodes[0].style.height = (200 + counter) + 'px';
            placeholders[2].childNodes[0].style.top = -(counter/2) + 'px';
            placeholders[2].childNodes[0].style.left = -(counter/2) + 'px';

            /*
            // Black and white
            placeholders[3].style["-webkit-filter"] = 'grayscale(' + (100 * counter / maxCounter) + '%)';
            placeholders[3].style["-moz-filter"] = 'grayscale(' + (100 * counter / maxCounter) + '%)';
            placeholders[3].style["filter"] = 'grayscale(' + (100 * counter / maxCounter) + '%)';
            */

            container.style.transform = 'rotateY(' + (-20 * counter/maxCounter)  + 'deg)';
        }, myTimeout);

        // Black and white
        imageObj = placeholders[3].childNodes[0];
        imageObj.addEventListener('load', function() {
            originalImage = new Image();
            originalImage.src = 'picture/5.jpg';
            setTimeout(function () {
                counter++;
                counter %= maxCounter;

                placeholders[3].childNodes[0].src = grayscale(originalImage, 300, 250, counter / maxCounter);
            }, myTimeout);
        }, false);
    }

    function createPlaceholder(options) {
        var div = document.createElement("div");
        div.style.top = options.top + "px";
        div.style.left = options.left + "px";
        div.style.width = options.width + "px";
        div.style.height = options.height + "px";
        div.style.background = "#EEEEEE";
        div.style.color = "black";
        div.style.position = "absolute";
        div.style.border = "1px solid #000000";
        //div.innerHTML = "Hello";
        div.style.overflow = 'hidden';

        var img = document.createElement("img");
        img.src = 'picture/' + options.src;
        //img.style.display = 'inline-block';
        img.style.width = 'inherit';
        img.style.height = 'inherit';
        //img.style.margin = '0px';
        //img.style.border = '0px solid #c99';
        //img.style.backgroundPosition = 'center center';
        //img.style.backgroundSize = 'cover';
        img.style.position = "absolute";
        div.appendChild(img);

        options.container.appendChild(div);

        return div;
    }

    function grayscale(imgObj, width, height, aspect){
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        //var imgObj = new Image();
        //imgObj.src = src;
        //imgObj.style.width = width + 'px';
        //imgObj.style.height = height + 'px';
        canvas.width = width;//imgObj.width;
        canvas.height = height;//imgObj.height;
        ctx.drawImage(imgObj, 0, 0, width, height);
        var imgPixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
        for(var y = 0; y < imgPixels.height; y++){
            for(var x = 0; x < imgPixels.width; x++){
                var i = (y * 4) * imgPixels.width + x * 4;
                var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
                imgPixels.data[i] = imgPixels.data[i] * (1 - aspect) + avg * aspect;
                imgPixels.data[i + 1] = imgPixels.data[i + 1] * (1 - aspect) + avg * aspect;
                imgPixels.data[i + 2] = imgPixels.data[i + 2] * (1 - aspect) + avg * aspect;
             }
         }
        ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
        return canvas.toDataURL("image/jpg");
    };
    
    return {
        init: init
    };
})();

window.addEventListener('load', add.init, false);
