console.log("start!")

class App {
  constructor(){
    this.$el = $('#app');
    this.$home = $('#home');
    this.$tagcloud = $('#tagcloud');
    this.$pages = $('#app .pages')
    this.$projects = $('#app .projects');
    this.$galleries = $('#app .galleries');
    this.$secretElements = $('#meus-elementos-secretos');
    this.$curPage = null;
    this.tagcloud = null;
    this.route = "";
    this.pages = [];
    this.secretElements = [];
  }
  init(json){   
    this.delegateEvents();
    var pathArray = window.location.pathname.split( '/' );
    this.route = window.location.hash.substr(1);
    this.loadJson(json)  
    this.initSecretElements();     
  }
  initSecretElements(){
    var self = this;
    this.$secretElements.find('.el').each(function( index ) {                  
      var secretEl = new SecretElement($(this))     
      self.secretElements.push(secretEl);    
    }); 
  }
  delegateEvents(){
    var self = this;
    // on tag click
    this.$tagcloud.on('click', function(event){
      //if active, disable 
      if($( event.target ).hasClass('active')){
        $( event.target ).toggleClass('active');
        // clear filter
        self.onTagClick(null);
      } else {
        // if unactive, enable
        $(this).find('.tag').each(function( index ) {
          if($(this).hasClass('active')) $(this).removeClass('active');
        });
        $( event.target ).toggleClass('active');
        // set filter by tagname
        self.onTagClick(event.target.innerText);
      }      
    })
    // home || title
    $('.title-home').on('click', function(event){
      // reset values
      self.reset();
      if(self.$pages.hasClass('hide')){       
        self.$pages.toggleClass('hide')
        console.log(self.$curPage)
        if(self.curPage.$el.hasClass('show')) self.curPage.$el.toggleClass('show')
      }   
    })
    // on window resize
    $( window ).resize(function(ev) {       
      for(var p in self.pages){
        self.pages[p].animateBox();   
      }      
    });
    $( window ).on('scroll', function(ev){ 
      var currentScroll = self.getCurrentScroll()        
      for(var s in self.secretElements){
       self.secretElements[s].update(currentScroll)
      }                 
    })
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
      self.goToPage(self.route)
    });
  }
  goToPage(route){
    //console.log("route", route)
    var self = this;
    var hasFound = false;
      for(var p in this.pages){
      if(  this.pages[p].route == route){     
        //
        // wait till content is loaded
        //   
        hasFound = true;
        if(!this.$pages.hasClass('hide')) this.$pages.toggleClass('hide')
        this.curPage = this.pages[p].content;
        console.log("this.curPage", this.curPage.$el)
        //if(this.curPage.isloaded){
        self.curPage.show();

        // display tags of current page
        self.$tagcloud.find('.tag').each(function( index ) {
          var tag = $(this).text();
          var pagtags =  self.pages[p].tags;
          for(var t in pagtags){
            if(pagtags[t].pt == tag){
              console.log(pagtags[t], tag)
              if(!$(this).hasClass('active')) $(this).toggleClass('active');
            }
          }
        });
        //} else {
        //  this.preloadImages(this.curPage.getImages(), function(){
        //    console.log("show")
        //    self.curPage.show();
        //  })
        //}        
      }    
    }
    if(!hasFound){
      if(this.$pages.hasClass('hide')) this.$pages.toggleClass('hide')
    }                 
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
  preloadImages(imgs, callback) {
    console.log("preload!")
    var count = imgs.length;
    if(count === 0) {
        callback();
    }
    var loaded = 0;
    $(imgs).each(function() {
      console.log("onload")
      $(this).on('load', function() {
        loaded++;
        console.log("loaded", loaded)
        if (loaded === count) {
            console.log("all loaded!")
            callback();
        }
      });
    });
  };
  getWindowSize(){
    return {
        "w": ($(document).width() - $(window).width()),
        "h": ($(document).height() - $(window).height())
    }
  }  
  getCurrentScroll(){
    return {
      "x": $( window ).scrollTop(),
      "y": $( window ).scrollLeft()
    }
  }    
}

app = new App();

app.init("js/data.json")