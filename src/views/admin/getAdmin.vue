<template>
  <div class="all-box">
    <div class="list-box">管理员列表</div>
    <el-button type="primary" id="btn" @click="handleAdd">添加管理员</el-button>
    <el-table
      :data="adminArr"
      style="width:96%;text-align: center">
      <el-table-column
        label="日期"
        width="180">
        <template slot-scope="scope">
          <getTime :time="scope.row.createdTime"></getTime>
        </template>
      </el-table-column>
      <el-table-column
        label="姓名"
        width="100">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column
        label="昵称"
        width="100">
        <template slot-scope="scope">
          {{ scope.row.nickname }}
        </template>
      </el-table-column>
      <el-table-column
        label="头像"
        width="100">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" style="height: 50px;width: 50px;">
        </template>
      </el-table-column>
      <el-table-column
        label="邮箱"
        width="100">
        <template slot-scope="scope">
          {{ scope.row.email }}
        </template>
      </el-table-column>
      <el-table-column
        label="描述"
        width="140">
        <template slot-scope="scope">
          {{ scope.row.desc }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="page">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="5"
        :total="pageCount"
        @current-change="handleNext">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import getTime from '../../components/timer'
  export default {
    components:{getTime},
    data() {
      return {
        adminArr: [],
        pageCount:0,
        pn:1
      }
    },
    methods: {
      getUser() {
        let pn = this.pn;
        this.$axios.get(`/user?pn=${pn}&size=5`).then((res) => {
          // console.log(res.data);
          this.adminArr = res.data
        })
      },
      getCount() {
        this.$axios.get(`/user`).then((res) => {
          this.pageCount = res.data.length;
        })
      },
      handleAdd() {
        this.$router.push("/layout/addAdmin")
      },
      handleEdit(index, row) {
        // console.log(row._id);
      },
      handleDelete(index, row) {
        let id = row._id;
        this.$axios.post('/user/delete',{userIds:id}).then((res) => {
          // console.log(res);
          if(res.data.code == 200){
            this.$message('删除成功');
            this.getUser()
          }
        })
      },
      handleNext(val) {
        this.pn = val;
        this.getUser()
      }
    },
    created() {
      this.getUser();
      this.getCount();
    }
  }
</script>

<style>
  .el-table th>.cell{
    text-align: center;
  }
</style>
<style scoped lang="less">
  .all-box{
    .list-box{
        font-size: 18px;
      font-weight: 600;
      color: #383838;
    }
    #btn{
      margin: 20px 0;
    }
  }
</style>
