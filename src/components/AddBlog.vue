<template>
    <div class="add-blog-content">
        <Breadcrumb :title="title" />
        <el-form :model="ruleForm" label-position="right" label-width="70px" :rules="rules" ref="ruleForm">
            <el-form-item label="标题" prop="title">
                    <el-input v-model="ruleForm.title"></el-input>
            </el-form-item>
            <el-form-item label="标签" prop="tags">
                <el-input v-model="ruleForm.tags"></el-input>
            </el-form-item>
            <el-form-item label="内容" prop="content">
                <editor-bar v-model="ruleForm.content"></editor-bar>
            </el-form-item>
            <el-form-item>
                <el-button :disabled=isSubmit type="primary" @click="submitForm('ruleForm')">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import Breadcrumb from '@/components/common/Breadcrumb.vue'
import EditorBar from '@/components/common/Editor.vue'
export default {
    components:{
        Breadcrumb,
        EditorBar
    },
    data(){
        return {
            isSubmit:false,
            title: '新增博文',
            token:localStorage.getItem('token'),
            ruleForm:{
                title:'',
                tags:'',
                content:''
            },
            rules:{
                title:[
                    { required: true, message: '请输入标题', trigger: 'blur' },
                    { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
                ],
                tags:[
                    {required:true, message: '标签不能为空', trigger: 'blur'}
                ],
                content:[
                    {required:true, message: '内容不能为空', trigger: 'blur'}
                ]
            },
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
    },
    methods:{
        submitForm(formName){
            this.isSubmit = true;
            let _self = this;
            _self.$refs[formName].validate((valid) => {
                if (valid) {
                    _self.$axios.post('/blog/add',{
                        username:localStorage.getItem('username'),
                        title:_self.ruleForm.title,
                        tags:_self.ruleForm.tags,
                        content:_self.ruleForm.content,
                    },{headers:{'Authorization':_self.token}})
                    .then(res => {
                        if(res.data.code == '002') {
                            _self.$message.error(res.data.msg);
                            _self.isSubmit = false;
                            return;
                        }

                        _self.$message({
                            message: '添加成功',
                            type: 'success'
                        });
                        setTimeout(()=>{
                            _self.$router.push('/')
                        },2000)
                    })
                    .catch(err => {
                        console.error(err); 
                    })
                } else {
                    this.isSubmit = false;
                    return false;
                }
            })
        }
    }
}
</script>

<style>
.add-blog-content{
    width: 1170px;
    margin-left: auto;
    margin-right: auto;
}
</style>