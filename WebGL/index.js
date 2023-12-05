var gl;
function initGL(canvas) {
    try {
        gl = canvas.getContext('webgl');
        gl.viewportWidth = canvas.width;
        gl.viewportHeight = canvas.height;
    } catch (e) {
    }
    if (!gl) {
        alert("WebGL may not be available on your browser!");
    }
}

var shader_prog;
function initShaders() {
    var fragmentShader = getShader(gl, "shader-fs");
    var vertexShader = getShader(gl, "shader-vs");

    shader_prog = gl.createProgram();
    gl.attachShader(shader_prog, vertexShader);
    gl.attachShader(shader_prog, fragmentShader);
    gl.linkProgram(shader_prog);

    if (!gl.getProgramParameter(shader_prog, gl.LINK_STATUS)) {
        alert("Could not initialize shaders");
    }

    gl.useProgram(shader_prog);

    shader_prog.positionLocation = gl.getAttribLocation(shader_prog, "Position");
    gl.enableVertexAttribArray(shader_prog.positionLocation);

    shader_prog.u_PerspLocation = gl.getUniformLocation(shader_prog, "u_Persp");
    shader_prog.u_ModelViewLocation = gl.getUniformLocation(shader_prog, "u_ModelView");
}

var triangleVertexPositionBuffer;
function initBuffers() {
    triangleVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexPositionBuffer);
    
    var vertices = [
        0.0, 1.0, 0.0,
        -1.0, -1.0, 0.0,
        1.0, -1.0, 0.0
    ];
    
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    triangleVertexPositonBuffer.itemSize = 3;
    triangleVertexPositionBuffer.numItems = 3;
}

var mvMatrix = mat4.create();
var pMatrix = mat4.create();
function drawScene() {
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);

    mat4.identity(mvMatrix);
    // Move
    mat4.translate(mvMatrix, 0.0, 0.0, -4.0);

    // Pass triangle position to v-shader
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexPositonBuffer);
    gl.enableVertexAttribPointer(shader_prog.positionLocation, triangleVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

    // Pass model view proj matrix to v-shader
    gl.uniformMatrix4fv(shader_prog.u_PerspLocation, false, pMatrix);
    gl.uniformMatrix4fv(shader_prog.u_ModelViewLocation, false, mvMatrix);

    // Draw
    gl.drawArrays(gl.TRIANGLES, 0, triangleVertexPositionBuffer.numItems);
}

const canvas = document.querySelector('#graphical-view');
initGL(canvas);
initShaders();
initBuffers();
clearColor(0.0, 0.0, 0.0, 1.0);
gl.enable(gl.DEPTH_TEST);
drawScene();