import { Group, AmbientLight, DirectionalLight, PointLight, HemisphereLight} from 'three';

export default class BasicLights extends Group {
  constructor() {
    super();

    // const point = new PointLight(0xFFFFFF, 1, 10, 1);
    var hemiLight = new HemisphereLight( 0xFFFFFF, 0xffffd3, 0.5 );
    hemiLight.position.set( -4.3, 2, -7.5 );
    hemiLight.name = 'dirlight'
    this.add( hemiLight );
    // var light = new AmbientLight( 0xffffff, 2 ); // soft white light
    var light = new DirectionalLight( 0xffffff, 1); // soft white light
    light.position.set( -4.3, 2, -7.5 );
    light.position.set(700, 700, 500);
    light.castShadow = true; // default false
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
    light.shadow.camera.left = -2000;
    light.shadow.camera.right = 2000;
    light.shadow.camera.top = 2000;
    light.shadow.camera.bottom = -2000;
    light.shadow.camera.near = 0.5;
    light.shadow.camera.far = 2000;
    // light.name = "dirlight";
    this.add( light );

    // // light.name = 'dirlight';
    // this.add( hemiLight );
    // var dirLightW = new DirectionalLight( 0xffffff, 5 );
    // dirLightW.position.set( 2.25, 4.55, -0.25 );
    // dirLightW.name = "";
    // this.add( dirLightW );
    var dirLight = new DirectionalLight( 0xffffff, 1 );
    dirLight.position.set( -2.25, 10.55, -5.25 );
    // this.add( dirLight );
    // var spotLight = new PointLight(0xffffff, 2, 1);
    // spotLight.position.set( 2.25, 3.55, -2.25 );
    // spotLight.name = 'dirlight';

    // this.add( hemiLight );
    // this.add(spotLight);
  }
}
