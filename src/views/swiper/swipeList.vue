<template>
  <div class="all-box">
    <div class="list-box">轮播图列表</div>
    <el-button type="primary" id="btn" @click="handleAdd">添加轮播图</el-button>
    <el-table
      :data="swipeArr"
      :default-sort = "{prop: 'index', order: 'descending'}"
      style="width:90%;text-align: center">

      <el-table-column
        label="title"
        width="120">
        <template slot-scope="scope">
          <el-tag size="medium">{{ scope.row.title }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column
        label="轮播图id"
        width="220">
        <template slot-scope="scope">
          {{ scope.row._id }}
        </template>
      </el-table-column>

      <el-table-column
        label="轮播图"
        width="120">
        <template slot-scope="scope">
          <img :src="scope.row.img" style="height: 50px;width: 50px;">
        </template>
      </el-table-column>

      <el-table-column
        label="index"
        sortable
        prop="index"
        width="80">
        <!--<template slot-scope="scope">-->
        <!--{{ }}-->
        <!--</template>-->
      </el-table-column>

      <el-table-column
        label="sort"
        sortable
        prop="sort"
        width="80">
        <!--<template slot-scope="scope">-->
        <!--{{ }}-->
        <!--</template>-->
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
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

    <div class="page">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="2"
        :total="pageCount"
        @current-change="handleNext">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return{
        swipeArr:[],
        pageCount:0,
        pn:1
      }
    },
    methods:{
      getSwipeList() {
        let pn = this.pn;
        this.$axios.get(`/swiper?pn=${pn}&size=2`).then((res) => {
          this.swipeArr = res.data;
        })
      },
      getCount() {
        this.$axios.get(`/swiper`).then((res) => {
          // console.log(res.data);
          this.pageCount = res.data.length;
        })
      },
      handleEdit(index, row) {
        this.$router.push({
          path: '/layout/modifySwipe',
          query: {
            id: row._id
          }
        })
      },
      handleLook(index, row) {
        this.$router.push({
          path: '/layout/getSwipe',
          query: {
            id: row._id
          }
        })
      },
      handleAdd() {
        this.$router.push("/layout/addSwipe")
      },
      handleDelete(index, row) {
        console.log(row._id);
      },
      handleNext(val) {
        console.log(val);
        this.pn = val;
        this.getSwipeList();
      }
    },
    created(){
      this.getSwipeList()
      this.getCount()
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
