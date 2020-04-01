<template>
    <div class="my-info">
        <Breadcrumb :title="title" />
        <editor-bar v-model="detail"></editor-bar>
        <div class="sub">
            <el-button type="info" @click="submit">提交</el-button>
        </div>
    </div>
</template>

<script>
import Breadcrumb from '@/components/common/Breadcrumb.vue'
import EditorBar from '@/components/common/Editor.vue'

export default {
    components:{
        EditorBar,
        Breadcrumb
    },
    data(){
        return {
            title:'修改关于我',
            detail:'',
            is_edit:false,
            token:localStorage.getItem('token'),
            username:localStorage.getItem('username')
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
        _self.$axios.get('/my/my',{params:{username:_self.username},headers:{'Authorization':_self.token}}).then((response) => {
            if (response.data.code == '001') {
                _self.detail = response.data.data.info;
                _self.is_edit = _self.detail ? true : false;
                return;
            } 
        })
    },
    methods:{
        submit(){
            var _self = this;
            if (!_self.detail) {
                _self.$message.error('内容不能为空');
                return;
            }
            _self.$axios.post('/my/addMy',{
                info:_self.detail,
                username:_self.username,
                is_edit:_self.is_edit
            },{headers:{'Authorization':_self.token}}).then((response) => {
                if(response.data.code == '002') {
                    _self.$message.error(response.data.msg);
                    return;
                }

                _self.$message({
                    message: '操作成功',
                    type: 'success'
                });
                setTimeout(()=>{
                    _self.$router.push('/about')
                },3000)
            })
        }
    }
}
</script>

<style>
.my-info{
    width: 1170px;
    margin-left: auto;
    margin-right: auto;
}
.sub{
    margin-top: 30px;
}
table {
    border-spacing: 0;
    border-collapse: collapse;
}
th {
    padding: 5px 15px;
    border: 1px solid #eee;
}
tr {
    background-color: #fff;
    border-top: 1px solid #ccc;
}
td {
    padding: 5px 15px;
    border: 1px solid #eee;
}
</style>