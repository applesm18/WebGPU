import {
  cubeVertexArray,
  cubeVertexSize,
  cubeUVOffset,
  cubePositionOffset,
  cubeVertexCount,
} from './public/mesh/cube';
import { mat4, vec3 } from 'wgpu-matrix';
// import vertShader from './public/shader/basic.vert.wgsl';
// import fragShader from './public/shader/sampleCubemap.frag.wgsl';

export class WebGPU {

  vertShader_l =`
  struct Uniforms {
    modelViewProjectionMatrix : mat4x4<f32>,
    iTime: f32
  }
  @binding(0) @group(0) var<uniform> uniforms : Uniforms;

  struct VertexOutput {
    @builtin(position) Position : vec4<f32>,
    @location(0) fragUV : vec2<f32>,
    @location(1) fragPosition: vec4<f32>,
    @location(2) normal: vec4<f32>,
    @location(3) worldPosition: vec4<f32>,
    @location(4) time: f32,
    @location(5) angle: f32
  }

  @vertex
  fn main(
    @location(0) position : vec4<f32>,
    @location(1) uv : vec2<f32>
  ) -> VertexOutput {
    var output : VertexOutput;
    output.Position = uniforms.modelViewProjectionMatrix * position;
    output.fragUV = uv;
    output.time = uniforms.iTime;

    output.fragPosition = 0.5 * (position + vec4(1.0, 1.0, 1.0, 1.0));
    // output.fragPosition = 0.5 * (position + vec4(1.0, 1.0, 1.0, 1.0));
    return output;
  }
  `;

  fragShader_l = `
  @group(0) @binding(1) var mySampler: sampler;
  @group(0) @binding(2) var myTexture: texture_cube<f32>;

  @fragment
  fn main(
    @location(0) fragUV: vec2<f32>,
    @location(1) fragPosition: vec4<f32>,
    @location(2) normal: vec4<f32>,
    @location(3) worldPosition: vec4<f32>,
    @location(4) time: f32
  ) -> @location(0) vec4<f32> {
    // Our camera and the skybox cube are both centered at (0, 0, 0)
    // so we can use the cube geomtry position to get viewing vector to sample the cube texture.
    // The magnitude of the vector doesn't matter.
    var cubemapVec = fragPosition.xyz - vec3(0.5);
    // var origin = textureSample(myTexture, mySampler, cubemapVec);

    var pos = cubemapVec;
    var uv = fragUV;
    var o : f32 = 0;
    var a : f32 = 0.05;
    var f : f32 = 4;
    // var angle : f32 = (time + uv.x) * f;
    var angle : f32 = (uv.x) * f;
    pos.z += sin(-angle) * a;

    if(abs(pos.z) > 0.5 || pos.y > 0 || abs(pos.x) > 0.5 || abs(pos.y) > 0.5 || pos.x < -0.499)
    {
      discard;
    }

    let underwater = textureSample(myTexture, mySampler, pos);
    // return textureSample(myTexture, mySampler, cubemapVec);
    return underwater;
  }

  `;

  vertShader_r =`
  struct Uniforms {
    modelViewProjectionMatrix : mat4x4<f32>,
    iTime: f32
  }
  @binding(0) @group(0) var<uniform> uniforms : Uniforms;

  struct VertexOutput {
    @builtin(position) Position : vec4<f32>,
    @location(0) fragUV : vec2<f32>,
    @location(1) fragPosition: vec4<f32>,
    @location(2) normal: vec4<f32>,
    @location(3) worldPosition: vec4<f32>,
    @location(4) time: f32,
    @location(5) angle: f32
  }

  @vertex
  fn main(
    @location(0) position : vec4<f32>,
    @location(1) uv : vec2<f32>
  ) -> VertexOutput {
    var output : VertexOutput;
    output.Position = uniforms.modelViewProjectionMatrix * position;
    output.fragUV = uv;
    output.time = uniforms.iTime;

    output.fragPosition = 0.5 * (position + vec4(1.0, 1.0, 1.0, 1.0));
    // output.fragPosition = 0.5 * (position + vec4(1.0, 1.0, 1.0, 1.0));
    return output;
  }
  `;

  fragShader_r = `
  @group(0) @binding(1) var mySampler: sampler;
  @group(0) @binding(2) var myTexture: texture_cube<f32>;

  @fragment
  fn main(
    @location(0) fragUV: vec2<f32>,
    @location(1) fragPosition: vec4<f32>,
    @location(2) normal: vec4<f32>,
    @location(3) worldPosition: vec4<f32>,
    @location(4) time: f32
  ) -> @location(0) vec4<f32> {
    // Our camera and the skybox cube are both centered at (0, 0, 0)
    // so we can use the cube geomtry position to get viewing vector to sample the cube texture.
    // The magnitude of the vector doesn't matter.
    var cubemapVec = fragPosition.xyz - vec3(0.5);
    // var origin = textureSample(myTexture, mySampler, cubemapVec);

    var pos = cubemapVec;
    var uv = fragUV;
    var o : f32 = 0;
    var a : f32 = 0.05;
    var f : f32 = 4;
    // var angle : f32 = (time + uv.x) * f;
    var angle : f32 = (1-uv.x) * f;
    pos.z += sin(-angle) * a;

    if(abs(pos.z) > 0.5 || pos.y > 0 || abs(pos.x) > 0.5 || abs(pos.y) > 0.5 || pos.x < -0.499)
    {
      discard;
    }

    let underwater = textureSample(myTexture, mySampler, pos);
    // return textureSample(myTexture, mySampler, cubemapVec);
    return underwater;
  }

  `;

  vertShader_m =`
  struct Uniforms {
    modelViewProjectionMatrix : mat4x4<f32>,
    iTime: f32,
    angle: f32
  }
  @binding(0) @group(0) var<uniform> uniforms : Uniforms;

  struct VertexOutput {
    @builtin(position) Position : vec4<f32>,
    @location(0) fragUV : vec2<f32>,
    @location(1) fragPosition: vec4<f32>,
    @location(2) normal: vec4<f32>,
    @location(3) worldPosition: vec4<f32>,
    @location(4) time: f32,
    @location(5) angle: f32
  }

  @vertex
  fn main(
    @location(0) position : vec4<f32>,
    @location(1) uv : vec2<f32>
  ) -> VertexOutput {
    var output : VertexOutput;
    output.Position = uniforms.modelViewProjectionMatrix * position;
    output.fragUV = uv;
    output.time = uniforms.iTime;
    output.angle = uniforms.angle;

    output.fragPosition = 0.5 * (position + vec4(1.0, 1.0, 1.0, 1.0));
    // output.fragPosition = 0.5 * (position + vec4(1.0, 1.0, 1.0, 1.0));
    return output;
  }
  `;

  fragShader_m = `
  @group(0) @binding(1) var mySampler: sampler;
  @group(0) @binding(2) var myTexture: texture_cube<f32>;

  @fragment
  fn main(
    @location(0) fragUV: vec2<f32>,
    @location(1) fragPosition: vec4<f32>,
    @location(2) normal: vec4<f32>,
    @location(3) worldPosition: vec4<f32>,
    @location(4) time: f32,
    @location(5) angle: f32
  ) -> @location(0) vec4<f32> {
    // Our camera and the skybox cube are both centered at (0, 0, 0)
    // so we can use the cube geomtry position to get viewing vector to sample the cube texture.
    // The magnitude of the vector doesn't matter.
    var cubemapVec = fragPosition.xyz - vec3(0.5);
    // var origin = textureSample(myTexture, mySampler, cubemapVec);

    let pi = 3.14159;
    var pos = cubemapVec;
    var uv = fragUV;
    var yangle = angle;

    // var tang = pi/2;
    // var a : f32 = 0.5;
    // var f : f32 = 1;
    // var an : f32 = (tang * (1-uv.x)) * f;
    // pos.z += cos(an) * (1-uv.x) * a;



    //-----coding aniamtion starting---------------------------


    //  x - axial -----
    // start scaling 0.5 pos, graph of scaling is the leverage by x,t
    // angle 0 ~ pi
    // time ~~
    // uv.x 0 ~ 1
    // angle = pi / 2 => scale minimize
    // angle = 0 & pi => scale 1;
    //uv.x 0 ~ 0.5 rolling
    //----------------------------------------------------------

    // var x = pos.x;
    // var hx = (1.0 - uv.x);
    // hx = (2.4 * hx) * sin(angle) / uv.x * uv.x;
    // // hx = (2.4 * hx) * sin(angle);
    // pos.x =  x + hx;

    var tang = pi/2;
    tang = angle;
    // tang = time % (pi);
    var x = pos.x;
    var hx = 0.0;
    if(pos.y < 0)
    {
      hx = (1.0 - uv.x);
    }
    else {
      hx = uv.x;
    }

    var dx = hx * sin(tang);
    pos.x += 1.8*dx;

    // z - axial -----
    // for half period , from uv.x = 0.5, x*x * angle,
    // next for half period follow t,  multiple curve go to linear curve

    var mag = 2.5;
    var hz = (1.0 - uv.x);
    pos.z += -mag * hz * sin(uv.x*sin(tang));

    pos.y *= -1;

    if(pos.y > 0)
    {
      // discard;
      pos.z *= -1;
      pos.x *= -1;
    }

    //hide over flow uv
    if(abs(pos.z) > 0.4999 ||  abs(pos.x) > 0.499 || pos.x > 0.4999 )
    {
      discard;
    }

    let underwater = textureSample(myTexture, mySampler, pos);
    // return textureSample(myTexture, mySampler, cubemapVec);
    return underwater;
  }

  `;
    rottt  = 1;

/*=========config page==============================*/
    canvas : any;
    context : any;
    presentationFormat : any;
    gpuDevice : any;
    adapter : any;
/*=========render page==============================*/
    encoder : any;
    pass : any;
    renderPassDescriptor: any;
    uniformBufferSize: any;
    commandEncoder:any;
    passEncoder: any;

/*=========Animaton page==============================*/

    verticesBuffer:any;
    vertModule: any;
    fragModule: any;
    pipeline:any;
    depthTexture: any;
    cubemapTexture: any;
    uniformBuffer: any;
    sampler:any;
    uniformBindGroup: any;
    modelMatrix : any;
    modelViewProjectionMatrix: any;
    viewMatrix: any;
    tmpMat4: any;
    projectionMatrix:any;
    aspect: any;

/*=========Left page==============================*/
    verticesBuffer_l:any;
    vertModule_l: any;
    fragModule_l: any;
    pipeline_l:any;
    depthTexture_l: any;
    cubemapTexture_l: any;
    uniformBuffer_l: any;
    sampler_l:any;
    uniformBindGroup_l: any;
    modelMatrix_l : any;
    modelViewProjectionMatrix_l: any;
    viewMatrix_l: any;
    tmpMat4_l: any;
    projectionMatrix_l:any;
    aspect_l: any;

/*=========Left page==============================*/
    verticesBuffer_r:any;
    vertModule_r: any;
    fragModule_r: any;
    pipeline_r:any;
    depthTexture_r: any;
    cubemapTexture_r: any;
    uniformBuffer_r: any;
    sampler_r:any;
    uniformBindGroup_r: any;
    modelMatrix_r : any;
    modelViewProjectionMatrix_r: any;
    viewMatrix_r: any;
    tmpMat4_r: any;
    projectionMatrix_r:any;
    aspect_r: any;


    /*--------animation parameters---------------*/
    thin: any;
    time: any;
    deltatime: any;
    angle: any;
    constructor() {
      this.thin = 0.0001;
      this.time = 0;
      this.deltatime = 0.01;
      this.angle = 0;
    }

  public async configWebGPU(): Promise<boolean>{
      this.canvas = document.querySelector("canvas");
      if (!navigator.gpu) {
        throw new Error("WebGPU not supported on this browser.");
      }
      this.adapter = await navigator.gpu.requestAdapter();
      if (!this.adapter) {
        throw new Error("No appropriate GPUAdapter found.");
      }
      this.gpuDevice = await this.adapter.requestDevice();
      this.gpuDevice.lost.then((e:any) => {
        console.error(`WebGPU device was lost: ${e.message}`);

        this.gpuDevice = null;

        if (e.reason != 'destroyed') {
            this.configWebGPU();
        }
    });

    this.context = this.canvas.getContext("webgpu");
    this.presentationFormat = navigator.gpu.getPreferredCanvasFormat();
    this.context.configure({
      device: this.gpuDevice,
      format: this.presentationFormat,
      });

    this.DrawScene();
    return true;
  }

  async DrawScene():Promise<boolean>{
    await this.drawPageM();
    await this.drawPageR();
    await this.drawPageL();
    this.updateTransformationMatrixM();
    this.updateTransformationMatrixR();
    this.updateTransformationMatrixL();

    requestAnimationFrame(this.animationFrame);

    return true;
  }

  async drawPageM():Promise<boolean>{
        // Create a vertex buffer from the cube data.
      this.verticesBuffer = this.gpuDevice.createBuffer({
        size: cubeVertexArray.byteLength,
        usage: GPUBufferUsage.VERTEX,
        mappedAtCreation: true,
      });
      new Float32Array(this.verticesBuffer.getMappedRange()).set(cubeVertexArray);
      this.verticesBuffer.unmap();

      this.vertModule =  this.gpuDevice.createShaderModule({
        code: this.vertShader_m,
      });

      this.fragModule = this.gpuDevice.createShaderModule({
        code: this.fragShader_m,
      });

      this.pipeline = this.gpuDevice.createRenderPipeline({
        layout: 'auto',
        vertex: {
          module: this.vertModule,
          entryPoint: 'main',
          buffers: [
            {
              arrayStride: cubeVertexSize,
              attributes: [
                {
                  // position
                  shaderLocation: 0,
                  offset: cubePositionOffset,
                  format: 'float32x4',
                },
                {
                  // uv
                  shaderLocation: 1,
                  offset: cubeUVOffset,
                  format: 'float32x2',
                },
              ],
            },
          ],
        },
        fragment: {
          module: this.fragModule,
          entryPoint: 'main',
          targets: [
            {
              format: this.presentationFormat,
            },
          ],
        },
        primitive: {
          topology: 'triangle-list',

          // Since we are seeing from inside of the cube
          // and we are using the regular cube geomtry data with outward-facing normals,
          // the cullMode should be 'front' or 'none'.
          cullMode: 'none',
        },

        // Enable depth testing so that the fragment closest to the camera
        // is rendered in front.
        depthStencil: {
          depthWriteEnabled: true,
          depthCompare: 'less',
          format: 'depth24plus',
        },
      });

      this.depthTexture = this.gpuDevice.createTexture({
        size: [this.canvas.width, this.canvas.height],
        format: 'depth24plus',
        usage: GPUTextureUsage.RENDER_ATTACHMENT,
      });

      // Fetch the 6 separate images for negative/positive x, y, z axis of a cubemap
      // and upload it into a GPUTexture.
      // let cubemapTexture: GPUTexture;
      // The order of the array layers is [+X, -X, +Y, -Y, +Z, -Z]
      const imgSrcs = [
        new URL(
          window.location.origin+`/assets/playbook/posx.png`,
          import.meta.url
        ).toString(),
        new URL(
          window.location.origin+`/assets/playbook/negx.png`,
          import.meta.url
        ).toString(),
        new URL(
          window.location.origin+`/assets/playbook/posy.png`,
          import.meta.url
        ).toString(),
        new URL(
          window.location.origin+`/assets/playbook/negy.png`,
          import.meta.url
        ).toString(),
        new URL(
          window.location.origin+`/assets/playbook/posz.png`,
          import.meta.url
        ).toString(),
        new URL(
          window.location.origin+`/assets/playbook/negz.png`,
          import.meta.url
        ).toString(),
      ];

      const promises = imgSrcs.map(async (src) => {
        const response = await fetch(src);
        // console.log("response cube image fetched!!! = ", response);
        return createImageBitmap(await response.blob());
      });
      const imageBitmaps = await Promise.all(promises);

      this.cubemapTexture = this.gpuDevice.createTexture({
        dimension: '2d',
        // Create a 2d array texture.
        // Assume each image has the same size.
        // size: [this.canvas.width, this.canvas.height, 6],
        size: [imageBitmaps[0].width, imageBitmaps[0].height, 6],
        // size: [512, 512, 6],
        format: 'rgba8unorm',
        usage:
          GPUTextureUsage.TEXTURE_BINDING |
          GPUTextureUsage.COPY_DST |
          GPUTextureUsage.RENDER_ATTACHMENT,
      });

      for (let i = 0; i < imageBitmaps.length; i++) {
        const imageBitmap = imageBitmaps[i];
        this.gpuDevice.queue.copyExternalImageToTexture(
          { source: imageBitmap },
          { texture: this.cubemapTexture, origin: [0, 0, i] },
          // [this.canvas.width, this.canvas.height]
          [imageBitmap.width, imageBitmap.height]
          // [512, 512]
        );
      }

      this.uniformBufferSize =
        4 * 16 +  // 4x4 matrix
        4 + //time
        4 + //angle
        2*4 + //padding
        0;
      this.uniformBuffer = this.gpuDevice.createBuffer({
        size: this.uniformBufferSize,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
      });

      this.sampler = this.gpuDevice.createSampler({
        magFilter: 'linear',
        minFilter: 'linear',
      });

      this.uniformBindGroup = this.gpuDevice.createBindGroup({
        layout: this.pipeline.getBindGroupLayout(0),
        entries: [
          {
            binding: 0,
            resource: {
              buffer: this.uniformBuffer,
              offset: 0,
              size: this.uniformBufferSize,
            },
          },
          {
            binding: 1,
            resource: this.sampler,
          },
          {
            binding: 2,
            resource: this.cubemapTexture.createView({
              dimension: 'cube',
            }),
          },
        ],
      });

      let renderPassDescriptor: GPURenderPassDescriptor = {
        colorAttachments: [
          {
            view: this.context, // Assigned later
            loadOp: 'clear',
            storeOp: 'store',
          },
        ],
        depthStencilAttachment: {
          view: this.depthTexture.createView(),

          depthClearValue: 1.0,
          depthLoadOp: 'clear',
          depthStoreOp: 'store',
        },
      };

      this.renderPassDescriptor = renderPassDescriptor;

      this.aspect = this.canvas.width / this.canvas.height;
      this.projectionMatrix = mat4.perspective((2 * Math.PI) / 5, this.aspect, 1, 30000000);

      this.modelMatrix = mat4.scaling(vec3.fromValues(10, 10, 10*this.thin));
      this.modelViewProjectionMatrix = mat4.create() as Float32Array;
      this.viewMatrix = mat4.identity();
      this.tmpMat4 = mat4.create();

      return true;
  }

  async drawPageL():Promise<boolean>{
      // Create a vertex buffer from the cube data.
    this.verticesBuffer_l = this.gpuDevice.createBuffer({
      size: cubeVertexArray.byteLength,
      usage: GPUBufferUsage.VERTEX,
      mappedAtCreation: true,
    });
    new Float32Array(this.verticesBuffer_l.getMappedRange()).set(cubeVertexArray);
    this.verticesBuffer_l.unmap();

    this.vertModule_l =  this.gpuDevice.createShaderModule({
      code: this.vertShader_l,
    });

    this.fragModule_l = this.gpuDevice.createShaderModule({
      code: this.fragShader_l,
    });

    this.pipeline_l = this.gpuDevice.createRenderPipeline({
      layout: 'auto',
      vertex: {
        module: this.vertModule_l,
        entryPoint: 'main',
        buffers: [
          {
            arrayStride: cubeVertexSize,
            attributes: [
              {
                // position
                shaderLocation: 0,
                offset: cubePositionOffset,
                format: 'float32x4',
              },
              {
                // uv
                shaderLocation: 1,
                offset: cubeUVOffset,
                format: 'float32x2',
              },
            ],
          },
        ],
      },
      fragment: {
        module: this.fragModule_l,
        entryPoint: 'main',
        targets: [
          {
            format: this.presentationFormat,
          },
        ],
      },
      primitive: {
        topology: 'triangle-list',

        // Since we are seeing from inside of the cube
        // and we are using the regular cube geomtry data with outward-facing normals,
        // the cullMode should be 'front' or 'none'.
        cullMode: 'none',
      },

      // Enable depth testing so that the fragment closest to the camera
      // is rendered in front.
      depthStencil: {
        depthWriteEnabled: true,
        depthCompare: 'less',
        format: 'depth24plus',
      },
    });

    this.depthTexture_l = this.gpuDevice.createTexture({
      size: [this.canvas.width, this.canvas.height],
      format: 'depth24plus',
      usage: GPUTextureUsage.RENDER_ATTACHMENT,
    });

    // Fetch the 6 separate images for negative/positive x, y, z axis of a cubemap
    // and upload it into a GPUTexture.
    // let cubemapTexture: GPUTexture;
    // The order of the array layers is [+X, -X, +Y, -Y, +Z, -Z]
    const imgSrcs = [
      new URL(
        window.location.origin+`/assets/playbookl/posx.png`,
        import.meta.url
      ).toString(),
      new URL(
        window.location.origin+`/assets/playbookl/negx.png`,
        import.meta.url
      ).toString(),
      new URL(
        window.location.origin+`/assets/playbookl/posy.png`,
        import.meta.url
      ).toString(),
      new URL(
        window.location.origin+`/assets/playbookl/negy.png`,
        import.meta.url
      ).toString(),
      new URL(
        window.location.origin+`/assets/playbookl/posz.png`,
        import.meta.url
      ).toString(),
      new URL(
        window.location.origin+`/assets/playbookl/negz.png`,
        import.meta.url
      ).toString(),
    ];

    const promises = imgSrcs.map(async (src) => {
      const response = await fetch(src);
      // console.log("response cube image fetched!!! = ", response);
      return createImageBitmap(await response.blob());
    });
    const imageBitmaps = await Promise.all(promises);

    this.cubemapTexture_l = this.gpuDevice.createTexture({
      dimension: '2d',
      // Create a 2d array texture.
      // Assume each image has the same size.
      // size: [this.canvas.width, this.canvas.height, 6],
      size: [imageBitmaps[0].width, imageBitmaps[0].height, 6],
      // size: [512, 512, 6],
      format: 'rgba8unorm',
      usage:
        GPUTextureUsage.TEXTURE_BINDING |
        GPUTextureUsage.COPY_DST |
        GPUTextureUsage.RENDER_ATTACHMENT,
    });

    for (let i = 0; i < imageBitmaps.length; i++) {
      const imageBitmap = imageBitmaps[i];
      this.gpuDevice.queue.copyExternalImageToTexture(
        { source: imageBitmap },
        { texture: this.cubemapTexture_l, origin: [0, 0, i] },
        // [this.canvas.width, this.canvas.height]
        [imageBitmap.width, imageBitmap.height]
        // [512, 512]
      );
    }

    this.uniformBufferSize =
    4 * 16 +  // 4x4 matrix
    4 + //time
    3*4 + //padding
    0;

    this.uniformBuffer_l = this.gpuDevice.createBuffer({
      size: this.uniformBufferSize,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });

    this.sampler_l = this.gpuDevice.createSampler({
      magFilter: 'linear',
      minFilter: 'linear',
    });

    this.uniformBindGroup_l = this.gpuDevice.createBindGroup({
      layout: this.pipeline_l.getBindGroupLayout(0),
      entries: [
        {
          binding: 0,
          resource: {
            buffer: this.uniformBuffer_l,
            offset: 0,
            size: this.uniformBufferSize,
          },
        },
        {
          binding: 1,
          resource: this.sampler_l,
        },
        {
          binding: 2,
          resource: this.cubemapTexture_l.createView({
            dimension: 'cube',
          }),
        },
      ],
    });

      this.aspect_l = this.canvas.width / this.canvas.height;
      this.projectionMatrix_l = mat4.perspective((2 * Math.PI) / 5, this.aspect_l, 1, 30000000);

      this.modelMatrix_l = mat4.scaling(vec3.fromValues(10, 10, 10*this.thin));
      this.modelViewProjectionMatrix_l = mat4.create() as Float32Array;
      this.viewMatrix_l = mat4.identity();
      this.tmpMat4_l = mat4.create();

      return true;
  }

  async drawPageR():Promise<boolean>{
    // Create a vertex buffer from the cube data.
  this.verticesBuffer_r = this.gpuDevice.createBuffer({
    size: cubeVertexArray.byteLength,
    usage: GPUBufferUsage.VERTEX,
    mappedAtCreation: true,
  });
  new Float32Array(this.verticesBuffer_r.getMappedRange()).set(cubeVertexArray);
  this.verticesBuffer_r.unmap();

  this.vertModule_r =  this.gpuDevice.createShaderModule({
    code: this.vertShader_r,
  });

  this.fragModule_r = this.gpuDevice.createShaderModule({
    code: this.fragShader_r,
  });

  this.pipeline_r = this.gpuDevice.createRenderPipeline({
    layout: 'auto',
    vertex: {
      module: this.vertModule_r,
      entryPoint: 'main',
      buffers: [
        {
          arrayStride: cubeVertexSize,
          attributes: [
            {
              // position
              shaderLocation: 0,
              offset: cubePositionOffset,
              format: 'float32x4',
            },
            {
              // uv
              shaderLocation: 1,
              offset: cubeUVOffset,
              format: 'float32x2',
            },
          ],
        },
      ],
    },
    fragment: {
      module: this.fragModule_r,
      entryPoint: 'main',
      targets: [
        {
          format: this.presentationFormat,
        },
      ],
    },
    primitive: {
      topology: 'triangle-list',

      // Since we are seeing from inside of the cube
      // and we are using the regular cube geomtry data with outward-facing normals,
      // the cullMode should be 'front' or 'none'.
      cullMode: 'none',
    },

    // Enable depth testing so that the fragment closest to the camera
    // is rendered in front.
    depthStencil: {
      depthWriteEnabled: true,
      depthCompare: 'less',
      format: 'depth24plus',
    },
  });

  this.depthTexture_r = this.gpuDevice.createTexture({
    size: [this.canvas.width, this.canvas.height],
    format: 'depth24plus',
    usage: GPUTextureUsage.RENDER_ATTACHMENT,
  });

  // Fetch the 6 separate images for negative/positive x, y, z axis of a cubemap
  // and upload it into a GPUTexture.
  // let cubemapTexture: GPUTexture;
  // The order of the array layers is [+X, -X, +Y, -Y, +Z, -Z]
  const imgSrcs = [
    new URL(
      window.location.origin+`/assets/playbookb/posx.png`,
      import.meta.url
    ).toString(),
    new URL(
      window.location.origin+`/assets/playbookb/negx.png`,
      import.meta.url
    ).toString(),
    new URL(
      window.location.origin+`/assets/playbookb/posy.png`,
      import.meta.url
    ).toString(),
    new URL(
      window.location.origin+`/assets/playbookb/negy.png`,
      import.meta.url
    ).toString(),
    new URL(
      window.location.origin+`/assets/playbookb/posz.png`,
      import.meta.url
    ).toString(),
    new URL(
      window.location.origin+`/assets/playbookb/negz.png`,
      import.meta.url
    ).toString(),
  ];

  const promises = imgSrcs.map(async (src) => {
    const response = await fetch(src);
    // console.log("response cube image fetched!!! = ", response);
    return createImageBitmap(await response.blob());
  });
  const imageBitmaps = await Promise.all(promises);

  this.cubemapTexture_r = this.gpuDevice.createTexture({
    dimension: '2d',
    // Create a 2d array texture.
    // Assume each image has the same size.
    // size: [this.canvas.width, this.canvas.height, 6],
    size: [imageBitmaps[0].width, imageBitmaps[0].height, 6],
    // size: [512, 512, 6],
    format: 'rgba8unorm',
    usage:
      GPUTextureUsage.TEXTURE_BINDING |
      GPUTextureUsage.COPY_DST |
      GPUTextureUsage.RENDER_ATTACHMENT,
  });

  for (let i = 0; i < imageBitmaps.length; i++) {
    const imageBitmap = imageBitmaps[i];
    this.gpuDevice.queue.copyExternalImageToTexture(
      { source: imageBitmap },
      { texture: this.cubemapTexture_r, origin: [0, 0, i] },
      // [this.canvas.width, this.canvas.height]
      [imageBitmap.width, imageBitmap.height]
      // [512, 512]
    );
  }

  this.uniformBufferSize =
  4 * 16 +  // 4x4 matrix
  4 + //time
  3*4 + //padding
  0;

  this.uniformBuffer_r = this.gpuDevice.createBuffer({
    size: this.uniformBufferSize,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  });

  this.sampler_r = this.gpuDevice.createSampler({
    magFilter: 'linear',
    minFilter: 'linear',
  });

  this.uniformBindGroup_r = this.gpuDevice.createBindGroup({
    layout: this.pipeline_r.getBindGroupLayout(0),
    entries: [
      {
        binding: 0,
        resource: {
          buffer: this.uniformBuffer_r,
          offset: 0,
          size: this.uniformBufferSize,
        },
      },
      {
        binding: 1,
        resource: this.sampler_r,
      },
      {
        binding: 2,
        resource: this.cubemapTexture_r.createView({
          dimension: 'cube',
        }),
      },
    ],
  });


    this.aspect_r = this.canvas.width / this.canvas.height;
    this.projectionMatrix_r = mat4.perspective((2 * Math.PI) / 5, this.aspect_r, 1, 30000000);

    this.modelMatrix_r = mat4.scaling(vec3.fromValues(10, 10, 10*this.thin));
    this.modelViewProjectionMatrix_r = mat4.create() as Float32Array;
    this.viewMatrix_r = mat4.identity();
    this.tmpMat4_r = mat4.create();

    return true;
}
  // Comppute camera movement:
  // It rotates around Y axis with a slight pitch movement.
  updateTransformationMatrixM(){

    mat4.translate(this.viewMatrix, vec3.fromValues(0, 0, -15),this.tmpMat4 );
    mat4.rotateY(this.tmpMat4, -this.angle, this.tmpMat4);
    mat4.translate(this.tmpMat4, vec3.fromValues(10 + -1 * Math.sin(this.angle), 0, -1 * Math.cos(this.angle)),this.tmpMat4 );

    mat4.multiply(this.tmpMat4, this.modelMatrix, this.modelViewProjectionMatrix);
    mat4.multiply(
      this.projectionMatrix,
      this.modelViewProjectionMatrix,
      this.modelViewProjectionMatrix
    );

  }

  updateTransformationMatrixL(){

    mat4.translate(this.viewMatrix_l, vec3.fromValues(-10, 0, -16),this.tmpMat4_l );
    mat4.rotate(this.tmpMat4_l, vec3.fromValues(1, 0, 0), (Math.PI / 10) * 0, this.tmpMat4_l );

    mat4.multiply(this.tmpMat4_l, this.modelMatrix_l, this.modelViewProjectionMatrix_l);
    mat4.multiply(
      this.projectionMatrix_l,
      this.modelViewProjectionMatrix_l,
      this.modelViewProjectionMatrix_l
    );
  }

  updateTransformationMatrixR(){

    mat4.translate(this.viewMatrix_r, vec3.fromValues(10, 0, -16),this.tmpMat4_r );
    mat4.rotate(this.tmpMat4_r, vec3.fromValues(1, 0, 0), (Math.PI / 10) * 0, this.tmpMat4_r );

    mat4.multiply(this.tmpMat4_r, this.modelMatrix_r, this.modelViewProjectionMatrix_r);
    mat4.multiply(
      this.projectionMatrix_r,
      this.modelViewProjectionMatrix_r,
      this.modelViewProjectionMatrix_r
    );
  }

  animationFrame = ()=>{
    // Sample is no longer the active page.
    // if (!pageState.active) return;

    this.angle = (Math.PI / 100) * (this.time*80%100);

    if(this.rottt > 0)
    this.updateTransformationMatrixM();

    this.gpuDevice.queue.writeBuffer(
      this.uniformBuffer,
      0,
      new Float32Array([
        // modelViewProjectionMatrix
        this.modelViewProjectionMatrix[0], this.modelViewProjectionMatrix[1], this.modelViewProjectionMatrix[2], this.modelViewProjectionMatrix[3],
        this.modelViewProjectionMatrix[8], this.modelViewProjectionMatrix[9], this.modelViewProjectionMatrix[10], this.modelViewProjectionMatrix[11],
        this.modelViewProjectionMatrix[4], this.modelViewProjectionMatrix[5], this.modelViewProjectionMatrix[6], this.modelViewProjectionMatrix[7],
        this.modelViewProjectionMatrix[12], this.modelViewProjectionMatrix[13], this.modelViewProjectionMatrix[14], this.modelViewProjectionMatrix[15],
        this.time,
        this.angle,
        0,0, // padding
      ])
    );

    this.gpuDevice.queue.writeBuffer(
      this.uniformBuffer_l,
      0,
      new Float32Array([
        // modelViewProjectionMatrix
        this.modelViewProjectionMatrix_l[0], this.modelViewProjectionMatrix_l[1], this.modelViewProjectionMatrix_l[2], this.modelViewProjectionMatrix_l[3],
        this.modelViewProjectionMatrix_l[8], this.modelViewProjectionMatrix_l[9], this.modelViewProjectionMatrix_l[10], this.modelViewProjectionMatrix_l[11],
        this.modelViewProjectionMatrix_l[4], this.modelViewProjectionMatrix_l[5], this.modelViewProjectionMatrix_l[6], this.modelViewProjectionMatrix_l[7],
        this.modelViewProjectionMatrix_l[12], this.modelViewProjectionMatrix_l[13], this.modelViewProjectionMatrix_l[14], this.modelViewProjectionMatrix_l[15],
        this.time,
        0,0,0, // padding
      ])
    );


    this.gpuDevice.queue.writeBuffer(
      this.uniformBuffer_r,
      0,
      new Float32Array([
        // modelViewProjectionMatrix
        this.modelViewProjectionMatrix_r[0], this.modelViewProjectionMatrix_r[1], this.modelViewProjectionMatrix_r[2], this.modelViewProjectionMatrix_r[3],
        this.modelViewProjectionMatrix_r[8], this.modelViewProjectionMatrix_r[9], this.modelViewProjectionMatrix_r[10], this.modelViewProjectionMatrix_r[11],
        this.modelViewProjectionMatrix_r[4], this.modelViewProjectionMatrix_r[5], this.modelViewProjectionMatrix_r[6], this.modelViewProjectionMatrix_r[7],
        this.modelViewProjectionMatrix_r[12], this.modelViewProjectionMatrix_r[13], this.modelViewProjectionMatrix_r[14], this.modelViewProjectionMatrix_r[15],
        this.time,
        0,0,0, // padding
      ])
    );


    this.renderPassDescriptor.colorAttachments[0].view = this.context
      .getCurrentTexture()
      .createView();


    this.commandEncoder = this.gpuDevice.createCommandEncoder();
    this.passEncoder = this.commandEncoder.beginRenderPass(this.renderPassDescriptor);

    //draw annimation
    this.passEncoder.setPipeline(this.pipeline);
    this.passEncoder.setVertexBuffer(0, this.verticesBuffer);
    this.passEncoder.setBindGroup(0, this.uniformBindGroup);
    this.passEncoder.draw(cubeVertexCount);


    //draw left
    this.passEncoder.setPipeline(this.pipeline_l);
    this.passEncoder.setVertexBuffer(0, this.verticesBuffer_l);
    this.passEncoder.setBindGroup(0, this.uniformBindGroup_l);
    this.passEncoder.draw(cubeVertexCount);

    //draw right
    this.passEncoder.setPipeline(this.pipeline_r);
    this.passEncoder.setVertexBuffer(0, this.verticesBuffer_r);
    this.passEncoder.setBindGroup(0, this.uniformBindGroup_r);
    this.passEncoder.draw(cubeVertexCount);


    this.passEncoder.end();
    this.gpuDevice.queue.submit([this.commandEncoder.finish()]);

    this.time += this.deltatime;

    requestAnimationFrame(this.animationFrame);
  }

}
