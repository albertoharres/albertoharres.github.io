class Page {
    constructor(title, thumb, type, description, tags) {    
      this.title = title;
      this.thumb = thumb;
      this.type = type;
      this.description = description;
      this.tags = tags;
      this.id = this._generateId();      
      this.template =
      `
      <div id="${this.id}" class="box col-lg-3 col-md-4 col-xs-6">
          <a href="#" class="d-block mb-2 h-100">
              <img class="img-fluid img-thumbnail" src="${this.thumb}" title="${this.title}">
              <div class="caption">
                <p>${this.title}</p>
              </div>
          </a>
      </div>
      `
    }
    _generateId(){
        return '_' + Math.random().toString(36).substr(2, 9);        
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
        this.$el = $('#' + this.id);
    }
  }  