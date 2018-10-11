<template>
  <div class="all-box">
    <div class="list-box">轮播图</div>
    <el-table
      :data="bookArr"
      style="width:90%;text-align: center">

      <el-table-column
        label="图书"
        width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p style="width: 1000px;">图书: {{ scope.row.book.title }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.title }}</el-tag>
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
        label="sort"
        width="120">
        <template slot-scope="scope">
          {{ scope.row.sort }}
        </template>
      </el-table-column>
      <el-table-column
        label="index"
        width="120">
        <template slot-scope="scope">
          {{ scope.row.index }}
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

  </div>
</template>

<script>
  export default {
    name: "getAllClassify",
    data() {
      return{
        bookArr:[],
        id:""
      }
    },
    methods:{
      getSwipe(){
        let id = this.$route.query.id;
        this.$axios.get(`/swiper/${id}`).then((res) => {
          // console.log(res);
          this.bookArr = new Array(res.data)
        })
      },
      handleDelete(index, row) {
        // console.log(row._id);
        // this.$axios.delete(`/book/${row._id}`).then((res)=>{
        //   if(res.data.code == 200){
        //     this.$message(res.data.msg)
        //   }
        // })
      },
    },
    created(){
      this.getSwipe();
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
