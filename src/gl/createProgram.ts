export function createProgram(
  gl: WebGL2RenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader,
): WebGLProgram | undefined {
  const program = gl.createProgram();

  if (program) {
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    const success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
      return program;
    }

    // eslint-disable-next-line no-console
    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
  }

  return undefined;
}
