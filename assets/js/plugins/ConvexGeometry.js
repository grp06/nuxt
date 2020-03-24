/**
 * @author Mugen87 / https://github.com/Mugen87
 */

// ConvexGeometry
import {Geometry, BufferGeometry, Float32BufferAttribute} from 'three'
import {ConvexHull} from './ConvexHull'

// ConvexBufferGeometry

export default class ConvexBufferGeometry extends BufferGeometry {

  constructor(points) {
  super();
	var vertices = [];
	var normals = [];

	if ( ConvexHull === undefined ) {

		console.error( 'ConvexBufferGeometry: ConvexBufferGeometry relies on ConvexHull' );

	}

	var convexHull = new ConvexHull().setFromPoints( points );

	// generate vertices and normals

	var faces = convexHull.faces;

	for ( var i = 0; i < faces.length; i ++ ) {

		var face = faces[ i ];
		var edge = face.edge;

		// we move along a doubly-connected edge list to access all face points (see HalfEdge docs)

		do {

			var point = edge.head().point;

			vertices.push( point.x, point.y, point.z );
			normals.push( face.normal.x, face.normal.y, face.normal.z );

			edge = edge.next;

		} while ( edge !== face.edge );

	}

    // build geometry
    this.addAttribute( 'position', new Float32BufferAttribute( vertices, 1000 ) );
    this.addAttribute( 'normal', new Float32BufferAttribute( normals, 1000 ) );
  }

};

export {ConvexBufferGeometry}