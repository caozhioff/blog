<template>
    <div class="main-container">
        <el-row>
            <el-col :span=20>
                <div class="blog-header" v-if='blog'>
                    <h1>{{ blog.title }}</h1>
                    <span>本条日志由 {{ blog.username }} 发表于 {{ blog.time }}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                    <span>标签：{{ blog.tags }}</span>
                </div>
                <div class="blog-content" v-html="blog.content">
    
                </div>
                <div class="blog-footer">
                    <div class="pull-right" v-if='pre'>
                        <a href="javascript:void(0)" @click="gotoNext(pre.title)" class="btn btn-success">
                                前一篇：{{ pre.title }}
                        </a>
                    </div>
                </div>
            </el-col>
             <Sidebar />
        </el-row>
    </div>
</template>

<script>
import Sidebar from '@/components/common/Sidebar.vue'
export default {
    components:{
        Sidebar
    },
    data(){
        return {
            token:localStorage.getItem('token'),
            blog:'',
            pre:'',
        }
    },
    created(){
        var _self = this;
        if(!_self.token) {
            _self.$message.error('(#^.^#)，你未登录哦！');
            setTimeout(()=>{
                _self.$router.push('/login');
            },2000)
            return;
        }
        _self.getData();
    },
    methods:{
        getData(){
            var _self = this;
            var username = localStorage.getItem('username');
            _self.$axios.get('/blog/new',{params:{username},headers:{'Authorization':_self.token}})
            .then(res => {
                if(res.data.code == '002') {
                    _self.$message.error(res.data.msg);
                    return;
                }
                if (res.data.data.length == 0) {
                    _self.$message.error('最新一篇博文也是空的哦！即将跳转...')
                    setTimeout(()=>{
                        _self.$router.push('/addBlog')
                    },2000)
                    return;
                }
                _self.blog = res.data.data[0];
                if (res.data.data[1]) {
                    _self.pre = res.data.data[1];
                } else {
                    _self.pre = '';
                }

            })
            .catch(err => {
                console.error(err); 
            })
        },
        gotoNext(title){
            var _self = this;
            _self.$router.push({path:'/detail/' + title})
            //_self.getData();
        }
    },
}
</script>

<style>
.main-container{
    width: 1170px;
    padding: 10px 15px 20px;
    margin-left: auto;
    margin-right: auto;
}
.blog-header{
    margin-bottom: 1rem;
}
.blog-header h1 {
    font-size: 36px;
    font-weight: 500;
}
.blog-header span {
    font-size: 12px;
    color: #666;
}
.blog-content {
    margin-bottom: 20px;
}
.blog-footer{
    height: 72px;
}
.pull-left {
    float: left;
}
.pull-right {
    float: right;
}
.btn {
    display: inline-block;
    padding: 6px 12px;
    margin-bottom: 0;
    font-size: 14px;
    font-weight: normal;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-image: none;
    border: 1px solid transparent;
    border-radius: 4px;
}
.btn-success {
    color: #fff;
    background-color: #5cb85c;
    border-color: #4cae4c;
}
</style>