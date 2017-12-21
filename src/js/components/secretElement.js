class SecretElement {
    constructor($el){
        this.$el = $el; 
        this.dataX = this.$el.attr("data-x");
        this.dataY = this.$el.attr("data-y"); 
        this.hasMoved = false;   
        console.log(this.dataX, this.dataY)     
        this.translate(this.dataX, this.dataY)        
    }
    update(currentScroll){
        if(!this.hasMoved) this.translate(this.dataX, this.dataY)        
    }
    translate(x , y){                
        var posX = x*app.getWindowSize().w
        console.log("posX", app.getWindowSize().w)
        var posY = y*app.getWindowSize().h
        this.$el.css({transform: 'translateX('+posX+'px) translateY('+posY+'px)'})
        if(posX != 0 && posY != 0) this.hasMoved = true;
    }    
}