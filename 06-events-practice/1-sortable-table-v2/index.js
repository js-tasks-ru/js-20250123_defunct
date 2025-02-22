import SortableTableV1 from '../../05-dom-document-loading/2-sortable-table-v1/index.js';

export default class SortableTable extends SortableTableV1 {
  arrowElement
  isSortLocally

  constructor(headersConfig, {
    data = [],
    sorted = {}
  } = {}) {      
    
    super(headersConfig, data);
    this.isSortLocally = true;
    this.createListeners();
    this.createArrowElement();

    if (sorted.id) {
      const sortElem = this.element.querySelector(`[data-id="${sorted.id}"]`);
      if (sortElem) {
        sortElem.dataset.order = sorted.order;
        sortElem.append(this.arrowElement);
      }
      this.sort(sorted.id, sorted.order);
    }  
  }

  createArrowElement() {
    const element = document.createElement('div');
    element.innerHTML = `<span data-element="arrow" class="sortable-table__sort-arrow">
      <span class="sort-arrow"></span>
    </span>`;
    this.arrowElement = element.firstElementChild ;
  }

  handleHeaderCellPointerDown = (e) => {
    const cellElement = e.target.closest('.sortable-table__cell');

    if (!cellElement) {
      return;
    }

    if (cellElement.dataset.sortable === 'false') {     
      return;
    }

    const sortField = cellElement.dataset.id;
    const sortOrder = (cellElement.dataset.order === 'desc') ? 'asc' : 'desc';

    console.log(sortOrder);

    cellElement.dataset.order = sortOrder;              
    cellElement.append(this.arrowElement);

    this.sort(sortField, sortOrder);
  }

  sortOnClient(sortField, sortOrder) {
    super.sort(sortField, sortOrder);
  }

  sortOnServer() {

  }

  sort(sortField, sortOrder) {
    if (this.isSortLocally) {      
      this.sortOnClient(sortField, sortOrder);
    } else {
      this.sortOnServer();
    }
  }

  createListeners() {
    this.subElements.header.addEventListener('pointerdown', this.handleHeaderCellPointerDown);
    //this.subElements.header.addEventListener('click', this.handleHeaderCellClick);
  }

  destroyListeners() {
    this.subElements.header.removeEventListener('pointerdown', this.handleHeaderCellPointerDown);
  }

  destroy() {
    super.destroy();
    this.destroyListeners();
  }
}
