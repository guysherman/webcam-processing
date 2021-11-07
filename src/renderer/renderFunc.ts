import { RendererState } from './RendererState';

export const renderFunc = (rendererState: RendererState | undefined) => {
  if (rendererState) {
    const { gl, program, vao, image } = rendererState;

    const resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution');
    const textureUniformLocation = gl.getUniformLocation(program, 'u_image');
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);
    gl.bindVertexArray(vao);
    gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

    if (image) {
      gl.activeTexture(gl.TEXTURE0);
      gl.uniform1i(textureUniformLocation, 0);
    }

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
};
