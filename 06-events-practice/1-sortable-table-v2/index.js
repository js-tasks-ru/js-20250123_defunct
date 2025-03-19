import SortableTableV1 from '../../05-dom-document-loading/2-sortable-table-v1/index.js';

export default class SortableTable extends SortableTableV1 {
  arrowElement
  sorted
  isSortLocally  

  constructor(headersConfig, {
    isSortLocally = true,
    data = [],
    sorted = { id: 'title', desc: 'asc'}
  } = {}) {      
    
    super(headersConfig, data);
    this.sorted = sorted;
    this.isSortLocally = isSortLocally;    
    this.createListeners();
    this.createArrowElement();

    if (sorted.id) {
      const sortElem = this.element.querySelector(`[data-id="${sorted.id}"]`);
      if (sortElem) {
        sortElem.dataset.order = sorted.order;
        sortElem.append(this.arrowElement);
      }
      this.sort(this.sorted.id, this.sorted.order);
    }  
  }

  createArrowElement() {
    const element = document.createElement('div');
    element.innerHTML = `<span data-element="arrow" class="sortable-table__sort-arrow">
      <span class="sort-arrow"></span>
    </span>`;
    this.arrowElement = element.firstElementChild ;
  }

  handleHeaderCellPointerDown (e) {    
    const cellElement = e.target.closest('.sortable-table__cell');
    

    if (!cellElement) {
      return;
    }

    if (cellElement.dataset.sortable === 'false') {     
      return;
    }

    const sortField = cellElement.dataset.id;
    const sortOrder = (cellElement.dataset.order === 'desc') ? 'asc' : 'desc';

    cellElement.dataset.order = sortOrder;              
    cellElement.append(this.arrowElement);

    this.sort(sortField, sortOrder);
  }

  sortOnClient(sortField, sortOrder) {
    super.sort(sortField, sortOrder);
  }

  sortOnServer(sortField, sortOrder) {
    // TODO
   // throw new Error('must be implemented');
  }

  sort(sortField, sortOrder) {
    this.sorted.id = sortField;
    this.sorted.order = sortOrder;

    if (this.isSortLocally) {      
      this.sortOnClient(sortField, sortOrder);
    } else {
      this.sortOnServer(sortField, sortOrder);
    }
  }

  createListeners() {
    this.handleHeaderCellPointerDown = this.handleHeaderCellPointerDown.bind(this);               
    this.subElements.header.addEventListener('pointerdown', this.handleHeaderCellPointerDown);      
  }

  destroyListeners() {
    this.subElements.header.removeEventListener('pointerdown', this.handleHeaderCellPointerDown);
  }

  destroy() {
    super.destroy();
    this.destroyListeners();
  }
}
