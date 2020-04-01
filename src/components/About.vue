<template>
    <div class="main-about">
        <Breadcrumb :title="title" />
        <div class="about-content" v-html="info">
        </div>
    </div>
</template>

<script>
import Breadcrumb from '@/components/common/Breadcrumb.vue'
import '../util/logout'
//import logout from '../util/logout'

export default {
    components: {
        Breadcrumb
    },
    data(){
        return {
            title : '关于我',
            info:''
        }
    },
    created(){
        var _self = this;
        let _token = localStorage.getItem('token');
        if(!_token) {
            _self.$message.error('(#^.^#)，你未登录哦！');
            setTimeout(()=>{
                _self.$router.push('/login');
            },2000)
            return;
        }
        var username = localStorage.getItem('username');
        _self.$axios.get('/my/my?username=' + username,{headers:{'Authorization':_token}}).then((response) => {
            if (response.data.code == '001') {
                _self.info = response.data.data.info;
                return;
            } 

            _self.$message.error(response.data.msg);
            setTimeout(() => {
                _self.$router.push('/my')
            },2000)
        })
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