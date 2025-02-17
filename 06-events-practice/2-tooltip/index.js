class Tooltip {
  static instance;
  element;

  constructor() {
    if (Tooltip.instance) {
      return Tooltip.instance;
    }

    Tooltip.instance = this;    

    document.addEventListener('click ', (e) => console.log('тык'));/*this.showTooltip*/    
    document.addEventListener('pointerout ', this.hideTooltip);  
  }

  initialize () { 
    const element = document.createElement('div');
    element.innerHTML = '<div class="tooltip">This is tooltip</div>';
    
    this.element = element.firstElementChild;
    this.element.hidden = true;
    document.body.append(this.element);  
    
    return;       
  }

  render(tooltip) {
    this.element.textContent = tooltip;
    this.element.hidden = false;
  }

  showTooltip(event) {
    debugger;
    if (!event.target.dataset.tooltip) return;
    const tooltip = event.target.dataset.tooltip;  
    this.render(tooltip);    
  }

  hideTooltip(event) {
    if (!event.target.dataset.tooltip) return;    
    this.element.hidden = true;
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
    document.removeEventListener('pointerover ', this.showTooltip);
    document.removeEventListener('pointerout ', this.hideTooltip); 
  }

}

export default Tooltip;
