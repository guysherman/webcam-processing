import { createProgram, createShader, resizeCanvasToDisplaySize } from 'gl';
import solidColor from 'shaders/solidColor';
import vertexShaderSource from 'shaders/vertexShader';
import { RendererState } from './RendererState';

export function initRenderer(canvas: HTMLCanvasElement): RendererState | undefined {
  const gl = canvas.getContext('webgl2');
  if (gl) {
    resizeCanvasToDisplaySize(gl.canvas);
    const vs = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, solidColor);

    if (vs && fs) {
      const program = createProgram(gl, vs, fs);

      if (program) {
        const vao = gl.createVertexArray();
        gl.bindVertexArray(vao);

        // three 2d points
        const positions = [0, 0, 0, 480, 640, 0, 640, 480];
        const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(positionAttributeLocation);
        let size = 2; // 2 components per iteration
        let componentType = gl.FLOAT; // the data is 32bit floats
        let normalize = false; // don't normalize the data
        let stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
        let offset = 0; // start at the beginning of the buffer
        gl.vertexAttribPointer(positionAttributeLocation, size, componentType, normalize, stride, offset);

        const uvs = [0, 0, 0, 1, 1, 0, 1, 1];
        const uvAttributeLocation = gl.getAttribLocation(program, 'a_uvs');
        const uvBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uvs), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(uvAttributeLocation);
        size = 2;
        componentType = gl.FLOAT;
        normalize = true;
        stride = 0;
        offset = 0;
        gl.vertexAttribPointer(uvAttributeLocation, size, componentType, normalize, stride, offset);

        const rendererState = {
          gl,
          program,
          vao,
        };

        return rendererState;
      }
    }
  }

  return undefined;
}
