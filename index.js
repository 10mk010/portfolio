// code for the rotating cube: https://www.youtube.com/watch?v=gx_Sx5FeTAk
const color_bg = "none";
const color_cube = "white";
const speed_x = 0.05;
const speed_y = 0.15;
const speed_z = 0.10;
const point3d = function(x, y, z){
    this.x = x;
    this.y = y;
    this.z = z;
}
let canvas = document.createElement("canvas");
document.querySelector(".background").appendChild(canvas);
let ctx = canvas.getContext("2d");  

let h = document.documentElement.clientHeight;
let w = document.documentElement.clientWidth;
canvas.height = h;
canvas.width = w;

ctx.fillStyle = color_bg;
ctx.lineWidth = w / 700;
ctx.strokeStyle = color_cube;
ctx.lineCap = "round";

let cx = w / 2;
let cy = h / 2;
let cz = 0;
let size = h / 8;
let vertices = [
    new point3d(cx - size, cy - size, cz - size),
    new point3d(cx + size, cy - size, cz - size),
    new point3d(cx + size, cy + size, cz - size),
    new point3d(cx - size, cy + size, cz - size),
    new point3d(cx - size, cy - size, cz + size),
    new point3d(cx + size, cy - size, cz + size),
    new point3d(cx + size, cy + size, cz + size),
    new point3d(cx - size, cy + size, cz + size)
];

let edges = [
    [0, 1], [1, 2], [2, 3], [3, 0],
    [4, 5], [5, 6], [6, 7], [7, 4],
    [0, 4], [1, 5], [2, 6], [3, 7]
];


let timeDelta, timeLast = 0;
requestAnimationFrame(loop);

function loop(timeNow){
    timeDelta = timeNow - timeLast;
    timeLast = timeNow;

    ctx.fillRect(0, 0, w, h);

    let angle = timeDelta * 0.001 * speed_z * Math.PI * 2;
    for (let v of vertices){
        let dx = v.x - cx;
        let dy = v.y - cy;
        let x = dx * Math.cos(angle) - dy * Math.sin(angle);
        let y = dx * Math.sin(angle) + dy * Math.cos(angle);
        v.x = x + cx;
        v.y = y + cy;
    }

    for (let v of vertices){
        let dy = v.y - cy;
        let dz = v.z - cz;
        let y = dy * Math.cos(angle) - dz * Math.sin(angle);
        let z = dy * Math.sin(angle) + dz * Math.cos(angle);
        v.y = y + cy;
        v.z = z + cz;
    }

    for (let v of vertices){
        let dx = v.x - cx;
        let dz = v.z - cz;
        let x = dx * Math.cos(angle) - dz * Math.sin(angle);
        let z = dx * Math.sin(angle) + dz * Math.cos(angle);
        v.x = x + cx;
        v.z = z + cz;
    }

    for(let edge of edges){
        ctx.beginPath();
        ctx.moveTo(vertices[edge[0]].x, vertices[edge[0]].y);
        ctx.lineTo(vertices[edge[1]].x, vertices[edge[1]].y);
        ctx.stroke();
    }

    requestAnimationFrame(loop);
}

window.addEventListener("scroll", changeOpacity);

function changeOpacity() {
    const element = document.querySelector(".background"); // Change selector if needed
    const scrollTop = window.scrollY; // Get vertical scroll position
    const maxScroll = document.body.scrollHeight - window.innerHeight; // Max scrollable height

    let opacity = 1 - scrollTop / maxScroll; // Calculate opacity (1 at top, 0 at bottom)
    opacity = Math.max(0.2, opacity); // Ensures opacity doesn't go below 0.2

    element.style.opacity = opacity.toFixed(2); // Apply opacity with 2 decimal precision
}

document.getElementById("downArrow").addEventListener("click", () => {
    const el = document.querySelector(".gallery");
    el.scrollIntoView({behavior: 'smooth'});
})