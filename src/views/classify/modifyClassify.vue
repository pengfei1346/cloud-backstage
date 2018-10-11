<template>
  <div class="container">

    <div class="top-box">
      <div class="title">修改分类</div>
      <div class="users">
        <div class="user">分类标题: </div>
        <input type="text" placeholder="分类标题" v-model="formData.title">
      </div>
      <div class="users">
        <div class="user">分类头图: </div>
        <putImg v-model="formData.icon"></putImg>
      </div>
      <div class="users">
        <div class="user">分类排序: </div>
        <input type="text" placeholder="index" v-model="formData.index">
      </div>

      <div id="add-btn">
        <button @click="handleAdd">修改</button>
      </div>
    </div>

  </div>
</template>

<script>
  import putImg from '../../components/upload'
  export default {
    name: "modifyBook",
    components:{putImg},
    data() {
      return {
        formData: {
          icon: "",
          index: "",
          title:"",
        }
      }
    },
    methods: {
      getClassify() {
        let id = this.$route.query.id;
        this.$axios.get(`/category/${id}`).then((res) => {
          this.formData = res.data
        })
      },
      handleAdd() {
        this.$axios.put('/book', this.formData).then((res) => {
          this.formData = {};
          console.log(res);
          if (res.data.code == 200) {
            this.$message(res.data.msg)
          } else {
            this.$message("修改失败")
          }
        });
      }
    },
    created() {
      this.getClassify()
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
      .title {
        font-size: 28px;
        font-weight: 500;
      }
      .users {
        margin-bottom: 12px;
        height: 80px;
        line-height: 80px;
        .user {
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
