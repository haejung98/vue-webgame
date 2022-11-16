// 데이터가 중앙적으로 통제된다.
import Vue from 'vue';
import Vuex from 'vuex';

// vue랑 vuex 연결
Vue.use(Vuex); // this.$store
// Vue.use(axios); // this.$axios

// mutations의 이름을 변수로 빼기 -> 사용할땐 [SET_WINNER]
// export로 붙여서 모듈로 만듦 -> 다른파일이 쓸 수 있게
export const SET_WINNER = 'SET_WINNER';     // import { SET_WINNER, CLICK_CELL, CHANGE_TURN } from './store';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';
export const NO_WINNER = 'NO_WINNER';

export default new Vuex.Store({ // import store from './store';
    state: { 
        tableData: [
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
        ],
        turn: 'O',
        winner: '',
    },  // vue의 data와 비슷
    getters: {
        turnMessage(state) {
            return state.turn + '님이 승리하셨습니다.';
        },
    },  // vue의 computed와 비슷, 기존의 state를 활용해서 더 추가적인 작업을 할때
    mutations: {
        [SET_WINNER](state, winner) {
            state.winner = winner;
        },
        [CLICK_CELL](state, { row, cell }) { // [row][cell]은 index -> vuex에서도 배열을 인덱스로 접근하는경우에는 데이터는 변해도 화면은 바뀌지않는다.
            // Vuex에서 배열을 인덱스로 수정할 경우엔 Vue.set 사용
            Vue.set(state.tableData[row], cell, state.turn);
        },
        [CHANGE_TURN](state) {
            state.turn = state.turn === 'O' ? 'X' : 'O';
        },
        [RESET_GAME](state) {
            state.turn = 'O';
            state.tableData = [
                ['', '', ''],
                ['', '', ''],
                ['', '', ''],
            ];
        },
        [NO_WINNER](state) { // 무승부일때
            state.winner = ''; //승자없애기
        }
    },  // state를 수정할 때 사용, 동기적으로
    actions: {

    },  // 비동기를 사용할 때, 또는 여러 뮤테이션을 연달아 실행할 때
});