export function createShader(
  gl: WebGL2RenderingContext,
  type: WebGL2RenderingContext['SHADER_TYPE'],
  source: string,
): WebGLShader | undefined {
  const shader = gl.createShader(type);
  if (shader) {
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
      return shader;
    }
    // eslint-disable-next-line no-console
    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
  }

  return undefined;
}
