<template>
    <div class="register-content">
        <Breadcrumb :title="title" />
        <h1>注册</h1>
        <!-- <p>注册暂未开放，如有需要请<router-link to="/contact">联系博主</router-link></p> -->
        <p>请填写下列字段进行注册:</p>
        <el-form :model="ruleForm" label-position="right" label-width="70px" :rules="rules" ref="ruleForm">
            <el-form-item label="用户名" prop="username">
                    <el-input v-model="ruleForm.username" style="width:400px"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input v-model="ruleForm.pass" type="password" autocomplete="off" show-password style="width:400px;"></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="v_code">
                <el-input v-model="ruleForm.v_code" style="width:100px;float:left" />
                <div @click="changeCode" class="captcha">
                    <Sidentify :identifyCode=identifyCode />
                </div>
            </el-form-item>
            <el-form-item>
                <el-button :disabled=isSubmit type="info" @click="submitForm('ruleForm')">注册</el-button>
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
            isSubmit:false,      
            title:'注册',
            ruleForm:{
                username:'',
                pass:'',
                v_code:''
            },
            rules:{
                username:[
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
                ],
                pass:[
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
            this.isSubmit = true;
            let _self = this;
            _self.$refs[formName].validate((valid) => {
            if (valid) {//注册接口
                _self.$axios.post('/user/do-register',{
                        username:_self.ruleForm.username,
                        password:_self.ruleForm.pass,
                    }).then((response) => {
                    if(response.data.code == '002') {
                        this.isSubmit = false;
                        _self.$message.error(response.data.msg);
                        return;
                    } 
                    //注册成功
                    _self.$message({
                        message: '注册成功',
                        type: 'success'
                    });
                    setTimeout(() => {
                        _self.$router.push('/login');
                    },1500)
                })
            } else {
                this.isSubmit = false;
                return false;
            }
         });
        },
        changeCode(){
            this.identifyCode = Math.random().toString(16).substring(3,7);
        }
    },
}
</script>

<style>
.register-content{
    width: 1170px;
    margin-left: auto;
    margin-right: auto;
}
#s-canvas{
    margin-left: 20px;
}
.captcha{
    width: 160px;
    float: left;
}
</style>