new class App{
    constructor(){
        this.touchTrack =[];
        this.state =null;//[unknown|up|down|left|right]
        this.threshold =screen.width*0.2;
        this.toucheNumber =2;//todo: set 1 debug on desktop
        this.develop =false;

        this._linesCache ={
            value :null,
            touchTrack :null,
        };
        this.init();
    };
    get lines(){
        if(
            !Array.isArray(this._linesCache.touchTrack)
            || !Array.isArray(this.touchTrack)
            || this._linesCache.touchTrack.some(
                (item,index) => (item!==this.touchTrack[index])
            )
        ){
            this._linesCache.value =[];
            for(let i=0 ;i<this.toucheNumber ;i++){
                this._linesCache.value[i] ={
                    x :this.touchTrack[1].touches[i].screenX -this.touchTrack[0].touches[i].screenX,
                    y :this.touchTrack[0].touches[i].screenY -this.touchTrack[1].touches[i].screenY,
                };
            };
        };
        return this._linesCache.value;
    };
    init(){
        this.log('double-touch loaded');
        window.addEventListener('touchmove',event=>{
            if(this.isEffectEvent(event)){
                if(this.touchTrack.length ===0){
                    this.touchTrack[0] =event;
                    event.preventDefault();//for performance
                }else{
                    this.touchTrack[1] =event;
                    if(this.checkoutState()){
                        event.preventDefault();
                    };
                };
            };
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
    checkoutState(){
        var state =this.judge(this.lines[0]);
        for(let line of this.lines){
            if(state !==this.judge(line)){
                return false;
            };
        };

        this.log('checkout state:'+this.state);
        this.state =state;

        return true;
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