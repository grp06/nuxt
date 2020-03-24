<template>
  <div>
    <nuxt />
  </div>
</template>

<style>
html {
  font-family: 'Rounds Neue', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
.fix-flick {
  -webkit-transform: translate3D(0, 0, 0);
  transform: translate3D(0, 0, 0);
  transform: translate3D(0, 0, 0);
  height: 100%;
  position: fixed;
  width: 100%;
  user-select: none;
  pointer-events: none;
  -webkit-backface-visibility: hidden;
}
button {
  border-radius: 28px;
  -webkit-backface-visibility: hidden;
  transform: translate3d(0, 0, 0);
}
.bold {
  font-weight: 900;
  color: #ee654e;
}
.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>

