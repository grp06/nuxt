import { Group, Mesh, Color } from 'three'
import {BufferGeometryUtils} from '../plugins/BufferGeometryUtils'
import {createShaderMaterial} from '../shaders/shader'
import {createShaderMaterialImage} from '../shaders/image'
import {initBufferToon, mergeGeometries} from '../utils/helpers'

export default class Plane extends Group {
  constructor(gltf, texture, textureO, dsp, txtB) {
    super();
    this.matrixAutoUpdate = false
    this.name = 'Plane'
    var findEl = gltf.scene.children.filter(child => child.name.includes('Avion'))
   
    findEl.forEach((parent) => {
      var i = 0
      var cellArr = []
      var group = new Group()
      parent.children.forEach(el => {
        var materialEl = el.material
        var material = null

        i++
        if (i === 1) {
          material = createShaderMaterialImage('phongImageDiffuse', texture, 5.0, dsp, txtB)
        } else if (i === 3) {
          material = createShaderMaterialImage('phongImageDiffuse', textureO, 2.0, dsp, txtB)
        } else {
          material = createShaderMaterial('phongDiffuse')
          material.uniforms.uMaterialColor.value.copy(new Color(materialEl.color.getHex()))
          material.transparent = true;
          // el.material.metalness = 0.6
        }
        material.uniforms.alpha.value = '0.0'
        cellArr.push(el.geometry)
        var mesh = new Mesh(el.geometry, material)
        mesh.matrixAutoUpdate = false
        group.add(mesh)
        group.matrixAutoUpdate = false
      })
      var cellshading = initBufferToon(cellArr, 0.03, '0.0')
      group.add(cellshading)
      group.visible = false
      this.add(group)
    })
    
    
    // this.add(Garden, Torii, Stones);

    // var geometryBuildings = BufferGeometryUtils.mergeBufferGeometries(geometriesBuildings);
    // console.log(geometryBuildings)



  }
}

