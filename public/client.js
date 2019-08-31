//document.addEventListener("DOMContentLoaded", function () {
window.onload = function () {
    let socket = io.connect();
    var click = false;
    var telas = document.getElementById('tela');
    var ctx = telas.getContext('2d');

    telas.width = window.innerWidth;
    telas.height = window.innerHeight;

    telas.onmousedown = e => click = true;
    telas.onmouseup = e => click = false;

    telas.onmousemove = e => click && socket.emit('serve_risco', { giz: [e.clientX / telas.width, e.clientY / telas.height] });

    socket.on('client_risco', giz => {
        ctx.beginPath();
        ctx.strokeStyle = 'white';
        ctx.arc(giz[0] * telas.width, giz[1] * telas.height, 2, 0, 2 * Math.PI);
        ctx.stroke();
    });
}