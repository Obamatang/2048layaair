// var WebGL = laya.webgl.WebGL;
var Text = Laya.Text;
// Laya.init(375, 667, WebGL);
// Laya.stage.bgColor = "#faf8ee";
// Laya.stage.screenMode = "none";
 (function(){
    function gridView(data){
    let title = this.createText("2048",40,"#776e65",true,60,50);
    //let this.play = this.createText("开始游戏",20,"#fff",true,60,100,"#bbada0");
    this.play  = new Laya.Button();
    this.play.label = "开始游戏";
    this.play.width = 130;
    this.play.height = 40;
    this.play.labelBold = true;
    this.play.fontSize = 40;
    // this.play.colors = "#fff,#fff,#fff,#fff";
    this.play.pos(30,100);
    this.play.labelStroke  = 5;
    this.play.labelStrokeColor = "#bbada0";
    this.play.strokeColors= "#bbada0,#bbada0,#bbada0,#bbada0";
    // this.play.on(Laya.Event.CLICK,this,clickfunc);//= clickfunc;//应该到主函数里监听；
    Laya.stage.addChild(this.play);

    let score =  this.createText("score",30,"#776e65",true,220,50,"#bbada0");
   
    this.scorenum = this.createText("0",30,"#fff",true,220,100,"#bbada0");
    
    // this.createGridView()//这个可以new出来后再传值
    this.gameOverView();
  this.touchStartX = 0;
  this.touchStartY = 0;
  this.touchEndX = 0;
  this.touchEndY = 0;
    };
    Laya.class(gridView,'gridView');
    

    // function touchStart(){
    //     console.log(444);
    // };
    gridView.prototype = {
     createText(str,fontSize,color,isbold,x,y,bg){
        let text = new Text();

        // console.log(text.color,color);
		text.color = color;
        text.bgColor = bg;
        
        text.bold = isbold;
		text.fontSize = fontSize;
		text.x = x;
        text.y = y;
        
        Laya.stage.addChild(text);
		text.text = str;
		return text;
    },
     createGridView(that,num){//初始化两个格子数据；
        let gridCtn = new Text();
            gridCtn.height = Laya.stage.width * 0.93;
            gridCtn.width = Laya.stage.width * 0.93;
            gridCtn.bgColor ="#bbada0";
            gridCtn.y =  Laya.stage.height *0.32;
            gridCtn.x = 15;
            Laya.stage.addChild(gridCtn);
        console.log(that,'1234')
        for(let i =0;i<4;i++){//4可以改成数组带内容的；num.length
            for(let j = 0;j<4;j++){
                let grid = new Text();
                grid.on(Laya.Event.MOUSE_DOWN,that,that.touchStart)
                grid.on(Laya.Event.MOUSE_MOVE,that,that.touchMove)
                grid.on(Laya.Event.MOUSE_UP,that,that.touchEnd)
                
                grid.text = num[i][j];//num[i][j]
                grid.color = "#f9f6f2";
                grid.fontSize = 35;
                grid.align = "center";
                grid.valign = "middle";
                grid.height = 75;
                grid.width = 75;
                grid.bgColor = "#f2b179";
                grid.pos(10+j*85,10+i*85);
                gridCtn.addChild(grid);
            }
        }
        return gridCtn;
    },
    gameOverView(){

        this.popup =  new Laya.Dialog();
        this.popup.popup();
        UIConfig.popupBgAlpha = 0.3;
        UIConfig.popupBgColor = "rgba(255, 255, 255, 0.8)";
        UIConfig.closeDialogOnSide = false;
        this.historyScore = new Text();
        this.historyScore.fontSize = 20;
        this.historyScore.text = "历史最高分:"//+bestScore;
        this.historyScore.pos(-35,0)
        this.nowScore = new Text();
        this.nowScore.text = "本次成绩:"//+score;
        this.nowScore.fontSize = 20
        this.nowScore.pos(-25,30);
        this.pro = new Text();
        this.pro.text = "endMsg";
        this.pro.fontSize = 30;
        this.pro.pos(-45,60)
        this.popup.addChild(this.historyScore);
        this.popup.addChild(this.nowScore);
        this.popup.addChild(this.pro);
                    
              this.popup.close();
    },
    upDateGameOverView(data){
         this.historyScore.text = '历史最高分：'+data.bestScore;
         this.nowScore.text = '本次成绩为：'+data.score;
         this.pro.text = data.endMsg;
         this.popup.popup();
    }

}

})();
  // function createText(str,fontSize,color,isbold,x,y,bg){
    //     let text = new Text();

    //     // console.log(text.color,color);
	// 	text.color = color;
    //     text.bgColor = bg;
        
    //     text.bold = isbold;
	// 	text.fontSize = fontSize;
	// 	text.x = x;
    //     text.y = y;
        
    //     Laya.stage.addChild(text);
	// 	text.text = str;
	// 	return text;
    // };
    // function createGridView(num){
    //     let gridCtn = new Text();
    //         gridCtn.height = Laya.stage.width * 0.93;
    //         gridCtn.width = Laya.stage.width * 0.93;
    //         gridCtn.bgColor ="#bbada0";
    //         gridCtn.y =  Laya.stage.height *0.32;
    //         gridCtn.x = 15;
    //         Laya.stage.addChild(gridCtn);
        
    //     for(let i =0;i<4;i++){//4可以改成数组带内容的；num.length
    //         for(let j = 0;j<4;j++){
    //             let grid = new Text();
    //             grid.text = "0";//num[i][j]
    //             grid.color = "#f9f6f2";
    //             grid.height = 75;
    //             grid.width = 75;
    //             grid.bgColor = "#f2b179";
    //             grid.pos(10+j*85,10+i*85);
    //            // Laya.stage.addChild(grid);
    //             gridCtn.addChild(grid);
    //         }
    //        // grid.pos(50+j*5,200+i*5);
    //     }
    //    // gridCtn.pos(Laya.stage.width/2,Laya.stage.height /2);

    // };//应该还要有一个更新视图函数，每次调用更新视图；