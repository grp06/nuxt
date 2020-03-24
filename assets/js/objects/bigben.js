import { Group, Mesh, Color} from 'three'
import {createShaderMaterial} from '../shaders/shader'

export default class BigBen extends Group {
  constructor(gltf, scene) {
    super();
    this.matrixAutoUpdate = false
    this.name = 'BigBen'
    var findEl = gltf.scene.children.filter(child => child.name.includes('Ben'))[0].children
 
    findEl.forEach(el => {
      var material = createShaderMaterial('phongDiffuse')
      material.uniforms.uMaterialColor.value.copy(new Color(el.material.color.getHex()))
      material.uniforms.alpha.value = '0.0'
      var mesh = new Mesh(el.geometry, material)
      mesh.matrixAutoUpdate = false
      mesh.visible = false
      this.add(mesh)
    })
    // material.uniforms.alpha.value = 0.0
    // material.side = BackSide
    // cellArr.push(el.geometry)
    // var mesh = new Mesh(el.geometry, material)
    // this.add(mesh)
    // var cellshading = initBufferToon(cellArr, 0.03)
    // this.add(cellshading)
  }
}

