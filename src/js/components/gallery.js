class Gallery {
    constructor(pageObj) {
      this.title = pageObj.title;
      this.texts = pageObj.texts
      var colSize = 6; 
      var isBig = false;
     
      switch(pageObj.gallerySize){
        case "small":
        colSize = 4;
          break;
        case "medium":
        colSize = 6;
            break;
        case "big":
        isBig = true;
        colSize = 12;
            break;
      }

      this.id = this._generateId();  
      this.template =
      `
      <div class="page gallery" id="${this.id}">
          <div class="text mb-4">
            <h3 class="text-center ${isBig ? '' : 'text-lg-left'}">${this.title}</h1>
            <p class="text-center ${isBig ? '' : 'text-lg-left'}">asiod iojas diojasd ioas djioasd oijasd oijasd oiasdj oias djasdio jasd oiasdj ioasd j</p>
          </div>
          <div class="row text-center ${isBig ? '' : 'text-lg-left'}">
            ${pageObj.imgs.map(img => 
                `              
                <div class="gallery-img col-lg-${colSize} col-md-4 col-xs-6">
                    <a href="#" class="d-block mb-4 h-100">
                        <img class="img-fluid img-thumbnail" src="${img.src}" alt="">
                        <div class="caption text-center">
                            <p>${img.caption}</p>
                        </div>
                    </a>
                </div>              
                `
            ).join('')}
          </div>
      </div>
      `
      this.render()
    }
    _generateId(){
        return '_' + Math.random().toString(36).substr(2, 9);        
    }
    render() {
        console.log("render! galleries")
       // app.$galleries.empty()
        app.$galleries.append(this.template);
        this.$el = $('#'+ this.id);
    }
    getImages(){
        console.log("get images!")
        var imgs = []
        this.$el.find('.img-fluid').each(function() {
            imgs.push(this)
        })
        console.log(imgs)
        return imgs;
    }
    show(){
        console.log("show gallery!")
        this.isloaded = true;
        if(!this.$el.hasClass('show')) this.$el.toggleClass('show');
    }
    hide(){
		if(this.$el.hasClass('show')) this.$el.toggleClass('show');
    }
}