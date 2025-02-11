export default class ColumnChart { 
  element;
  chartHeight = 50;

  constructor({
    data = [],
    label = '',
    link = '',
    value = 0,
    formatHeading = value => value
  } = {}
  ) 
  {
    this.data = data;
    this.label = label;
    this.link = link;
    this.value = value;
    this.formatHeading = formatHeading;
    this.element = this.createElement(this.createTemplate());

  }

  getColumnProps(data) {
    const maxValue = Math.max(...this.data);
    const scale = 50 / maxValue;
  
    return this.data.map(item => {
      return {
        percent: (item / maxValue * 100).toFixed(0) + '%',
        value: String(Math.floor(item * scale))
      };
    });
  }

  createElement(template) {
    const element = document.createElement('div');
    element.innerHTML = template;
    return element.firstElementChild ;
  }

  createLinkTemplate() {
    if (this.link) {
      return `<a href="${this.link}" class="column-chart__link">View all</a>`;
    }
    return '';
  }

  createChartBodyTemplate () {
    return this.getColumnProps().map(({percent, value}) => (
      `<div style="--value: ${value}" data-tooltip="${percent}"></div>`
    )
    ).join('');
  }

  createChartClass() {
    return this.data.length ? 'column-chart' : 'column-chart_loading';
  }

  createTemplate() {
    return `
    <div class="${this.createChartClass()}" style="--chart-height: 50">
      <div class="column-chart__title">
        ${this.label}
        ${this.createLinkTemplate()}
      </div>
      <div class="column-chart__container">
        <div data-element="header" class="column-chart__header">${this.formatHeading(this.value)}</div>
        <div data-element="body" class="column-chart__chart">
          ${this.createChartBodyTemplate()}          
        </div>
      </div>`;
  }

  update(newData) {
    this.data = newData; 
    this.element.querySelector('[data-element="body"]').innerHTML = this.createChartBodyTemplate();  
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}
