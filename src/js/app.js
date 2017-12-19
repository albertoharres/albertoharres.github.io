console.log("start!")

class App {
  constructor(){
    this.$el = $('#app');
    this.$home = $('#home');
    this.$tagcloud = $('#tagcloud');
    this.$pages = $('#app .pages')
    this.$projects = $('#app .projects');
    this.$galleries = $('#app .galleries')
    this.$curPage = null;
    this.tagcloud = null;
    this.pages = [];
  }
  init(json){   
    this.delegateEvents();
    this.loadJson(json)    
  }
  delegateEvents(){
    var self = this;
    // tags
    this.$tagcloud.on('click', function(event){
      if($( event.target ).hasClass('active')){
        $( event.target ).toggleClass('active');
        self.onTagClick(null);
      } else {
        $(this).find('.tag').each(function( index ) {
          if($(this).hasClass('active')) $(this).removeClass('active');
        });
        $( event.target ).toggleClass('active')
        self.onTagClick(event.target.innerText);
      }      
    })
    // home || title
    $('.title-home').on('click', function(event){
      self.reset();
      if(self.$pages.hasClass('hide')){       
        self.$pages.toggleClass('hide')
        console.log(self.$curPage)
        if(self.$curPage.hasClass('show')) self.$curPage.toggleClass('show')
      }   
    })
    // on window resize
    $( window ).resize(function(ev) {     
      for(var p in self.pages){
        self.pages[p].animateBox();   
      }      
    });
  }
  loadJson(json){
    var tags = [];
    var self = this;
    $.getJSON( json, function( data ) {  
      $.each( data, function( key, val ) {    
        for(var p in val){      
          var page = new Page(val[p], p);      
          self.pages.push(page);
          val[p].tags.map(tag => tags.push(tag))
        }
      })
    }).done(function(){
      self.setTags(tags)
      for(var p in self.pages){
        self.pages[p].render();   
      }
    });
  }
  reset(){
    // reset tags
    this.onTagClick(null);
    this.$tagcloud.find('.tag').each(function( index ) {
      if($(this).hasClass('active')) $(this).removeClass('active');
    });
    for(var p in this.pages){
      this.pages[p].animateBox();   
    }  
    // reset page boxes
  }
  setTags(tags){
    var tagList = []; 
    for (var t in tags){
      var repeatedTagIndex = null  
      tags[t].counter = 0;
      for(var l in tagList){
        if( tags[t].pt == tagList[l].pt){
          repeatedTagIndex = l;
        } 
      }
      if(repeatedTagIndex != null){
        tagList[repeatedTagIndex].counter++;
      }else {
        tagList.push(tags[t]);
      }
    }
    this.tagcloud = new Tags(tagList);   
    var self = this; 
    this.tagcloud.render()
  }    
  onTagClick(tagString){    
    var index = 0;
    for(var p in this.pages){
      if(tagString != null){
        if(!this.pages[p].hasTag(tagString)){
          this.pages[p].hide();
        } else {
          this.pages[p].show(index);
          index ++ ;
        }
      } else {
        this.pages[p].show(index);
        index ++ ;
      }      
    }
  }
  onPageClick(){
    
  }
}

app = new App();

app.init("js/data.json")