<template>
<section>
  <div class="ctct">
    <!-- <span class="txt">WAITLIST</span> -->
    <label for="wtmail1">Email :</label>
    <input id="wtmail1" class="wtmail" name="wtmail1" type="text" placeholder="ENTER EMAIL TO JOIN THE WAITLIST">
    <button class="wtsubmit fromctct">JOIN</button>
  </div>
  <div class="n">
      <h1>Vuybe</h1>
      <a href="https://apps.apple.com/us/app/vuybe-global-community/id1470862395?utm_source=landingpage"><img src="img/app-store-icon.png" class="app-store-icon"  alt="app store icon" /></a>
  </div>
  <div class='overlayct'></div>
  <div class="c">
    <div class="v">
      <div class="s s1" pg="1">
        <div class="rvl">
          <h1><span>Helping you vuybe</span><br/><span>anywhere, anytime</span></h1>
        </div>
      </div>
      <div class="s">
        <div class="tbl" pg="2">
          <div class="rvl">
          <p class="mt0">
            In 2019, we communicate more than ever. But most of it is <span class="bold">online</span>. It’s hard to feel <span class="bold">human connection</span>. Vuybe helps you replace screen time with <span class="bold">people time</span>.
          </p>
        </div>
      </div>
      </div>
      <div class="s">
        <div class="tbl" pg="3">
          <div class="rvl">
          <p class="mt0">
           Vuybe guides you to  <span class="bold">revitalize</span> your old friendships, <span class="bold">discover</span> amazing new ones, and makes you feel more <span class="bold">connected</span> wherever you are - in the <span class="bold">real world</span>.
          </p>
        </div>
      </div>
      </div>
      <div class="s">
        <div class="tbl" pg="4">
          <div class="stitle">
            <h2>Discover</h2>
          </div>
          <div class="rvl">
          <p>
          See where in the world your friends are, without the snoopy feeling of exact location tracking.
          </p>
        </div>
      </div>
      </div>
      <div class="s">
        <div class="tbl" pg="5">
          <div class="stitle">
            <h2>Reconnect</h2>
          </div>
          <div class="rvl">
          <p>
          Check which of your friends happen to be in the same city as you and reconnect in real life.
          </p>
        </div>
      </div>
      </div>
       <div class="s">
        <div class="tbl" pg="6">
         <div class="stitle">
            <h2>Introduce</h2>
          </div>
          <div class="rvl">
          <p>
           Connect your friends in real life as they cross paths with each other, to create new friendships.
          </p>
        </div>
      </div>
      </div>
      <div class="s lst" pg="7">
         <div class="rvl lst">
          <div class="stitle lst">
            <h2 class="h2lst">Keep Calm & Vuybe On! </h2>
            <div class="fcntr">
              <label for="wtmail2">Email :</label>
              <input id="wtmail2" name="wtmail2" type="text" class="wtmail" placeholder="ENTER EMAIL TO JOIN THE WAITLIST">
              <button class="wtsubmit">JOIN</button>
            </div>
          </div>

          <div class="ft">
            <div>
              <small>CONTACT</small>
              <h3><a href="mailto:info@vuybe.co">INFO@VUYBE.CO</a></h3>
            </div>
            <div>
              <small>TOP</small>
              <h3><svg class="svgarr" version="1" width="34" height="34" viewBox="66 27 217 307" xmlns="http://www.w3.org/2000/svg"><path d="M280 156c0 3-1 8-11 8h-46v155c0 3-1 5-3 7-3 3-6 4-11 4h-72c-9 0-12-7-12-11V167H83c-12 0-14-5-14-9 0-5 5-10 6-11 3-4 76-102 87-113 4-4 8-4 11-4 6 0 10 5 11 6l89 108c2 1 7 7 7 12z"/></svg></h3>
            </div>
          </div>
          <div class="crdts">
            <small>© 2019 Vuybe</small>
            <small><a href="https://renaudrohlinger.com">※ Site by Renaud ROHLINGER</a></small>
          </div>
        </div>
      </div>
    </div>
    <div class="tblbg"></div>
  </div>
  <div class="webgl"></div>
  <div class="webglphone">
  </div>
  <div class="phonectnr">
    <picture>
        <source srcset="img/screenshot1p.webp" type="image/webp">
        <img src="img/screenshot1p.png" class="srcsht1"  alt="vuybe app" />
    </picture>
    <picture>
        <source srcset="img/screenshot2p.webp" type="image/webp">
        <img src="img/screenshot2p.png" class="srcsht2"  alt="vuybe app" />
    </picture>
    <picture>
        <source srcset="img/screenshot3p.webp" type="image/webp">
        <img src="img/screenshot3p.png" class="srcsht3"  alt="vuybe app" />
    </picture>
  </div>
  <div class="bgo"></div>
</section>
</template>
<style>
.svgarr {
  display: block;
  margin: 7px 0;
  cursor: pointer;
  fill: #f1f1f1;
}

.crdts {
  color: #f1f1f1;
  position: absolute;
  bottom: 0;
  right: 0;
}

.crdts small, .crdts a {
  color: #f1f1f1;
  line-height: 11px;
  font-size: 11px;
}

.crdts a {
  font-weight: bold;
  text-decoration: none;
}

.wtsubmit {
  transform: translateX(-102%);
  background-color:#121212;
  z-index: 0;
  width: 56px;
  overflow: hidden;

  transition: transform 0.6s cubic-bezier(0.25, 1, 0.25, 1);
}
.wtsubmit:before, .wtsubmit:after {
  content: 'JOIN';
  color: #232323;
  border-radius: 0;
  border: 0px;
  height: 45px;
  line-height: 45px;
  width: 56px;
  font-weight: 900;
  cursor: pointer;
  background-color: #f1f1f1;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0 14px;
  z-index: 2;
  transform: translateX(-101%);
  transition: transform 0.6s cubic-bezier(0.25, 1, 0.25, 1);
}
.wtsubmit:after {
  content: '🙌';
  font-size: 30px;
  z-index: 3;
}
.wtsubmit:hover:before {
  transform: translateX(0);
}
.wtsubmit.success:after {
  transform: translateX(0);
}
.wtmail {
  background-color: #f1f1f1;
  transform: translateX(28px);
  transition: transform 0.6s cubic-bezier(0.25, 1, 0.25, 1);
  z-index: 1;
}
.fcntr input {
  transform: translateX(0);
}
.wtsubmit.active {
  transform: translateX(0);
  z-index: 0;
}
.wtmail.active {
  transform: translateX(0);
}

.scrsht {
  transform: translateZ(0);
  will-change: transform, opacity;
  opacity:0;
}
.scrone {
  transform: translateY(0) translateZ(0);
  opacity: 1;
}

.ctct {
  position: fixed;
  top: 0;
  width: 100%;
  max-height: 400px;
  height: 30vh;
  min-height: 220px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  z-index: 4;
  transform: translateY(-101%) translateZ(0);
  will-change: transform;
  background-size: 200px;
  display: flex;
  justify-content: center;
  vertical-align: middle;
  background-color: #ee654e;
  background-image: url('/img/text_w.webp');
  background-size: 54px;
}

.app-store-icon {
  width: 130px;
  position: absolute;
  right: 30px;
  top: 30px;

}

.ctctbtn {
  text-decoration: underline;
  background-color: #ee654e;
  background-image: url('/img/text_w.webp');
  background-size: 54px;
  font-weight: 700;
  cursor: pointer;
  border-radius: 40px;
  color: #f1f1f1;
  text-decoration: none;
  padding: 14px 28px;
  text-align: center;
  font-size: 14px;
}
@media (max-width: 540px) {
  .ctctbtn {
    font-size: 13px;
  }
}

button {
  background-image: url('/img/webgl_text_blk.webp');
  background-size: 14px;
  background-color: #121212;
  color: #f1f1f1;
  border-radius: 0;
  border: 0px;
  height: 45px;
  line-height: 45px;
  padding: 0 14px;
  font-weight: 900;
  cursor: pointer;
}
button:focus {
  outline: none;
}
.overlayct {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #121212;
  opacity: 0;
  user-select: none;
  pointer-events: none;
}

input {
  background-color: #F1F1F1;
  border: none;
  padding: 0 14px;
  width: 252px;
  font-weight: 600;
  color: #121212;
  font-size: 14px;
  height: 45px;
}
input::placeholder {
  font-weight: 300;
  font-size: 12px;
  height: 45px;
  text-align: center;
  color: #676767;
}
input::-webkit-input-placeholder {
  font-weight: 300;
  font-size: 12px;
  height: 45px;
  text-align: center;
  color: #676767;
}
input:focus {
  outline: none;
}
.fcntr {
  justify-content: flex-start;
  display: flex;
}
.bgw {
  position: fixed;
  top: 0;
  left: 0;
  opacity: 1;
  background-image: #f1f1f1;
  background-image:url('/img/text_bg.webp');
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  height: 200%;
  margin: 0;
  width: 200%;
  z-index: -2;
  opacity: 0;
  /* transform: translateX(-50%) rotate(64deg); */
}
.pgn, .pgs, .pgt {
  display: block;
  float: left;
}
.pgs {
  font-size: 44px;
  font-weight: 300;
}
.pgn {
  margin-top: -10px;
}
.pgt {
  margin-top: 10px;
}
.bgo {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 1;
  background-image:url('/img/textu_w.webp');
  margin: 0;
  z-index: -3;
  opacity: 0;
}

.stitle h2 {
  font-size: 42px;
  margin-bottom: 42px;
  line-height: 42px;
}

label {
  position: absolute;
  opacity: 0;
}
.mts {
  margin-top: 180px;
}
.lilytxt {
  width: 100%;
  display: block;
  text-align: center;
  font-style: italic;
}
.stitle.vuyb {
  margin-left: -9px;
  margin-top: -133px;
}
p {
  margin: 14px 0;
}

.n {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 3;
  padding: 56px;
  -webkit-backface-visibility: hidden;
}
.f {
  position: absolute;
  right: 0;
  left: 0;
  width: 100%;
  top: 50%;
  height: 100px;
  margin-top: 50px;
}
.n h1 {
  width: 160px;
  font-size: 41px;
  line-height: 41px;
  padding: 7px;
  transform: translateX(50vw);
  margin-left: -135px;
  display: block;
  float: left;
  text-align: center;
  font-weight: 900;
  opacity: 0;
}
.n_b_c {
  position: absolute;
  overflow: hidden;
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  transform: translate3d(0, 0, 0);
  z-index: 10;
  right: 56px;
  opacity: 0;
  line-height: 27px;
}
@media (max-width: 540px) {
  .ft a {
    font-size: 24px;
  }
  .n_b_c {
    line-height: 55px;
  }
}

.n button {
  padding: 14px 28px;
  border-radius: 28px;
  line-height: 21px;
  margin: 7px;
  font-size: 14px;
  font-weight: 700;
  font-family: Rounds Neue;
  z-index: 9;
  transform: translate3d(0, 0, 0);
  background-color:#F1F1F1;
  opacity: 0;
}

body {
  background-color: #f1f1f1;
  color: #121212;
  overflow: hidden;
  width: 100%;
}
.c {
  position: fixed;
  margin: 0 auto;
  min-height: 100vh;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
  /* margin-top: 111px; */
  overflow: hidden;
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
}
.s1 h1 {
  text-align: center;
  font-size: 7vw;
  line-height: 7vw;
  margin-top: calc(50vh - 7vw - 28px - 111px);
  max-width: 80%;
  margin-left: auto;
  margin-right: auto;
  opacity: 0;
}
.s p {
  font-size: 20px;
  letter-spacing: -0.012em;
}

p.nar {
  text-align: center;
  font-size: 5vw;
  margin: 48px 0;
  font-weight: 900;
}
.lt {
  display: inline-block;
  transform: scale(0.3);
  will-change: transform;
}

.tbl.rvl {
  transform: translateY(10px);
}
.tbl {
  display: block;
  font-size: 3vw;
  width: 60%;
  text-align: left;
  position: absolute;
  bottom: 56px;
  width: 100%;
  max-width: 560px;
  width: 55%;
  padding: 14px;
}
.ttl {
  top: 206px;
  bottom: initial;
}
.tblbg {
  border: 1px solid #898989;
  background-color: #e5e5e5;
  display: block;
  width: 60%;
  text-align: left;
  position: fixed;
  bottom: 56px;
  left: 56px;
  width: 100%;
  max-width: 560px;
  width: 55%;
  opacity: 0;
  z-index: -1;
  padding: 14px;
  -webkit-backface-visibility: hidden;
  background-image: url('/img/textu_w.webp');
}

.r {
  position: relative;
}

.n h1 small {
  position: absolute;
  font-size: 13px;
  width: 210px;
  line-height: 13px;
  bottom: -14px;
  left: -20px;
  text-align: center;
  color: #ee644d;
}
.n h1 svg {
  fill: #ee644d;
}
.ft {
  position: absolute;
  bottom: 14px;
  height: 140px;
  width: 100%;
  color: #f1f1f1;
  display: flex;
  justify-content: space-between;
}
.ft a {
  font-size: 34px;
  color: #f1f1f1;
  text-decoration: none;
}
.ft div {
  float:left;
}
.rvl.lst {
  height: 100%;
}
.stitle.lst {
  position: absolute;
  width: 100%;
}
.stitle.lst h2 {
  color: #f1f1f1;
  text-align: left;
  width: 100%;
}

@media (max-width: 540px) {
  .ft {
    justify-content: space-around;
  }
  .stitle.lst h2 {
    text-align: center;
  }
  .fcntr {
    justify-content: center;
  }
  .fcntr input {
    transform: translateX(28px);
  }
}

@media (min-width: 1240px) {
  svg.phone {
    right: 40px;
    margin-top: 0;
  }
}

.v {
  width: 100%;
}
.s {
  height: 100vh;
  max-height: 100vh;
  position: relative;
  padding: 56px;
  padding-top: 167px;
  text-align: left;
  overflow: hidden;
}
.s.lst {
  padding-top: 56px;
}
.webgl {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -2;
  opacity: 0;
  pointer-events: none;
  /* background-color: #F1F1F1; */
}
.webglphone, .phonectnr {
  position: fixed;
  right: 0;
  bottom: 26px;
  width: 600px;
  max-width: 104vw;
  z-index: -1;
  transform: translateZ(0);
  pointer-events: none;
  user-select: none;
}
.phonectnr img {
  position: absolute;
  width: 100%;
  opacity: 0;
  transform: translateY(1px) translateZ(0);
  will-change: opacity;
}
@media (max-width: 540px) {
  .webglphone, .phonectnr {
    top: initial;
    -webkit-transform: translateZ(0) translateX(-50%);
    transform: translateZ(0) translateX(-50%);
    left: 50%;
    max-width: 130vw;
    bottom: 94px;
    z-index: -1;
  }
  p.nar {
    margin: 14px 0;
  }
  .mts {
    margin-top: 28px;
  }
  .s p {
    font-size: 16px;
  }
  .n {
    padding: 18px 0;
  }
  .n_b_c {
    right: 14px;
    line-height: 15px;
    top: 19px;
    padding: 6px 5px;
  }
  .n h1 {
    margin-left: -80px;
  }
  .s {
    padding: 18px;
    padding-top: 111px;
  }
  .s.lst {
    padding-top: 148px;
  }
  .scontent {
    width: 100%;
  }
  .stitle h2 {
    width: 100%;
    font-size: 24px;
    margin-bottom: 14px;
    line-height: 24px;
  }
  .tbl {
    width: 100%;
    left: 0;
    bottom: 0;
    padding: 14px 14px 0 14px;
    margin: 7px;
    width: calc(100% - 14px);
  }
  .tblbg {
    padding: 7px;
    width: calc(100% - 14px);
    left: 7px;
    bottom: 7px;
    pointer-events: none;
  }
}
</style>
<script>
export default {

}
</script>