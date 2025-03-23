export default class SortableTable {
  subElements = {};

  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;   
    this.element = this.createElement(this.createTemplate());   
    this.selectSubElements();  
  }

  selectSubElements() {
    this.element.querySelectorAll('[data-element]').forEach(element => {      
      this.subElements[element.dataset.element] = element;
    });
  }

  createTableHeader(fieldValue, orderValue) {
    let headerCells = this.headerConfig.reduce((str, item)=> {

      return str + `
      <div class="sortable-table__cell" data-id="${item.id}" data-sortable="${item.sortable}" data-order="${(fieldValue === item.id) ? orderValue : ''}">
        <span>${item.title}</span>
      </div>`;
    }, '');  

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

    this.headerConfig.forEach((item) => {
      if (item.template) {
        divContent = item.template(object.images);
      } else {
        divContent = `<div class="sortable-table__cell">${object[item.id]}</div> `;
      }
      rowStr += divContent;
    });

    rowStr += `</a>`;
    return rowStr;
  }

  createTableBody() {
    let tableStr = '';

    this.data.forEach((item)=> {
      tableStr += this.createTableRowTemplate(item);     
    }, '');  

    return tableStr;
  }

  createTemplate(fieldValue = '', orderValue = '') {
    if (!Array.isArray(this.headerConfig) || this.headerConfig.length === 0) {
      return;
    }

    return (`
    <div data-element="productsContainer" class="products-list__container">
  <div class="sortable-table">
    <div data-element="loading" class="loading-line sortable-table__loading-line"></div>
    ${this.createTableHeader(fieldValue, orderValue)} 
    <div data-element="body" class="sortable-table__body">
      ${this.createTableBody()}  
    </div>          
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
    const element = document.createElement('div');
    element.innerHTML = template;
    return element.firstElementChild ;
  }

  sort(fieldValue, orderValue) {       
    if (this.data.length === 0) {
      return;
    }

    const columnConfig = this.headerConfig.find(item => item.id === fieldValue);

    if (!columnConfig.sortable) {
      return;
    }

    const k = orderValue === 'asc' ? 1 : -1;   
    if (columnConfig.sortType === 'number') {
      this.data.sort((a, b) => k * (a[fieldValue] - b[fieldValue]));
      
    }
    if (columnConfig.sortType === 'string') {
      this.data.sort((a, b) => k * a[fieldValue].localeCompare(b[fieldValue], ['ru','en'], {caseFirst: 'upper'})); 
    }
           
    this.update();
  }

  update() {
    //this.element.querySelector('[data-element="body"]').innerHTML = this.createTableBody();
    this.subElements.body.innerHTML = this.createTableBody();
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}

