<template>
  <div class="container">

    <div class="top-box">
      <div class="title">修改图书</div>
      <div class="users">
        <div class="user">标题:</div>
        <input type="text" placeholder="标题" v-model="formData.title">
      </div>
      <div class="users">
        <div class="user">图片:</div>
        <putImg v-model="formData.img"></putImg>
      </div>
      <div class="users">
        <div class="user">作者:</div>
        <input type="text" placeholder="作者" v-model="formData.author">
      </div>
      <div class="users">
        <div class="user">时间:</div>
        <getTime :time="formData.createTime"></getTime>
      </div>
      <div class="users">
        <div class="user">描述:</div>
        <input type="text" placeholder="描述" v-model="formData.desc">
      </div>
      <div class="users">
        <div class="user">index:</div>
        <input type="text" placeholder="index" v-model="formData.index">
      </div>

      <div class="users">
        <div class="user">分类</div>
        <el-select v-model="formData.type" placeholder="请选择">
          <el-option
            v-for="item in classifies"
            :key="item.title"
            :label="item.title"
            :value="item._id">
            <span style="float: left">{{ item.title }}</span>
            <!--<span style="float: right; color: #8492a6; font-size: 13px">{{ item._id }}</span>-->
          </el-option>
        </el-select>
      </div>
      <div id="add-btn">
        <button @click="handleAdd">修改</button>
      </div>
    </div>

  </div>
</template>

<script>
  import getTime from '../../components/timer'
  import putImg from '../../components/upload'
  export default {
    name: "modifyBook",
    components:{putImg,getTime},
    data() {
      return {
        bookArr: [],
        classifies:[],
        formData: {
          author:"",
          createTime: "",
          desc: "",
          img: "",
          index: "",
          title:"",
          type:""
        }
      }
    },
    methods: {
      getbook() {
        let id = this.$route.query.id;
        this.$axios.get(`/book/${id}`).then((res) => {
          this.formData = res.data
        })
      },
      handleAdd() {
        this.$axios.post('/book', this.formData).then((res) => {
          this.formData = {};
          console.log(res);
          if (res.data.code == 200) {
            this.$message(res.data.msg)
          } else {
            this.$message("添加失败")
          }
        });
      },
      getAllClassify() {
        this.$axios.get(`/category`).then((res) => {
          this.classifies = res.data
        })
      },
    },
    created() {
      this.getAllClassify()
      this.getbook()
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
