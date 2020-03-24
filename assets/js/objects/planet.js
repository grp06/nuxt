import { Group, Mesh } from 'three'
import {createShaderMaterialImage} from '../shaders/image'
import {createLightMeshs} from '../shaders/light'
import {initBufferToon, mergeBuffers} from '../utils/helpers'

export default class Planet extends Group {
  constructor(gltf, texture, textureO, scene, dsp, txtB) {
    super();
    this.matrixAutoUpdate = false
    this.name = 'Planet'
    var findEl = gltf.scene.children.filter(child => child.name.includes('Planet'))
 
    var cellArr = []
    findEl[0].material.metalness = 0
    var self = this
    var i = 0
    findEl.forEach((el) => {
      var materialEl = el.material
        i++
        var text = i < 2 ? textureO : texture
        var repeatNb = i < 2 ? 250.0 : 50.0
        var material = createShaderMaterialImage('phongImageDiffuse', text, repeatNb, dsp, txtB)
        material.uniforms.alpha.value = 0.0
        // material.uniforms.texture.value = texture
        cellArr.push(el.geometry)
        var mesh = new Mesh(el.geometry, material)
        mesh.matrixAutoUpdate = false
        self.add(mesh)
      })    
    var cellshading = initBufferToon(cellArr, 0.05, 1.0)
    cellshading.material.uniforms.alpha.value = 0.0
    this.add(cellshading)
    // this.add(createLightMeshs(mergeBuffers(cellArr), scene))
  }
}

