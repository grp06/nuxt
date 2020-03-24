

//avoid creating geometry per intance?
import {Mesh, ShaderMaterial, Vector4, Vector2, RepeatWrapping} from 'three';

const defaultVertexShader = `
	
uniform vec4 uSize; 		//w h t l 
uniform float rot;
varying vec2 vUv;

vec2 rotate(vec2 v, float a) {
	float s = sin(a);
	float c = cos(a);
	mat2 m = mat2(c, -s, s, c);
	return m * v;
}

void main(){

	vUv = uv;
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

}
`;

// mat2(cos(1), sin(-1), sin(1), cos(1)) *

const defaultFragmentShader = `
	
varying vec2 vUv;
uniform float repeatNb;
uniform float cover;
uniform float alpha;
uniform sampler2D uTexture;
uniform vec2 imageResolution;
uniform vec2 resolution;

void main(){

	if (cover == 1.0) {
		vec2 ratio = vec2(
			min((resolution.x / resolution.y) / (imageResolution.x / imageResolution.y), 1.0),
			min((resolution.x / resolution.y) / (imageResolution.x / imageResolution.y), 1.0)
		);
		vec2 uv = vec2(
			vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
			vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
		);
		gl_FragColor = texture2D( uTexture, uv);
		if(texture2D( uTexture, uv * repeatNb).a - 0.98 < 0.0) {
			gl_FragColor.a = 0.0;
		} else {
			gl_FragColor.a = alpha;
		}
	} else {
		gl_FragColor = texture2D( uTexture, vUv * repeatNb);
		if(texture2D( uTexture, vUv * repeatNb).a - 0.8 < 0.0) {
			gl_FragColor.a = 0.0;
		} else {
		  gl_FragColor.a = alpha;
		}
	}
	
}
`;


export default class ScreenQuad extends Mesh{

	constructor({
	
		width = 1,        	//100%
		height = 1,			//100%
		top = 0,			
		left = 0,
		texture = null,
		fragmentShader = false,
		geo = false
	
	} = {}) {
	
		super(geo , new ShaderMaterial({

			uniforms:{
				uTexture:{
					type:'t',
					value: texture
				},
				uSize:{
					type:'v4',
					value:new Vector4(1,1,0,0)
				},
				rot:{
					type:'f',
					value:0.0
				},
				uKd: {
						type: "f",
						value: 0.9
				},
				texturebg: { type: "t", value: null},
				texturehover: { type: "t", value: null},
				texture: { type: "t", value: null},
				baseT: { type: "t", value: null},
				baseBg: { type: "t", value: null},
				baseHv: { type: "t", value: null},
				alpha: {
						type: "f",
						value: 1.0
				},
				coverY: {
						type: "f",
						value: 1.0
				},
				scale: {
					type: "f",
					value: 12.0
				},
				smoothness: {
					type: "f",
					value: 0.01
				},
				seed: {
					type: "f",
					value: 10.9898
				},
				cover: {
					type: "f",
					value: 0.0
				},
				centerX: {
						type: "f",
						value: 0.0
				},
				coverX: {
						type: "f",
						value: 1.0
				},
				repeatNb: {
						type: "f",
						value: 5.0
				},
				intensity: {
						type: 'f',
						value: 0.4
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
				resolution: {
					type: 'v2',
					value: new Vector2(1, 1),
				},
				parallax: {
					type: 'v2',
					value: new Vector2(1, 1),
				},
				imageResolution: {
					type: 'v2',
					value: new Vector2(1, 1),
				},
			},

			vertexShader: defaultVertexShader,

			fragmentShader: fragmentShader ? fragmentShader : defaultFragmentShader,

			depthWrite: false

		}));
		if(this.material.uniforms.uTexture.value) {
			this.material.uniforms.uTexture.value.needsUpdate = true;
			this.material.uniforms.uTexture.value.wrapS = this.material.uniforms.uTexture.value.wrapT = RepeatWrapping;
		}
		this.frustumCulled = false;

		//this.renderOrder = -1;

		this.top = top;

		this.left = left;

		this.width = width;

		this.height = height;


		//cleanup
		this._pixels = [false,false,false,false]; //w h t l 

		this._componentSetters = [
			this.setWidth,
			this.setHeight,
			this.setTop,
			this.setLeft
		];

		this._components = [
			'width',
			'height',
			'top',
			'left'
		];

		this.screenSize = new Vector2( 1 , 1 );
			
		this.setSize( width , height );

		this.setOffset( top , left );

	}

	setScreenSize( width , height ){
		// this.material.uniforms.uScreenSize.value.set( width , height , 1 / width , 1 / height );
	}

	setSize( width , height ){
		this.setWidth( width );
		this.setHeight( height );
	}

	setWidth( v ) {
		this.width = v;
		if( typeof v === 'string' ){
			this.material.uniforms.uSize.value.x = parseInt( v ) / this.screenSize.x;
			this._pixels[0] = true;

		} else {

			this.material.uniforms.uSize.value.x = v;

			this._pixels[0] = false;

		}

	}

	setHeight( v ){

		this.height = v;

		if( typeof v === 'string' ){
			this.material.uniforms.uSize.value.y = parseInt( v ) / this.screenSize.y;
			this._pixels[1] = true;

		} else {
			this.material.uniforms.uSize.value.y = v;
			this._pixels[1] = false;
		}

	}

	setOffset( top , left ){

		// this.material.uniforms.uSize.value.z = top;

		// this.material.uniforms.uSize.value.w = left;

		this.setLeft( left );
		this.setTop( top );

	}

	setTop( v ) {


		this.top = v;

		if( typeof v === 'string' ){

			this.material.uniforms.uSize.value.z = parseInt( v ) / this.screenSize.y;

			this._pixels[2] = true;

		} else {

			this.material.uniforms.uSize.value.z = v;

			this._pixels[2] = false;

		}

	}

	setLeft( v ){

		this.left = v;

		if( typeof v === 'string' ){
			this.material.uniforms.uSize.value.w = parseInt( v ) / this.screenSize.x;

			this._pixels[3] = true;

		} else {

			this.material.uniforms.uSize.value.w = v;

			this._pixels[3] = false;

		}

	}

}