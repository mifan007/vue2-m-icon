<template>
  <div id="app">
    <m-icon @onChoose="choose" @onCopy="copy"></m-icon>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  methods:{
    choose(e){
      console.log(e);
    },
    copy(){
      console.log('copy');
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
