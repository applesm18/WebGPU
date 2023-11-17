export const cubeVertexSize = 4 * 10; // Byte size of one cube vertex.
export const cubePositionOffset = 0;
export const cubeColorOffset = 4 * 4; // Byte offset of cube vertex color attribute.
export const cubeUVOffset = 4 * 8;
export const cubeVertexCount = 36;

const thin = 1.3;
const thin1 = 1;
// prettier-ignore
export const cubeVertexArray = new Float32Array([
  // float4 position,                     float4 color, float2 uv,
  //1
  1,   -1*thin1,    1*thin,    1,                  1, 0, 1, 1,  0, 1,
 -1,   -1*thin1,    1*thin,    1,                  0, 0, 1, 1,  1, 1,
 -1,   -1*thin1,   -1*thin,    1,                  0, 0, 0, 1,  1, 0,
  1,   -1*thin1,   -1*thin,    1,                  1, 0, 0, 1,  0, 0,
  1,   -1*thin1,    1*thin,    1,                  1, 0, 1, 1,  0, 1,
 -1,   -1*thin1,   -1*thin,    1,                  0, 0, 0, 1,  1, 0,

 //2
  1,    1*thin1,    1*thin,    1,                  1, 1, 1, 1,  0, 1,
  1,   -1*thin1,    1*thin,    1,                  1, 0, 1, 1,  1, 1,
  1,   -1*thin1,   -1*thin,    1,                  1, 0, 0, 1,  1, 0,
  1,    1*thin1,   -1*thin,    1,                  1, 1, 0, 1,  0, 0,
  1,    1*thin1,    1*thin,    1,                  1, 1, 1, 1,  0, 1,
  1,   -1*thin1,   -1*thin,    1,                  1, 0, 0, 1,  1, 0,

  //3
 -1,    1*thin1,    1*thin,    1,                  0, 1, 1, 1,  0, 1,
  1,    1*thin1,    1*thin,    1,                  1, 1, 1, 1,  1, 1,
  1,    1*thin1,   -1*thin,    1,                  1, 1, 0, 1,  1, 0,
 -1,    1*thin1,   -1*thin,    1,                  0, 1, 0, 1,  0, 0,
 -1,    1*thin1,    1*thin,    1,                  0, 1, 1, 1,  0, 1,
  1,    1*thin1,   -1*thin,    1,                  1, 1, 0, 1,  1, 0,

  //4
 -1,   -1*thin1,    1*thin,    1,                  0, 0, 1, 1,  0, 1,
 -1,    1*thin1,    1*thin,    1,                  0, 1, 1, 1,  1, 1,
 -1,    1*thin1,   -1*thin,    1,                  0, 1, 0, 1,  1, 0,
 -1,   -1*thin1,   -1*thin,    1,                  0, 0, 0, 1,  0, 0,
 -1,   -1*thin1,    1*thin,    1,                  0, 0, 1, 1,  0, 1,
 -1,    1*thin1,   -1*thin,    1,                  0, 1, 0, 1,  1, 0,


 //5
  1,    1*thin1,    1*thin,    1,                  1, 1, 1, 1,  0, 1,
 -1,    1*thin1,    1*thin,    1,                  0, 1, 1, 1,  1, 1,
 -1,   -1*thin1,    1*thin,    1,                  0, 0, 1, 1,  1, 0,
 -1,   -1*thin1,    1*thin,    1,                  0, 0, 1, 1,  1, 0,
  1,   -1*thin1,    1*thin,    1,                  1, 0, 1, 1,  0, 0,
  1,    1*thin1,    1*thin,    1,                  1, 1, 1, 1,  0, 1,

  //6
  1,   -1*thin1,   -1*thin,    1,                  1, 0, 0, 1,  0, 1,
 -1,   -1*thin1,   -1*thin,    1,                  0, 0, 0, 1,  1, 1,
 -1,    1*thin1,   -1*thin,    1,                  0, 1, 0, 1,  1, 0,
  1,    1*thin1,   -1*thin,    1,                  1, 1, 0, 1,  0, 0,
  1,   -1*thin1,   -1*thin,    1,                  1, 0, 0, 1,  0, 1,
 -1,    1*thin1,   -1*thin,    1,                  0, 1, 0, 1,  1, 0,
]);
