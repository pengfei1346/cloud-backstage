<template>
  <div class="container">

    <div class="top-box">
      <div class="title">修改轮播图</div>
      <div class="users">
        <div class="user">标题:</div>
        <input type="text" placeholder="标题" v-model="formData.title">
      </div>
      <div class="users">
        <div class="user">对应图书:</div>
        <input type="text" placeholder="对应图书" v-model="book.title">
      </div>
      <div class="users">
        <div class="user">图片:</div>
        <putImg v-model="formData.img"></putImg>
      </div>
      <div class="users">
        <div class="user">sort:</div>
        <input type="text" placeholder="sort" v-model="formData.sort">
      </div>
      <div class="users">
        <div class="user">index:</div>
        <input type="text" placeholder="index" v-model="formData.index">
      </div>
      <div id="add-btn">
        <button @click="handleModify">修改</button>
      </div>
    </div>

  </div>
</template>

<script>
  import getTime from '../../components/timer'
  import putImg from '../../components/upload'
  export default {
    components:{putImg},
    data() {
      return {
        bookArr: [],
        book:{},
        formData: {
          title:"",
          img: "",
          index: "",
          sort:""
        }
      }
    },
    methods: {
      getSwipe() {
        let id = this.$route.query.id;
        this.$axios.get(`/swiper/${id}`).then((res) => {
          this.formData = res.data;
          this.book = res.data.book
          console.log(res);
        })
      },
      handleModify() {
        let id = this.$route.query.id;
        this.$axios.put(`/swiper/${id}`, this.formData).then((res) => {
          this.book = {}
          this.formData = {};
          if (res.data.code == 200) {
            this.$message(res.data.msg)
          } else {
            this.$message("修改失败")
          }
        });
      },
    },
    created() {
      this.getSwipe()
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
