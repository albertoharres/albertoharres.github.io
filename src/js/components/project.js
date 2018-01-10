class Project {
    constructor(pageObj) {
      this.title = pageObj.title;   	  
      this.texts = pageObj.texts;
      this.id = this._generateId();   
      this.template =
      `
<div class="page project" id="${this.id}">
    <div class="row">
        <div class="content col-sm-auto">
            ${pageObj.imgs.map(img => `<img class="img-fluid" src="${img.src}" alt="">`).join('')}
        </div>
        <div class="text col-sm-5">
            <h3 class="project-title my-3">${this.title}</h3>
            ${this.texts.map(text => `<p>${text.text}</p>`).join('')} 
        </div>                
    </div>
</div>
      `
    this.render();
    }
    _generateId(){
        return '_' + Math.random().toString(36).substr(2, 9);        
    }
    render() {
        //app.$projects.empty()
        app.$projects.append(this.template);
        this.$el = $('#'+ this.id);              
    }
    getImages(){
        var imgs = []
        this.$el.find('.img-fluid').each(function() {
            imgs.push(this)
        })
        return imgs;
    }
    show(){
        console.log("show project!")
        this.isloaded = true;
        if(!this.$el.hasClass('show')) this.$el.toggleClass('show');
    }
    hide(){
		if(this.$el.hasClass('show')) this.$el.toggleClass('show');
    }
}