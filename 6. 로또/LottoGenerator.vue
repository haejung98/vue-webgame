<template>
  <div>
    <div>당첨 숫자</div>
    <div id="결과창">
      <lotto-ball v-for="ball in winBalls" :key="ball" :number="ball"></lotto-ball> <!--lotto-ball 컴포넌트를 사용함 (부모 : LottoGenerator, 자식 : LottoBall) -->
      <!-- v-bind:number="ball"가 LottoBall로 전달된다 -> props: ['number'] -->
      <!-- 데이터는 LottoGenerator에서 뽑고 LottoBall.vue에서 데이터를 표시함 -->
    </div>
    <div>보너스</div>
    <lotto-ball v-if="bonus" :number="bonus"></lotto-ball>
    <button v-if="redo" @click="onClickRedo">한 번 더!</button>
  </div>
</template>

<script>
import LottoBall from './LottoBall.vue';

  // 로또 숫자 뽑기
  function getWinNumbers() {
    const candidate = Array(45).fill().map((v, i) => i + 1);
    const shuffle = [];
    while (candidate.length > 0) {
      shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length - 1];
    const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
    return [...winNumbers, bonusNumber];
  }

  const timeouts = [];
  export default {
    components: { 
      'lotto-ball': LottoBall
      // LottoBall
    },
    data() {
      // 공,숫자,색깔,한번더 버튼
      // 공이 7개 있는건 중복 -> 컴포넌트로 만들어주기
      // 공모양은 동일하지만 숫자와 색깔이 다름
      return {
        winNumbers: getWinNumbers(),  // 처음에 숫자 7개 한방에 다 뽑음
        winBalls: [], // winNumbers에 있는 숫자를 1초마다 하나씩 winBalls로 옮김, 시각적 용도
        bonus: null,
        redo: false, // 한번 더 버튼 보일지 안보일지
      }
    },
    computed: {
      
    },
    methods: {
      onClickRedo() { // 한번 더 버튼
        // 초기화
        this.winNumbers = getWinNumbers();
        this.winBalls = [];
        this.bonus = null;
        this.redo = false;
        // 다시 뽑기
        this.showBalls();
      },
      showBalls() {
        for (let i = 0; i < this.winNumbers.length - 1; i++) {
          timeouts[i] = setTimeout(() => {
            this.winBalls.push(this.winNumbers[i]);
          }, (i + 1) * 1000);
        }
        timeouts[6] = setTimeout(() => { // 보너스 공
          this.bonus = this.winNumbers[6]; // 7개 공 중에 마지막 숫자
          this.redo = true; // 한번 더 버튼
        }, 7000);
      },
    },
    mounted() {
      this.showBalls();
    },
    beforeDestroy() {
      timeouts.forEach((t) => {
        clearTimeout(t);
      });
    },
    // watch: {
    //   // winBalls가 바뀔때마다 실행된다.
    //   winBalls(val, oldValue) { // 지켜볼 대상
    //   console.log(val, oldValue);
    //     if (val.length === 0) { // 한번 더 버튼을 누르면 winBalls가 빈배열이 된다.
    //       this.showBalls();
    //     }
    //   }
    // }
  };
</script>