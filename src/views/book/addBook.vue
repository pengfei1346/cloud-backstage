<template>
  <div class="container">

    <div class="top-box">
      <div class="title">添加图书</div>
      <div class="users">
        <div class="user">链接:</div>
        <input type="text" placeholder="链接" v-model="formData.url">
      </div>
      <div class="users">
        <div class="user">作者:</div>
        <input type="text" placeholder="作者" v-model="formData.author">
      </div>
      <div class="users">
        <div class="user">头图:</div>
        <putImg v-model="formData.img"></putImg>
      </div>

      <div class="users">
        <div class="user">分类</div>
        <el-select v-model="formData.typeId" placeholder="请选择">
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
        <button @click="handleAdd">添加</button>
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
        classifies:[],
        formData: {
          url: "",
          author: "",
          img: "",
          typeId: ""
        }
      }
    },
    methods: {
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
      }
    },
    created() {
      this.getAllClassify()
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
