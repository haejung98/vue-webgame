<!-- 최상위 부모 컴포넌트 -->
<template>
  <div>
    <div>{{turn}}님의 턴입니다.</div>
    <table-component :table-data="tableData" />
    <div v-if="winner">{{winner}}님의 승리!</div>
  </div>
</template>

<script>
  import TableComponent from './TableComponent';
  export default {
    components: {
      TableComponent,
    },
    data() {
      return {
        tableData: [
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
        ],
        turn: 'O', // o팀, x팀 차례
        winner: '',
      };
    },
    computed: {
      
    },
    methods: {
      onChangeData() {
        // this.tableData[1][0] = 'X'; 작동하지 않음
        this.$set(this.tableData[1], 0, 'X'); // Vue.set과 동일
      }
    },
    mounted() {

    },
    beforeDestroy() {

    },
    watch: {

    },
  };
</script>

<style>
  table {
    border-collapse: collapse;
  }
  td {
    border: 1px solid black;
    width: 40px;
    height: 40px;
    text-align: center;
  }
</style>