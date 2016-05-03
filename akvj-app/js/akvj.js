AKVJ();    
    
    
function AKVJ() {
    
    var ctx = document.getElementById('akvj-screen').getContext('2d');
    ctx.mozImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
    ctx.globalCompositeOperation = 'destination-over';
    var sun = new Image();
    var moon = new Image();
    var earth = new Image();
    var i = 0;

    init();
    
    function init(){
        sun.src = 'assets/falling.gif';
        moon.src = 'assets/BG3.gif';
        earth.src = 'assets/BG4.gif';
        window.requestAnimationFrame(draw);
    }

    function draw() {
        ctx.clearRect(0,0,1920,1080); // clear canvas
        
        ctx.drawImage(sun,0,0,1920,1080);
        
        if (i > 50) {
            i = 0;
        }
        if (i < 25){
            ctx.drawImage(moon,0,0,1920,1080);
        } else {
            ctx.drawImage(earth,0,0,1920,1080);
        }
        i++;


        
        window.requestAnimationFrame(draw);
    }
    

}
