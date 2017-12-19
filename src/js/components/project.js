class Project {
    constructor(pageObj) {
	  console.log(pageObj)    
      this.title = pageObj.title;
   	  this.imgs = pageObj.imgs;
      this.texts = pageObj.texts;
      this.id = this._generateId();   
      this.template =
      `
<div class="project" id="${this.id}">
    <div class="row">
        <div class="imgs col-md-8">
            ${this.imgs.map(img => `<img class="img-fluid" src="${img.src}" alt="">`).join('')}
        </div>
        <div class="col-md-4">
            <h3 class="project-title my-3">${this.title}</h3>
            ${this.texts.map(text => `<p>${text.text}</p>`).join('')} 
        </div>                
    </div>
</div>
    `
    this.render()
    }
    _generateId(){
        return '_' + Math.random().toString(36).substr(2, 9);        
    }
    render() {
    	console.log("render! porject")       
        app.$projects.empty()
        app.$projects.append(this.template);
        this.$el = $('#'+ this.id);
    }
    show(){
        console.log("show!")
		if(!this.$el.hasClass('show')) this.$el.toggleClass('show');
    }
    hide(){
		if(this.$el.hasClass('show')) this.$el.toggleClass('show');
    }
}