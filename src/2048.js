//this指向的是windows;
var WebGL = laya.webgl.WebGL;
var Text = Laya.Text;
Laya.init(375, 667, WebGL);
Laya.stage.bgColor = "#faf8ee";
Laya.stage.screenMode = "none";
(function(){
  function onReady(){
   this.data ={
        hidden:false,
        start:"开始游戏",
        num:[],
        score:0,//最高分
        endMsg:'',
        over:false//游戏是否结束
    };
//应该有一个页面初始化渲染完成，弄个加载中动画过渡效果；
    if(!Laya.LocalStorage.getItem("highScore")){
        Laya.LocalStorage.setItem("highScore",0)
    };
    this.gridView = new gridView();
    this.gridView.play.on(Laya.Event.CLICK,this,this.gameStart);
    this.gameStart();
   console.log(3,this);

  };
    Laya.class(onReady,'onReady');
      onReady.prototype = {
        gameStart(){ //游戏开始 function 
            this.gridView.popup.close();
        this.main = new Main(4);//初始填充两个数据；同时把grid的原型链上的函数挂载到bproto上，同时Main函数里的方法挂载在原型链上；
        // this.main2 = new Main(4);
        console.log(this.main)
        this.data.main = this.main;
        this.data.bestScore = Laya.LocalStorage.getItem('highScore');
        // console.log(this.data.main,main)
        this.data.hidden = true;
        this.data.over = false;
        this.data.score = 0;
        this.data.num = this.data.main.board.grid;
        this.GridView = this.gridView.createGridView(this,this.data.num);//各个格子文本；
        console.log(this.GridView,this.GridView._childs,'012');
        
    //     for(){
    //    this.GridView.childs
    //          }
        //this.setdata一次绑定一次数据；
    },
    gameOver(){ // 游戏结束
        this.data.over = true;
        if(this.data.score >= 2048){
            this.data.endMsg = '恭喜达到2048';
            Laya.LocalStorage.setItem('highScore', this.data.score);
        }else if(this.data.score > this.data.bestScore) {
             this.data.endMsg = '创造新纪录！';
            Laya.LocalStorage.setItem('highScore', this.data.score);
        }else {
             this.data.endMsg = '游戏结束';
        };
        this.gridView.upDateGameOverView(this.data)
    },
     touchStart(e){
        this.touchStartX = Laya.stage.mouseX;
        this.touchStartY = Laya.stage.mouseY;
    },
    touchMove(e){
        console.log(Laya.stage.mouseX,Laya.stage.mouseY);
         this.touchEndX = Laya.stage.mouseX;
         this.touchEndY = Laya.stage.mouseY;
    },
    touchEnd(e){
 console.log(Laya.stage.mouseX,Laya.stage.mouseY);

 let disX = this.touchStartX - this.touchEndX;
 let absdisX = Math.abs(disX);
 let disY = this.touchStartY - this.touchEndY;
 let absdisY = Math.abs(disY);

 if(this.data.main.isOver()){ // 游戏是否结束
    this.gameOver();
 }else {
     if(Math.max(absdisX,absdisY) > 10){ // 确定是否在滑动
        this.data.start = '重新开始';
        this.gridView.play.label = "重新开始";
        let direction = absdisX > absdisY ? (disX < 0 ? 1 : 3) : (disY < 0 ? 2 : 0);// 确定移动方向// 0:上, 1:右, 2:下, 3:左
        let data = this.data.main.move(direction);
        this.updateView(data);
     }
 }   
    },
      updateView(data) {
    var max = 0;
    let c = 0;
    for(var i = 0; i < 4; i++){
      for(var j = 0; j < 4; j++){
        if(data[i][j] != "" && data[i][j] > max)
          max = data[i][j];

          this.GridView._childs[c].text = data[i][j]; 
          c++;
         }
     };
     this.gridView.scorenum.text = max;
     this.data.num = data;
     this.data.score = max;
    // this.setData({
    //   num: data,
    //   score: max
    // });
  },
}  

})();
new onReady();


  




