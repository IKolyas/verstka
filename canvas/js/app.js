let container = document.querySelector('#app');
let canvas = document.querySelector('#canv');
let tools = document.querySelector('#tools');
let coordinates = document.querySelector('#coordinates');

let abobe = {
    app: container,
    canvas: canvas,
    tools: tools,
    coordinates: coordinates,
    ctx: null, //канвасная штука
    x: 0,
    y: 0,
    editor: {
        currentTool: null,
        currentColor: '#000',
        currentBrushSize: 10,
    },
    init() {
        this.ctx = this.canvas.getContext('2d');
        this._handleEvents();
    },
    _handleEvents() {
        this.canvas.addEventListener('mousemove', this._moveHandler.bind(this));
        this.canvas.addEventListener('mousedown', this._start.bind(this));
        this.canvas.addEventListener('mouseup', this._end.bind(this));

        this.tools.addEventListener('click', this._clickHandler.bind(this));
        this.tools.addEventListener('change', this._changeHandler.bind(this));
    },
    _getCoordinates({x, y}) {
        this.x = x;
        this.y = y;

        document.querySelector('#xCoord').innerText = x;
        document.querySelector('#yCoord').innerText = y;
    },
    _moveHandler(e) {
        this._getCoordinates({ x: e.offsetX, y: e.offsetY })
    },
    _clickHandler(e) {
        if (e.target.name == 'tool') {
            this.editor.currentTool = e.target.dataset.tool;
        }
        if (e.target.name == 'sizeOk') {
            this._sizeOk();
        }
        if (e.target.name == 'save') {
            this._save();
        }
        document.querySelector('#sizeValue').innerHTML = this.editor.currentBrushSize;
  
    },
    _changeHandler(e) {
        if (e.target.name == 'tool-input') {
            this.editor[`current${e.target.dataset.tool}`] = e.target.value;
        }
    },

    _start() {
        this.ctx.fillStyle = this.editor.currentColor;
        this.ctx.strokeStyle = this.editor.currentColor;
        
        if(this.editor.currentTool == 'pencil') {
            this._pencil(); //чисто канвасные темы
        }
        if (this.editor.currentTool == 'eraser') {
            this._eraser();
         }
         if (this.editor.currentTool == 'square') {
            this._square();
         }
         if (this.editor.currentTool == 'clearCnv') {
            this._clearCnv();
         }
         if (this.editor.currentTool == 'fill') {
            this._fill();
         }
         if (this.editor.currentTool == 'brush') {
            this._brush();
         }
         if (this.editor.currentTool == 'arc') {
             this._arc();
         }
         if (this.editor.currentTool == 'triangle') {
            this._triangle();
        }
    },

    _end() {
        this.canvas.onmousemove = null;
        
    },

    _pencil() {
        this.canvas.onmousemove = () => {
            this.ctx.fillRect(this.x, this.y, this.editor.currentBrushSize, this.editor.currentBrushSize);
        }
    },

    _eraser() {
        this.canvas.onmousemove = () => {
            this.ctx.clearRect(this.x, this.y, this.editor.currentBrushSize, this.editor.currentBrushSize);
          
        }
    },

    _square() {
        this.canvas.onmousemove = () => {
            this.ctx.beginPath();
            this.ctx.strokeRect(this.x, this.y, this.editor.currentBrushSize, this.editor.currentBrushSize);
            this.ctx.fill();
            this.ctx.stroke();
          
        }
    },

    _clearCnv() {
        this.ctx.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
    },

    _fill() {
        this.ctx.fillRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
    },

    _brush() {
        this.canvas.onmousemove = () => {
            this.ctx.beginPath();
            this.ctx.arc(this.x, this.y, this.editor.currentBrushSize, 0, 2*Math.PI, false);
            this.ctx.closePath();
            this.ctx.fill();
            this.ctx.stroke();
        }
    },

    _arc() {
        this.canvas.onmousemove = () => {
            this.ctx.beginPath();
            this.ctx.arc(this.x, this.y, this.editor.currentBrushSize, 0, 2*Math.PI, false);
            this.ctx.closePath();
            this.ctx.stroke();
        }
    },

    _triangle(){
        this.canvas.onmousemove = () => {
            this.ctx.beginPath();
            this.ctx.moveTo(this.x, this.y);
            this.ctx.lineTo(this.x + (+this.editor.currentBrushSize), this.y + (+this.editor.currentBrushSize));
            this.ctx.lineTo(this.x + (+this.editor.currentBrushSize) - (+this.editor.currentBrushSize)*2, this.y + (+this.editor.currentBrushSize));
            this.ctx.closePath();
            this.ctx.stroke();
        }
    },

    _sizeOk(){
        let canvasWidth = document.querySelector('#sizeW').value;
        let canvasHeight = document.querySelector('#sizeH').value;
        document.querySelector('#canv').setAttribute('width', canvasWidth);
        document.querySelector('#canv').setAttribute('height', canvasHeight);
        document.querySelector('.canv').style.height = `${canvasHeight}px`;
        document.querySelector('.canv').style.width = `${canvasWidth}px`;
        document.querySelector('.tools').style.width = `${canvasWidth}px`;
        document.querySelector('.paint').style.width = `${canvasWidth}px`;
    },

    _save() {
        let img = new Image();
        img.src = this.canvas.toDataURL();
        let link = document.createElement('a');
        link.setAttribute('href', img.src);
        link.setAttribute('download', 'canvas img');
        link.click();
    }
}

abobe.init()
