class Gallery {
    constructor(pageObj) {
	  console.log(pageObj)    
      this.title = pageObj.title;
      this.texts = pageObj.texts
      this.id = this._generateId();  
      this.template =
      `
      <div class="page gallery" id="${this.id}">
          <h3 class="my-4 text-center text-lg-left">${this.title}</h1>
          <div class="row text-center text-lg-left">
            ${pageObj.imgs.map(img => 
                `              
                <div class="col-lg-6 col-md-4 col-xs-6">
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