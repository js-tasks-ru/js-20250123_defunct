export default class SortableTable {
  subElements = {};

  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;   
    this.element = this.createElement(this.createTemplate());   
    this.selectSubElements();
    //console.log(this.subElements);
  }

  selectSubElements() {
    this.element.querySelectorAll('[data-element]').forEach(element => {      
      this.subElements[element.dataset.element] = element;
    });
  }

  createTableHeader(fieldValue, orderValue) {
    if (!Array.isArray(this.headerConfig) || this.headerConfig.length === 0) {
      return;
    }

    let headerCells = this.headerConfig.reduce((str, item)=> {
    //  debugger
      return str + `
      <div class="sortable-table__cell" data-id="${item.id}" data-sortable="${item.sortable}" data-order="${(fieldValue === item.id) ? orderValue : ''}">
        <span>${item.title}</span>
      </div>`;
    }, '');  
    //  console.log(headerCells)  ;

    return `
      <div data-element="header" class="sortable-table__header sortable-table__row">
      ${headerCells}
      </div>
    `;
  }

  createTableRowTemplate(object) {
    let rowStr;
    rowStr = `<a href="/products/${object.id}" class="sortable-table__row"> `;
    let divContent;
    // debugger
    (this.headerConfig).forEach((item) => {
      if (item.id === 'images') {
        divContent = `<img class="sortable-table-image" alt="Image" src="${object.images[0].url}"> </img>`;        
      } else {
        divContent = object[item.id];
      } 
      rowStr += `<div class="sortable-table__cell">${divContent}</div> `;
    });

    rowStr += `</a>`;
    return rowStr;
  }

  createTableBody() {
    let tableStr = `<div data-element="body" class="sortable-table__body">
    `;

    this.data.forEach((item)=> {
      tableStr += this.createTableRowTemplate(item);     
    }, '');  

    return tableStr + `</div>
    `;
  }

  createTemplate(fieldValue = '', orderValue = '') {
    return (`
    <div data-element="productsContainer" class="products-list__container">
  <div class="sortable-table">
    ${this.createTableHeader(fieldValue, orderValue)} 
    ${this.createTableBody()}        

    <div data-element="loading" class="loading-line sortable-table__loading-line"></div>

    <div data-element="emptyPlaceholder" class="sortable-table__empty-placeholder">
      <div>
        <p>No products satisfies your filter criteria</p>
        <button type="button" class="button-primary-outline">Reset all filters</button>
      </div>
    </div>

  </div>
</div>`
    );
  }

  createElement(template) {
    let element = document.createElement('div');
    element.innerHTML = template;
    return element.firstElementChild ;
  }

  updateElement(template) {    
    // this.element.outerHTML = template;
    let parent = this.element.parentElement;
    parent.innerHTML = template;  
    this.element = parent.firstElementChild;
  }

  sort(fieldValue, orderValue) {   
    if (this.data.length === 0) {
      return;
    }

    const cellIndex = this.headerConfig.findIndex(item => item.id === fieldValue);
    if (!this.headerConfig[cellIndex].sortable) {
      return;
    }
    
    if ((typeof (this.data[0][fieldValue]) === 'number') || (typeof (this.data[0][fieldValue]) === 'bigint') || (typeof (this.data[0][fieldValue]) === 'boolean')) {
      if (orderValue === 'asc') {
        this.data.sort((a, b) => parseFloat(a[fieldValue]) - parseFloat(b[fieldValue]));
      } else { 
        this.data.sort((a, b) => parseFloat(b[fieldValue]) - parseFloat(a[fieldValue]));
      }  
      
    } else if (typeof (this.data[0][fieldValue]) === 'string') {
      if (orderValue === 'asc') {
        this.data.sort((a, b) => a[fieldValue].localeCompare(b[fieldValue], 'ru', {caseFirst: 'upper'}));
      } else {
        this.data.sort((a, b) => -a[fieldValue].localeCompare(b[fieldValue], 'ru', {caseFirst: 'upper'}));
      }  
    }
   
    this.updateElement(this.createTemplate(fieldValue, orderValue));
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}

