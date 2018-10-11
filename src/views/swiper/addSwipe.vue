<template>
  <div class="container">

    <div class="top-box">
      <div class="title">添加轮播图</div>
      <div class="users">
        <div class="user">标题: </div>
        <input type="text" placeholder="轮播图标题" v-model="formData.title">
      </div>
      <div class="users">
        <div class="user">头像: </div>
        <putImg v-model="formData.img "></putImg>
      </div>
      <div class="users">
        <div class="user">图书: </div>
        <input type="text" placeholder="图书" v-model="formData.book">
      </div>
      <div class="users">
        <div class="user">index: </div>
        <input type="text" placeholder="index" v-model="formData.index">
      </div>
      <div id="add-btn">
        <button @click="hanleAdd">生成轮播图</button>
      </div>
    </div>


  </div>
</template>

<script>
  import putImg from '../../components/upload'

  export default {
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
