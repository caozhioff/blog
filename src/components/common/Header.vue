<template>
    <div class="header-container">
        <el-row class="m-header-row">
            <el-col :span="12" class="m-header-title">
                <router-link to="/">{{ username}}博客</router-link>
            </el-col>
            <el-col :span="12" class="m-header-nav">
                <ul class="navbar-nav">
                    <li>
                        <router-link to="/blog">博客</router-link>
                    </li>
                    <li>
                        <router-link to="/about">关于我</router-link>
                    </li>
                    <li>
                        <router-link to="/contact">联系我</router-link>
                    </li>
                    <li>
                        <router-link to="/register">注册</router-link>
                    </li>
                    <li><router-link to="/login">登录</router-link></li>
                </ul>
            </el-col>
        </el-row>
    </div>
</template>


<style>
.header-container{
    width: 1170px;
    margin: 0 auto;
}
.m-header-title {
    line-height: 60px;
    font-size: 18px;
    text-align: left;
}
.m-header-nav{
    text-align: right;
}
.navbar-nav{
    float: right;
}
.navbar-nav li {
    float: left;
    padding: 5px 15px;
    font-size: 14px;
}
.header-container a {
    color: #9d9d9d;
}
</style>

<script>
export default {
    data(){
        return {
            
        }
    },
    mounted(){
        //this.$store.commit('changeUser',localStorage.getItem('username'))
    },
    computed:{
        username(){
            return this.$store.state.username
        }
    }
}
</script>