class Tooltip {
  static instance;
  element;

  constructor() {
    if (Tooltip.instance) {
      return Tooltip.instance;
    }

    Tooltip.instance = this; 
  }

  handleDocumentPointerOver = (event) =>{
    if (!event.target.dataset.tooltip) {
      return;
    }
    const tooltip = event.target.dataset.tooltip;  

    const x = event.clientX;  // получаем координату X мыши
    const y = event.clientY;  // получаем координату Y мыши

    this.element.style.left = x + 'px' ;
    this.element.style.top = y + 'px';

    this.render(tooltip); 
  }

  handleDocumentPointerOut = (event) => {
    if (!event.target.dataset.tooltip) {
      return;    
    }  
    this.remove();
  } 

  createListeners() {   
    document.addEventListener('pointerover', this.handleDocumentPointerOver);  
    document.addEventListener('pointerout', this.handleDocumentPointerOut);  
  }

  destroyListeners() {
    document.removeEventListener('pointerover', this.handleDocumentPointerOver);
    document.removeEventListener('pointerout', this.handleDocumentPointerOut); 
  }

  initialize () { 
    const element = document.createElement('div');
    element.innerHTML = '<div class="tooltip">This is tooltip</div>';
    
    this.element = element.firstElementChild;

    this.createListeners();
  }

  render(tooltip) {      
    this.element.textContent = tooltip;
    document.body.append(this.element);      
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
    this.destroyListeners();    
  }

}

export default Tooltip;
