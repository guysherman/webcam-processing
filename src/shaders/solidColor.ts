const fragmentShaderSource = `#version 300 es
 
// fragment shaders don't have a default precision so we need
// to pick one. highp is a good default. It means "high precision"
precision highp float;

in vec2 v_uvs;
 
uniform sampler2D u_image;
// we need to declare an output for the fragment shader
out vec4 outColor;
 
void main() {
  // Just set the output to a constant reddish-purple
  vec4 texel = texture(u_image, v_uvs);
  vec4 inverse = vec4(1, 1, 1, 1) - texel;
  outColor = vec4(inverse.rgb, texel.a);
}
`;

export default fragmentShaderSource;
