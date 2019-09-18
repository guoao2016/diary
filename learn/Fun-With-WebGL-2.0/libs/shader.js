class ShaderUtils {
  static domShaderSrc(id) {
    const ele = document.getElementById(id)
    if (!ele || ele.text === '') {
      console.log(`${id} not found or not text`)
      return null
    }
    return ele.text
  }

  static createShader(gl, src, type) {
    const shader = gl.createShader(type)

    gl.shaderSource(shader, src)
    gl.compileShader(shader)

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error(`error compiling shader ${src}`, gl.getShaderInfoLog(shader))
      gl.deleteShader(shader)
      return null
    }

    return shader
  }

  static createProgram(gl, vShader, fShader, doValidate) {
    const program = gl.createProgram()

    gl.attachShader(program, vShader)
    gl.attachShader(program, fShader)
    gl.linkProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('error creating shader program', gl.getProgramInfoLog(program))
      gl.deleteProgram(program)
      return null;
    }

    if (doValidate) {
      gl.validateProgram(program)
      if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
        console.error('error validate program', gl.getProgramInfoLog(program))
        gl.deleteProgram(program)
        return null;
      }
    }

    gl.detachShader(program, vShader)
    gl.detachShader(program, fShader)
    gl.deleteShader(vShader)
    gl.deleteShader(fShader)

    return program
  }

  static domShaderProgram(gl, vId, fId, doValidate) {
    const vShaderSrc = ShaderUtils.domShaderSrc(vId)
    if (!vShaderSrc) return null

    const fShaderSrc = ShaderUtils.domShaderSrc(fId)
    if (!fShaderSrc) return null

    const vShader = ShaderUtils.createShader(gl, vShaderSrc, gl.VERTEX_SHADER)

    if (!vShader) return null

    const fShader = ShaderUtils.createShader(gl, fShaderSrc, gl.FRAGMENT_SHADER)

    if (!fShader) return null

    return ShaderUtils.createProgram(gl, vShader, fShader, doValidate)
  }
}