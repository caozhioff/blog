<template>
    <div class="blog-content">
        <el-row>
            <el-col :span="20">
                <div class="main-content">
                    <h1 v-show="search">搜索：{{ search }}</h1>
                    <div class="blog-list" v-for="blog in blogs" :key="blog._id">
                        <h2><router-link :to="'/detail/' + blog.title">{{ blog.title }}</router-link></h2>
                        <span>本条日志由 小西 发表于 {{ blog.time }}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                        <span>标签：{{ blog.tags }}</span>
                    </div>
                    <div v-if="blogs.length==0">没有搜索到日志</div>
                </div>
            </el-col>
            <Sidebar v-if="token" />
        </el-row>
    </div>
</template>

<script>
import Util from  '../util/util'
import Sidebar from '@/components/common/Sidebar.vue'
export default {
    components:{
        Sidebar
    },
    data(){
        return {
            token:localStorage.getItem('token'),
            blogs:[],
            search:''//查询条件<url中获取>
        }
    },
    created(){
        var _self = this;
        _self.search = Util.GetRequest().search;
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
            _self.$axios.get('/blog/list',{params:{search:_self.search},headers:{'Authorization':_self.token}})
            .then(res => {
                if (res.data.data.length == 0) {//没有博文
                    _self.$message.error('空空如也，即将跳转添加！记住添加的路由哦')
                    setTimeout(()=>{
                        _self.$router.push('/addBlog')
                    },2000)
                }
                _self.blogs = res.data.data;
            })
            .catch(err => {
                console.error(err); 
            })
        }
    },
    watch:{
        '$route' (to, from) {
            if (to.query.search != from.query.search) {
                this.search = to.query.search;
                this.getData()
            }
        }
    }
}
</script>


<style scoped>
.blog-content{
    width: 1170px;
    margin-left: auto;
    margin-right: auto;
}
.main-content{
    padding-right: 15px;
    padding-left: 15px;
}
.main-content h2{
    font-size: 30px;
}
.blog-list {
    margin-bottom: 10px;
}
.blog-list span {
    font-size: 12px;
    color: #666;
}
.blog-list a {
    color: #337ab7;
    text-decoration: none;
}
</style>