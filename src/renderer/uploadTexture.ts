export interface TextureOptions {
  wrapS?: number;
  wrapT?: number;
  minFilter?: number;
  magFilter?: number;
  mipLevel?: number;
  internalFormat?: number;
  srcFormat?: number;
  srcType?: number;
}

export function uploadTexture(
  gl: WebGL2RenderingContext | undefined,
  image: HTMLImageElement | HTMLVideoElement,
  options: TextureOptions | undefined = undefined,
): WebGLTexture | undefined {
  if (gl) {
    // Create a texture.
    const texture = gl.createTexture();

    // make unit 0 the active texture uint
    // (ie, the unit all other texture commands will affect
    gl.activeTexture(gl.TEXTURE0 + 0);

    // Bind it to texture unit 0' 2D bind point
    gl.bindTexture(gl.TEXTURE_2D, texture);

    // Set the parameters so we don't need mips and so we're not filtering
    // and we don't repeat at the edges
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, options?.wrapS ?? gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, options?.wrapT ?? gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, options?.minFilter ?? gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, options?.magFilter ?? gl.NEAREST);

    // Upload the image into the texture.
    const mipLevel = options?.mipLevel ?? 0; // the largest mip
    const internalFormat = options?.internalFormat ?? gl.RGBA; // format we want in the texture
    const srcFormat = options?.srcFormat ?? gl.RGBA; // format of data we are supplying
    const srcType = options?.srcType ?? gl.UNSIGNED_BYTE; // type of data we are supplying
    gl.texImage2D(gl.TEXTURE_2D, mipLevel, internalFormat, srcFormat, srcType, image);

    return texture ?? undefined;
  }

  return undefined;
}

export function updateTexture(
  gl: WebGL2RenderingContext | undefined,
  image: HTMLImageElement | HTMLVideoElement,
  texture: WebGLTexture,
  options: TextureOptions | undefined = undefined,
): void {
  if (gl) {
    // make unit 0 the active texture uint
    // (ie, the unit all other texture commands will affect
    gl.activeTexture(gl.TEXTURE0 + 0);

    // Bind it to texture unit 0' 2D bind point
    gl.bindTexture(gl.TEXTURE_2D, texture);

    // Set the parameters so we don't need mips and so we're not filtering
    // and we don't repeat at the edges
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, options?.wrapS ?? gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, options?.wrapT ?? gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, options?.minFilter ?? gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, options?.magFilter ?? gl.NEAREST);

    // Upload the image into the texture.
    const mipLevel = options?.mipLevel ?? 0; // the largest mip
    const srcFormat = options?.srcFormat ?? gl.RGBA; // format of data we are supplying
    const srcType = options?.srcType ?? gl.UNSIGNED_BYTE; // type of data we are supplying
    gl.texSubImage2D(gl.TEXTURE_2D, mipLevel, 0, 0, srcFormat, srcType, image);
  }
}
