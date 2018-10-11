<template>
  <div class="big-box">
    <el-form :model="ruleForm"
             status-icon
             :rules="rules"
             ref="ruleForm"
             label-width="100px"
             class="demo-ruleForm">
      <el-form-item label="旧密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="new_password">
        <el-input type="password" v-model="ruleForm.new_password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleModify('ruleForm')">点击提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
  export default {
    name: "modify",
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          password: '',
          new_password: '',
        },
        rules: {
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          new_password: [
            { validator: validatePass, trigger: 'blur' }
          ],
        }
      }
    },
    methods: {
      handleModify(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.ruleForm.password != this.ruleForm.new_password ){
              this.$axios.put('/user/password',
                {password:this.ruleForm.password,new_password:this.ruleForm.new_password}).then((res) => {
                console.log(res);
                if(res.code == 200){
                  this.$message('修改成功');
                } else{
                  console.log(res);
                }
              })
            } else{
              this.$message('新密码不能和旧密码相同');
            }

          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped lang="">
  .big-box{
    margin-left: 220px;
    margin-top: 50px;
    width: 500px;
  }
</style>
