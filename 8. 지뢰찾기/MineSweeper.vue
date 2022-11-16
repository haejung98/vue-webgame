<template>
  <div>
    <mine-form />
    <div>{{timer}}</div>
    <table-component />
    <div>{{result}}</div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  import store, { INCREMENT_TIMER } from './store';
  import TableComponent from './TableComponent';
  import MineForm from './MineForm';

  let interval;
  export default {
    store,
    components: {
      TableComponent,
      MineForm,
    },
    computed: {
      ...mapState(['timer', 'result', 'halted']), // store의 state를 mapState로 가져옴
    },
    methods: {
    },
    watch: {  //어떤값이 바꼈는지 안바꼈는지 지켜보는, 감시하는 기능
      halted(value, oldValue) {
        if(value === false) { // false일때 게임 시작
          interval = setInterval(() => {
            this.$store.commit(INCREMENT_TIMER);
          }, 1000); // 1초마다 타이머 1씩 올려줌
        } else {  // 게임중단
          clearInterval(interval);
        }
      }
    }
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