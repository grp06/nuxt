<template>
  <section>
    <div class="lodr">0%</div>
    <svg version="1.1" id="slogo" x="0px" y="0px"
    width="207px" height="84px" viewBox="0 0 207 84" enable-background="new 0 0 207 84" xml:space="preserve">
      <g id="uy">
        <path d="M80.399,31.601c0-2.1,1.8-3.9,4.2-3.9s4.2,1.8,4.2,3.9V54.4c0,2.1-1.8,3.899-4.2,3.899c-3,0-4.2-3-4.2-3h-0.6
          c0,0-2.4,3.6-7.5,3.6c-6,0-11.099-5.1-11.099-12.6V31.601c0-2.1,1.8-3.9,4.2-3.9s4.2,1.8,4.2,3.9V46.3c0,3,2.4,5.4,5.4,5.4
          c3,0,5.4-2.4,5.4-5.4V31.601z"/>
        <path d="M104.999,55l-10.8-20.399c0,0-0.9-1.5-0.9-3c0-2.1,1.8-3.9,4.2-3.9s3.24,0.96,4.5,3.3l7.2,13.2h0.6l5.7-12.899
          c0.9-2.04,2.4-3.6,4.5-3.6c2.4,0,4.2,1.8,4.2,3.9c0,1.2-0.9,3-0.9,3l-14.7,32.999c-0.9,2.1-2.4,3.6-4.5,3.6
          c-2.4,0-4.2-1.8-4.2-3.899c0-1.2,0.9-3,0.9-3L104.999,55z"/>
      </g>
      <g>
        <path id="v" d="M60.449,55.3L49.65,25.901c0,0-1.2-3-1.2-4.5c0-2.4,2.1-4.5,4.8-4.5c2.7,0,4.14,1.5,5.1,4.2l9,25.799h0.6l9-25.799
          c0.96-2.7,2.4-4.2,5.1-4.2c2.7,0,4.8,2.1,4.8,4.5c0,1.5-1.2,4.5-1.2,4.5L74.849,55.3c-1.2,3.3-3.3,5.4-7.199,5.4
          C63.75,60.7,61.649,58.6,60.449,55.3z"/>
        <path id="i" d="M91.649,20.501c0-2.4,1.8-4.2,4.5-4.2c2.7,0,4.5,1.8,4.5,4.2s-1.86,4.2-4.5,4.2C93.45,24.701,91.649,22.901,91.649,20.501z
          M100.349,55.9c0,2.1-1.8,3.899-4.2,3.899s-4.2-1.8-4.2-3.899V33.101c0-2.1,1.8-3.9,4.2-3.9s4.2,1.8,4.2,3.9V55.9z"/>
        <g id="be">
          <path d="M107.849,20.802c0-2.1,1.8-3.9,4.2-3.9s4.2,1.8,4.2,3.9v11.399h0.6c0,0,2.4-3.6,7.5-3.6c6.3,0,11.7,5.1,11.7,12.9v6
            c0,6.9-6,12.899-14.1,12.899s-14.1-6-14.1-12.899V20.802z M116.249,41.501v6c0,3.3,2.4,5.7,5.7,5.7s5.7-2.4,5.7-5.7v-6
            c0-3.3-2.4-5.7-5.7-5.7S116.249,38.201,116.249,41.501z"/>
          <path d="M169.647,43.601c0,2.1-1.8,3.9-4.2,3.9h-15.599c0,3.3,2.4,5.7,6,5.7c5.4,0,6-2.7,9-2.7c2.1,0,3.6,1.5,3.6,3.3
            c0,2.7-3.9,6.6-12.6,6.6c-8.399,0-14.399-6-14.399-12.899v-6c0-6.9,6-12.9,14.1-12.9s14.1,6,14.1,12.9V43.601z M161.248,41.201
            c0-3-2.4-5.4-5.7-5.4s-5.7,2.4-5.7,5.4H161.248z"/>
        </g>
      </g>
    </svg>

    <background></background>
    <dom></dom>
  </section>
</template>
<style>
.lodr {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 3;
  font-size: 100px;
  transform: translate3d(-50%, -50%, 0);
  line-height: 100px;
  font-weight: 900;
  user-select: none;
  pointer-events: none;
}

#slogo {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateZ(0) translateX(-51%) translateY(-50%);
  width: 141px;
  top: 85px;
}
.mt0 {
  margin-top: 0;
  margin-bottom: 0;
}
@media (max-width: 540px) {
  #slogo {
    top: 47px;
    margin-left: 0;
  }
  .mt0 {
    margin-top: 0;
    margin-bottom: 14px;
  }
}
#i {
  transform-origin: center;
}
#uy {
  opacity: 0;
  transform: translateY(1.7%);
}
</style>

<script>
  // import inView from 'in-view';
  import {Scene, PerspectiveCamera, Vector3, WebGLRenderer, Color} from 'three'
  import 'whatwg-fetch'
  import Background from '~/components/Background.vue'
  import Dom from '~/components/Dom.vue'
  import CityScene from '~/assets/js/scene.js';
  import VirtualScroll from 'virtual-scroll'
  import anime from 'animejs'
  export default {
    components: {
      Dom,
      Background
    },
    // =============================================================================
    // data
    // =============================================================================
    data() {

      // three.js
      const three = {
        $container: null,
        renderer: null,
        scene: null,
        camera: null,
        object: [],
      };

      // 設定
      const setting = {
        three: {},
      };

      // three.js
      setting.three = {

        // scene
        scene: {
        },

        // camera
        camera: {
          aspect: 0,
          fov: 40,
          position: {
            x: 0.15,
            y: .5,
            z: -100,
          },
          lookAt: {
            x: 0,
            y: 95,
            z: 0,
          },
        },

        // renderer
        renderer: {
          width: 0,
          height: 0,
          alpha: true, // <canvas>を透過にする
          antialias: true, // アンチエイリアス
          shadowMap: {
            enabled: false,
          },
        },

        // object
        object: {
        },

        // render
        render: {
          fps: 30, // FPS
        },
      };

      return {
        three,
        setting,
      };

    },

    // =============================================================================
    // mounted
    // =============================================================================
    mounted() {
     function testWebP() {
          return new Promise(res => {
              const webP = new Image();
              webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
              webP.onload = webP.onerror = function () {
                  res(webP.height === 2);
              };
          })
      };

      testWebP().then(hasWebP => window.webpSupport = hasWebP);

      this.storedHeight = window.innerHeight
      this.storedWidth = window.innerWidth
      this.responsiveTL = window.innerWidth < 540 ? (1920 / window.innerWidth) : 1
      this.setting.three.camera.position.z = -100 - (this.responsiveTL * 15)

      this.postData = (url = '', email) => {
        // Default options are marked with *
        return
      }


      this.cityScene = new CityScene()
      this.init();
       this.$root.$on('updateProgress', filter => {
        let ldr = document.querySelector('.lodr')
        var progrs = {
          val: parseInt(ldr.innerHTML.replace('%', ''))
        }
        anime({
          targets: progrs,
          val: filter.value,
          duration: 600,
          round: 1,
          easing: 'cubicBezier(.25, 1, .25, 1)',
          update: () => {
            ldr.innerHTML = progrs.val + '%'
          },
          complete: () => {
            if (filter.value == 100) {
              anime({
                targets: '.lodr',
                opacity: 0,
                duration: 300,
                easing: 'easeInOutSine'
              })
              this.anilPLoad()
              this.animPL.play()
              this.animLoad()
            }
          }
        })
       })
      this.cityScene.init(this.three.camera, this.three.scene).then(() => {
        if(!window.webpSupport) {
            document.querySelector('.ctct').style.backgroundImage = "url('/img/text_w.png')";
            document.querySelectorAll('.wtsubmit').forEach(el => {
              el.style.backgroundImage = "url('/img/webgl_text_blk.png')";
            })
            document.querySelector('.tblbg').style.backgroundImage = "url('/img/textu_w.png')";
            // document.querySelector('.ctctbtn').style.backgroundImage = "url('/img/text_w.png')";
        }
        this.$root.$emit('updateProgress', {value: 14})
        this.view()
      })
    },

    // =============================================================================
    // methods
    // =============================================================================
    methods: {

      // init
      init() {
        window.blockScroll = true
        this.scrollY = 0
        this.scrollX = 0
        this.percentage = 0
        this.intensityParallax = 30
        this.uDirLightOffset = {
          x: 0,
          smoothX: 0,
          y: 0,
          smoothY: 0
        }
        this.rotOffset = {
          x: 0,
          smoothX: 0,
          y: 0,
          smoothY: 0
        }
        this.maxHDom = document.querySelector('.v')
        this.isInViewport = (e, {top:t, height:h} = e.getBoundingClientRect()) => t <= innerHeight && t + h >= 0;

        this.smoothScroll = [
          {
            target: document.querySelector('.v'),
            threshold: .14,
            coef: 0.5,
            pos: false,
            smoothY: 0
          }
        ]
        this.scrollInstance = new VirtualScroll({
          el:document.querySelector('.v'),
          limitInertia: true,
          passive: true,
          preventTouch: true,
          touchMultiplier: 5.5
        })
        this.eventScroll = (e) => {
          this.$root.$emit('scroll')
          // this.scrollY = -e.y
          this.animToScrollY(e)
        }
        this.scrollInstance.on(this.eventScroll)

        this.initInviews()
        document.querySelectorAll('.s').forEach(el => {
          el.style.height = window.innerHeight + 'px'
          el.style['max-height'] = window.innerHeight + 'px'
        })
        // DOM
        this.three.$container = document.getElementsByClassName('webgl')[0];
        this.setting.three.renderer.width = this.three.$container.clientWidth;
        this.setting.three.renderer.height = this.three.$container.clientHeight;
        // scene
        this.three.scene = new Scene();
        this.three.camera = new PerspectiveCamera(
          this.setting.three.camera.fov,
          this.setting.three.camera.aspect
        );
        this.three.camera.aspect = this.setting.three.renderer.width / this.setting.three.renderer.height;
        this.three.camera.updateProjectionMatrix();

        // renderer
        this.three.renderer = new WebGLRenderer({
          alpha: this.setting.three.renderer.alpha,
          antialias: this.setting.three.renderer.antialias,
        });
        this.three.renderer.setSize(
          this.setting.three.renderer.width,
          this.setting.three.renderer.height
        );
        this.three.renderer.setPixelRatio(1.5);
        this.three.renderer.shadowMap.enabled = this.setting.three.renderer.shadowMap.enabled;
        // this.three.renderer.gammaInput = this.setting.three.renderer.gammaInput;
        // this.three.renderer.gammaOutput = true;
        // this.three.renderer.gammaFactor = 2.2

        this.three.$container.appendChild(this.three.renderer.domElement);
        this.maxH = (this.maxHDom.clientHeight || this.maxHDom.offsetHeight)
        this.event_assign()
      },

      // view（画面の構築）
      view() {
        Background.methods.start(this).then(() => {
          setTimeout(() => {
            this.$root.$emit('updateProgress', {value: 100})
          }, 200);
        })
      },
      initSceneMatrix() {
        this.three.scene.children[0].rotation.set(
          -0.6,
          -0.7,
          0
        )
        this.three.scene.children[0].position.z = 14
        this.three.scene.children[0].rotation.x = -0.6
        this.three.scene.children[0].rotation.y = -1.25

        this.three.camera.position.set(
          this.setting.three.camera.position.x,
          this.setting.three.camera.position.y,
          this.setting.three.camera.position.z
        );
        this.three.camera.lookAt(
          new Vector3(
            this.setting.three.camera.lookAt.x,
            this.setting.three.camera.lookAt.y,
            this.setting.three.camera.lookAt.z,
          )
        );
      },
      animateInview(elR, elOld) {
        var nb = elR.parentNode.getAttribute('pg')
        this.nb = nb
        //document.querySelector('.pgn').innerHTML = nb
        anime({
          targets: this.$root.hover.progress.scale,
          x: ((nb - 1) / 6) + 0.00001,
          duration: 1000,
          easing: 'linear'
        })
        var delay = 200
        // anime({
        //   targets: '.pgn',
        //   opacity: [0, 1],
        //   duration: 400,
        //   translateY: [4, 0],
        //   easing: 'cubicBezier(.25, 1, .25, 1)'
        // })
        anime({
          targets: elR,
          opacity: [0, 1],
          duration: 900,
          delay: 500,
          translateY: [4, 0],
          easing: 'cubicBezier(.25, 1, .25, 1)'
        })
        if (elR.parentNode.classList.contains('tbl') && elOld.parentNode.classList.contains('tbl')) {
         // todo if (window.innerWidth >= 540) {
            anime({
              targets: '.tblbg',
              height: [elOld.parentNode.offsetHeight, elR.parentNode.offsetHeight],
              duration: 400,
              easing: 'cubicBezier(.25, 1, .25, 1)'
            })
          //}
          if (elR.parentNode.querySelector('h2')) {
            this.animateDiscover(elR.parentNode.querySelector('h2'), elR.parentNode.querySelector('h2'), 400, 300, 'cubicBezier(.25, 1, .25, 1)').play()
          }
        } else if (elR.parentNode.classList.contains('tbl') && !elOld.parentNode.classList.contains('tbl')) {
          // todo if (window.innerWidth >= 540) {
           anime({
            targets: '.tblbg',
            opacity: [0, 1],
            height: [elR.parentNode.offsetHeight, elR.parentNode.offsetHeight],
            duration: 500,
            easing: 'easeOutSine'
          })
          //}
          if (elR.parentNode.querySelector('h2')) {
            this.animateDiscover(elR.parentNode.querySelector('h2'), elR.parentNode.querySelector('h2'), 400, 300, 'cubicBezier(.25, 1, .25, 1)').play()
          }
        // todo } else if (!elR.parentNode.classList.contains('tbl') && window.innerWidth >= 540) {
        } else if (!elR.parentNode.classList.contains('tbl')) {
           anime({
            targets: '.tblbg',
            opacity: [1, 0],
            duration: 500,
            easing: 'easeInSine'
          })
        }
      },
      animToScrollY(e, duration) {
        if (e.scrollable && !window.blockScroll) {
          if(document.querySelector('.ctct').getBoundingClientRect().y == 0) {
            this.revertAnim(true)
          }
          if (this.animReveal) {
            this.animReveal.pause()
          }
          if (this.animScroll) {
            this.animScroll.pause()
          }
          window.blockScroll = true
          if (typeof duration === 'undefined') {
            document.querySelectorAll('.rvl').forEach(el => {
              if (this.isInViewport(el)) {
                anime({
                  targets: '.pgn',
                  opacity: [1, 0],
                  duration: 400,
                  delay: 0,
                  translateY: [0, -4],
                  easing: 'cubicBezier(.25, 1, .25, 1)'
                })
                this.animReveal = anime({
                  targets: el,
                  opacity: 0,
                  duration: 200,
                  easing: 'easeInOutSine',
                  complete: () => {
                    document.querySelector('.v').style.transform = 'translate(0,' + (this.smoothScroll[0].pos ? '' : '-') + (-e.y / 2) + 'px)';
                    document.querySelectorAll('.rvl').forEach(elR => {
                      if (this.isInViewport(elR)) {
                        this.animateInview(elR, el)
                      }
                    })
                  }
                })
              }
            })
          } else {
            anime({
              targets: this.$root.hover.progress.scale,
              x: 0.00001,
              duration: duration,
              easing: 'linear'
            })
            anime({
              targets: '.tblbg, .phone',
              opacity: 0,
              duration: 250,
              easing: 'easeInSine'
            })
            document.querySelectorAll('.rvl').forEach(el => {
              if (this.isInViewport(el)) {
                this.animReveal = anime({
                  targets: el,
                  opacity: 0,
                  duration: 250,
                  easing: 'easeInSine'
                })
                this.animReveal = anime({
                  targets: el.parentNode.querySelector('h2:not(.h2lst)'),
                  opacity: 0,
                  duration: 250,
                  easing: 'easeInSine'
                })
              }
            })
          }
          this.animScroll = anime({
            targets: this,
            scrollY: -e.y,
            duration: duration || 1000,
            easing: 'linear',
            update: (pg) => {
              var e = {
                clientX: this.eClientX,
                clientY: this.eClientY
              }
              this.moveMv(e)
            },
            complete: () => {
              if (typeof duration !== 'undefined') {
                document.querySelectorAll('.rvl').forEach(el => {
                  if (this.isInViewport(el)) {
                      this.scrollInstance._event.y = e.y
                      document.querySelector('.v').style.transform = 'translate(0,' + (e.y / 2) + 'px)';
                      document.querySelectorAll('.rvl').forEach(el => {
                        if (this.isInViewport(el)) {
                          window.blockScroll = false
                          anime({
                            targets: el,
                            opacity: 1,
                            duration: 300,
                            easing: 'easeInOutSine',
                            complete: () => {
                            }
                          })
                          // this.animateInview()
                        }
                      })
                    }
                })
              } else {
                if (e.originalEvent && e.originalEvent.type && e.originalEvent.type === 'touchmove') {
                  window.blockScroll = false
                } else {
                  var delay = e.originalEvent && e.originalEvent.type && e.originalEvent.type === 'wheel' ? 600 : 150

                  setTimeout(() => {
                    window.blockScroll = false
                  }, delay);
                }
              }
            }
          })
        }
      },
      animateDiscover(el, rpl, delay, duration, easing) {
        var anim = anime.timeline({autoplay: false, delay: delay, duration: duration})
        if (!el) {
          return
        }
        anim.add({
          targets: el.querySelectorAll('.lt'),
          scale: [0.3, 1],
          opacity: [0,1],
          rotateZ: ['-10deg', '0'],
          rotateY: ['-30deg', '0'],
          translateY: ['-10px', '0'],
          translateX: ['-10px', '0'],
          translateZ: 0,
          easing: easing || "easeInOutExpo",
          delay: function(elt, i) {
            return delay + (duration / el.querySelectorAll(' .lt').length) * (i+1)
          }
        }, 20)
        anim.add({
          targets: el,
          duration: 20,
          opacity: [0,1]
        }, 0  )
        return anim
      },
      anilPLoad() {
        this.bgUpdate = Background.methods.render
        this.animPL = anime.timeline({
          autoplay: false,
          duration: 700,
          easing: 'linear'
        })

        this.animPL.add({
          targets: '#uy',
          opacity: 1,
          duration: 400
        }, 200)
        this.animPL.add({
          targets: '#slogo',
          opacity: 0,
          easing: 'linear',
          duration: 300
        }, 600)
        this.animPL.add({
          targets: '.n h1',
          opacity: 1,
          easing: 'linear',
          duration: 200
        }, 450)
        this.animPL.add({
          targets: '#i',
          opacity: 0,
          duration: 300
        }, 400)
        this.animPL.add({
          targets: '#v',
          translateX: '-14.2%',
          duration: 600
        }, 0)
        this.animPL.add({
          targets: '#be',
          translateX: 21,
          duration: 600
        }, 0)
        this.animPL.add({
          targets: '#i',
          rotate: -28.5,
          translateX: 7,
          translateY: -3,
          duration: 600
        }, 0)
      },
      animLoad() {
        this.animL = anime.timeline({
          autoplay: false,
          duration: 1600,
          easing: 'linear',
          update: this.updateHandler,
          delay: 0,
          complete: () => {
            window.blockScroll = false
          }
        })
        document.querySelectorAll('.s1 h1 span').forEach(el => {
          el.innerHTML = el.innerHTML.replace(/([^\x00-\x80]|\w|,)/g, "<span class='lt'>$&</span>");
        });
        document.querySelectorAll('.tbl h2').forEach(el => {
          el.innerHTML = el.innerHTML.replace(/([^\x00-\x80]|\w|,)/g, "<span class='lt'>$&</span>");
        });
        this.animL2 = this.animateDiscover(document.querySelector('.s1 h1'), '.s1 h1 span', 300, 900)
        this.animL.add({
          duration: 200,
          targets: this.three.$container,
          opacity: [0, 1]
        }, 0)
        this.animL.play()
        this.animL2.play()
        this.initSceneMatrix()

         this.initMainTL()
            this.render()
            var alpha = {
              val: 0
            }
            var dispFactor = {
              val: 0
            }
            anime({
              duration: 300,
              delay: 0,
              targets: alpha,
              val: 1,
              easing: 'easeInOutSine',
              update: (e) => {
                // this.$root.bg.screencanvasO.material.uniforms.dispFactor.value = parseFloat(alpha.val)
                this.three.scene.children[0].children[0].children[0].material.uniforms.alpha.value = parseFloat(alpha.val)
                this.three.scene.children[0].children[0].children[1].material.uniforms.alpha.value = parseFloat(alpha.val)
                this.three.scene.children[0].children[0].children[2].material.uniforms.alpha.value = parseFloat(alpha.val)
              }
            })
            if (window.innerWidth >= 540) {
              anime({
                duration: 600,
                delay: 1400,
                targets: '.n_b_c',
                translateY: [6, 0],
                opacity: [0, 1],
                easing: 'cubicBezier(.25, 1, .25, 1)'
              })
            }
            anime({
              duration: 600,
              delay: 0,
              targets: this.setting.three.camera.lookAt,
              y: [95, 55],
              easing: 'easeInOutSine',
              complete: () => {
              }
            })

            var textStart = this.three.scene.children[0].children.find(child => child.name == 'TextStart')
            var txSAlph = {
              val: 0
            }
            anime({
              duration: 400,
              easing: 'cubicBezier(.25, 1, .25, 1)',
              targets: txSAlph,
              val:[0,1],
              delay: 400,
              update: (e) => {
                textStart.visible = e.progress < 99 ? true : true
                textStart.material.uniforms.alpha.value = parseFloat(e.progress/100)
              }
            })
            anime({
              duration: 1900,
              delay: 0,
              targets: dispFactor,
              val: [0, 1],
              easing: 'linear',
              update: () => {
                this.three.scene.children[0].children[0].children[0].material.uniforms.dispFactor.value = parseFloat(dispFactor.val)
                this.three.scene.children[0].children[0].children[1].material.uniforms.dispFactor.value = parseFloat(dispFactor.val)
              }
            })
      },
      prevAct() {
        this.tlAnim.add({
          duration: 400,
          easing: 'easeInSine',
          targets: this.setting.three.camera.lookAt,
          y: [55, -50 - (this.responsiveTL * 4)],
          x: [0, -60 + (this.responsiveTL * 3.5)]
        }, 0)
        this.tlAnim.add({
          duration: 400,
          easing: 'easeInOutSine',
          targets: '.n h1',
          translateX: window.innerWidth < 540 ? [window.innerWidth / 2, document.querySelector('.n h1').getBoundingClientRect().width / 2] : [window.innerWidth / 2, 42 + document.querySelector('.n h1').getBoundingClientRect().width / 2],
        }, 0)

        if (window.innerWidth < 540) {
          this.tlAnim.add({
            duration: 200,
            targets: '.n_b_c',
            translateY: [6, 0],
            opacity: [0, 1],
            easing: 'easeInOutSine'
          }, 200)
        }
        this.tlAnim.add({
          duration: 60,
          targets: '.n h1 small',
          opacity: [1, 0],
          easing: 'easeInOutSine'
        }, 0)
        var textStart = this.three.scene.children[0].children.find(child => child.name == 'TextStart')
        var dispF = {
          val: 0,
          anim: false,
          progress: 0
        }
        this.tlAnim.add({
          duration: 400,
          easing: 'easeInOutSine',
          targets: this.$root.bg.screencanvas.position,
          x: [0, -window.innerWidth * 1.1],

          update: (e) => {
            textStart.visible = e.progress > 40 ? false : true
            textStart.material.uniforms.alpha.value = e.progress < 40 ? parseFloat(1 - e.progress/40) : 0.0
            this.$root.bg.screencanvasO.material.uniforms.dispFactor.value = parseFloat(e.progress/100)
            this.$root.bg.screencanvas.geometry.verticesNeedUpdate = true
            if (this.$root.bg.screencanvas.lastPosX && this.$root.bg.screencanvas.lastPosX < this.$root.bg.screencanvas.position.x) {
              this.bendPlaneInvertGeometry(this.$root.bg.screencanvas.geometry, e.progress/300)
            } else {
              this.bendPlaneGeometry(this.$root.bg.screencanvas.geometry, e.progress/300)
            }
            this.$root.bg.screencanvas.lastPosX = this.$root.bg.screencanvas.position.x
          },
          changeBegin: (anim) => {

            this.$root.bg.screencanvas2.material.uniforms.alpha.value = parseFloat(0.0)
            this.bgReqOn = true
          },
          changeComplete: (anim) => {
            this.bgReqOn = false
          }
        }, 0)

        this.tlAnim.add({
          duration: 400,
          easing: 'cubicBezier(.25, 1, .25, 1)',
          targets: dispF,
          val: [0, 1],

          changeBegin: (anim) => {
            this.$root.bg.screencanvas2.material.uniforms.alpha.value = parseFloat(1.0)
            this.bgReqOn = true
          },
          changeComplete: (anim) => {
            this.$root.bg.screencanvasB.material.uniforms.alpha.value = parseFloat(1.0)
            this.bgReqOn = false

          },
          complete: () => {
          },
          update: (e) => {
            this.$root.bg.screencanvas2.material.uniforms.dispFactor.value = parseFloat(e.progress/100)
            if (dispF.progress < e.progress && !dispF.anim) {
              dispF.anim = true
              this.$root.bg.screencanvas2.material.uniforms.alpha.value = parseFloat(0.0)
            } else {
              dispF.anim = e.progress != 100
            }
            if (dispF.progress >= e.progress) {
              if (e.progress == 0) {
                this.$root.bg.screencanvas2.material.uniforms.alpha.value = parseFloat(0.0)
              }
            }
            dispF.progress = e.progress
            if (e.progress != 0 && dispF.anim) {
              this.$root.bg.screencanvas2.material.uniforms.alpha.value = parseFloat(1.0)
            }
          }
        }, 400)
        this.tlAnim.add({
          duration: 400,
          easing: 'easeInOutSine',
          targets: this.$root.bg.screencanvasO.position,
          y: [0, window.innerHeight],

          changeBegin: (anim) => {
            this.bgReqOn = true
          },
          changeComplete: (anim) => {
            this.bgReqOn = false
          }
        }, 800)
        this.tlAnim.add({
          duration: 400,
          easing: 'easeInOutSine',
          targets: this.$root.bg.screencanvas2.position,
          y: [0, window.innerHeight],

        }, 800)
        this.tlAnim.add({
          duration: 400,
          easing: 'easeInOutSine',
          targets: this.$root.bg.screencanvasB.position,
          y: [-window.innerHeight, 0],
          update: (e) => {
            //this.$root.bg.screencanvasB.material.uniforms.dispFactor.value = parseFloat(e.progress/100)
          }
        }, 800)

      },
      firstAct() {
        var firstOffset = 800
        this.tlAnim.add({
          duration: 400,
          easing: 'easeInOutSine',
          targets: this.setting.three.camera.lookAt,
          y: [-50 - (this.responsiveTL * 4), 0 - (this.responsiveTL * 4)],
          x: [-60 + (this.responsiveTL * 3.5), 0]
        }, firstOffset)
        var user1 = this.three.scene.children[0].children[1].children[2]
        var alph = {
          val: 0
        }
        this.tlAnim.add({
          duration: 400,
          easing: 'easeInOutSine',
          targets: alph,
          val: [0, 1],
          update: (e) => {
            if(this.tlAnim.progress < 60) {
              user1.visible = alph.val <= 0.1 ? false : true
              user1.material.opacity = alph.val
            }

          }
        }, firstOffset)
        this.tlAnim.add({
          duration: 400,
          easing: 'easeInOutSine',
          targets: this.three.scene.children[0].position,
          z: -24,
          update: (e) => {
            this.three.scene.children[0].children[0].children[0].material.uniforms.fraction.value = parseFloat(0.15 + (1*(e.progress / 100)))
            this.three.scene.children[0].children[0].children[1].material.uniforms.fraction.value = parseFloat(0.15 + (1*(e.progress / 100)))
          }
        }, firstOffset + 400)

        this.tlAnim.add({
          duration: 400,
          easing: 'easeInOutSine',
          targets: this.three.scene.children[0].rotation,
          z: 0.35,
          x: -0.7,
          y: -1.65
        }, firstOffset)
      },
      phoneAct() {
        var phoneOffset = 800

        this.tlAnim.add({
          duration: 200,
          update: (e) => {
            if(this.tlAnim.progress < 60) {
              this.$root.hover.phone.material.uniforms.dispFactor.value = parseFloat(1 - (e.progress / 100))
            }
          }
        }, phoneOffset)
        this.tlAnim.add({
          duration: 140,
          update: (e) => {
            if(this.tlAnim.progress < 60) {
              this.$root.hover.phone.material.uniforms.alpha.value = parseFloat(e.progress / 100)
            }
          }
        }, phoneOffset)
         this.tlAnim.add({
          duration: 200,
          targets: '.srcsht1',
          opacity: [0,1],
          easing: 'cubicBezier(.25, 1, .25, 1)'
        }, phoneOffset + 200)

        this.tlAnim.add({
          duration: 400,
          targets: '.srcsht2',
          opacity: [0,1],
          easing: 'cubicBezier(.25, 1, .25, 1)'
        }, 1200)

        this.tlAnim.add({
          duration: 400,
          targets: '.srcsht3',
          opacity: [0,1],
          easing: 'cubicBezier(.25, 1, .25, 1)'
        }, 1600)
      },
      secondAct () {
        var secondOffset = 1200
        var user1 = this.three.scene.children[0].children[1].children[1]
        var user4 = this.three.scene.children[0].children[1].children[0]
        var text1 = this.three.scene.children[0].children.find(child => child.name == 'Text')
        var text2 = this.three.scene.children[0].children.find(child => child.name === 'Text3')
        var text1A = {
          value: 0
        }
        var text2A = {
          value: 0
        }
        this.tlAnim.add({
          duration: 160,
          easing: 'linear',
          targets: text1A,
          value: [0, 1],
          update: (e) => {
            text1.visible = text1A.value <= 0.1 ? false : true
            user1.visible = text1A.value <= 0.1 ? false : true
            user4.visible = text1A.value <= 0.1 ? false : true
            user1.material.opacity = text1A.value
            user4.material.opacity = text1A.value
            if (this.tlAnim.progress > 60) {
              this.three.scene.children[0].children[1].children[2].visible = text1A.value <= 0.1 ? false : true
              this.three.scene.children[0].children[1].children[2].material.opacity = 1 - text1A.value
            }
            text1.material.uniforms.alpha.value = parseFloat(text1A.value)
          }
        }, secondOffset + 240)
        this.tlAnim.add({
          duration: 400,
          easing: 'linear',
          targets: text2A,
          value: [0, 1],
          update: (e) => {
            text2.visible = text2A.value == 0.0 ? false : true
            text2.material.uniforms.alpha.value = parseFloat(text2A.value)
          }
        }, secondOffset + 400)
        this.tlAnim.add({
          duration: 172,
          easing: 'linear',
          targets: text1A,
          value: 0,
          update: (e) => {
            text1.visible = text1A.value == 0.0 ? false : true
            text1.material.uniforms.alpha.value = parseFloat(text1A.value)
          }
        }, secondOffset + 400)
        this.tlAnim.add({
          duration: 400,
          easing: 'easeInOutSine',
          targets: this.setting.three.camera.lookAt,
          x: 0,
        }, secondOffset)
         this.tlAnim.add({
          duration: 400,
          easing: 'easeInSine',
          targets: this.three.scene.children[0].position,
          y: 20
        }, secondOffset)
        var alpha = {
          val: 0
        }
        this.tlAnim.add({
          duration: 100,
          targets: alpha,
          val: [0, 1],
          update: () => {
            this.three.scene.children[0].children[2].children[0].visible = alpha.val == 0.0 ? false : true
            this.three.scene.children[0].children[2].children[0].children.forEach(el => {
              el.material.uniforms.alpha.value = parseFloat(alpha.val)
              if (el.material.uniforms.dispFactor) {
                el.material.uniforms.dispFactor.value = parseFloat(alpha.val)
              }
            })
          }
        }, secondOffset + 72)
        this.tlAnim.add({
          duration: 400,
          easing: 'easeInOutSine',
          targets: this.three.scene.children[0].rotation,
          z: -0.3,
          x: -1.14,
          y: 0.1,
        }, secondOffset)
        this.tlAnim.add({
          duration: 60,
          targets: alpha,
          val: [1, 0],
          update: () => {
            this.three.scene.children[0].children[2].children[0].visible = alpha.val < 0.02 ? false : true
            this.three.scene.children[0].children[2].children[0].children.forEach(el => {
              el.material.uniforms.alpha.value = parseFloat(alpha.val)
              if (el.material.uniforms.dispFactor) {
                  el.material.uniforms.dispFactor.value = parseFloat(alpha.val)
                }
            })
          }
        }, secondOffset + 260)
        this.tlAnim.add({
          duration: 400,
          easing: 'linear',
          targets: this.three.scene.children[0].children[2].children[0].rotation,
          y: [0, -1.4],
          x: [0, -0.3],
          update: () => {
            this.three.scene.children[0].children[2].children[0].updateMatrix()
          }
        }, secondOffset)
      },
      thirdAct() {
        var thrdOffset = 1600
        var alpha = {
          val: 0
        }

        this.tlAnim.add({
          duration: 400,
          easing: 'easeInOutSine',
          targets: this.three.scene.children[0].rotation,
          y: -1.6,
          x: -1.48
        }, thrdOffset)
        this.tlAnim.add({
          duration: 100,
          easing: 'linear',
          targets: this.three.scene.children[0].children[1].children[3].material,
          opacity: [1, 0],
          update: (e) => {
            this.three.scene.children[0].children[1].children[3].visible = e.progress != 0
          }

        }, thrdOffset)

        this.tlAnim.add({
          duration: 100,
          easing: 'linear',
          targets: this.three.scene.children[0].children[1].children[4].material,
          opacity: [1, 0],
          update: (e) => {
            this.three.scene.children[0].children[1].children[4].visible = e.progress != 0
          }
        }, thrdOffset)
        this.tlAnim.add({
          duration: 100,
          targets: alpha,
          val: [0, 1],
          update: () => {
            this.three.scene.children[0].children[2].children[1].visible = alpha.val == 0.0 ? false : true
            this.three.scene.children[0].children[2].children[1].children.forEach(el => {
              el.material.uniforms.alpha.value = parseFloat(alpha.val)
              if (el.material.uniforms.dispFactor) {
                el.material.uniforms.dispFactor.value = parseFloat(alpha.val)
              }
            })
          }
        }, thrdOffset + 72)

        this.tlAnim.add({
          duration: 400,
          targets: this.three.scene.children[0].children[2].rotation,
          y: [0, 1.7],
          z: [0, -0.2],
          x: [0, -0.2],
          update: () => {
            this.three.scene.children[0].children[2].updateMatrix()
          }
        }, thrdOffset)
        var user1 = this.three.scene.children[0].children[1].children[3]
        var user4 = this.three.scene.children[0].children[1].children[4]
        var text4 = this.three.scene.children[0].children.find(child => child.name === 'Text3')
        var fifthOffset = 2000
        var fourthOffset = 1600
        var text4A = {
          value: 0
        }

        this.tlAnim.add({
          duration: 200,
          targets: text4A,
          value: [0, 1],

          update: () => {
            text4.visible = text4A.value == 0.0 ? false : true
            user1.visible = text4A.value == 0.0 ? false : true
            user4.visible = text4A.value == 0.0 ? false : true
            user1.material.opacity = text4A.value
            user4.material.opacity = text4A.value
            text4.material.uniforms.alpha.value = parseFloat(text4A.value)
          }
        }, fourthOffset + 200)

        this.tlAnim.add({
          duration: 40,
          targets: text4A,
          value: [1, 0],
          update: (e) => {
            text4.visible = text4A.value == 0.0 ? false : true
            text4.material.uniforms.alpha.value = parseFloat(text4A.value)
            if(this.tlAnim.progress > 80) {
              this.$root.bg.screencanvasB.material.uniforms.alpha.value = parseFloat(text4A.value)
            }
          }
        }, fifthOffset)
        this.tlAnim.add({
          duration: 400,
          targets: this,
          intensityParallax: [30, 0.5],
        }, fifthOffset)
         this.tlAnim.add({
          duration: 72,
          targets: alpha,
          val: 0,
          easing: 'linear',
          update: () => {
            this.three.scene.children[0].children[2].children[1].visible = alpha.val < 0.02 ? false : true
            this.three.scene.children[0].children[2].children[1].children.forEach(el => {
              el.material.uniforms.alpha.value = parseFloat(alpha.val)
            })
          }
        }, thrdOffset + 320)
      },
      fourthAct() {
        var fourthOffset = 2000
        this.tlAnim.add({
          duration: 400,
          easing: 'easeInOutSine',
          targets: this.setting.three.camera.lookAt,
          y: [0 - (this.responsiveTL * 4), 0],
          z: 60
        }, fourthOffset)
        this.tlAnim.add({
          duration: 400,
          easing: 'easeInOutSine',
          targets: this.three.scene.children[0].rotation,
          x: -0.24
        }, fourthOffset)
      },
      fifthAct() {
        var fifthOffset = 2000
        var uKalpha = {
          val: 0
        }
        this.tlAnim.add({
          duration: 400,
          easing: 'easeInOutSine',
          targets: this.three.scene.children[0].rotation,
          y: -1.67
        }, fifthOffset)
        this.tlAnim.add({
          duration: 400,
          easing: 'easeInOutSine',
          targets: this.$root.bg.screencanvasB.position,
          y: [0, window.innerHeight],
          changeBegin: (anim) => {
            this.bgReqOn = true
          },
          changeComplete: (anim) => {
            this.bgReqOn = false
          }
        }, fifthOffset)
        this.tlAnim.add({
          duration: 400,
          easing: 'easeInOutSine',
          targets: this.three.scene.children[0].position,
          y: -30,
        }, fifthOffset)
        const navbr = document.querySelector('.n')

        this.tlAnim.add({
          duration: 50,
          easing: 'linear',
          targets: navbr,
          opacity: 0,
          update: (e) => {
            if(e.progress > 90) {
              navbr.style['pointer-events'] = 'none'
            } else {
              navbr.style['pointer-events'] = 'auto'
            }
          }
        }, fifthOffset + 200)
        this.tlAnim.add({
          duration: 400,
          easing: 'easeInOutSine',
          targets: this.three.camera.position,
          z: -57 + (this.responsiveTL * 0.2)
        }, fifthOffset)
        this.tlAnim.add({
          duration: 272,
          easing: 'cubicBezier(.25, 1, .25, 1)',
          targets: this.three.scene.children[0].children[1].children[3].material,
          opacity: [1, 0]
        }, fifthOffset)
        this.tlAnim.add({
          duration: 272,
          easing: 'cubicBezier(.25, 1, .25, 1)',
          targets: this.three.scene.children[0].children[1].children[4].material,
          opacity: [1, 0]
        }, fifthOffset)
        var EfAlpha = {
          val : 0
        }
        this.tlAnim.add({
          duration: 140,
          targets: EfAlpha,
          val: [0, 1],
          update: () => {
            this.three.scene.children[0].children[3].children[0].visible = EfAlpha.val <= 0.2 ? false : true
            this.three.scene.children[0].children[3].children[0].material.uniforms.alpha.value = parseFloat(EfAlpha.val)
          }
        }, fifthOffset + 260)

        this.tlAnim.add({
          duration: 400,
          targets: uKalpha,
          val: 1,
          update: () => {
            this.three.scene.children[0].children[2].children[1].children.forEach(el => {
              el.material.uniforms.uKd.value = 0.9 - (0.7 * uKalpha.val)
              el.material.uniforms.uDirLightPos.value.z = -7.5 + (5 * uKalpha.val)
            })
            this.three.scene.children[0].children[0].children.forEach(el => {
              el.material.uniforms.uKd.value = 0.9 - (0.7 * uKalpha.val)
              el.material.uniforms.uDirLightPos.value.z = -7.5 + (5 * uKalpha.val)
            })
            this.three.scene.children[0].children[3].children[0].material.uniforms.uKd.value = 0.9 - (0.75 * uKalpha.val)
            this.three.scene.children[0].children[3].children[0].material.uniforms.uDirLightPos.value.z = -7.5 + (5 * uKalpha.val)
          }
        }, fifthOffset)
        var uPalpha = {
          val: 0
        }
        this.tlAnim.add({
          duration: 100,
          targets: uPalpha,
          val: 1,
          update: () => {
            this.three.scene.children[0].children[3].children[1].visible = uPalpha.val == 0.0 ? false : true
            this.three.scene.children[0].children[3].children[1].material.uniforms.alphaM.value = (1 * uPalpha.val)
          }
        }, fifthOffset + 300)
        var phonA = {
          val: 0
        }
        this.tlAnim.add({
          duration: 100,
          easing: 'easeInOutSine',
          targets: '.srcsht1, .srcsht2, .srcsht3',
          opacity: 0,
        }, fifthOffset)
         this.tlAnim.add({
          duration: 340,
          targets: phonA,
          val: [0, 1],
          easing: 'easeInOutSine',
          update: (e) => {
            if(this.tlAnim.progress > 80) {
              this.$root.hover.phone.material.uniforms.alpha.value = parseFloat(1 - phonA.val)
              this.$root.hover.phone.material.uniforms.dispFactor.value = parseFloat(phonA.val)
            }
          }
        }, fifthOffset)

        var value = new Color(0x121212)
        var initial = new Color(0xF1F1F1)
        this.tlAnim.add({
          targets: initial,
          r: [initial.r, value.r],
          g: [initial.g, value.g],
          b: [initial.b, value.b],
          duration: 400,
          easing: 'easeInOutSine',
          autoplay: false,
          update: (e) => {
            this.three.renderer.setClearColor(initial, e.progress / 100);
          }
        }, fifthOffset);
        // this.tlAnim.add({
        //   targets: '.n h1',
        //   color: ['#121212', '#F1F1F1'],
        //   duration: 572
        // }, fifthOffset)
      },
      initMainTL() {

        // this.tlAnimPrev = null
        // this.tlAnimPrev = anime.timeline({
        //   autoplay: false,
        //   duration: 3000,
        //   easing: 'linear',
        //   update: this.updateHandler
        // })
        this.tlAnim = null
        this.tlAnim = anime.timeline({
          autoplay: false,
          duration: 2800,
          easing: 'linear',
          update: this.updateHandler
        })
        this.prevAct()
        this.firstAct()
        this.phoneAct()
        this.secondAct()
        this.thirdAct()
        this.fourthAct()
        this.fifthAct()
        // })
      },
      lerp(a, b, t) {
        return ((1 - t) * a + t * b);
      },
      bendPlaneInvertGeometry(planeGeometry, val) {
        if(planeGeometry.vertices) {
           for (let index = 0; index < planeGeometry.vertices.length; index++) {
                   const element = planeGeometry.vertices[index];
        if (index % 2) {
          var test = index < planeGeometry.vertices.length / 2 ? index : (planeGeometry.vertices.length) - index
          if(test > 85 && test < 115) { test = 83}
          element.x = window.innerWidth / 2 + this.easeInOutQuadInvert((test * val * 0.03), 0, window.innerWidth, planeGeometry.vertices.length)
        }
          }
          planeGeometry.computeFaceNormals();
          planeGeometry.computeVertexNormals();
        }
      },
      bendPlaneGeometry(planeGeometry, val) {
        if(planeGeometry.vertices) {
           for (let index = 0; index < planeGeometry.vertices.length; index++) {
                   const element = planeGeometry.vertices[index];
        if (index % 2) {
          var test = index < planeGeometry.vertices.length / 2 ? index : (planeGeometry.vertices.length) - index
          if(test > 95 && test < 105) { test = 98}
          element.x = window.innerWidth / 2 + this.easeInOutQuad(-50 + (test * val), 0, window.innerWidth, planeGeometry.vertices.length)
        }
          }
          planeGeometry.computeFaceNormals();
          planeGeometry.computeVertexNormals();
        }
      },
      easeInOutQuad(t, b, c, d) {
        t /= d/2;
        if (t < 1) return c/2*t*t*t*t + b;
        t -= 2;
        return -c/2 * (t*t*t*t - 2) + b;
      },
      easeInOutQuadInvert(t, b, c, d) {
      	return c * ( -Math.pow( 2, -10 * t/d ) + 1 ) + b;
      },
      // render（フレーム更新処理）
      render(timeStamp) {
        this.percentage = this.lerp(this.percentage, this.scrollY, .14);
        this.percentage = Math.floor(this.percentage * 1000) / 1000;

        if (this.tlAnim && (Math.round((this.tlAnim.progress / 100)) * 2800) !== Math.round(this.percentage)) {
          if(this.percentage * ((2800 / this.maxH) * 0.5) > 2000) {
            var alphas = this.three.scene.children[0].children[3].children[1].geometry.attributes.alpha;
            var count = alphas.count;
            for( var i = 0; i < count; i ++ ) {
                alphas.array[ i ] *= 0.99;
                if ( alphas.array[ i ] < 0.1 ) {
                    alphas.array[ i ] = 1.0;
                }

            }
            alphas.needsUpdate = true;
          }
          if (Math.round(this.tlAnim.progress * 1000) != Math.round(((this.percentage * ((2800 / this.maxH) * 0.5)) / 2400) * 100000)) {
            this.tlAnim.seek(this.percentage * ((2800 / this.maxH) * 0.5))
          }
        }
        this.animation(timeStamp);
        this.three.renderer.render(this.three.scene, this.three.camera)
        this.$root.hover.renderer.render(this.$root.hover.scene, this.$root.hover.camera)
        this.$root.hoverpg.renderer.render(this.$root.hoverpg.scene, this.$root.hoverpg.camera)

        this.reqAnim = requestAnimationFrame(this.render);
      },

      // animation（フレームアニメーション）
      animation(timeStamp) {
        if (this.three.scene.children[0]) {
          this.uDirLightOffset.smoothX = this.lerp(this.uDirLightOffset.smoothX, this.uDirLightOffset.x, .14);
          this.uDirLightOffset.smoothY = this.lerp(this.uDirLightOffset.smoothY, this.uDirLightOffset.y, .14);
          this.rotOffset.smoothX = this.lerp(this.rotOffset.smoothX, this.rotOffset.x, .09);
          this.rotOffset.smoothY = this.lerp(this.rotOffset.smoothY, this.rotOffset.y, .09);

          this.three.scene.children[0].children[0].children[0].material.uniforms.uDirLightPosOffset.value.x = this.uDirLightOffset.smoothX
          this.three.scene.children[0].children[0].children[0].material.uniforms.uDirLightPosOffset.value.y = this.uDirLightOffset.smoothY
          this.three.scene.children[0].children[0].children[1].material.uniforms.uDirLightPosOffset.value.x = this.uDirLightOffset.smoothX
          this.three.scene.children[0].children[0].children[1].material.uniforms.uDirLightPosOffset.value.y = this.uDirLightOffset.smoothY
          this.three.camera.position.x = 0.15 + this.rotOffset.smoothX * this.intensityParallax
          this.three.camera.position.y = 0.5 + this.rotOffset.smoothY * this.intensityParallax

          if(this.$root.bg.screencanvasO && this.$root.bg.screencanvasO.material.uniforms.parallax.value.x !== 0.0 + this.rotOffset.smoothX / 45) {
            this.$root.bg.screencanvasO.material.uniforms.parallax.value.x = 0.0 + this.rotOffset.smoothX / 45
            this.$root.bg.screencanvas2.material.uniforms.parallax.value.x = 0.0 + this.rotOffset.smoothX / 45
            if(this.$root.bg.screencanvasB) {
              this.$root.bg.screencanvasB.material.uniforms.parallax.value.x = 0.0 + this.rotOffset.smoothX / 45
            }
            if(this.bgUpdate) {
              this.bgUpdate(this)
            }
          } else {
            if (this.bgReqOn && this.bgUpdate) {
              this.bgUpdate(this)
            }
          }


          this.three.camera.lookAt(
            new Vector3(
              this.setting.three.camera.lookAt.x - this.rotOffset.smoothX * (this.intensityParallax/2), this.setting.three.camera.lookAt.y - this.rotOffset.smoothY * (this.intensityParallax/2), this.setting.three.camera.lookAt.z
            )
          );
        }
      },
      animWaitlist (last) {
        this.ctcAnim = null
        this.ctcAnim = anime.timeline({
          autoplay: false,
          duration: 600,
          easing: 'cubicBezier(.25, 1, .25, 1)',
          update: () => {
            this.updateHandler()
          }
        })
        this.ctcAnim.add({
          targets: '.ctct',
          translateY: ['-101%', 0]
        }, 0)
        if(last !== true) {
          this.ctcAnim.add({
            duration: 300,
            targets: '.c',
            opacity: 0,
            easing: 'linear'
          }, 0)
        }
        this.ctcAnim.play()
      },
      // =============================================================================
      // イベントアサイン
      event_assign() {
        this.time = 0.0
         window.addEventListener('resize', this.resize, {
          once: false,
          passive: true,
          capture: false,
        });
        document.querySelector('.n h1').addEventListener('click', () => {
          var e = {
            x: 0,
            y: 0,
            scrollable: true
          }
          this.animToScrollY(e, this.nb * 500)
        })
        document.querySelector('.svgarr').addEventListener('click', () => {
          var e = {
            x: 0,
            y: 0,
            scrollable: true
          }
          this.animToScrollY(e, this.nb * 500)
        })
        // document.querySelector('.ctctbtn').addEventListener('mouseenter', () => {
        //    this.animWaitlist()
        // })
        document.querySelector('.c').addEventListener('click', (e) => {
          if(document.querySelector('.ctct').getBoundingClientRect().y == 0) {
            this.revertAnim(true)
          }
        })
          this.revertAnim = (force) => {
            if (document.activeElement.type == 'text' && typeof force == 'object') {
              return
            }
            if(document.activeElement.type == 'text') {
              document.activeElement.blur()
            }
            if (this.ctcAnim && !this.wtlstLeaving) {
              this.ctcAnim = null
              this.ctcAnim = anime.timeline({
                autoplay: false,
                duration: 600,
                easing: 'easeInQuint',
                begin: () => {
                  this.wtlstLeaving = true
                },
                complete: () => {
                  this.wtlstLeaving = false
                },
                update: () => {
                  this.updateHandler()
                }
              })
              this.ctcAnim.add({
                targets: '.ctct',
                translateY: '-101%'
              }, 0)
              this.ctcAnim.add({
                targets: '.ctct .txt',
                easing: 'easeInCubic',
                letterSpacing: 140
              }, 0)
              this.ctcAnim.add({
                duration: 300,
                targets: '.c',
                opacity: 1,
                easing: 'linear'
              }, 0)
              this.ctcAnim.play()
            }
          }
          document.querySelector('.ctct').addEventListener('mouseleave', this.revertAnim)
          document.addEventListener('mousemove', this.moveMv)

          const typeHandler = function(e, el) {
            var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            var isMailOk = regex.test(e.target.value)
            if (isMailOk) {
              el.parentNode.querySelector('.wtmail').classList.add('active')
              el.parentNode.querySelector('.wtsubmit').classList.add('active')
            } else {
              el.parentNode.querySelector('.wtmail').classList.remove('active')
              el.parentNode.querySelector('.wtsubmit').classList.remove('active')
            }
          }
          document.querySelectorAll('.wtmail').forEach(el => { el.addEventListener('input', (e) => {
            typeHandler(e, el)
          })}) // register for oninput
          document.querySelectorAll('.wtsubmit').forEach(el => { el.addEventListener('click', (e) => {
              const email = el.parentNode.querySelector('.wtmail').value
              window.fetch('https://app.viral-loops.com/api/v2/events', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  "apiToken": "P4hwdbv7WVEGHib62YdaIizWmdc",
                  "params": {
                    "event":"registration",
                    "user":{
                        "email": email
                    }
                  }
                })
              })
              el.classList.add('success')
              el.parentNode.querySelector('input').value = ''
              el.parentNode.querySelector('input').setAttribute('placeholder', 'WELCOME')
              anime({
                duration: 1200,
                targets:  el.parentNode,
                delay: 1400,
                easing: 'cubicBezier(.25, 1, .25, 1)',
                complete: () => {
                  el.classList.remove('success')
                  el.classList.remove('active')
                  setTimeout(() => {
                    el.parentNode.querySelector('input').classList.remove('active')
                  }, 300);
                  el.parentNode.querySelector('input').setAttribute('placeholder', 'ENTER EMAIL TO JOIN THE WAITLIST')
                  if(el.classList.contains('fromctct')) {
                    this.revertAnim(true)
                  }
                }
              })
            })
          })
      },

      updateHandler() {
        this.three.camera.updateProjectionMatrix();
      },
      initInviews() {
        document.querySelectorAll('.s1 h2 span').forEach(el => {
          el.innerHTML = el.innerHTML.replace(/([^\x00-\x80]|\w)/g, "<span class='lt'>$&</span>");
        });
        var animTitle = anime.timeline({autoplay: false, delay: 1200, duration: 600})
        animTitle.add({
          targets: '.s1 h2 .lt',
          scale: [0.3, 1],
          opacity: [0,1],
          rotateZ: ['-10deg', '0'],
          rotateY: ['-30deg', '0'],
          translateY: ['-10px', '0'],
          translateX: ['-10px', '0'],
          translateZ: 0,
          easing: "easeInOutExpo",
          delay: function(el, i) {
            return 50 * (i+1)
          }
        }, 400)
      },
      moveMv (e) {
        if(e && e.clientX && e.clientY && this.uDirLightOffset && this.three.scene.children[0] && this.three.scene.children[0].children[0]) {
          this.eClientX = e.clientX
          this.eClientY = e.clientY
          if (e.touches) {
            var touch = e.touches[0];
            e.clientX = (( touch.pageX - (window.innerWidth / 2) ) * 1.6);
            this.mouseY = 0.1
          } else {
            this.mouseY = ( e.clientY - (window.innerHeight / 2));
          }
          this.mouseX = (( e.clientX - (window.innerWidth / 2) ));
          this.uDirLightOffset.x = -((this.mouseX / 100)) - (this.three.scene.children[0].children[0].children[0].position.x / 10) + (this.setting.three.camera.lookAt.x / 15)
          this.uDirLightOffset.y = -((this.mouseY / 100)) - (this.three.scene.children[0].children[0].children[0].position.y / 10) + (this.setting.three.camera.lookAt.y / 15)
          this.rotOffset.x = -((this.mouseX / 1500))
          this.rotOffset.y = -((this.mouseY / 1500))
        }
      },
      resize() {
        if((document.activeElement.type != 'text' && (this.storedHeight != window.innerHeight || this.storedWidth != window.innerWidth)) || window.innerWidth > 767) {
          location.reload()
        }
      },

    },

  };
</script>
