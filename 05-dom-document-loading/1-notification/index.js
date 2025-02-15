export default class NotificationMessage {  
  message ;
  duration;
  type; 
  element;
 
  static lastShownComponent;

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
  }

  createTemplate() {
    return (`    
      <div class="notification ${this.type}" style="--value:${Math.floor(this.duration / 1000)}s">
        <div class="timer"></div>
        <div class="inner-wrapper">
          <div class="notification-header">${this.type}</div>
          <div class="notification-body">
            ${this.message}
          </div>
        </div>
      </div>`
    );
  }

  createElement(template) {
    const element = document.createElement('div');
    element.innerHTML = template;
    return element.firstElementChild ;
  }

  show(target = document.body) {  
    if (NotificationMessage.lastShownComponent) {
    //  debugger;
      NotificationMessage.lastShownComponent.remove();
    }
    NotificationMessage.lastShownComponent = this; 

    target.append(this.element);

    this.timeId = setTimeout(()=> {
      this.remove();  
    }, this.duration
    );
  }

  remove() {
    this.element.remove();
    clearTimeout(this.timerId);
  }

  destroy() {    
    this.remove();  
  }
  
}
