<template>
  <table>
    <tr v-for="(rowData, rowIndex) in tableData" :key="rowIndex">
      <td
        v-for="(cellData, cellIndex) in rowData" :key="cellIndex" :style="cellDataStyle(rowIndex, cellIndex)"
        @click="onClickTd(rowIndex, cellIndex)"
        @contextmenu.prevent="onRightClickTd(rowIndex, cellIndex)"
      >
        {{cellDataText(rowIndex, cellIndex)}}
      </td>
    </tr>
  </table>
</template>

<script>
  import { mapState } from 'vuex';
   import { CLICK_MINE, CODE, FLAG_CELL, NORMALIZE_CELL, OPEN_CELL, QUESTION_CELL } from './store';

  export default {
    computed: {
      ...mapState(['tableData', 'halted']),

      // computed에서 함수 쓸땐 바깥은 일반함수, 안쪽은 화살표함수 쓴다. => 그래야 this를 쓸 수 있음
      // cellDataStyle: (state) => (row, cell) => {}
      // cellDataStyle(state) { return (row, cell) => {} }
      cellDataStyle(state) {
        return (row, cell) => {
          switch (this.$store.state.tableData[row][cell]) {
            case CODE.NORMAL:
            case CODE.MINE:
              return {
                background: '#444',
              };
            case CODE.CLICKED_MINE:
            case CODE.OPENED:
              return {
                background: 'white',
              };
            case CODE.FLAG:
            case CODE.FLAG_MINE:
              return {
                background: 'red',
              };
            case CODE.QUESTION:
            case CODE.QUESTION_MINE:
              return {
                background: 'yellow',
              };
            default:
              return {};
          }
        };
      },
      //cellDataText: () => (row, cell) => {  // 고차함수(함수를 확장)
      cellDataText() {
        return (row, cell) => {
          switch(this.$store.state.tableData[row][cell]) {
          case CODE.MINE:
              return 'X';
            case CODE.NORMAL:
              return '';
            case CODE.FLAG_MINE:
            case CODE.FLAG:
              return '!';
            case CODE.QUESTION_MINE:
            case CODE.QUESTION:
              return '?';
            case CODE.CLICKED_MINE:
              return '펑';
            default:
              return this.$store.state.tableData[row][cell] || '';
          }
        }
      },
    },
    methods: {
      onClickTd(row, cell) {
        if (this.halted) {  // 게임 중단된 경우 실행되지 않게
          return;
        }
        switch (this.tableData[row][cell]) {
          case CODE.NORMAL:
            return this.$store.commit(OPEN_CELL, { row, cell });
          case CODE.MINE:
            return this.$store.commit(CLICK_MINE, { row, cell });
          default:
            return;
        }
      },
      onRightClickTd(row, cell) { // 마우스 오른쪽 클릭
        if (this.halted) {  // 게임 중단된 경우 실행되지 않게
          return;
        }
        switch (this.tableData[row][cell]) {
          case CODE.NORMAL:
          case CODE.MINE:
            this.$store.commit(FLAG_CELL, { row, cell });         // 빈칸일때 오른쪽 클릭하면 깃발
            return;
          case CODE.FLAG_MINE:
          case CODE.FLAG:
            this.$store.commit(QUESTION_CELL, { row, cell });     // 깃발일때 오른쪽 클릭하면 물음표
            return;
          case CODE.QUESTION_MINE:
          case CODE.QUESTION:
            this.$store.commit(NORMALIZE_CELL, { row, cell });    // 물음표일때 오른쪽 클릭하면 빈칸
            return;
          default:
            return;
        }
      }
    },
  };
</script>