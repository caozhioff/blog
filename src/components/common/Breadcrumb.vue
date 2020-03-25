<template>
    <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{ title }}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
export default {
    props:['title']
}
</script>

<style>
.breadcrumb{
    background: #f5f5f5;
    padding: 12px 15px;
    border-radius: 4px;
    margin-bottom: 20px;
}
</style>