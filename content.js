new class App{
    constructor(){
        this.touchTrack =[];
        this.state =null;//[unknown|up|down|left|right]
        this.threshold =screen.width*0.2;
        this.toucheNumber =2;//todo: set 1 debug on desktop
        this.develop =false;
        this.init();
    };
    init(){
        this.log('double-touch loaded');
        window.addEventListener('touchmove',event=>{
            if(this.isEffectEvent(event)){
                if(this.touchTrack.length ===0){
                    this.touchTrack[0] =event;
                }else{
                    this.touchTrack[1] =event;
                }
                if(this.isEffectTouch()){
                    this.log('so preventDefault');
                    event.preventDefault();
                };
            }
        },{passive:false});
        window.addEventListener('touchend',()=>{
            this.log('event touchend',this.state);
            this.done();
            this.state =null;
            this.touchTrack.length =0;
        });
    };
    done(){
        if(this.state ===null)return;
        this.log('done',this.state);
        browser.runtime.sendMessage({type:this.state});
    };
    isEffectEvent(event){
        return event.touches.length===this.toucheNumber;
    };
    isEffectTouch(){
        if(this.touchTrack.length<this.toucheNumber){//for performance
            this.log('because for performance');
            return true;
        };
        var lines =this.getLines();

        this.state =this.getState(lines);

        this.state !==null &&this.log('because state is '+this.state);

        return this.state !==null;
    };
    getLines(){
        var arr =[];
        for(let i=0 ;i<this.toucheNumber ;i++){
            arr[i] ={
                x :this.touchTrack[1].touches[i].screenX -this.touchTrack[0].touches[i].screenX,
                y :this.touchTrack[0].touches[i].screenY -this.touchTrack[1].touches[i].screenY,
            };
        };
        return arr;
    };
    getState(lines){
        var value =this.judge(lines[0]);
        for(let line of lines){
            if(value !==this.judge(line)){
                return null;
            };
        };
        return value;
    };
    judge({x,y}){
        var abs =Math.abs;
        if(y>this.threshold &&abs(y)>abs(x)){
            return 'up';
        }
        if(y<-this.threshold &&abs(y)>abs(x)){
            return 'down';
        }
        if(x>this.threshold &&abs(x)>abs(y)){
            return 'right';
        }
        if(x<-this.threshold &&abs(x)>abs(y)){
            return 'left';
        }
        return null;
    };
    log(...args){
        this.develop &&console.log(...args);
    };
};