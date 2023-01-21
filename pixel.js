var color = "#da1010";
const colorPicker = document.getElementById("color-picker");
colorPicker.addEventListener("change", function(e) {
    color = colorPicker.value;
    document.body.classList.add("cursor-" + this.value.slice(1));
});

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const gridSize = 150;
const rectSize = 15;
ctx.strokeStyle = 'gray';

for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
        const x = col * rectSize;
        const y = row * rectSize;
        ctx.strokeRect(x, y, rectSize, rectSize);
    }
}

canvas.addEventListener("click", function(e) {
    const x = e.clientX - canvas.offsetLeft;
    const y = e.clientY - canvas.offsetTop;
    const col = Math.floor(x / rectSize);
    const row = Math.floor(y / rectSize);
    ctx.fillStyle = color;
    ctx.fillRect(col * rectSize, row * rectSize, rectSize, rectSize);
});

const saveButton = document.getElementById("save-button");
const clearButton = document.getElementById("clear-button");

saveButton.addEventListener("click", function() {
    const dataURL = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "my-image.png";
    link.click();
});

var previousState = ctx.getImageData(0, 0, canvas.width, canvas.height);


clearButton.addEventListener("click", function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            const x = col * rectSize;
            const y = row * rectSize;
            ctx.strokeRect(x, y, rectSize, rectSize);
        }
    }
    ctx.putImageData(previousState, 0, 0);
});