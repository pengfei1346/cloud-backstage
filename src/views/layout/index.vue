<template>
  <div class="all-box">
    <div class="left-box">
      <el-menu default-active="2" class="el-menu-vertical-demo"
               :router="true"
               text-color="#fff"
               background-color="#545c64">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">用户管理</span>
          </template>
          <el-menu-item-group>
            <span slot="title">用户管理</span>
            <el-menu-item index="/layout/userList">用户列表</el-menu-item>
            <el-menu-item index="1-2">添加用户</el-menu-item>
            <el-menu-item index="1-3">删除用户</el-menu-item>
            <el-menu-item index="1-4">修改用户</el-menu-item>
            <el-menu-item index="1-5">获取用户</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">轮播图管理</span>
          </template>
          <el-menu-item-group>
            <span slot="title">轮播图管理</span>
            <el-menu-item index="/layout/swipeList">获取全部轮播图</el-menu-item>
            <el-menu-item index="/layout/addSwipe">添加轮播图</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">分类管理</span>
          </template>
          <el-menu-item-group>
            <span slot="title">分类管理</span>
            <el-menu-item index="/layout/getAllClassify">获取全部分类</el-menu-item>
            <el-menu-item index="/layout/addClassify">添加分类</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">图书管理</span>
          </template>
          <el-menu-item-group>
            <span slot="title">图书管理</span>
            <el-menu-item index="/layout/getBook">获取图书</el-menu-item>
            <el-menu-item index="/layout/addBook">添加图书</el-menu-item>
            <el-menu-item index="/layout/deleteBook">删除图书</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-document"></i>
            <span slot="title">管理员用户</span>
          </template>
          <el-menu-item-group>
            <span slot="title">管理员管理</span>
            <el-menu-item index="/layout/addAdmin">添加管理员</el-menu-item>
            <el-menu-item index="/layout/getAdmin">获取管理员</el-menu-item>
            <el-menu-item index="/layout/modifyInfo">修改信息</el-menu-item>
            <el-menu-item index="/layout/modifyPassword">修改密码</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

      </el-menu>
    </div>

    <div class="right-box">
      <div class="top-box">
        <div class="top-box-left">云图书后台管理系统</div>

        <div class="top-box-right">
          <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            <img :src="userInfo.avatar" style="width: 40px;height: 40px;">
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click="modifyInfo">修改信息</el-dropdown-item>
              <el-dropdown-item  @click="outLogin">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>

      </div>

      <div class="bottom-box">
        <router-view></router-view>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        isCollapse: true,
        userInfo:{}
      }
    },
    methods: {
      modifyInfo(){
        this.$router.push('/modifyInfo')
      },
      getInfo() {
        this.userInfo = this.$store.state.info;
      },
      getUser() {
        this.$axios.get('/user').then((res) => {
          // console.log(res);
        })
      },
      outLogin() {
        this.$axios.get('/logout').then((res) => {
          console.log(res);
          if (res.code == 200) {
            this.$store.commit('CLEAR_INFO');
            this.$message(res.msg)
            this.$router.push('/login')
          }
        })
      }
    },
    created() {
      this.getInfo()
    }
  }
</script>

<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

  .el-menu {
    background-color: rgb(48, 65, 86);
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    position: fixed;
    bottom: 0;
    top: 0;
    z-index: 999;
    width: 200px;
    min-height: 400px;
  }
</style>

<style scoped lang="less">
  .left-box {
    width: 20%;
    float: left;
    position: relative;
  }

  .right-box {
    width: 84%;
    float: right;
    .top-box {
      text-align: center;
      width: 96%;
      height: 50px;
      line-height: 50px;
      /*background: #ff0;*/
      .top-box-left {
        font-weight: 700;
        font-size: 28px;
        width: 300px;
        margin-left: 250px;
        float: left;
      }
      .top-box-right {
        width: 100px;
        margin-right: 30px;
        float: right;
      }
    }
    .bottom-box {
      width: 100%;
    }
  }

</style>
