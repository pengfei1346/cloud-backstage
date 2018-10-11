<template>
  <div class="container">

    <div class="top-box">
      <div class="title">添加管理员</div>
      <div class="users">
        <div class="user">用户名: </div>
        <input type="text" placeholder="用户名" v-model="formData.username">
      </div>
      <div class="users">
        <div class="user">密码: </div>
        <input type="text" placeholder="密码" v-model="formData.password">
      </div>
      <div class="users">
        <div class="user">昵称: </div>
        <input type="text" placeholder="密码" v-model="formData.nickname">
      </div>
      <div class="users">
        <div class="user">头像: </div>
        <putImg v-model="formData.avatar"></putImg>
      </div>
      <div class="users">
        <div class="user">邮箱: </div>
        <input type="text" placeholder="邮箱" v-model="formData.email">
      </div>
      <div class="users">
        <div class="user">描述: </div>
        <input type="text" placeholder="描述" v-model="formData.desc">
      </div>
      <div id="add-btn">
        <button @click="hanleAdd">添加</button>
      </div>
    </div>


  </div>
</template>

<script>
  import putImg from '../../components/upload'

  export default {
    name: "addAdmin",
    components: {
      putImg
    },
    data() {
      return {
        formData: {
          username: "",
          password: "",
          nickname:"",
          desc: "",
          avatar: "",
          email:""
        }
      }
    },
    methods: {
      hanleAdd() {
        this.$axios.post('/user', this.formData).then((res) => {
          this.formData = {};
          if (res.data.code == 200) {
            this.$message(res.data.msg)
          } else {
            this.$message("添加失败")
          }
        });
      }
    }
  }
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

<style scoped lang="less">
  input {
    width: 600px;
    height: 50px;
    margin: 20px 0;
  }

  .container {
    width: 800px;
    .top-box {
      margin-top: 10px;
      height: 220px;
      .title{
        font-size: 28px;
        font-weight: 500;
      }
      .users{
        margin-bottom: 12px;
        height: 80px;
        line-height: 80px ;
        .user{
          width: 70px;
          float: left;
        }
      }
    }
    #add-btn {
      margin-top: 20px;
      button {
        padding: 20px 0;
        margin: 0 auto;
        width: 140px;
        height: 30px;
        font-size: 18px;
        line-height: 4px;
        border-radius: 6px;
        text-align: center;
        outline: none;
        border: none;
        color: #fff;
        background: #f00;
      }
    }
  }
</style>
