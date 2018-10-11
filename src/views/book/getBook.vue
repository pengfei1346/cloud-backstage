<template>
  <div class="all-box">
    <div class="list-box">图书列表</div>
    <el-button type="primary" id="btn" @click="handleAdd">添加图书</el-button>
    <el-table
      :data="bookArr"
      :default-sort = "{prop: 'index', order: 'descending'}"
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
        sortable
        prop="index"
        width="180">
        <!--<template slot-scope="scope">-->
          <!--{{ scope.row.index }}-->
        <!--</template>-->
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">修改
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
    components:{getTime},
    data() {
      return {
        bookArr: [],
        bookId:"5b6ca135feeb050664fe8862"
      }
    },
    methods: {
      getBook() {
        let id = this.$route.query.id;
        if(id){
          this.$axios.get(`/book/${id}`).then((res) => {
            // console.log(res.data);
            this.bookArr = new Array(res.data)
          })
        } else {
          this.$axios.get('/book').then((res) => {
            console.log(res.data);
            this.bookArr = res.data
          })
        }
      },
      handleAdd() {
        this.$router.push("/layout/addBook")
      },
      handleEdit(index, row) {
        this.$router.push({
          path: '/layout/modifyBook',
          query: {
            id: row._id
          }
        })
      },
      handleDelete(index, row) {
        this.$axios.delete(`/book/${row._id}`).then((res) => {
          console.log(res.data);
        })
      }
    },
    created() {
      this.getBook();
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
