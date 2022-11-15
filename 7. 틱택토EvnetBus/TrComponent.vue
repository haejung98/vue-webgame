<template>
    <tr>
        <td-component v-for="(cellData, index) in rowData" :key="index" :cell-data="cellData" :cell-index="index" :row-index="rowIndex"></td-component>
    </tr>
</template>

<script>
  import TdComponent from './TdComponent';
  export default {
    components: {
        TdComponent,
    },
    props: {
        rowData: Array,
        rowIndex: Number,
    },
    data() {
      return {
        parent: '내가 니 애비다',
      };
    },
    computed: {
      
    },
    methods: {
     
    },
    mounted() {

    },
    beforeDestroy() {

    },
    watch: {

    },
  };
</script>