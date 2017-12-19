class Page {
    constructor(pageObj) {
      console.log("pageObj", pageObj)
      this.tags = pageObj.tags
      this.id = this._generateId();
      this._setContent(pageObj)      
      this.template =
      `
      <div id="${this.id}" class="box col-lg-3 col-md-4 col-xs-6">
          <a href="#" class="d-block mb-2 h-100">
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
        if(pageObj.type == "project") this.content = new Project(pageObj)            
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
        if(!this.$el.hasClass('has')){
            this.$el.toggleClass("hide")     
        } 
    }
    show(){
        if(this.$el.hasClass('has')){
            this.$el.toggleClass("hide")     
        }
    }
    render() {
        $('#app .gallery').append(this.template);
        this.delegateEvents();    
    }
    delegateEvents(){
      var self = this;
      this.$el = $('#' + this.id);
      this.$el.on('click', function(ev){
        console.log('click', self.content)
        if(self.content != null){
          self.content.render();
        }
      })
    }
  }  