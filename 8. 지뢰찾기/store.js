// 데이터가 중앙적으로 통제된다.
import Vue from 'vue';
import Vuex from 'vuex';

// vue랑 vuex 연결
Vue.use(Vuex); // this.$store

export const START_GAME = 'START_GAME';             // 게임시작
export const OPEN_CELL = 'OPEN_CELL';               // 한칸씩 열기
export const CLICK_MINE = 'CLICK_MINE';             // 지뢰 클릭
export const FLAG_CELL = 'FLAG_CELL';               // 지뢰칸에 깃발 꽂기
export const QUESTION_CELL = 'QUESTION_CELL';       // 물음표
export const NORMALIZE_CELL = 'NORMALIZE_CELL';     // 해제 
export const INCREMENT_TIMER = 'INCREMENT_TIMER';

// 2차원 배열
// 한칸에 표시해야할 정보를 code로 정의
export const CODE = {   
  MINE: -7,
  NORMAL: -1,   // 빈칸
  QUESTION: -2,
  FLAG: -3,     // 깃발꽂음 
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  CLICKED_MINE: -6,
  OPENED: 0, // 0 이상이면 다 opened
};

// 0이상은 연칸, 주변 지뢰 갯수
// [
//     ['-1', '2', '-7'],  // -1은 빈칸, 2는 주변 지뢰 갯수
//     ['-3', '-7', '-1'], // 지뢰가 심어진 칸은 -7
//     ['-1', '-1', '-1'],
// ]

const plantMine = (row, cell, mine) => {
  console.log(row, cell, mine);
  const candidate = Array(row * cell).fill().map((arr, i) => {
    return i;
  });
  const shuffle = [];
  while (candidate.length > row * cell - mine) {
    const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
    shuffle.push(chosen);
  }
  const data = [];
  for (let i = 0; i < row; i++) {
    const rowData = [];
    data.push(rowData);
    for (let j = 0; j < cell; j++) {
      rowData.push(CODE.NORMAL);
    }
  }

  for (let k = 0; k < shuffle.length; k++) {
    const ver = Math.floor(shuffle[k] / cell);
    const hor = shuffle[k] % cell;
    data[ver][hor] = CODE.MINE;
  }

  console.log(data);
  return data;
};

export default new Vuex.Store({ // import store from './store';
    state: { 
        tableData: [],
        data: {
            row: 0,
            cell: 0,
            mine: 0, // 지뢰
        },
        timer: 0,
        result: '', // 결과값
        halted: true, // 게임이 중단된, 타이머를 멈추거나 실행할 타이밍
        result: '',
        openedCount: 0,
    },  // vue의 data와 비슷
    getters: {
        
    },  // vue의 computed와 비슷, 기존의 state를 활용해서 더 추가적인 작업을 할때
    mutations: {
        [START_GAME](state, { row, cell, mine }) { 
            state.data = {
                row,
                cell,
                mine
            };
            // 객체 안에 속성을 이름으로 바꿨을 땐 안바뀔 수 있음
            // state.data.row = row;
            // Vue.set(state.data, 'row', row);
            state.tableData = plantMine(row, cell, mine);
            state.timer = 0;
            state.halted = false; // 게임이 시작됐다
            state.openedCount = 0;
            state.result = '';
        },
        //state.tableData[row][cell] = CODE.OPENED;   // 잘못된 방법
        //Vue.set(state.tableData[row], cell, CODE.OPENED);
        [OPEN_CELL](state, { row, cell }) {
            let openedCount = 0;
            const checked = [];
            function checkAround(row, cell) { // 주변 8칸 지뢰인지 검색
                const checkRowOrCellIsUndefined = row < 0 || row >= state.tableData.length || cell < 0 || cell >= state.tableData[0].length;
                if (checkRowOrCellIsUndefined) {
                    return;
                }
                if ([CODE.OPENED, CODE.FLAG, CODE.FLAG_MINE, CODE.QUESTION_MINE, CODE.QUESTION].includes(state.tableData[row][cell])) {
                    return;
                }
                if (checked.includes(row + '/' + cell)) {
                    return;
                } else {
                    checked.push(row + '/' + cell);
                }
                let around = [];
                if (state.tableData[row - 1]) {
                    around = around.concat([
                        state.tableData[row - 1][cell - 1], state.tableData[row - 1][cell], state.tableData[row - 1][cell + 1]
                    ]);
                }
                around = around.concat([
                    state.tableData[row][cell - 1], state.tableData[row][cell + 1]
                ]);
                if (state.tableData[row + 1]) {
                    around = around.concat([
                        state.tableData[row + 1][cell - 1], state.tableData[row + 1][cell], state.tableData[row + 1][cell + 1]
                    ]);
                }
                const counted = around.filter(function(v) {
                    return [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v);
                });
                if (counted.length === 0 && row > -1) { // 주변칸에 지뢰가 하나도 없으면
                    const near = [];
                    if (row - 1 > -1) {
                        near.push([row - 1, cell - 1]);
                        near.push([row - 1, cell]);
                        near.push([row - 1, cell + 1]);
                    }
                    near.push([row, cell - 1]);
                    near.push([row, cell + 1]);
                    if (row + 1 < state.tableData.length) {
                        near.push([row + 1, cell - 1]);
                        near.push([row + 1, cell]);
                        near.push([row + 1, cell + 1]);
                    }
                    near.forEach((n) => {
                        if (state.tableData[n[0]][n[1]] !== CODE.OPENED) {
                        checkAround(n[0], n[1]);
                        }
                    });
                }
                if (state.tableData[row][cell] === CODE.NORMAL) {
                    openedCount += 1;
                }

                Vue.set(state.tableData[row], cell, counted.length);
            }
            
            checkAround(row, cell);
            let halted = false;
            let result = '';
            if (state.data.row * state.data.cell - state.data.mine === state.openedCount + openedCount) {
                halted = true;
                result = `${state.timer}초만에 승리하셨습니다.`;
            }
            state.openedCount += openedCount;
            state.halted = halted;
            state.result = result;
        },
        [CLICK_MINE](state, { row, cell }) {
            state.halted = true;
            Vue.set(state.tableData[row], cell, CODE.CLICKED_MINE);
        },
        [FLAG_CELL](state, { row, cell }) {
            if (state.tableData[row][cell] === CODE.MINE) {
                Vue.set(state.tableData[row], cell, CODE.FLAG_MINE);
            } else {
                Vue.set(state.tableData[row], cell, CODE.FLAG);
            }
        },
        [QUESTION_CELL](state, { row, cell }) {
            if (state.tableData[row][cell] === CODE.FLAG_MINE) {
                Vue.set(state.tableData[row], cell, CODE.QUESTION_MINE);
            } else {
                Vue.set(state.tableData[row], cell, CODE.QUESTION);
            }
        },
        [NORMALIZE_CELL](state, { row, cell }) {
            if (state.tableData[row][cell] === CODE.QUESTION_MINE) {
                Vue.set(state.tableData[row], cell, CODE.MINE);
            } else {
                Vue.set(state.tableData[row], cell, CODE.NORMAL);
            }
        },
        [INCREMENT_TIMER](state) {
            state.timer += 1;
        },
    },  // state를 수정할 때 사용, 동기적으로
    actions: {

    },  // 비동기를 사용할 때, 또는 여러 뮤테이션을 연달아 실행할 때
});