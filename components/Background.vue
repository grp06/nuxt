<template>
  <section>
    <div class="webglbg"></div>
  </section>
</template>
<style>
  .webglbg {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -3;
    opacity: 1;
  }
</style>

<script>
import {WebGLRenderer, OrthographicCamera, PlaneBufferGeometry, PlaneGeometry, Vector3, Object3D, CubicBezierCurve3, Scene, TextureLoader, RepeatWrapping, ClampToEdgeWrapping, Mesh, MeshBasicMaterial, Vector2, ShaderMaterial} from 'three'
import ScreenQuad from '../assets/js/utils/screenquad'
import anime from 'animejs'
import { resolve } from 'q';

export default {
  mounted() {
    //self.start()
  },
  methods: {
    start(self) {
      self.webpPng = window.webpSupport ? 'webp' : 'png'
      self.webpJpg = window.webpSupport ? 'webp' : 'jpg'
      self.resolutionPfx = window.innerWidth < 540 ? 'xs_' : ''
      var dispMesh = (dispimg, texture, texture2, texturebg, texturehover, basebg, basehv) => {
        var mesh = new ScreenQuad({
          width: 1,
          height: 1,
          top: 0,
          left: 0,
          texture: texture2,
          texturebg: texturebg,
          texturehover: texturehover,
          fragmentShader: self.fragment,
          geo: new PlaneBufferGeometry(window.innerWidth, window.innerHeight, 1)
        });
        mesh.setScreenSize( window.innerWidth , window.innerHeight );
        mesh.material.transparent = true
        mesh.material.opacity = 1.0
        mesh.material.uniforms.uTexture.value.needsUpdate = true;
        mesh.material.uniforms.texturebg.value = texturebg;
        mesh.material.uniforms.texturehover.value = texturehover;
        mesh.material.uniforms.texture.value = texture2;
        mesh.material.uniforms.texture.value.center.x = 0.5;
        mesh.material.uniforms.texture.value.needsUpdate = true;
        mesh.material.uniforms.texturebg.value.needsUpdate = true;
        mesh.material.uniforms.texturehover.value.needsUpdate = true;

        mesh.material.uniforms.baseT.value = texture;
        mesh.material.uniforms.baseBg.value = basebg;
        mesh.material.uniforms.baseHv.value = basehv;

        mesh.material.uniforms.disp.value = dispimg;
        mesh.material.uniforms.texture.value.wrapS = mesh.material.uniforms.texture.value.wrapT = ClampToEdgeWrapping;
        mesh.material.uniforms.baseT.value.wrapS = mesh.material.uniforms.baseT.value.wrapT = ClampToEdgeWrapping;
        mesh.material.uniforms.disp.value.wrapS = mesh.material.uniforms.disp.value.wrapT = ClampToEdgeWrapping;
        mesh.material.uniforms.texturebg.value.wrapS = mesh.material.uniforms.texturebg.value.wrapT = ClampToEdgeWrapping;
        mesh.material.uniforms.texturehover.value.wrapS = mesh.material.uniforms.texturehover.value.wrapT = ClampToEdgeWrapping;

        mesh.material.uniforms.dispFactor.value = 0.0;

        const image = texture2.image;
        mesh.material.uniforms.imageResolution.value = {
          x:image.width,
          y:image.height
        }
        mesh.material.uniforms.resolution.value = {
          x:window.innerWidth,
          y:window.innerHeight
        }
        return mesh
      }
      var dispMeshSimple = (texturebg, texturehover) => {
        var mesh = new ScreenQuad({
          width: 1,
          height: 1,
          top: 0,
          left: 0,
          texturebg: texturebg,
          texturehover: texturehover,
          fragmentShader: self.fragmentSimple,
          geo: new PlaneBufferGeometry(window.innerWidth, window.innerHeight, 1)
        });
        mesh.material.transparent = true
        mesh.material.opacity = 1.0
        mesh.material.uniforms.texturebg.value = texturebg;
        mesh.material.uniforms.texturehover.value = texturehover;
        mesh.material.uniforms.texturebg.value.needsUpdate = true;
        mesh.material.uniforms.texturehover.value.needsUpdate = true;

        mesh.material.uniforms.texturebg.value.wrapS = mesh.material.uniforms.texturebg.value.wrapT = ClampToEdgeWrapping;
        mesh.material.uniforms.texturehover.value.wrapS = mesh.material.uniforms.texturehover.value.wrapT = ClampToEdgeWrapping;

        const image = texturebg.image;
        mesh.material.uniforms.imageResolution.value = {
          x:image.width,
          y:image.height
        }
        mesh.material.uniforms.resolution.value = {
          x:window.innerWidth,
          y:window.innerHeight
        }
        return mesh
      }

      return new Promise ((resolve, reject) => {
        self.fragment = `
          uniform float alpha;
          uniform vec2 imageResolution;
          uniform vec2 resolution;
          uniform vec2 parallax;
          uniform float repeatNb;
          uniform sampler2D texture;
          uniform sampler2D texturebg;
          uniform sampler2D texturehover;

          uniform sampler2D baseT;
          uniform sampler2D baseBg;
          uniform sampler2D baseHv;

          varying vec3 vNormal;
          varying vec2 vUv;
          uniform float dispFactor;
          uniform sampler2D disp;
          uniform float angle;
          mat2 rot(float angle) {
            float s = sin(angle);
            float c = cos(angle);
            return mat2(c, -s, s, c);
          }


          uniform float scale; // = 4.0
          uniform float smoothness; // = 0.01

          uniform float seed; // = 24.9898

          float random(vec2 co)
          {
              highp float a = seed;
              highp float b = 78.233;
              highp float c = 43758.5453;
              highp float dt= dot(co.xy ,vec2(a,b));
              highp float sn= mod(dt,3.14);
              return fract(sin(sn) * c);
          }

          float noise (in vec2 st) {
              vec2 i = floor(st);
              vec2 f = fract(st);

              // Four corners in 2D of a tile
              float a = random(i);
              float b = random(i + vec2(1.0, 0.0));
              float c = random(i + vec2(0.0, 1.0));
              float d = random(i + vec2(1.0, 1.0));

              // Smooth Interpolation

              // Cubic Hermine Curve.  Same as SmoothStep()
              vec2 u = f*f*(3.0-2.0*f);
              // u = smoothstep(0.,1.,f);

              // Mix 4 coorners porcentages
              return mix(a, b, u.x) +
                      (c - a)* u.y * (1.0 - u.x) +
                      (d - b) * u.x * u.y;
          }

          vec4 transition (vec4 text, vec4 text2) {
            vec4 from = text;
            vec4 to = text2;
            float n = noise(vUv * scale);
            
            float p = mix(-smoothness, 1.0 + smoothness, dispFactor);
            float lower = p - smoothness;
            float higher = p + smoothness;
            
            float q = smoothstep(lower, higher, n);
            
            // return mix(
            //   from,
            //   to,
            //   1.0 - q
            // );
            return mix(
              from,
              to,
              1.0 - q
            );
          }

          void main() {
            vec2 ratio = vec2(
              min((resolution.x / resolution.y) / (imageResolution.x / imageResolution.y), 1.0),
              min((resolution.y / resolution.x) / (imageResolution.y / imageResolution.x), 1.0)
            );

            vec2 uv = vec2(
              vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
              vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
            );

            vec2 ratioBg = vec2(
              min((resolution.x / resolution.y) / (imageResolution.x / imageResolution.y), 1.0) * 0.95,
              1.0
            );

            vec2 uvBg = vec2(
              vUv.x * ratioBg.x + (1.0 - ratioBg.x) * 0.5,
              vUv.y * ratioBg.y + (1.0 - ratioBg.y) * 0.5
            );
            vec2 uvBgP = vec2(
              vUv.x * ratioBg.x + parallax.x + (1.0 - ratioBg.x) * 0.5,
              vUv.y * ratioBg.y + (1.0 - ratioBg.y) * 0.5
            );

            vec3 c;
            vec3 b;

            vec4 Bc = texture2D(baseT, uv);
            vec4 Bb = texture2D(baseBg, uvBg);
            vec4 Ba = texture2D(baseHv, uvBgP);
            b = Ba.rgb * Ba.a + Bc.rgb * Bc.a + Bb.rgb * Bb.a * (1.0 - Ba.a - Bc.a);  // blending equation

            vec4 Cc = texture2D(texture, uv);
            vec4 Cb = texture2D(texturebg, uvBg);
            vec4 Ca = texture2D(texturehover, uvBgP);
            c = Ca.rgb * Ca.a + Cc.rgb * Cc.a + Cb.rgb * Cb.a * (1.0 - Ca.a - Cc.a);  // blending equation


            vec4 _texture1 = vec4(b, 1.0);
            vec4 _texture2 = vec4(c, 1.0);
            gl_FragColor = transition(_texture1, _texture2);
            if(transition(_texture1, _texture2).a - 0.1 < 0.0) {
                gl_FragColor.a = 0.0;
            } else {
              gl_FragColor.a = alpha;
            }
          }`
        self.fragmentSimple = `
          uniform float alpha;
          uniform vec2 imageResolution;
          uniform vec2 resolution;
          uniform vec2 parallax;
          uniform float repeatNb;
          uniform sampler2D texturebg;
          uniform sampler2D texturehover;

          varying vec3 vNormal;
          varying vec2 vUv;

          uniform float dispFactor;
          uniform sampler2D disp;

          void main() {
            vec2 ratioBg = vec2(
              min((resolution.x / resolution.y) / (imageResolution.x / imageResolution.y), 1.0) * 0.9,
              1.0
            );
            vec2 uvB = vec2(
              vUv.x * ratioBg.x + (1.0 - ratioBg.x) * 0.5,
              vUv.y * ratioBg.y + (1.0 - ratioBg.y) * 0.5
            );
            vec2 uvBg = vec2(
              vUv.x * ratioBg.x + parallax.x + (1.0 - ratioBg.x) * 0.5,
              vUv.y * ratioBg.y + (1.0 - ratioBg.y) * 0.5
            );

            vec3 b;

            vec4 Bb = texture2D(texturebg, uvB);
            vec4 Ba = texture2D(texturehover, uvBg);
            b = Ba.rgb * Ba.a + Bb.rgb * Bb.a * (1.0 - Ba.a);  // blending equation

            gl_FragColor = vec4(b, 1.0);
            gl_FragColor.a = alpha;
          }`
        self.$root.bg = {
          scene: new Scene(),
          renderer: new WebGLRenderer({
            alpha: true,
            antialias: false,
            autoClear: false
          }),
          camera: new OrthographicCamera(
              window.innerWidth / -2,
              window.innerWidth / 2,
              window.innerHeight / 2,
              window.innerHeight / -2,
              1,
              1000
            )
        }
       
        self.$container = document.getElementsByClassName('webglbg')[0];
        self.$root.bg.renderer.setSize(
          self.$container.clientWidth,
          self.$container.clientHeight
        );
        self.$root.bg.renderer.setPixelRatio(1.5);

        
        self.$root.bg.camera.position.z = 1;

        self.$root.bg.camera.lookAt( new Vector3() )
        new TextureLoader().load("img/textu_w." + self.webpPng, texture => {
          self.screenQuad = new ScreenQuad({
            width: 1.5,
            height: 2.5,
            top: -1,
            left: -0.25,
            texture: texture,
            geo: new PlaneGeometry(window.innerWidth, window.innerHeight, 1, 100)
          });
          self.screenQuad.geometry.verticesNeedUpdate = true;
          self.screenQuad.material.uniforms.uTexture.value.needsUpdate = true;
          self.screenQuad.material.uniforms.rot.value = -Math.PI / 16;
          self.screenQuad.material.transparent = true
          self.screenQuad.material.opacity = 1.0
          self.screenQuad.renderOrder = 999;
          //self.screenQuad.onBeforeRender = () => { self.$root.bg.renderer.clearDepth(); };
          self.screenQuad.material.uniforms.uTexture.value.wrapS = self.screenQuad.material.uniforms.uTexture.value.wrapT = RepeatWrapping;

          self.$root.bg.screencanvas = self.screenQuad
          new TextureLoader().load("img/transp." + self.webpPng, textureW => {
            self.$root.$emit('updateProgress', {value: 30})
            this.initPhone(self)
            new TextureLoader().load("img/bg_top." + self.webpJpg, bgBefore => {
            new TextureLoader().load("img/" + self.resolutionPfx + "hover_top." + self.webpPng, hoverBefore => {
            self.$root.$emit('updateProgress', {value: 51})
            new TextureLoader().load("img/" + self.resolutionPfx + "before." + self.webpPng, before => {
              self.$root.$emit('updateProgress', {value: 62})
              new TextureLoader().load("img/transp." + self.webpPng, texture2 => {
                new TextureLoader().load("img/bg_bottom." + self.webpJpg, bgAfter => {
                  self.$root.$emit('updateProgress', {value: 73})
                  new TextureLoader().load("img/" + self.resolutionPfx + "hover_bottom." + self.webpPng, hoverAfter => {
                    new TextureLoader().load("img/" + self.resolutionPfx + "after." + self.webpPng, after => {
                      self.$root.$emit('updateProgress', {value: 81})
                      self.screenQuadO = dispMesh(texture2, textureW, before, bgBefore, hoverBefore, bgBefore, hoverBefore)
                      self.screenQuad2 = dispMesh(texture2, before, after, bgBefore, hoverBefore, bgBefore, hoverBefore)
                      self.screenQuad2.position.y = window.innerHeight
                      // self.screenQuadO.material.uniforms.rot.value = Math.PI / 0.3
                      self.$root.bg.screencanvasO = self.screenQuadO
                      self.$root.bg.screencanvas2 = self.screenQuad2
                      self.$root.bg.screencanvasO.material.uniforms.alpha.value = 0.0
                      self.$root.bg.screencanvas2.material.uniforms.alpha.value = 0.0
                      self.$root.bg.screencanvas.material.uniforms.alpha.value = 0.0
                      self.$root.bg.scene.add(self.screenQuadO);
                      self.$root.bg.scene.add(self.screenQuad2);
                      self.$root.bg.scene.add(self.screenQuad);
                      document.querySelector('.webglbg').appendChild(self.$root.bg.renderer.domElement)
                      self.render(self)
                      resolve()
                      anime({
                        targets: self.$root.bg.screencanvas.material.uniforms.alpha,
                        value: [0, 1],
                        duration: 1300,
                        easing: 'easeOutSine',
                        changeBegin: (anim) => {
                          self.bgReqOn = true
                        },
                        changeComplete: (anim) => {
                          self.bgReqOn = false
                        },
                        complete: () => {
                          self.$root.bg.screencanvasO.material.uniforms.alpha.value = 1.0
                          document.querySelector('.bgo').style.opacity = 0
                        }
                      })
                    })
                    self.screenQuadB = dispMeshSimple(bgAfter, hoverAfter)
                    self.screenQuadB.material.uniforms.rot.value = -Math.PI / 16;
                    self.screenQuadB.material.transparent = true
                    self.screenQuadB.material.opacity = 1.0
                    self.screenQuadB.renderOrder = 999;
                    self.screenQuadB.material.uniforms.repeatNb.value = 1.0
                    self.screenQuadB.material.uniforms.cover.value = 1.0
                    self.screenQuadB.material.uniforms.alpha.value = 0.0
                    self.screenQuadB.material.uniforms.imageResolution.value = {
                      x:bgAfter.image.width,
                      y:1416
                    }
                    //self.screenQuadB.onBeforeRender = () => { self.$root.bg.renderer.clearDepth(); };
                    self.screenQuadB.material.uniforms.resolution.value = {
                      x:window.innerWidth,
                      y:window.innerHeight
                    }
                    self.$root.bg.screencanvasB = self.screenQuadB
                    self.$root.bg.scene.add(self.screenQuadB);
                })
                })
              })
            })
            })
            })
          })
        })
      })
    },
    initPhone(self) {
      new TextureLoader().load("img/transp." + self.webpPng, disp => {
      new TextureLoader().load("img/xs." + self.webpPng, phone => {
        document.querySelector('.webglphone').style.height = document.querySelector('.webglphone').clientWidth  * 0.7002 + 'px'
        document.querySelector('.phonectnr').style.height = document.querySelector('.webglphone').clientWidth  * 0.7002 + 'px'

        var width = document.querySelector('.webglphone').clientWidth
        var height = document.querySelector('.webglphone').clientHeight
        var pgHeight = 8
        self.$root.hover = {
          scene: new Scene(),
          renderer: new WebGLRenderer({
            alpha: true,
            antialias: true,
            autoClear: false
          }),
          camera: new OrthographicCamera(
              width / -2,
              width / 2,
              height / 2,
              height / -2,
              1,
              1000
            )
        }
        self.$root.hoverpg = {
          scene: new Scene(),
          renderer: new WebGLRenderer({
            alpha: true,
            antialias: false,
            autoClear: false
          }),
          camera: new OrthographicCamera(
              window.innerWidth / -2,
              window.innerWidth / 2,
              pgHeight / 2,
              pgHeight / -2,
              1,
              1000
            )
        }
        self.$root.hover.renderer.setPixelRatio(1.5);
        self.$root.hover.camera.position.z = 1;
        self.$root.hover.camera.lookAt( new Vector3() )
        self.$root.hoverpg.renderer.setSize(window.innerWidth,pgHeight);
        self.$root.hoverpg.renderer.setPixelRatio(1.5);
        self.$root.hoverpg.camera.position.z = 1;
        self.$root.hoverpg.camera.lookAt( new Vector3() )

        self.$root.hover.renderer.setSize(width,height);
        //self.phoneMesh = new Mesh(new PlaneBufferGeometry(width, height, 1), new MeshBasicMaterial({ map: phone }))
        self.phoneMesh = new Mesh(new PlaneBufferGeometry(width, height, 1), new ShaderMaterial({
          uniforms:{
            rot:{
              type:'f',
              value:0.0
            },
            uKd: {
                type: "f",
                value: 0.9
            },
            texture: { type: "t", value: phone},
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
            alpha: {
                type: "f",
                value: 1.0
            },
            dispFactor: {
                type: 'f',
                value: 1.0
            },
            angle: {
                type: 'f',
                value: Math.PI / 4
            },
            disp: {
                type: 't',
                value: disp
            },
            parallax: {
              type: 'v2',
              value: new Vector2(1, 1),
            },
          },
          vertexShader: `
          varying vec2 vUv;
          void main(){
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

          }
          `,
          fragmentShader:`
            uniform float alpha;
            uniform vec2 imageResolution;
            uniform vec2 resolution;
            uniform vec2 parallax;
            uniform float repeatNb;
            uniform sampler2D texture;
            varying vec3 vNormal;
            varying vec2 vUv;
            uniform float dispFactor;
            uniform sampler2D disp;
            uniform float angle;
            mat2 rot(float angle) {
              float s = sin(angle);
              float c = cos(angle);
              return mat2(c, -s, s, c);
            }
            uniform float scale; // = 4.0
            uniform float smoothness; // = 0.01
            uniform float seed; // = 12.9898

            // http://byteblacksmith.com/improvements-to-the-canonical-one-liner-glsl-rand-for-opengl-es-2-0/
            float random(vec2 co)
            {
                highp float a = seed;
                highp float b = 78.233;
                highp float c = 43758.5453;
                highp float dt= dot(co.xy ,vec2(a,b));
                highp float sn= mod(dt,3.14);
                return fract(sin(sn) * c);
            }

            // 2D Noise based on Morgan McGuire @morgan3d
            // https://www.shadertoy.com/view/4dS3Wd
            float noise (in vec2 st) {
                vec2 i = floor(st);
                vec2 f = fract(st);

                // Four corners in 2D of a tile
                float a = random(i);
                float b = random(i + vec2(1.0, 0.0));
                float c = random(i + vec2(0.0, 1.0));
                float d = random(i + vec2(1.0, 1.0));

                // Smooth Interpolation

                // Cubic Hermine Curve.  Same as SmoothStep()
                vec2 u = f*f*(3.0-2.0*f);
                // u = smoothstep(0.,1.,f);

                // Mix 4 coorners porcentages
                return mix(a, b, u.x) +
                        (c - a)* u.y * (1.0 - u.x) +
                        (d - b) * u.x * u.y;
            }

              vec4 transition (vec2 uv) {
                vec4 from = texture2D(texture, vUv);
                vec4 to = texture2D(disp, vUv);
                float n = noise(uv * scale);
                
                float p = mix(-smoothness, 1.0 + smoothness, dispFactor);
                float lower = p - smoothness;
                float higher = p + smoothness;
                
                float q = smoothstep(lower, higher, n);
                
                // return mix(
                //   from,
                //   to,
                //   1.0 - q
                // );
                return mix(
                  from,
                  to,
                  1.0 - q
                );
              }
              void main() {
                vec3 b;

                //vec4 disp = texture2D(disp, vUv);
                // vec2 dispVec = vec2(disp.r, disp.g);
                // vec2 distortedPosition1 = vUv + rot(2.7854) * dispVec * 0.08 * dispFactor;

                gl_FragColor = transition(vUv);
                 if(transition(vUv).a - 0.9 < 0.0) {
                  gl_FragColor.a = 0.0;
                } else {
                  gl_FragColor.a = alpha;
                }
              }`
          })
        )
        
        //self.phoneMesh.material.uniforms.texture.value.needsUpdate = true;
        self.phoneMesh.material.uniforms.alpha.value = 0.0;
        self.phoneMesh.material.uniforms.dispFactor.value = 1.0;
        self.phoneMesh.material.transparent = true
        self.phoneMesh.material.opacity = 1.0
        self.$root.hover.scene.add(self.phoneMesh)
        self.$root.hover.phone = self.phoneMesh
        new TextureLoader().load("img/text_w_xs." + self.webpPng, text => {
          let mesh = new Mesh(new PlaneBufferGeometry(window.innerWidth * 2, 8, 1), new MeshBasicMaterial({ map: text }))
          mesh.material.transparent = true
          mesh.material.opacity = 1.0
          self.$root.hover.progress = mesh
          self.$root.hover.progress.scale.x = 0.00001
          self.$root.hover.progress.renderOrder = 9999;
          var pivot = new Object3D();
          pivot.position.x = -window.innerWidth / 2
          pivot.add(self.$root.hover.progress);
          self.$root.hoverpg.scene.add(pivot)
        })
        // new TextureLoader().load("img/screenshot2p." + self.webpPng, phone => {
        //   let mesh = new Mesh(new PlaneBufferGeometry(width, height, 1), new MeshBasicMaterial({ map: phone }))
        //   mesh.material.transparent = true
        //   mesh.material.opacity = 0.0
        //   self.$root.hover.scrsht2 = mesh
        //   self.$root.hover.scene.add(self.$root.hover.scrsht2)
        //   new TextureLoader().load("img/screenshot3p." + self.webpPng, phone => {
        //     let mesh = new Mesh(new PlaneBufferGeometry(width, height, 1), new MeshBasicMaterial({ map: phone }))
        //     mesh.material.transparent = true
        //     mesh.material.opacity = 0.0
        //     self.$root.hover.scrsht3 = mesh
        //     self.$root.hover.scene.add(self.$root.hover.scrsht3)
        //   })
        // })
        self.$root.hoverpg.renderer.domElement.style.position = 'fixed'
        self.$root.hoverpg.renderer.domElement.style.top = '0'
        self.$root.hoverpg.renderer.domElement.style.left = '0'
        document.querySelector('.webgl').appendChild(self.$root.hoverpg.renderer.domElement)
        document.querySelector('.webglphone').appendChild(self.$root.hover.renderer.domElement)
      })
      })
    },
    event_assign() {
    },
    render(self) {
      self.$root.bg.renderer.render(self.$root.bg.scene, self.$root.bg.camera)
    },
    resize() {
    }
  }
}
</script>
