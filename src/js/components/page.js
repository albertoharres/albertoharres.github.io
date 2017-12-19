class Page {
    constructor(pageObj, index) {
      console.log("pageObj", pageObj)
      this.index = index;
      this.tags = pageObj.tags
      this.id = this._generateId();
      this._setContent(pageObj)      
      this.template =
      `
      <div id="${this.id}" class="box col-lg-3 col-md-4 col-xs-6">
          <a href="#${pageObj.title}" class="d-block mb-2 h-100">
              <img class="img-fluid img-thumbnail" src="${pageObj.thumb}" title="${pageObj.title}">
              <div class="caption">
                <p>${pageObj.title}</p>
              </div>
          </a>
      </div>
      `
    }    
    _generateId(){
        return '_' + Math.random().toString(36).substr(2, 9);        
    }
    _setContent(pageObj){
        this.content = null;
        this.type = pageObj.type
        switch(this.type){
            case "project":
            this.content = new Project(pageObj)
            this.content.render()  
                break;
            case "gallery":
            this.content = new Gallery(pageObj)  
            this.content.render()
                break;
        }
    }
    hasTag(tag){      
        var hasFound = null;
        for(var t in this.tags){
            if(this.tags[t].pt == tag) {
                hasFound = true
                return true;
            } else {
                hasFound = false
            }
        }
        if(hasFound == false) return false;
    }
    hide(){
        if(!this.$el.hasClass('hide')){
            this.$el.toggleClass("hide")     
        } 
    }
    show(index){    
        if(this.$el.hasClass('hide')){
            this.$el.toggleClass("hide")                 
        }
        if(index != null || index != undefined ) {
            this.index = index;
        }
            this.animateBox()
        
    }
    render() {
        app.$pages.append(this.template);
        this.delegateEvents();    
        this.animateBox();
    }
    delegateEvents(){
      var self = this;
      this.$el = $('#' + this.id);
      this.$el.on('click', function(ev){
        if(self.content != null){            
          self.content.show();
          app.$curPage = self.content.$el;
          app.$pages.addClass('hide');         
        }
      })
    }    
    animateBox(){
        var w = $(window).width();
        var isCentralized, isMobile;
        if(w >= 992){
          isCentralized = false
        } else {
          isCentralized = true;
          if(w < 768){
            isMobile = true;
          } else {
            isMobile = false;
          }
        }      
        // calc 
        var width = this.$el.width();
        var height = this.$el.outerHeight();
        var margin = 5;      
        var appWidth = app.$el.width();

        var maxCols = Math.floor(appWidth/(width + margin)) 
        var col = this.index % maxCols;
        var row = Math.floor(this.index / maxCols);                 
        var x = col * width;
        var y = row * width;

        var rest = appWidth - ((width + margin*2)*maxCols)

        if(true) console.log("width", width, "w", w)

        if(isCentralized && !isMobile){
            this.$el.parent().css('margin-left',rest/2+'px');
        } else {
            this.$el.parent().css('margin-left',0+'px');
        }

        //this.$el.css('transform', 'translate(' + x + 'px)');
        if(!isMobile){
            this.$el.css({transform: 'translateX('+x+'px) translateY('+y+'px)'})
        } else {
            this.$el.css({transform: 'translateX('+0+'px) translateY('+0+'px)'})
        }
        
        function transition(){
            
        }
    }
  }  