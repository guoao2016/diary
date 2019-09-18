window.addEventListener('load', function () {
  const gl = GLInstance('gl-canvas').fSetSize(500, 500).fClear();

  const vertexShaderSrc = ShaderUtils.domShaderSrc('vertext-shader')
  const fragmentShaderSrc = ShaderUtils.domShaderSrc('fragment-shader')

  const vertexShader = ShaderUtils.createShader(gl, vertexShaderSrc, gl.VERTEX_SHADER)
  const fragmentShader = ShaderUtils.createShader(gl, fragmentShaderSrc, gl.FRAGMENT_SHADER)

  const shaderProgram = ShaderUtils.createProgram(gl, vertexShader, fragmentShader)

  gl.useProgram(shaderProgram)

  const aPositionLoc = gl.getAttribLocation(shaderProgram, 'a_position')
  const uPositionSize = gl.getUniformLocation(shaderProgram, 'uPointSize')

  gl.useProgram(null)

  const arrayVertex = new Float32Array([0, 0, 0, 0.5, 0.5, 0])
  const bufferVertex = gl.createBuffer()

  gl.bindBuffer(gl.ARRAY_BUFFER, bufferVertex)
  gl.bufferData(gl.ARRAY_BUFFER, arrayVertex, gl.STATIC_DRAW)
  gl.bindBuffer(gl.ARRAY_BUFFER, null)

  gl.useProgram(shaderProgram)
  gl.uniform1f(uPositionSize, 20.0)

  gl.bindBuffer(gl.ARRAY_BUFFER, bufferVertex)
  gl.enableVertexAttribArray(aPositionLoc)
  gl.vertexAttribPointer(aPositionLoc, 3, gl.FLOAT, false, 0, 0)
  gl.bindBuffer(gl.ARRAY_BUFFER, null)

  // 2 个点
  gl.drawArrays(gl.POINTS, 0, 2)
})