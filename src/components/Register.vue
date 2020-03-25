<template>
    <div class="register-content">
        <Breadcrumb :title="title" />
        <h1>注册</h1>
        <p>注册暂未开放，如有需要请<router-link to="/contact">联系博主</router-link></p>
    </div>
</template>

<script>
import Breadcrumb from '@/components/common/Breadcrumb.vue'

export default {
    components:{
        Breadcrumb
    },
    data(){
        return {
            title:'注册'
        }
    }
}
</script>

<style>
.register-content{
    width: 1170px;
    margin-left: auto;
    margin-right: auto;
}
</style>