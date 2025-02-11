export default class NotificationMessage {
  message ;
  duration;
  type; 
  element;
 
  constructor(
    message = '',
    {duration = 1000, 
      type = 'success'} = {}      
  ) 
  {
    this.message = message;
    this.duration = duration;
    this.type = type;  
    this.element = this.createElement(this.createTemplate());
    //  debugger;
  }

  createTemplate() {
    return (`    
      <div class="timer"></div>
      <div class="inner-wrapper">
        <div class="notification-header">${this.type}</div>
        <div class="notification-body">
          ${this.message}
        </div>
      </div>`
    );
  }

  createElement(template) {
    const element = document.createElement('div');
    element.style = `--value:${Math.floor(this.duration / 1000)}s`;
    // element.style = "--value:20s";
    element.className = `notification ${this.type}`;
    element.innerHTML = template;
    return element ;
  }

  show(target = document.body) {  
    if (!target.querySelector('div.notification')) {        
      target.append(this.element);    
    }  
    this.timeId = setTimeout(()=> {
      this.remove();  
    }, this.duration
    );
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    clearTimeout(this.timerId);
    this.remove();  
  }
  
}
