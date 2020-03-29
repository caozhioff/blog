<template>
    <div class="login-content">
        <Breadcrumb :title="title" />
        <h1>登录</h1>
        <p>请填写下列字段进行登录:</p>
        <el-form :model="ruleForm" label-position="right" label-width="70px" :rules="rules" ref="ruleForm">
            <el-form-item label="用户名" prop="username">
                    <el-input v-model="ruleForm.username" style="width:400px"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="ruleForm.password" type="password" autocomplete="off" show-password style="width:400px;"></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="v_code">
                <el-input v-model="ruleForm.v_code" style="width:100px;float:left" />
                <div @click="changeCode" class="captcha">
                    <Sidentify :identifyCode=identifyCode />
                </div>
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
import Sidentify from '@/components/common/Sidentify.vue'

export default {
    components:{
        Breadcrumb,
        Sidentify
    },
    data(){
        //自定义验证规则
        var verifyCode = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入验证码'));
            }
            setTimeout(() => {
                if (value != this.identifyCode) {
                    return callback(new Error('验证码有误'));
                } else {
                    callback();
                }
            },100)
        };
        return {
            title:'登录',
            ruleForm:{
                username:'',
                password:'',
                remember_me:false,
                v_code:''
            },
            rules:{
                username:[
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                ],
                password:[
                    {required:true, message: '密码不能为空', trigger: 'blur'}
                ],
                v_code:[
                    {validator:verifyCode,trigger: 'blur'}
                ]
            },
            identifyCode:Math.random().toString(16).substring(3,7)
        }
    },
    methods:{
        submitForm(formName){
            let _self = this;
            _self.$refs[formName].validate((valid) => {
            if (valid) {
                _self.$axios.post('/user/login',{
                    username:_self.ruleForm.username,
                    password:_self.ruleForm.password,
                    remember_me:_self.ruleForm.remember_me,
                })
                .then(res => {
                    if(res.data.code == '002') {
                        _self.$message.error(res.data.msg);
                        return;
                    }
                    
                    localStorage.setItem('token', res.data.data.token);
                    _self.$message({
                        message: '登录成功，即将跳转',
                        type: 'success'
                    });

                    setTimeout(() => {
                        _self.$router.push('/');
                    },2000)
                })
                .catch(err => {
                    console.error(err); 
                })
            } else {
                console.log('error submit!!');
                return false;
            }
         });
        },
        changeCode(){
            this.identifyCode = Math.random().toString(16).substring(3,7);
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