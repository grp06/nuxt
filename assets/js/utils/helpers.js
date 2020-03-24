import {Color, BackSide, Mesh, Vector3} from 'three';
import {BufferGeometryUtils} from '../plugins/BufferGeometryUtils';
import  {createShaderMaterial} from '../shaders/shader';

export const initBufferToon = (buffers, edgeWidthRatio, alpha) => {
  var bufferCellShading = []
  buffers.forEach(buffer => {
    if (buffer.children) {
      buffer.children.forEach(Pel => {
        if (Pel.geometry) {
          bufferCellShading.push(Pel.geometry)
        }
        if (Pel.children.length > 0) {
          Pel.children.forEach(el => {
            if (el.geometry) {
              bufferCellShading.push(el.geometry)
            }
          })
        }
      })
    } else {
      if (buffer) {
        bufferCellShading.push(buffer)
      }
    }
  })
  var geometries = BufferGeometryUtils.mergeBufferGeometries(bufferCellShading)
  var material = createShaderMaterial('phongDiffuse')
  material.uniforms.uMaterialColor.value.copy(new Color(0x111111))
  material.uniforms.edge.value = true;
  material.uniforms.edgeWidthRatio.value = edgeWidthRatio;
  if (typeof alpha !== undefined) {
    material.uniforms.alpha.value = alpha
  }
  material.side = BackSide;
  var mesh = new Mesh(geometries, material)
  mesh.matrixAutoUpdate = false
  mesh.name = 'toon'
  return mesh
}

export const mergeBuffers = (buffers) => {
  var bufferCellShading = []
  buffers.forEach(buffer => {
    if (buffer.children) {
      buffer.children.forEach(Pel => {
        if (Pel.geometry) {
          bufferCellShading.push(Pel.geometry)
        }
        if (Pel.children.length > 0) {
          Pel.children.forEach(el => {
            if (el.geometry) {
              bufferCellShading.push(el.geometry)
            }
          })
        }
      })
    } else {
      if (buffer) {
        bufferCellShading.push(buffer)
      }
    }
  })
  var geometries = BufferGeometryUtils.mergeBufferGeometries(bufferCellShading)
  return geometries
}

export const randomPointInTriangle = (vectorA, vectorB, vectorC) => {

  var vector = new Vector3();
  var point = new Vector3();

  var a = Math.random();
  var b = Math.random();

  if ( ( a + b ) > 1 ) {

    a = 1 - a;
    b = 1 - b;

  }

  var c = 1 - a - b;

  point.copy( vectorA );
  point.multiplyScalar( a );

  vector.copy( vectorB );
  vector.multiplyScalar( b );

  point.add( vector );

  vector.copy( vectorC );
  vector.multiplyScalar( c );

  point.add( vector );

  return point;
}

// Get random point in face (triangle)
// (uniform distribution)

export const randomPointInFace = ( face, geometry ) => {

  var vA, vB, vC;

  vA = geometry.vertices[ face.a ];
  vB = geometry.vertices[ face.b ];
  vC = geometry.vertices[ face.c ];

  return randomPointInTriangle( vA, vB, vC );

}

export const triangleArea = (vectorA, vectorB, vectorC) => {

  var vector1 = new Vector3();
  var vector2 = new Vector3();

    vector1.subVectors( vectorB, vectorA );
    vector2.subVectors( vectorC, vectorA );
    vector1.cross( vector2 );

    return 0.5 * vector1.length();
}

export const randomPointsInBufferGeometry = (geometry, n ) => {
  var i,
    vertices = geometry.attributes.position.array,
    totalArea = 0,
    cumulativeAreas = [],
    vA, vB, vC;
  // precompute face areas
  vA = new Vector3();
  vB = new Vector3();
  vC = new Vector3();

  // geometry._areas = [];
  var il = vertices.length / 9;

  for ( i = 0; i < il; i ++ ) {

    vA.set( vertices[ i * 9 + 0 ], vertices[ i * 9 + 1 ], vertices[ i * 9 + 2 ] );
    vB.set( vertices[ i * 9 + 3 ], vertices[ i * 9 + 4 ], vertices[ i * 9 + 5 ] );
    vC.set( vertices[ i * 9 + 6 ], vertices[ i * 9 + 7 ], vertices[ i * 9 + 8 ] );

    var area = triangleArea( vA, vB, vC );
    totalArea += area;

    cumulativeAreas.push( totalArea );

  }

  // binary search cumulative areas array

  function binarySearchIndices( value ) {

    function binarySearch( start, end ) {

      // return closest larger index
      // if exact number is not found

      if ( end < start )
        return start;

      var mid = start + Math.floor( ( end - start ) / 2 );

      if ( cumulativeAreas[ mid ] > value ) {

        return binarySearch( start, mid - 1 );

      } else if ( cumulativeAreas[ mid ] < value ) {

        return binarySearch( mid + 1, end );

      } else {

        return mid;

      }

    }

    var result = binarySearch( 0, cumulativeAreas.length - 1 );
    return result;

  }

  // pick random face weighted by face area

  var r, index,
    result = [];

  for ( i = 0; i < n; i ++ ) {

    r = Math.random() * totalArea;

    index = binarySearchIndices( r );

    // result[ i ] = THREE.GeometryUtils.randomPointInFace( faces[ index ], geometry, true );
    vA.set( vertices[ index * 9 + 0 ], vertices[ index * 9 + 1 ], vertices[ index * 9 + 2 ] );
    vB.set( vertices[ index * 9 + 3 ], vertices[ index * 9 + 4 ], vertices[ index * 9 + 5 ] );
    vC.set( vertices[ index * 9 + 6 ], vertices[ index * 9 + 7 ], vertices[ index * 9 + 8 ] );
    result[ i ] = randomPointInTriangle( vA, vB, vC );

  }

  return result;

}

export const mergeGeometries = (buffers, material) => {
  var bufferMerged = []
  buffers.forEach(buffer => {
    bufferMerged.push(buffer)
  })
  var geometries = BufferGeometryUtils.mergeBufferGeometries(bufferMerged)
  var mesh = new Mesh(geometries, material)
  mesh.matrixAutoUpdate = false
  return mesh
}