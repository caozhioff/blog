<template>
    <div class="login-content">
        <Breadcrumb :title="title" />
        <h1>登录</h1>
        <p>请填写下列字段进行登录:</p>
        <el-form :model="ruleForm" label-position="right" label-width="70px" :rules="rules" ref="ruleForm">
            <el-form-item label="用户名" prop="username">
                    <el-input v-model="ruleForm.username" style="width:400px"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input v-model="ruleForm.pass" type="password" autocomplete="off" show-password style="width:400px;"></el-input>
            </el-form-item>
            <el-form-item >
                <el-checkbox v-model="ruleForm.remember_me">记住我</el-checkbox>
            </el-form-item>
            <!-- <p class="forget-pass">如果您忘记了您的密码，可以重置密码</p> -->
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
            </el-form-item>
        </el-form>
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
            title:'登录',
            ruleForm:{
                username:'',
                pass:'',
                remember_me:false
            },
            rules:{
                username:[
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                pass:[
                    {required:true, message: '密码不能为空', trigger: 'blur'}
                ]
            }
        }
    },
    methods:{
        submitForm(formName){
            this.$refs[formName].validate((valid) => {
            if (valid) {
                alert('submit!');
            } else {
                console.log('error submit!!');
                return false;
            }
         });
        }
    }
}
</script>


<style>
.login-content{
    width: 1170px;
    margin-left: auto;
    margin-right: auto;
}
.forget-pass{
    margin-left: 60px;
}
</style>