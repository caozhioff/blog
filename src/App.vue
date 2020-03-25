<template>
  <div id="app">
    <el-container>
      <el-header class="m-header">
        <my-header />
      </el-header>
      <el-main>
        <router-view />
      </el-main>
      <el-footer class="m-footer">
        <my-footer />
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import MyHeader from './components/common/Header.vue'
import MyFooter from './components/common/Footer.vue'

export default {
  name: 'App',
  components: {
    MyHeader,
    MyFooter
  }
}
</script>

<style>
.m-header{
    background-color: #222;
    color: #9d9d9d;
    width: 100%;
}
.m-footer{
    background-color: #f5f5f5;
    border-top: 1px solid #ddd;
    padding-top: 20px;
    position: absolute;
    bottom: 0;
    width: 100%;
}
</style>
