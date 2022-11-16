<template>
  <div>
    <input type="number" placeholder="세로" :value="row" @change="onChangeRow" />
    <input type="number" placeholder="가로" :value="cell" @change="onChangeCell" />
    <input type="number" placeholder="지뢰" :value="mine" @change="onChangeMine" />
    <button @click="onClickBtn">시작</button>
  </div>
</template>

<script>
  import { START_GAME } from './store';

  export default {
    // 이 컴포넌트 안에서만 쓸 데이터는 지역 데이터로 선언
    data() {
      return {
        row: 10,
        cell: 10,
        mine: 20,
      };
    },
    methods: {
      onChangeRow(e) {
        this.row = e.target.value;
      },
      onChangeCell(e) {
        this.cell = e.target.value;
      },
      onChangeMine(e) {
        this.mine = e.target.value;
      },
      onClickBtn() {
        this.$store.commit(START_GAME, { row: this.row, cell: this.cell, mine: this.mine });    // 지역 데이터를 만들어서 데이터를 한방에 몰아서 처리
      }
    },
  };
</script>