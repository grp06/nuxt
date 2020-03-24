import {Color, ShaderMaterial, UniformsUtils, FrontSide} from 'three'

export const shaderP = {
'starDiffuse' : {

    uniforms: {
      color: { type: "c", value: new Color( 0xF0E68C ) },
      alphaM: {
        type: "f",
        value: 0.0
      }
    },

    vertexShader: [
        "attribute float alpha;",

        "void main() {",
            "vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",
            "gl_PointSize = 6.0 * alpha;",
            "gl_Position = projectionMatrix * mvPosition;",
        "}"

    ].join("\n"),

    fragmentShader: [

        "uniform vec3 color;",
        "uniform float alphaM;",

        "void main() {",
            "gl_FragColor = vec4( color, 1 );",
            "gl_FragColor.a = alphaM;",
        "}"
    ].join("\n")
}

};


export const createShaderPMaterial = (id) => {
    var shaderLoc = shaderP[id];
    var uniforms = UniformsUtils.merge( [
        shaderLoc.uniforms
    ] );
    var u = UniformsUtils.clone(uniforms);
    var vs = shaderLoc.vertexShader;
    var fs = shaderLoc.fragmentShader;

    var material = new ShaderMaterial({ uniforms: u, vertexShader: vs, fragmentShader: fs });
    material.metalness = 0.5
    material.side = FrontSide;
    material.transparent = true
    material.opacity = 0
    material.alpha = 0
    return material;
}