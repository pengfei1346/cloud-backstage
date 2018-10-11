<template>
  <div class="all-box">
    <div class="list-box">分类列表</div>
    <el-button type="primary" id="btn" @click="handleAdd">添加分类</el-button>
    <el-table
      :data="classifyArr"
      :default-sort = "{prop: 'index', order: 'descending'}"
      style="width:90%;text-align: center">

      <el-table-column
        label="类型"
        width="120">
        <template slot-scope="scope">
          <el-tag size="medium">{{ scope.row.title }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column
        label="分类总数"
        width="120">
        <template slot-scope="scope">
          {{ scope.row.books.length }}
        </template>
      </el-table-column>

      <el-table-column
        label="分类id"
        width="220">
        <template slot-scope="scope">
          {{ scope.row._id }}
        </template>
      </el-table-column>

      <el-table-column
        label="头像"
        width="120">
        <template slot-scope="scope">
          <img :src="scope.row.icon" style="height: 50px;width: 50px;">
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

  </div>
</template>

<script>
  export default {
    name: "getAllClassify",
    data() {
      return{
        classifyArr:[],
      }
    },
    methods:{
      getAllClassify() {
        this.$axios.get(`/category`).then((res) => {
          this.classifyArr = res.data
          // console.log(res.data);
        })
      },
      handleEdit(index, row) {
        this.$router.push({
          path: '/layout/modifyClassify',
          query: {
            id: row._id
          }
        })
      },
      handleLook(index, row) {
        this.$router.push({
          path: '/layout/getOneClassify',
          query: {
            id: row._id
          }
        })
      },
      handleAdd() {
        this.$router.push("/layout/addClassify")
      },
      handleDelete(index, row) {
        console.log(row._id);
      }
    },
    created(){
      this.getAllClassify()
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
