<template>
  <div class="all-box">
    <div class="list-box">分类图书列表</div>
    <el-button type="primary" id="btn" @click="handleAdd">添加图书</el-button>
    <el-table
      :data="bookArr"
      style="width:90%;text-align: center">
      <el-table-column
        label="日期"
        width="200">
        <template slot-scope="scope">
          <getTime :time="scope.row.createTime"></getTime>
        </template>
      </el-table-column>
      <el-table-column
        label="作者"
        width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p style="width: 1000px;">描述: {{ scope.row.desc }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.author }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column
        label="头像"
        width="180">
        <template slot-scope="scope">
          <img :src="scope.row.img" style="height: 50px;width: 50px;">
        </template>
      </el-table-column>

      <el-table-column
        label="index"
        width="180">
        <template slot-scope="scope">
          {{ scope.row.index }}
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleLook(scope.$index, scope.row)">查看
          </el-button>
          <el-button
            size="mini"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
  import getTime from '../../components/timer'
  export default {
    name: "getAllClassify",
    components:{getTime},
    data() {
      return{
        bookArr:[],
        id:"",
        classifyId:""
      }
    },
    methods:{
      handleGet(){
        let classifyId = this.$route.query.id;
        this.$axios.get(`/category/${classifyId}/books`).then((res) => {
          // console.log(res);
          this.bookArr = res.data.books
        })
      },
      handleLook(index, row) {
        this.$router.push({
          path: '/layout/getBook',
          query: {
            id: row._id
          }
        })
      },
      handleAdd() {
        this.$router.push("/layout/addBook")
      },
      handleDelete(index, row) {
        let clId = this.$route.query.id
        this.$axios.delete(`/category/${clId}/book/${row._id}`).then((res)=>{
          if(res.data.code == 200){
            this.$message(res.data.msg)
          }
        })
      },
    },
    created(){
      this.handleGet();
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
