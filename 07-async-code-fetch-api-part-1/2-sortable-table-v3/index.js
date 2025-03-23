import fetchJson from './utils/fetch-json.js';
import SortableTableV2 from '../../06-events-practice/1-sortable-table-v2/index.js';

const BACKEND_URL = 'https://course-js.javascript.ru';

export default class SortableTable extends SortableTableV2 {
  static pageSize = 30;
  url;
  offsetStart = 0;
  offsetEnd = 30;
  isFetching = false;

  constructor(headersConfig, {
    url = '',
    isSortLocally = false,
    data = [],        
    sorted = {
      id : headersConfig.find(item => item.sortable).id,
      order: 'asc'
    }    
  } = {}) {
    //debugger
    super(headersConfig, {data, sorted});
    this.url = url;
    this.isSortLocally = isSortLocally;    
       
    this.render();
  }

  createUrl() {
    const url = new URL(this.url, BACKEND_URL);
    url.searchParams.set('_embed', 'subcategory.category');
    url.searchParams.set('_sort', this.sorted.id);
    url.searchParams.set('_order', this.sorted.order);
    url.searchParams.set('_start', this.offsetStart);
    url.searchParams.set('_end', this.offsetEnd);

    return url;
  }

  showLoader() {    
    this.subElements.loading.style.display = 'flex';  
  }

  hideLoader() {
    this.subElements.loading.style.display = 'none';
  }

 /* async render() {
    if (this.isFetching) {
      return;
    }

    try {
      this.isFetching = true;
      this.showLoader();      
      const url = this.createUrl();
      const response = await fetchJson(url);
      if (response === null || Object.keys(response).length === 0) {
        console.log('Нет данных');
        return;
      }
      this.data = [...this.data, ...response];
      this.sort(this.sorted.id, this.sorted.order);

      return response;      
    } catch(err) {
      console.log('Fetch error', err);
    }  
    finally {
      this.hideLoader();      
      this.isFetching = false;
    }  
  } */

  async render() {    
    await this.sort(this.sorted.id, this.sorted.order);
  }    

  async sort(field, order)  {
    super.sort(field, order);
  }
  
  sortOnServer(field, order) {
   // super.sortOnServer(field, order);
  
    if (this.isFetching) {
      return;
    }

    this.isFetching = true;
    this.showLoader();     
   
    return fetchJson(this.createUrl())      
      .then((data) => {
        if (data === null || Object.keys(data).length === 0) {
          console.log('Нет данных');
          return;
        }
        if (this.offsetStart === 0) {
          this.data = [...data];
        } else {
          this.data = [...this.data, ...data];
        }
        console.log(this.data.length);
                
        this.hideLoader();        
        
        this.update();        

        this.offsetStart += SortableTable.pageSize;
        this.offsetEnd += SortableTable.pageSize;
        
        this.isFetching = false;
        })                               
      .catch(err => {
        this.hideLoader();  
        this.isFetching = false;
        console.warn('Fetch error', err);
      })      
      //.finally(() => {        
    //  }            
  }

 async handleWindowScroll(e) {
  if (this.isFetching) {
    return;
  }
   // const threshold = document.body.offsetHeight - window.innerHeight / 8;  // Порог
   // const position = window.scrollY + window.innerHeight; // Низ экрана относительно страницы   
    const shouldFetch = window.scrollY + window.innerHeight >= document.body.clientHeight +40;   

    if (shouldFetch) {          
      console.log(window.scrollY + window.innerHeight, document.body.clientHeight + 40 );      
      await this.render();    
   }  
  }

  handleHeaderCellPointerDown(e) {    
    this.offsetStart = 0;
    this.offsetEnd = 30;    
    super.handleHeaderCellPointerDown(e);    
  }

  createListeners() {
    this.handleHeaderCellPointerDown = this.handleHeaderCellPointerDown.bind(this);    
    super.createListeners();   
    this.handleWindowScroll = this.handleWindowScroll.bind(this);        
    window.addEventListener('scroll', this.handleWindowScroll);
  }

  destroyListeners() {
    super.destroyListeners();
    window.removeEventListener('scroll', this.handleWindowScroll);
  }

 


}
