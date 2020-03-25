<template>
    <div class="main-about">
        <Breadcrumb :title="title" />
        <div class="about-content">
            关于我的内容，后台提交
        </div>
    </div>
</template>

<script>
import Breadcrumb from '@/components/common/Breadcrumb.vue'

export default {
    components: {
        Breadcrumb
    },
    data(){
        return {
            title : '关于我'
        }
    }
}
</script>

<style>
.main-about{
    width: 1170px;
    margin-left: auto;
    margin-right: auto;
}
</style>