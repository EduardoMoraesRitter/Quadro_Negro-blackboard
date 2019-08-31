document.addEventListener("DOMContentLoaded", function () {
    let socket = io.connect();

    var mouse = {
        click: false,
        moveu: false,
        de: { x: 0, y: 0 },
        para: { x: 0, y: 0 }
    };

    var telas = document.getElementById('tela');
    var ctx = telas.getContext('2d');

    telas.width = window.innerWidth;
    telas.height = window.innerHeight;

    telas.onmousedown = e => mouse.click = true;
    telas.onmouseup = e => mouse.click = false;

    telas.onmousemove = e => {
        mouse.de.x = e.clientX / telas.width;
        mouse.de.y = e.clientY / telas.height;
        mouse.moveu = true;
    };

    socket.on('client_risco', giz => {
        ctx.beginPath();
        ctx.moveTo(giz[0].x * telas.width, giz[0].y * telas.height);
        ctx.lineTo(giz[1].x * telas.width, giz[1].y * telas.height);
        ctx.stroke();
    });

    function monitora_tela() {
        if (mouse.click && mouse.moveu) {
            socket.emit('serve_risco', { giz: [mouse.de, mouse.para] });
            mouse.moveu = false;
        }
        mouse.para = { x: mouse.de.x, y: mouse.de.y };
        setTimeout(monitora_tela, 20);
    }
    monitora_tela();
});