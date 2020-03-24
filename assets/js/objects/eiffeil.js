import { Group, Mesh, Color, BufferAttribute, Points, BackSide} from 'three'
import {createShaderMaterial} from '../shaders/shader'
import {createShaderPMaterial} from '../shaders/particle'

export default class Eiffel extends Group {
  constructor(gltf, scene) {
    super();
    this.matrixAutoUpdate = false
    this.name = 'Eiffel'
    var el = gltf.scene.children.find(child => child.name === 'Eiffel')
   
 
    var cellArr = []
    var materialEl = el.material
    var material = createShaderMaterial('phongDiffuse')
    material.uniforms.uMaterialColor.value.copy(new Color(0x9a8e83))
    material.uniforms.alpha.value = '0.0'
    // material.uniforms.alpha.value = 0.0
    // material.side = BackSide
    // cellArr.push(el.geometry)
    var mesh = new Mesh(el.geometry, material)
     mesh.matrixAutoUpdate = false
     mesh.visible = false
    this.add(mesh)
    
    var numVertices = el.geometry.attributes.position.count;
    var alphas = new Float32Array( numVertices * 1 ); // 1 values per vertex

    for( var i = 0; i < 2000; i ++ ) {
    
        // set alpha randomly
        alphas[ i ] = Math.random();

    }
 
    el.geometry.addAttribute( 'alpha', new BufferAttribute( alphas, 1 ) );
    var materialP = createShaderPMaterial('starDiffuse')
    // point cloud
    var cloud = new Points(el.geometry, materialP );
    cloud.visible = false
    cloud.matrixAutoUpdate = false
    this.add( cloud );
    
    // var cellshading = initBufferToon(cellArr, 0.03)
    // this.add(cellshading)
  }
}

