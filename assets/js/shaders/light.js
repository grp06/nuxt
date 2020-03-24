import {Vector3, Color, ShaderMaterial, PlaneGeometry, ShaderLib, UniformsUtils, MeshPhongMaterial, DoubleSide, Mesh} from 'three'
import BasicLights from '../objects/lights';

export const shaderImg = {
'phongLightDiffuse' : {

uniforms: {
  "uDirLightPos":	{ type: "v3", value: new Vector3() },
  "uDirLightColor": { type: "c", value: new Color( 0xffffff ) },

  "uMaterialColor":  { type: "c", value: new Color( 0xffffff ) },
  uKd: {
      type: "f",
      value: 0.9
  },
  alpha: {
      type: "f",
      value: 1.0
  },
  repeatNb: {
      type: "f",
      value: 50.0
  }
},
depthVertex: `
// verbatim from http://blog.edankwan.com/post/three-js-advanced-tips-shadow

uniform float time;

void main() {

    vec3 offset = vec3(
        sin(position.x * 10.0 + time) * 15.0,
        sin(position.y * 10.0 + time + 31.512) * 15.0,
        sin(position.z * 10.0 + time + 112.512) * 15.0
    );

    vec3 pos = position + offset;

    vec4 worldPosition = modelMatrix * vec4(pos, 1.0);

    gl_Position = projectionMatrix * viewMatrix * worldPosition;

}`,
fragment: `
// originally from http://blog.edankwan.com/post/three-js-advanced-tips-shadow
// removed anything but depth-shadow

varying vec3 vNormal;
varying vec3 vWorldPosition;

uniform vec3 lightPosition;

void main(void) {

    vec3 lightDirection = normalize(lightPosition - vWorldPosition);

    float c = 0.35 + max(0.0, dot(vNormal, lightDirection)) * 0.4;

    gl_FragColor = vec4(c, c, c, 1.0);

}`,
vertexShader: `
// originally from http://blog.edankwan.com/post/three-js-advanced-tips-shadow
// removed anything but depth-shadow

varying vec3 vNormal;
varying vec3 vWorldPosition;

uniform float time;

void main() {

  // adding some displacement based on the vertex position
  vec3 offset = vec3(
      sin(position.x * 10.0 + time) * 25.0,
      sin(position.y * 10.0 + time + 31.512) * 25.0,
      sin(position.z * 10.0 + time + 112.512) * 25.0
  );

  vec3 pos = position + offset;

  // just add some noise to the normal
  vNormal = normalMatrix * vec3(normal + normalize(offset) * 0.2);

  vec4 worldPosition = modelMatrix * vec4(pos, 1.0);

  // store the world position as varying for lighting
  vWorldPosition = worldPosition.xyz;

  gl_Position = projectionMatrix * viewMatrix * worldPosition;

}`

}

};


export const createLightMeshs = (geoMesh, scene) => {
var shaderLoc = shaderImg['phongLightDiffuse'];
var lights = new BasicLights()

var geometry = new PlaneGeometry(200, 200, 200, 200);
var materiall = new MeshPhongMaterial( {color: 0xAAAAAA,
shininess: 5, side: DoubleSide } );
var plane = new Mesh( geometry, materiall );
plane.position.z = 5
plane.castShadow = false;
plane.receiveShadow = true;
// plane.rotation.x = Math.PI/2
setTimeout(() => {
  scene.add( plane );
}, 1500)

var light = lights.children.find(child => child.name === 'dirlight')

var vs = shaderLoc.vertexShader;
var depth = shaderLoc.depthVertex;
var fs = shaderLoc.fragment;
// var material = new ShaderMaterial({
//   vertexShader: vs,
//   fragmentShader: fs,
//   uniforms: UniformsUtils.merge([{
//     lightPosition: {
//       value: light.position
//     },
//     time: {
//       value: 0
//     }
//   }])
// });
  var material = new MeshPhongMaterial( {color: 0xAAAAAA,
    shininess: 5, side: DoubleSide } );
  // mesh
  var mesh = new Mesh(geoMesh, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
// console.log(mesh)
//   mesh.customDepthMaterial = new ShaderMaterial({
//     vertexShader: depth,
//     fragmentShader: ShaderLib.basic.fragmentShader,
//     uniforms: material.uniforms
//   });
  return mesh;
}
