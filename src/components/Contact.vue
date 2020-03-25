<template>
    <div class="contact">
        <Breadcrumb :title="title" />
        <div class="contact-content">
            <h1>联系我</h1>
            <p>如果您有什么业务或者问题要联系博主，请填写下面的表单，谢谢。</p>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="50px">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="ruleForm.name" style="width:400px;"></el-input>
                </el-form-item>
                <el-form-item label="内容" prop="desc">
                    <el-input type="textarea" v-model="ruleForm.desc" style="width:400px;"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="info" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
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
            title: '联系我',
            ruleForm: {
                name: '',
                desc: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                desc: [
                    { required: true, message: '请填写内容', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
}
</script>

<style>
.contact{
    width: 1170px;
    margin-left: auto;
    margin-right: auto;
}
</style>