import {Group, Mesh, Color, TextureLoader, CameraHelper, DirectionalLight, DoubleSide} from 'three';
import {GLTFLoader} from './plugins/GLTFLoader';
import {DRACOLoader} from './plugins/DRACOLoader';
import Planet from './objects/planet';
import Plane from './objects/plane';
import Eiffel from './objects/eiffeil';
import Users from './objects/users';
import BasicLights from './objects/lights';
import { createShaderMaterial } from './shaders/shader';

export default class CityScene extends Group {
  constructor() {
    super();
    this.zSpeed = 0.025
  }

  init (camera, scene) {
    this.camera = camera
    this.webpPng = window.webpSupport ? 'webp' : 'png'
    this.webpJpg = window.webpSupport ? 'webp' : 'jpg'

    return new Promise ((resolve, reject) => {
      const loader = new GLTFLoader().setPath( 'models/draco/' );
      DRACOLoader.setDecoderPath( '/js/' );
      loader.setDRACOLoader( new DRACOLoader() );
      var textureO = new TextureLoader().load("img/webgl_text_o." + this.webpPng)
      var txtB = new TextureLoader().load("img/webgl_text_blk." + this.webpPng)
      loader.load('planet.glb', (gltf)=>{
      new TextureLoader().load("img/dsp_t." + this.webpJpg, dispimg => {
        var texture = new TextureLoader().load("img/webgl_text_w." + this.webpPng, texture => {
          this.planet = new Planet(gltf, texture, textureO, scene, dispimg, txtB)
          this.plane = new Plane(gltf, texture, textureO, dispimg, txtB)
          this.eiffel = new Eiffel(gltf, dispimg)
          this.users = new Users(gltf, dispimg)
          this.add(this.planet, this.users, this.plane, this.eiffel)
          var texts = gltf.scene.children.filter(child => child.name.includes('Text'))
          texts.forEach(el => {
            var material = createShaderMaterial('phongDiffuse')
            material.uniforms.uMaterialColor.value.copy(new Color(0x121212))
            material.uniforms.alpha.value = '0.0'
            var mesh = new Mesh(el.geometry, material)
            mesh.name = el.name
            mesh.visible = false
            mesh.matrixAutoUpdate = false
            this.add(mesh)
          })
          scene.add(this)
          resolve()
        })
      })
      });
    });
  }
  update() {
  }
}