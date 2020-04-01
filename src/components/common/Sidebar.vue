<template>
    <el-col :span=4 class="sidebar">
        <el-input v-model="inputVal" placeholder="search" @keyup.enter.native="inputSearch()"></el-input>
        <div class="tags">
            <h3>标签检索</h3>
            <div>
                <a href="javascript:void(0)" v-for="(tag,index) in tags" :key="index">
                    <router-link :to="{path:'/blog',query:{search:tag}}">{{ tag }}</router-link>
                    <br v-if="(index+1)%3 == 0" />
                </a>
            </div>
        </div>
        <div class="links">
            <h3>友情链接</h3>
            <div>
                <ul>
                    <li><a target="_blank" href="https://cn.vuejs.org/v2/guide/">vue</a></li>
                    <li><a target="_blank" href="https://router.vuejs.org/zh/">vue-router</a></li>
                    <li><a target="_blank" href="https://router.vuejs.org/zh/">vue-cli</a></li>
                    <li><a target="_blank" href="https://vuex.vuejs.org/zh/">vuex</a></li>
                    <li><a target="_blank" href="https://nodejs.org/zh-cn/">nodejs</a></li>
                    <li><a target="_blank" href="https://koa.bootcss.com/">koa2</a></li>
                    <li><a target="_blank" href="https://www.mongodb.org.cn/tutorial/">mongodb</a></li>
                    <li><a target="_blank" href="https://element.eleme.cn/#/zh-CN">element-ul</a></li>
                    <li><a target="_blank" href="https://es6.ruanyifeng.com/">es6学习</a></li>
                </ul>
            </div>
        </div>
    </el-col>
</template>

<style>
.sidebar {
    padding-left: 20px;
}
.tags{
    width: 175px;
}
.tags a {
    color: #337ab7;
    margin-left: 5px;
}
.links ul {
    list-style: none;
    padding-left: 0;
}
.links ul li {
    margin-top: 3px;
}
.links ul li a {
    color: #337ab7;
}
</style>


<script>
export default {
    data(){
        return {
            inputVal:'',
            tags:[],
            token:localStorage.getItem('token')
        }
    },
    created(){
        var _self = this;
        var username = localStorage.getItem('username');
        _self.$axios.get('/blog/tags',{params:{username},headers:{'Authorization':_self.token}})
        .then(res => {
            _self.tags = res.data.data;
        })
        .catch(err => {
            console.error(err); 
        })
    },
    methods:{
        inputSearch(){
            let inputVal = this.inputVal.trim()
            if(!inputVal) {
                return
            }

            this.$router.push({path:'/blog',query:{search:inputVal}})
        }
    }
}
</script>