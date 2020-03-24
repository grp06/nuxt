import {Vector3, Vector4, BackSide, Color, ShaderMaterial, UniformsUtils, FrontSide} from 'three'
import BasicLights from '../objects/lights';

export const shader = {
'phongDiffuse' : {

    uniforms: {
        "edge"            : { type: 'i',    value: false },
        "uDirLightPos":	{ type: "v3", value: new Vector3() },
        "uDirLightColor": { type: "c", value: new Color( 0xffffff ) },

        "uMaterialColor":  { type: "c", value: new Color( 0xffffff ) },
        "edgeColor"       : { type: 'v4',   value: new Vector4(0, 0, 0, 1) },
        "edgeWidthRatio"  : { type: 'f',    value: 0.01 },
        uKd: {
            type: "f",
            value: 0.9
        },
        alpha: {
            type: "f",
            value: 1.0
        },
        uBorder: {
            type: "f",
            value: 0.8
        }
    },

    vertexShader: [
        "uniform float edgeWidthRatio;",
        "uniform float alpha;",
        "uniform bool edge;",
        "varying vec3 vNormal;",

        "void main() {",
            "vec3 pos = (vec4(position, 1.0)).xyz;",
            "if(edge && alpha != 0.0){",
                "pos += normal * edgeWidthRatio;",
                "gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);",
            "}else if (alpha != 0.0){",
                "vNormal = normalize( normalMatrix * normal );",
                "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0);",
            "}",
        "}"

    ].join("\n"),

    fragmentShader: [

        "uniform vec3 uMaterialColor;",

        "uniform vec3 uDirLightPos;",
        "uniform vec3 uDirLightColor;",
        "uniform bool edge;",
        "uniform vec4 edgeColor;",
        "uniform float uKd;",
        "uniform float alpha;",
        "uniform float uBorder;",

        "varying vec3 vNormal;",

        "void main() {",
            "if(edge && alpha != 0.0){",
                "gl_FragColor = edgeColor;",
            "}else if (alpha != 0.0){",
                // compute direction to light
                "vec4 lDirection = viewMatrix * vec4( uDirLightPos, 0.0 );",
                "vec3 lVector = normalize( lDirection.xyz );",

                // diffuse: N * L. Normal must be normalized, since it's interpolated.
                "vec3 normal = normalize( vNormal );",
                // "float diffuse = max( dot( normal, lVector ), 0.0);",
                // solution
                "float diffuse = dot( normal, lVector );",
                "if ( diffuse > 0.4 ) { diffuse = diffuse; }",
                "else { diffuse = 0.4; }",
                // "else if ( diffuse > -0.2 ) { diffuse = 0.7; }",
                // "else { diffuse = 0.6; }",

                "gl_FragColor = vec4( uKd * uMaterialColor * uDirLightColor * diffuse * 1.5, 1.0 );",
            "}",
            "gl_FragColor.a = alpha;",
        "}"

    ].join("\n")

}

};


export const createShaderMaterial = (id) => {
    var shaderLoc = shader[id];
    var lights = new BasicLights()
    var light = lights.children.find(child => child.name === 'dirlight')

    var u = UniformsUtils.clone(shaderLoc.uniforms);

    var vs = shaderLoc.vertexShader;
    var fs = shaderLoc.fragmentShader;

    var material = new ShaderMaterial({ uniforms: u, vertexShader: vs, fragmentShader: fs });
    // material.side = FrontSide;
    material.uniforms.uDirLightPos.value = light.position;
    material.uniforms.uDirLightColor.value = light.color;
    material.transparent = true
    return material;
}