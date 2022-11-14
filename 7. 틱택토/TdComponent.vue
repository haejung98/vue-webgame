<template>
    <td @click="onClickTd">{{cellData}}</td>
</template>

<script>

  export default {
    props: {
        cellData: String,
        rowIndex: Number,
        cellIndex: Number,
    },
    methods: {
        onClickTd() {
            // 남이 누른칸을 또 누르면 중단
            if (this.cellData) return;

            // 자식컴포넌트에서 부모 컴포넌트 데이터를 조작할 수 있음
            console.log(this.$root.$data); // 가장 최상위 부모(TicTacToe.vue) 데이터 한방에 접근할 수 있음
            console.log(this.$parent.$data); // 부모 컴포넌트 데이터에 접근

            const rootData = this.$root.$data;

            // [가로행수][세로행수]에 this.$root.$data.turn을 넣어줌
            //rootData.tableData[this.rowIndex][this.cellIndex] = rootData.turn;  // 배열의 값을 인덱스로 바꾸면 화면에 반영이 안된다.
            this.$set(rootData.tableData[this.rowIndex], this.cellIndex, rootData.turn); // 해결방법 : 배열에서 index 쓸 땐 this.$set을 이용

            let win = false;
            if (rootData.tableData[this.rowIndex][0] === rootData.turn && rootData.tableData[this.rowIndex][1] === rootData.turn && rootData.tableData[this.rowIndex][2] === rootData.turn) {
                win = true; // 가로 세줄
            }
            if (rootData.tableData[0][this.cellIndex] === rootData.turn && rootData.tableData[1][this.cellIndex] === rootData.turn && rootData.tableData[2][this.cellIndex] === rootData.turn) {
                win = true; // 세로 세줄
            }
            if (rootData.tableData[0][0] === rootData.turn && rootData.tableData[1][1] === rootData.turn && rootData.tableData[2][2] === rootData.turn) {
                win = true; // 대각선
            }
            if (rootData.tableData[0][2] === rootData.turn && rootData.tableData[1][1] === rootData.turn && rootData.tableData[2][0] === rootData.turn) {
                win = true; // 대각선
            }
            if (win) { // 이긴 경우: 3줄 달성
                rootData.winner = rootData.turn; // 승자기록
                // 초기화
                rootData.turn = 'O';
                rootData.tableData = [['', '', ''], ['', '', ''], ['', '', '']];
            } else { // 무승부
                let all = true; // all이 true면 무승부라는 뜻
                rootData.tableData.forEach((row) => { // 무승부 검사
                    row.forEach((cell) => {
                        if (!cell) {
                            all = false;
                        }
                    });
                });
                if (all) { // 무승부
                    rootData.winner = '';
                    rootData.turn = 'O';
                    rootData.tableData = [['', '', ''], ['', '', ''], ['', '', '']];
                } else {    // 게임이 안끝났을 경우엔 turn을 다음사람 turn으로
                    rootData.turn = rootData.turn === 'O' ? 'X' : 'O';
                }
            }
        }
    }
  };
</script>