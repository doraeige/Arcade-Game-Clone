// 这是我们的玩家要躲避的敌人 
let Enemy = function(x,y,speed) {
    // 要应用到每个敌人的实例的变量写在这里
    this.x = x;
    this.y = y;
    this.speed = speed;
    // 我们已经提供了一个来帮助你实现更多敌人的图片，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
};

// 此为游戏必须的函数,用来更新敌人的位置,参数: dt,表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上都是以同样的速度运行的
    this.x = this.x >= 505 ? -30 : this.x + this.speed * dt;
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 现在实现你自己的玩家类，需要一个 update() 函数， render() 函数和一个 handleInput()函数
let Player = function(x,y){
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-horn-girl.png';
};

Player.prototype.update = function() {
    if(this.y <= -41){
        console.log(this.y);
        alert('Congratulations! 恭喜过关');
        this.x = 202;
        this.y = 404;
    }
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (allowedKeys) {
    switch (allowedKeys) {
        case 'left':
            if (this.x >= 0) {
                this.x -= 101;
            }
        break;
        case 'right':
            if (this.x < 404) {
                this.x += 101;
            }
        break;
        case 'up':
        // case: 当y在 42 这个位置，再按上键，y 会到 291 这个位置
            if (this.y >= 42 && this.y < 404) {
                this.y -= 83;
            }else if (this.y = 404){
                this.y -= 113;
            }
        break;
        case 'down':
            if (this.y < 291) {
                this.y += 83;
            } else if(this.y = 291){
                this.y += 113;
            }
        break;
    };
}

Player.prototype.checkCollisions = function(){
    for(let enemy of allEnemies){
        if ((Math.abs(this.y - enemy.y) < 50) && (Math.abs(this.x - enemy.x) < 50)) {
            this.x = 202;
            this.y = 404;
        }
    }
};

// 石头类 显示不出来，也没有报错
let Rock = function (x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/Rock.png';
};

Rock.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 实例化所有对象, 敌人x位置随机, speed随机
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 画布大小为 宽505，高606; 每个方块长101，宽83
let allEnemies = [
    // row 1
    new Enemy(Math.random() * 500, 83 * 0 + 55, 50 + Math.random() * (200 - 50)),
    new Enemy(Math.random() * 500, 83 * 0 + 55, 50 + Math.random() * (200 - 50)),
    // row 2
    new Enemy(Math.random() * 500, 83 * 1 + 55, 50 + Math.random() * (200 - 50)),
    new Enemy(Math.random() * 500, 83 * 1 + 55, 50 + Math.random() * (200 - 50)),
    // row 3
    new Enemy(Math.random() * 500, 83 * 2 + 55, 50 + Math.random() * (200 - 50)),
    new Enemy(Math.random() * 500, 83 * 2 + 55, 50 + Math.random() * (200 - 50))
];

// 把玩家对象放进一个叫 player 的变量里面,玩家的位置
let player = new Player(202, 83 * 4 + 72);

// 实例化石头 石头显示不出
let rock = new Rock(101,208);

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Player.handleInput()方法里面。
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
