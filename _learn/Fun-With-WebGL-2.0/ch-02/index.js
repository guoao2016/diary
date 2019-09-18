let gl,
  gVertCnt = 0,
  uPointSizeLoc = -1,
  uAngle = 0,
  gRLoop = 0;

window.addEventListener('load', function () {
  gl = GLInstance('gl-canvas').fSetSize(500, 500).fClear();
  const shaderProgram = ShaderUtils.domShaderProgram(gl, 'vertext-shader', 'fragment-shader', true)

  gl.useProgram(shaderProgram)

  const aPositionLoc = gl.getAttribLocation(shaderProgram, 'a_position')
  uPointSizeLoc = gl.getUniformLocation(shaderProgram, 'uPointSize')

  gl.useProgram(null)

  const arrayVertex = new Float32Array([0, 0, 0, 0.5, 0.5, 0])
  const bufferVertex = gl.createBuffer()

  gVertCnt = arrayVertex.length / 3

  gl.bindBuffer(gl.ARRAY_BUFFER, bufferVertex)
  gl.bufferData(gl.ARRAY_BUFFER, arrayVertex, gl.STATIC_DRAW)
  gl.bindBuffer(gl.ARRAY_BUFFER, null)

  gl.useProgram(shaderProgram)
  gl.uniform1f(uPointSizeLoc, 20.0)

  gl.bindBuffer(gl.ARRAY_BUFFER, bufferVertex)
  gl.enableVertexAttribArray(aPositionLoc)
  gl.vertexAttribPointer(aPositionLoc, 3, gl.FLOAT, false, 0, 0)
  gl.bindBuffer(gl.ARRAY_BUFFER, null)

  // 2 个点
  gl.drawArrays(gl.POINTS, 0, gVertCnt)
})