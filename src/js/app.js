console.log("start!")

class App {
  constructor(){
    this.$el = $('#app');
    this.$home = $('#home');
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
    $('#tagcloud').on('click', function(event){
      $(this).find('.tag').each(function( index ) {
        if($(this).hasClass('active')) $(this).removeClass('active');
      });
      $( event.target ).toggleClass('active')
      self.onTagClick(event.target.innerText);
    })

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
      //console.log("init!", self.pages)
      self.setTags(tags)
      for(var p in self.pages){
        self.pages[p].render();   
      }
    });
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
    //console.log(tagList)
    this.tagcloud = new Tags(tagList);   
    var self = this; 
    this.tagcloud.render()
  }    
  onTagClick(tagString){
    for(var p in this.pages){
      if(!this.pages[p].hasTag(tagString)){
        this.pages[p].hide();
      } else {
        this.pages[p].show();
      }
    }
  }
  onPageClick(){
    
  }
}

app = new App();

app.init("js/data.json")