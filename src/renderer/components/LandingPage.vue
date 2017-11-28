<template>
  <div id="wrapper">
    <img id="logo" src="~@/assets/logo.png" alt="electron-vue">
    <main>
      <div class="doc">
        <button class="alt" @click="open()">开</button>
        <button class="alt" @click="cloce()">关</button>
      </div>
    </main>
    数据库：
    <db></db>
    <br>
    <hr>
    文件操作：
    <div>
      <input type="file" @change="file = $event">
    </div>
  </div>
</template>

<script>
  import { ipcRenderer } from 'electron';
  //  require('os').platform(),
  import db from './dbview/db.vue';

  export default {
    name: 'landing-page',
    components: { db },
    data: () => ({
      file: null,
    }),
    watch: {
      file(nval) {
        // console.log(nval.target.files[0].path);
        const Path = nval.target.files[0].path;
        if (Path) {
          ipcRenderer.send('file', Path);
        }
      },
    },
    methods: {
      open() {
        ipcRenderer.send('open');
      },
      cloce() {
        ipcRenderer.send('cloce');
      },
    },
  };

</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Source Sans Pro', sans-serif;
  }

  #wrapper {
    background: radial-gradient( ellipse at top left,
    rgba(255, 255, 255, 1) 40%,
    rgba(229, 229, 229, .9) 100%);
    height: 100vh;
    padding: 60px 80px;
    width: 100vw;
  }

  #logo {
    height: auto;
    margin-bottom: 20px;
    width: 420px;
  }

  main {
    display: flex;
    justify-content: space-between;
  }

  main>div {
    flex-basis: 50%;
  }

  .left-side {
    display: flex;
    flex-direction: column;
  }

  .welcome {
    color: #555;
    font-size: 23px;
    margin-bottom: 10px;
  }

  .title {
    color: #2c3e50;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 6px;
  }

  .title.alt {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .doc p {
    color: black;
    margin-bottom: 10px;
  }

  .doc button {
    font-size: .8em;
    cursor: pointer;
    outline: none;
    padding: 0.75em 2em;
    border-radius: 2em;
    display: inline-block;
    color: #fff;
    background-color: #4fc08d;
    transition: all 0.15s ease;
    box-sizing: border-box;
    border: 1px solid #4fc08d;
  }

  .doc button.alt {
    color: #42b983;
    background-color: transparent;
  }

</style>
