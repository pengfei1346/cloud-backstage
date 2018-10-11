<template>
  <div class="all-box">
    <div class="title">云图书管理系统</div>

    <div class="formGet">
      <div class="ipt">
        <el-input
          placeholder="用户名"
          prefix-icon="el-icon-info"
          v-model="username">
        </el-input>
      </div>

      <div class="ipt">
      <el-input
        placeholder="密码"
        prefix-icon="el-icon-warning"
        v-model="pwd">
      </el-input>
    </div>

      <el-button id="btn" type="primary" @click="hanleLogin">登录</el-button>
    </div>

  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: 'Login',
    data() {
      return {
        username: '11111',
        pwd: '11111'
      }
    },
    methods: {
      hanleLogin() {
        this.$axios.post('/login',
          {username: this.username, password: this.pwd}).then(res => {
          console.log(res.data);
          if (res.data.code == 200) {
            this.$store.commit('SET_INFO',res.data.data);
            this.$message(res.data.msg)
            this.$router.push('/layout');
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .all-box {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #aaa;
    text-align: center;
    .title {
      margin-top: 50px;
      font-size: 38px;
      color: #000;
      font-weight: 700;
    }
    .formGet {
      width: 400px;
      margin: 0 auto;
      .ipt {
        margin: 20px 0;
      }
      #btn {
        width: 400px;
      }
    }
  }

</style>

