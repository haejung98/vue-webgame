<!-- 자바스크립트 파일
1. NumberBaseball.vue = vue 컴포넌트
2. wordRelay.vue -->

<template>
    <div>
        <h1>{{result}}</h1>
        <form @submit.prevent="onSubmitForm">
            <input ref="answer" minlength="4" maxlength="4" v-model="value" />
            <button type="submit">입력</button>
        </form>
        <div>시도: {{tries.length}}</div>
        <ul>
            <!--<li v-for="t in tries" v-bind:key = "t">{{t}}</li> , this.tries.push(this.value) -->
            <li v-for="t in tries" v-bind:key = "t.try"> <!-- li태그 각각 구별해줄때 붙이는 이름 = key -->
                <div>{{t.try}}</div>
                <div>{{t.result}}</div>
            </li>
        </ul>
    </div>
</template>

<script>
    const getNumbers = () => {
        const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        const array = [];
        for (let i = 0; i < 4; i += 1) {
        const chosen = candidates.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        array.push(chosen);
        }
        return array;
    };
    export default { // = Vue.component('worldRelay', {})
        data() {
            return {
                answer: getNumbers(), // ex) [1,5,3,4]
                tries: [],  // 시도수
                value: '',  // 입력
                result: '', // 결과
            }
        },
        methods: {
            onSubmitForm(e) {
                if (this.value === this.answer.join('')) { // 정답 맞췄으면, 문자열과 배열 비교할려면 join 사용
                    this.tries.push({
                        try: this.value,
                        result: '홈런',
                    });
                    this.result = '홈런';
                    alert('게임을 다시 시작합니다.');
                    this.value = '';
                    this.tries = [];
                    this.$refs.answer.focus();
                } else {    // 정답 틀렸을 때
                    if(this.tries.length >= 9) { // 10번째 시도
                        this.result = `10번 넘게 틀려서 실패! 답은 ${this.answer.join(',')}였습니다!`;
                        alert('게임을 다시 시작합니다.');
                        this.value = '';
                        this.answer = getNumbers();
                        this.tries = [];
                        this.$refs.answer.focus();
                    }
                    // 화면에 보여지는건 데이터
                    // 계산식에 쓰이는건 변수(화면과 관련 없는것)
                    let strike = 0;
                    let ball = 0;
                    const answerArray = this.value.split('').map(v => parseInt(v)); // 문자열 -> 숫자배열로 바꿈
                    for (let i = 0; i < 4; i++) {
                        if (answerArray[i] === this.answer[i]) { // 숫자 자릿수 모두 정답
                            strike++;
                        } else if (this.answer.includes(answerArray[i])) { // 숫자만 정답
                            ball++;
                        }
                    }
                    this.tries.push({
                        try: this.value,
                        result: `${strike} 스트라이크, ${ball} 볼입니다.`,
                    });
                    this.value = '';
                    this.$refs.answer.focus();
                }
            }
        }
    }
</script>

<style>

</style>