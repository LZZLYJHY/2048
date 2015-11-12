
/**
 * Created by airing on 15/10/19.
 */
function startGame(cxt) {
    init(cxt);     //��ʼ����Ϸ����UI
    score = 0;
    updateScore(score);
    newBox(cxt);
    newBox(cxt);
}

function newBox(cxt) {
    if (noSpace()){
        return false;
    }
    //�������һ��λ��
    var randx =
        parseInt(Math.floor(Math.random() * 8));
    var randy =
        parseInt(Math.floor(Math.random() * 8));

    var times = 0;
    while (times < 50) {
        if (nums[randx][randy] == 0) {
            break;
        }

        randx =
            parseInt(Math.floor(Math.random() * 8));
        randy =
            parseInt(Math.floor(Math.random() * 8));

        times++
    }

    if (times == 50) {
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                if (nums[i][j] == 0) {
                    randx = i;
                    randy = j;
                }
            }
        }
    }

    var randNumber = Math.random() < 0.5 ? 2 : 4;

    nums[randx][randy] = randNumber;
    drawBox(cxt, randx, randy, randNumber);
    return true;
}

function moveKeyDown() {
    event.preventDefault();
    switch (event.keyCode) {
        case 37: //left
            if (moveLeft()) { //Ϊ�ջ������
                newBox(context);
                isGameOver();
            }
            break;
        case 38://up
            if (moveUp()) {
                newBox(context);
                isGameOver();
            }
            break;
        case 39://right
            if (moveRight()) {
                newBox(context);
                isGameOver();
            }
            break;
        case 40://down
            if (moveDown()) {
                newBox(context);
                isGameOver();
            }
            break;
        default :
            break;
    }

}
//����1��ʵ���ƶ��˴�����

document.addEventListener('touchstart',function(event){
    startX = event.touches[0].pageX;
    startY = event.touches[0].pageY
});

document.addEventListener('touchend',function(event){
    endX = event.changedTouches[0].pageX;
    endY = event.changedTouches[0].pageY;

    var daltaX = endX - startX;
    var daltaY = endY - startY;

    if (Math.abs(daltaX) < 0.1 * documentWidth && Math.abs(daltaY) < 0.1 * documentWidth){
        return true;
    }

    if(Math.abs(daltaX) >= Math.abs(daltaY)){
        if(daltaX < 0) {
            if (moveLeft()) { //Ϊ�ջ������
                newBox(context);
                isGameOver();
            }
        }else{
            if (moveRight()) {
                newBox(context);
                isGameOver();
            }
        }
    }else{
        if(daltaY < 0) {
            if (moveUp()) {
                newBox(context);
                isGameOver();
            }
        }else{
            if (moveDown() ){
                newBox(context);
                isGameOver();
            }
        }
    }
});



function moveLeft() {
    if (!canMoveLeft()) {
        return false;
    }

    for (var j = 0; j < 8; j++) {
        for (var i = 1; i < 8; i++) {
            if (nums[i][j] != 0) {
                for (var k = 0; k < i; k++) {
                    if (nums[k][j] == 0) {
                        nums[k][j] = nums[i][j];
                        nums[i][j] = 0
                    }
                    else if (nums[k][j] == nums[i][j] && noBlockHorizontal(j, k, i, nums)) {
                        nums[k][j] += nums[k][j];
                        nums[i][j] = 0;
                        score += + nums[k][j];
                        updateScore(score);
                    }
                }
            }
        }
    }
    updateBoardView(context);
    return true;
}

function canMoveLeft() {
    for (var j = 0; j < 8; j++) {
        for (var i = 1; i < 8; i++) {
            if (nums[i][j] != 0) {
                if (nums[i - 1][j] == 0 || nums[i - 1][j] == nums[i][j]) {
                    return true;
                }

            }
        }
    }
    return false;
}

function moveUp() {
    //����2��ʵ�֡��ϡ��߼�
    if (!canMoveUp()) {
        return false;
    }

    for (var i = 0; i < 8; i++) {
        for (var j = 1; j < 8; j++) {
            if (nums[i][j] != 0) {
                for (var k = 0; k < j; k++) {
                    //���[i][j]�Ϸ��пո��ӣ����[i][j]��֮����
                    if (nums[i][k] == 0) {
                        nums[i][k] = nums[i][j];
                        nums[i][j] = 0;
                    }
                    //�������[i][j]��ȵľͺϲ�
                    else if (nums[i][k] == nums[i][j] && noBlockVertical(i, k, j, nums)) {
                        nums[i][k] += nums[i][j];
                        nums[i][j] = 0;
                        score += nums[i][k];
                        updateScore(score);
                    }
                }
            }
        }
    }
    updateBoardView(context);
    return true;
}

function canMoveUp() {
    //����3��ʵ���ж��Ƿ�������ϵ��߼�
    for (var i = 0; i < 8; i++) {
        for (var j = 1; j < 8; j++) {
            if (nums[i][j] != 0) {
                if (nums[i][j - 1] == 0 || nums[i][j - 1] == nums[i][j]) {
                    return true;
                }

            }
        }
    }
    return false;
}

function moveRight() {
    //����4��ʵ�֡��ҡ��߼�
    if (!canMoveRight()) {
        return false;
    }

    for (var j = 0; j < 8; j++) {
        for (var i = 6; i >= 0; i--) {
            if (nums[i][j] != 0) {
                for (var k = 7; k > i; k--) {
                    if (nums[k][j] == 0) {
                        nums[k][j] = nums[i][j];
                        nums[i][j] = 0;
                    }
                    else if (nums[k][j] == nums[i][j] && noBlockHorizontal(j, i, k, nums)) {
                        nums[k][j] += nums[k][j];
                        nums[i][j] = 0;
                        score = score + nums[k][j];
                        updateScore(score);
                    }
                }
            }
        }
    }
    updateBoardView(context);
    return true;
}

function canMoveRight() {
    //����5��ʵ���ж��Ƿ�������ҵ��߼�
    for (var j = 0; j < 8; j++) {
        for (var i = 6; i >= 0; i--) {
            if (nums[i][j] != 0) {
                if (nums[i + 1][j] == 0 || nums[i + 1][j] == nums[i][j]) {
                    return true;
                }

            }
        }
    }
    return false;
}

function moveDown() {
    //����6��ʵ�֡��¡��߼�
    if (!canMoveDown()) {
        return false;
    }

    for (var i = 0; i < 8; i++) {
        for (var j = 6; j >= 0; j--) {
            if (nums[i][j] != 0) {
                for (var k = 7; k > j; k--) {
                    //���[i][j]�Ϸ��пո��ӣ����[i][j]��֮����
                    if (nums[i][k] == 0) {
                        nums[i][k] = nums[i][j];
                        nums[i][j] = 0;
                    }
                    //�������[i][j]��ȵľͺϲ�
                    else if (nums[i][k] == nums[i][j] && noBlockVertical(i, j, k, nums)) {
                        nums[i][k] += nums[i][j];
                        nums[i][j] = 0;
                        score += nums[i][k];
                        updateScore(score);
                    }
                }
            }
        }
    }
    updateBoardView(context);
    return true;
}

function canMoveDown() {
    //����7��ʵ���ж��Ƿ�������µ��߼�
    for (var i = 0; i < 8; i++) {
        for (var j = 6; j >= 0; j--) {
            if (nums[i][j] != 0) {
                if (nums[i][j + 1] == 0 || nums[i][j + 1] == nums[i][j]) {
                    return true;
                }

            }
        }
    }
    return false;
}

function noBlockVertical(col, row1, row2, nums) {
    //����8��ʵ���жϴ�ֱ�������Ƿ����ϰ���
    for (var i = row1 + 1; i < row2; i++) {
        if (nums[col][i] != 0) {
            return false;
        }
    }
    return true;
}

function noBlockHorizontal(row, col1, col2, nums) {
    for (var i = col1 + 1; i < col2; i++) {
        if (nums[i][row] != 0) {
            return false;
        }
    }
    return true;
}


function updateScore(score){
    document.getElementById("score").innerText = score;
}

function noSpace() {
    for (var i = 0; i < 8; i++)
        for (var j = 0; j < 8; j++)
            if (nums[i][j] == 0)
                return false;

    return true;
}

function noMove() {
    return !(canMoveLeft() || canMoveRight() || canMoveUp() || canMoveDown());
}

function isGameOver(){
    if(noMove() && noSpace()){
        alert("GameOver.Score:" + score);
        return true;
    }
    return false;
}
