<template>
    <table>
      <!-- slot은 자식 컴포넌트에서 화면에 표시되어야할 내용을 부모 컴포넌트에 적어줌으로써 부모컴포넌트의 데이터나 메서드에 접근할 수 있다. -->
      <slot /> <!-- TicTacToe.vue에서 <table-component></table-component> 컴포넌트 사이에 태그를 넣어주면 그 안에 있는게 들어와서 화면 렌더링, props와 비슷 -->
        <!--<tr-component v-for="(rowData, index) in tableData" :key="index" :row-index="index"></tr-component> tr이 row -->
    </table>
</template>

<script>
  import TrComponent from './TrComponent';
  export default {
    // components: {
    //     TrComponent,
    // },
    // computed: {
    //   tableData() {
    //     return this.$store.state.tableData;
    //   },
    //   turnMessage() {
    //     return this.$store.getters.turnMessage;
    //   }
    // },
    
  };
</script>