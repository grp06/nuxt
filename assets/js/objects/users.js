import { Group, Mesh, TextureLoader, MeshBasicMaterial } from 'three'
import {BufferGeometryUtils} from '../plugins/BufferGeometryUtils'
import {createShaderMaterial} from '../shaders/shader'
import {initBufferToon, mergeGeometries} from '../utils/helpers'

export default class Users extends Group {
  constructor(gltf, UserMod) {
    super();
    this.matrixAutoUpdate = false
    this.name = 'Users'
    var findEl = gltf.scene.children.filter(child => child.name.includes('Circle'))
    this.webpPng = window.webpSupport ? 'webp' : 'png'
 
    var cellArr = []
    var i = 0
    findEl.forEach((el) => {
      i++
      new TextureLoader().load('/img/user' + i + '.' + this.webpPng, userImg => {
        userImg.center.set(0.5, 0.5)
        
        var material = new MeshBasicMaterial({ map: userImg });
        // var material = createShaderMaterial('phongDiffuse')
        // material.uniforms.uMaterialColor.value.copy(new Color(materialEl.color.getHex()))
        cellArr.push(el.geometry)
        
        var mesh = new Mesh(el.geometry, material)
        mesh.name = 'user' + i
        mesh.material.transparent = true
        mesh.material.opacity = 0
        mesh.visible = false
        mesh.matrixAutoUpdate = false
        this.add(mesh)
      })
    })
    
    // var cellshading = initBufferToon(cellArr, 4)
    // this.add(cellshading)

    // var geometryBuildings = BufferGeometryUtils.mergeBufferGeometries(geometriesBuildings);
    // console.log(geometryBuildings)



  }
}

