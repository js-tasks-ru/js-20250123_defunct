import fetchJson from './utils/fetch-json.js';
import ColumnChartV1 from '../../04-oop-basic-intro-to-dom/1-column-chart/index.js';

const BACKEND_URL = 'https://course-js.javascript.ru';

export default class ColumnChart extends ColumnChartV1 {
  url
  range
  subElements = {};

  constructor({
    url = '',
    range = {},
    label = '',
    link = '',    
    formatHeading = value => value
  } = {}
  ) 
  {    
    super({label, link, formatHeading});
    this.selectSubElements();
    this.url = url;
    this.range = range;
    const {from, to}  = range;  
    this.update(from, to);
  }

  selectSubElements() {
    this.element.querySelectorAll('[data-element]').forEach(element => {      
      this.subElements[element.dataset.element] = element;  
    });    
  }  

  getShortDate(fullDateTime) {
    return fullDateTime.toISOString().split('T')[0] ;
  }

  createUrl(from, to) {
    const url = new URL(this.url, BACKEND_URL);
    if (from) {
      url.searchParams.append('from', this.getShortDate(from));
    }
    if (to) {
      url.searchParams.append('to', this.getShortDate(to));     
    }    
    return url.toString();
  }

  /*fetchData(from, to) {
    const url = this.createUrl(from, to);
    fetch(url)
    .then(response => response.json())
    .then(data => {      
      const dataArr = Object.values(data);
      this.value = dataArr.reduce((sum, current) => sum + current, 0);      
      super.update(dataArr);
    })  
    .catch (err => console.log(err));    
  }*/

  async update(from, to) {
    try {
      const url = this.createUrl(from, to);
      const response = await fetchJson(url);
      this.data = Object.values(response);
      this.value = this.data.reduce((sum, current) => sum + current, 0);
      super.update(this.data);
      return response;      
    } catch(err) {
      console.log(err);
    }
  }

}
