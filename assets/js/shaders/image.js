import {Vector3, Color, ShaderMaterial, Vector4, UniformsUtils, RepeatWrapping, DoubleSide, LinearFilter} from 'three'
import BasicLights from '../objects/lights';

export const shaderImg = {
'phongImageDiffuse' : {

  uniforms: {
    "edge"            : { type: 'i',    value: false },
    "uDirLightPos":	{ type: "v3", value: new Vector3() },
    "uDirLightPosOffset":	{ type: "v3", value: new Vector3() },
    "uDirLightColor": { type: "c", value: new Color( 0xffffff ) },
    "uSplitColor": { type: "c", value: new Color( 0xcccccc ) },

    "uMaterialColor":  { type: "c", value: new Color( 0xffffff ) },
    "edgeColor"       : { type: 'v4',   value: new Vector4(0, 0, 0, 1) },
    "edgeWidthRatio"  : { type: 'f',    value: 0.01 },
    uKd: {
        type: "f",
        value: 0.9
    },
    texture: { type: "t", value: null},
    baseT: { type: "t", value: null},
    alpha: {
        type: "f",
        value: 1.0
    },
    uBorder: {
        type: "f",
        value: 0.8
    },
    fraction: {
        type: "f",
        value: 0.2
    },
    repeatNb: {
        type: "f",
        value: 50.0
    },
    intensity: {
        type: 'f',
        value: 0.7
    },
    dispFactor: {
        type: 'f',
        value: 0.0
    },
    angle: {
        type: 'f',
        value: Math.PI / 4
    },
    disp: {
        type: 't',
        value: null
    },
},

vertexShader: `
uniform float edgeWidthRatio;
uniform float alpha;
uniform bool edge;
varying vec3 vNormal;
varying vec2 vUv;

void main() {
    vUv = uv;
    vec3 pos = (vec4(position, 1.0)).xyz;
    if(edge && alpha != 0.0) {
        pos += normal * edgeWidthRatio;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    } else {
        vNormal = normalize( normalMatrix * normal );
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0);
    }
    
}
`,

fragmentShader: `

uniform vec3 uMaterialColor;

uniform vec3 uDirLightPos;
uniform vec3 uDirLightPosOffset;
uniform vec3 uDirLightColor;
uniform vec3 uSplitColor;
uniform bool edge;
uniform vec4 edgeColor;
uniform float uKd;
uniform float alpha;
uniform float uBorder;
uniform float fraction;
uniform float repeatNb;
uniform sampler2D texture;
uniform sampler2D baseT;
varying vec3 vNormal;
varying vec2 vUv;

uniform float dispFactor;
uniform sampler2D disp;
uniform float angle;
uniform float intensity;
mat2 rot(float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return mat2(c, -s, s, c);
}


void main() {
    if(edge && alpha != 0.0) {
        gl_FragColor = edgeColor;
    }else if (alpha != 0.0) {
        // compute direction to light
        vec3 uDirlOffset = vec3(uDirLightPos.x + uDirLightPosOffset.x, uDirLightPos.y + uDirLightPosOffset.y, uDirLightPos.z + uDirLightPosOffset.z);
        vec4 lDirection = viewMatrix * vec4( uDirlOffset, 0.0 );
        vec3 lVector = normalize( lDirection.xyz );

        // diffuse: N * L. Normal must be normalized, since it's interpolated.
        vec3 normal = normalize( vNormal );
        float diffuse = dot( normal, lVector );
        if (uKd < 0.5) {
            diffuse = 0.6;
        } else {
            // if ( diffuse > 1.2 ) { diffuse = 0.84;}
            // if ( diffuse > 0.8 ) { diffuse = 0.7;} 
            if ( diffuse < 0.75 ) { diffuse = 0.7;} 

            // else { diffuse = 0.4;}
        }
        if (dispFactor < 1.0) {
            vec4 disp = texture2D(disp, vUv);
            vec2 dispVec = vec2(disp.r, disp.g);
            vec2 distortedPosition1 = vUv * repeatNb + rot(0.7854) * dispVec * 1.0 * dispFactor;
            vec2 distortedPosition2 = vUv * repeatNb + rot(-2.3562) * dispVec * 0.7 * (1.0 - dispFactor);
            vec4 _texture1 = texture2D(baseT, distortedPosition1);
            vec4 _texture2 = texture2D(texture, distortedPosition2);
            gl_FragColor = mix(_texture1, _texture2, dispFactor) * vec4( uKd * uDirLightColor * diffuse * 1.4, 1.0 );
        } else {
            gl_FragColor = texture2D(texture, vUv * repeatNb) * vec4( uKd * uDirLightColor * diffuse * 1.4, 1.0 );
        }
    }
    gl_FragColor.a = alpha;
}
`
}

};


export const createShaderMaterialImage = (id, img, repeatNb, disp, txtB, vtx) => {
var shaderLoc = shaderImg[id];
var lights = new BasicLights()

img.needsUpdate = true
img.wrapS = img.wrapT = RepeatWrapping;
img.magFilter = img.magFilter = LinearFilter;
img.minFilter = img.minFilter = LinearFilter;
shaderLoc.uniforms.texture.value = img
shaderLoc.uniforms.disp.value = disp
shaderLoc.uniforms.baseT.value = txtB
var light = lights.children.find(child => child.name === 'dirlight')
var u = UniformsUtils.clone(shaderLoc.uniforms);

var vs = shaderLoc.vertexShader;
var fs = shaderLoc.fragmentShader;

var material = new ShaderMaterial({ uniforms: u, vertexShader: vtx || vs, fragmentShader: fs, side: DoubleSide});
material.uniforms.texture.value.needsUpdate = true;
material.uniforms.texture.value.wrapS = material.uniforms.texture.value.wrapT = RepeatWrapping;
material.uniforms.disp.value.needsUpdate = true;
material.uniforms.disp.value.wrapS = material.uniforms.disp.value.wrapT = RepeatWrapping;
material.uniforms.baseT.value.needsUpdate = true;
material.uniforms.baseT.value.wrapS = material.uniforms.baseT.value.wrapT = RepeatWrapping;

// material.side = FrontSide;
material.uniforms.uDirLightPos.value = light.position;
material.uniforms.uDirLightColor.value = light.color;
material.uniforms.repeatNb.value = repeatNb;
material.uniforms.fraction.value = 0.2;
material.transparent = true
return material;
}