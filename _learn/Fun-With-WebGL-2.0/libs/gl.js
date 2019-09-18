function GLInstance(id) {
  const canvas = document.getElementById(id)
  const gl = canvas.getContext('webgl2')

  if (!gl) {
    console.error('webgl2 is not avaiable')
    return null
  }

  gl.clearColor(1.0, 1.0, 1.0, 1.0)

  gl.fClear = function () {
    this.clear(this.COLOR_BUFFER_BIT | this.DEPTH_BUFFER_BIT)
    return this
  }

  gl.fSetSize = function (w, h) {
    this.canvas.style.width = w + 'px'
    this.canvas.style.height = h + 'px'
    this.canvas.width = w
    this.canvas.height = h

    // reset viewport
    this.viewport(0, 0, w, h)
    return this
  }

  return gl
}