class Tags {
    constructor(tagList) {
      this.tagList = tagList;
      this.template =
      `
      <div class="text-center text-lg-left">
        ${tagList.map(tag => `<a class="tag" href="#">${tag.pt}</a>`).join('')}
      </div>
      `
    }
    render() {
      this.$el = $('#tagcloud')
      this.$el.append(this.template);
    }
}