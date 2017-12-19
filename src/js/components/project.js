class Project {
    constructor(pageObj) {
	  console.log(pageObj)    
      this.title = pageObj.title;
   	  this.imgs = pageObj.imgs;
   	  this.texts = pageObj.texts
      this.template =
      `
<div class="row">
	<div class="imgs col-md-8">
		${this.imgs.map(img => `<img class="img-fluid" src="${img.src}" alt="">`).join('')}
	</div>
	<div class="col-md-4">
		<h3 class="project-title my-3">${this.title}</h3>
		${this.texts.map(text => `<p>${text.text}</p>`).join('')} 
	</div>                
</div>
	`
    }
    render() {
    	console.log("render!")
        this.$el = $('#app .project');
        this.$el.empty()
        this.$el.append(this.template);
        this.show();
    }
    show(){
		if(!this.$el.hasClass('show')) this.$el.toggleClass('show');
    }
    hide(){
		if(this.$el.hasClass('show')) this.$el.toggleClass('show');
    }
}