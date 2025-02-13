export default class SortableTable {
  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig
    this.data = data
    this.element = this.createElement(this.createTemplate())
  }

  createTableHeader() {
    if (!Array.isArray(this.headerConfig) || this.headerConfig.length === 0) {
      return;
    }

    let headerCells = this.headerConfig.reduce((str, item)=> {
      return str + `
      <div class="sortable-table__cell" data-id="${item.id}" data-sortable="${item.sortable}" data-order="asc">
        <span>${item.title}</span>
      </div>`
    }, '');  
  //  console.log(headerCells)  ;

    return `
      <div data-element="header" class="sortable-table__header sortable-table__row">
      ${headerCells}
      </div>
    `;
  }

  createTableBody() {
    let rowStr;
    this.data.forEach((item, index)=> {
      //if (this.headerConfig[index].id = "images") {
        rowStr = `
        <a href="/products/${item.id}" class="sortable-table__row">
          <div class="sortable-table__cell">
            <img class="sortable-table-image" alt="Image" src="${item.image[0].url}">
          </div>
          <div class="sortable-table__cell">${item.title}</div>

          <div class="sortable-table__cell">16</div>
          <div class="sortable-table__cell">91</div>
          <div class="sortable-table__cell">6</div>
        </a>
          `;
    //  } else {

    //  }  

    }, '');  

    return `
    <div data-element="body" class="sortable-table__body">
      <a href="/products/3d-ochki-epson-elpgs03" class="sortable-table__row">
        <div class="sortable-table__cell">
          <img class="sortable-table-image" alt="Image" src="http://magazilla.ru/jpg_zoom1/246743.jpg">
        </div>
        <div class="sortable-table__cell">3D очки Epson ELPGS03</div>

        <div class="sortable-table__cell">16</div>
        <div class="sortable-table__cell">91</div>
        <div class="sortable-table__cell">6</div>
      </a>

      <a href="/products/3d-ochki-optoma-zd301" class="sortable-table__row">
        <div class="sortable-table__cell">
          <img class="sortable-table-image" alt="Image" src="https://i.imgur.com/MCdw6u2.jpg"></div>
        <div class="sortable-table__cell">3D очки Optoma ZD301</div>

        <div class="sortable-table__cell">17</div>
        <div class="sortable-table__cell">119</div>
        <div class="sortable-table__cell">34</div>
      </a>

      <a href="/products/3d-ochki-optoma-zd302" class="sortable-table__row">
        <div class="sortable-table__cell">
          <img class="sortable-table-image" alt="Image" src="http://magazilla.ru/jpg_zoom1/1016606.jpg"></div>
        <div class="sortable-table__cell">3D очки Optoma ZD302</div>

        <div class="sortable-table__cell">11</div>
        <div class="sortable-table__cell">71</div>
        <div class="sortable-table__cell">13</div>
      </a>

      <a href="/products/3d-ochki-optoma-zf2300" class="sortable-table__row">
        <div class="sortable-table__cell">
          <img class="sortable-table-image" alt="Image" src="http://magazilla.ru/jpg_zoom1/1189619.jpg"></div>
        <div class="sortable-table__cell">3D очки Optoma ZF2300</div>

        <div class="sortable-table__cell">96</div>
        <div class="sortable-table__cell">87</div>
        <div class="sortable-table__cell">123</div>
      </a>

      <a href="/products/3d-ochki-sim2-visus-rf-4" class="sortable-table__row">
        <div class="sortable-table__cell"></div>
        <div class="sortable-table__cell">3D очки SIM2 Visus RF 4</div>

        <div class="sortable-table__cell">88</div>
        <div class="sortable-table__cell">1863</div>
        <div class="sortable-table__cell">45</div>
      </a>

      <a href="/products/3d-ochki-sim2-visus-rf-7" class="sortable-table__row">
        <div class="sortable-table__cell">
          <img class="sortable-table-image" alt="Image" src="http://magazilla.ru/jpg_zoom1/1021128.jpg"></div>
        <div class="sortable-table__cell">3D очки SIM2 Visus RF 7</div>

        <div class="sortable-table__cell">71</div>
        <div class="sortable-table__cell">3725</div>
        <div class="sortable-table__cell">11</div>
      </a>

      <a href="/products/3d-ochki-samsung-ssg-5100gb" class="sortable-table__row">
        <div class="sortable-table__cell">
          <img class="sortable-table-image" alt="Image" src="http://magazilla.ru/jpg_zoom1/277605.jpg"></div>
        <div class="sortable-table__cell">3D очки Samsung SSG-5100GB</div>

        <div class="sortable-table__cell">86</div>
        <div class="sortable-table__cell">53</div>
        <div class="sortable-table__cell">10</div>
      </a>

      <a href="/products/3d-ochki-sony-tdg-500p" class="sortable-table__row">
        <div class="sortable-table__cell">
          <img class="sortable-table-image" alt="Image" src="http://magazilla.ru/jpg_zoom1/283392.jpg"></div>
        <div class="sortable-table__cell">3D очки Sony TDG-500P</div>

        <div class="sortable-table__cell">36</div>
        <div class="sortable-table__cell">18</div>
        <div class="sortable-table__cell">98</div>
      </a>

      <a href="/products/3d-ochki-sony-tdg-bt500a" class="sortable-table__row">
        <div class="sortable-table__cell">
          <img class="sortable-table-image" alt="Image" src="http://magazilla.ru/jpg_zoom1/283408.jpg"></div>
        <div class="sortable-table__cell">3D очки Sony TDG-BT500A</div>

        <div class="sortable-table__cell">13</div>
        <div class="sortable-table__cell">81</div>
        <div class="sortable-table__cell">13</div>
      </a>

      <a href="/products/3d-ochki-lg-ag-f360" class="sortable-table__row">
        <div class="sortable-table__cell"></div>
        <div class="sortable-table__cell">3d-ochki-lg-ag-f360</div>

        <div class="sortable-table__cell">1</div>
        <div class="sortable-table__cell">100</div>
        <div class="sortable-table__cell">1</div>
      </a>

      <a href="/products/dvd/blu-ray-pleer-bbk-dvp030s" class="sortable-table__row">
        <div class="sortable-table__cell">
          <img class="sortable-table-image" alt="Image" src="http://magazilla.ru/jpg_zoom1/356182.jpg"></div>
        <div class="sortable-table__cell">DVD/Blu-ray плеер BBK DVP030S</div>

        <div class="sortable-table__cell">58</div>
        <div class="sortable-table__cell">24</div>
        <div class="sortable-table__cell">0</div>
      </a>

      <a href="/products/dvd/blu-ray-pleer-bbk-dvp033s" class="sortable-table__row">
        <div class="sortable-table__cell">
          <img class="sortable-table-image" alt="Image" src="http://magazilla.ru/jpg_zoom1/358288.jpg"></div>
        <div class="sortable-table__cell">DVD/Blu-ray плеер BBK DVP033S</div>

        <div class="sortable-table__cell">2</div>
        <div class="sortable-table__cell">27</div>
        <div class="sortable-table__cell">50</div>
      </a>

      <a href="/products/dvd/blu-ray-pleer-lg-dp-132" class="sortable-table__row">
        <div class="sortable-table__cell">
          <img class="sortable-table-image" alt="Image" src="http://magazilla.ru/jpg_zoom1/370615.jpg"></div>
        <div class="sortable-table__cell">DVD/Blu-ray плеер LG DP-132</div>

        <div class="sortable-table__cell">81</div>
        <div class="sortable-table__cell">38</div>
        <div class="sortable-table__cell">34</div>
      </a>

      <a href="/products/dvd/blu-ray-pleer-lg-dp-547h" class="sortable-table__row">
        <div class="sortable-table__cell">
          <img class="sortable-table-image" alt="Image" src="http://magazilla.ru/jpg_zoom1/615221.jpg"></div>
        <div class="sortable-table__cell">DVD/Blu-ray плеер LG DP-547H</div>

        <div class="sortable-table__cell">86</div>
        <div class="sortable-table__cell">56</div>
        <div class="sortable-table__cell">35</div>
      </a>

      <a href="/products/dvd/blu-ray-pleer-marantz-ud7007" class="sortable-table__row">
        <div class="sortable-table__cell">
          <img class="sortable-table-image" alt="Image" src="http://magazilla.ru/jpg_zoom1/242525.jpg"></div>
        <div class="sortable-table__cell">DVD/Blu-ray плеер Marantz UD7007</div>

        <div class="sortable-table__cell">25</div>
        <div class="sortable-table__cell">1071</div>
        <div class="sortable-table__cell">46</div>
      </a>

      <a href="/products/dvd/blu-ray-pleer-mystery-mdv-728u" class="sortable-table__row">
        <div class="sortable-table__cell">
          <img class="sortable-table-image" alt="Image" src="http://magazilla.ru/jpg_zoom1/147911.jpg"></div>
        <div class="sortable-table__cell">DVD/Blu-ray плеер Mystery MDV-728U</div>

        <div class="sortable-table__cell">4</div>
        <div class="sortable-table__cell">23</div>
        <div class="sortable-table__cell">17</div>
      </a>

      <a href="/products/dvd/blu-ray-pleer-oppo-bdp-105d" class="sortable-table__row">
        <div class="sortable-table__cell">
          <img class="sortable-table-image" alt="Image" src="http://magazilla.ru/jpg_zoom1/614893.jpg"></div>
        <div class="sortable-table__cell">DVD/Blu-ray плеер OPPO BDP-105D</div>

        <div class="sortable-table__cell">29</div>
        <div class="sortable-table__cell">2198</div>
        <div class="sortable-table__cell">24</div>
      </a>

      <a href="/products/dvd/blu-ray-pleer-onkyo-bd-sp809" class="sortable-table__row">
        <div class="sortable-table__cell">
          <img class="sortable-table-image" alt="Image" src="http://magazilla.ru/jpg_zoom1/171126.jpg"></div>
        <div class="sortable-table__cell">DVD/Blu-ray плеер Onkyo BD-SP809</div>

        <div class="sortable-table__cell">81</div>
        <div class="sortable-table__cell">861</div>
        <div class="sortable-table__cell">11</div>
      </a>

      <a href="/products/dvd/blu-ray-pleer-panasonic-dmp-bdt460ee" class="sortable-table__row">
        <div class="sortable-table__cell">
          <img class="sortable-table-image" alt="Image" src="http://magazilla.ru/jpg_zoom1/459928.jpg"></div>
        <div class="sortable-table__cell">DVD/Blu-ray плеер Panasonic DMP-BDT460EE</div>

        <div class="sortable-table__cell">28</div>
        <div class="sortable-table__cell">180</div>
        <div class="sortable-table__cell">9</div>
      </a>

      <a href="/products/dvd/blu-ray-pleer-pioneer-bdp-170" class="sortable-table__row">
        <div class="sortable-table__cell">
          <img class="sortable-table-image" alt="Image" src="http://magazilla.ru/jpg_zoom1/460094.jpg"></div>
        <div class="sortable-table__cell">DVD/Blu-ray плеер Pioneer BDP-170</div>

        <div class="sortable-table__cell">55</div>
        <div class="sortable-table__cell">256</div>
        <div class="sortable-table__cell">132</div>
      </a>

      <a href="/products/dvd/blu-ray-pleer-pioneer-bdp-180" class="sortable-table__row">
        <div class="sortable-table__cell">
          <img class="sortable-table-image" alt="Image" src="http://magazilla.ru/jpg_zoom1/730724.jpg"></div>
        <div class="sortable-table__cell">DVD/Blu-ray плеер Pioneer BDP-180</div>

        <div class="sortable-table__cell">68</div>
        <div class="sortable-table__cell">252</div>
        <div class="sortable-table__cell">9</div>
      </a>

      <a href="/products/dvd/blu-ray-pleer-pioneer-bdp-lx58" class="sortable-table__row">
        <div class="sortable-table__cell">
          <img class="sortable-table-image" alt="Image" src="http://magazilla.ru/jpg_zoom1/614710.jpg"></div>
        <div class="sortable-table__cell">DVD/Blu-ray плеер Pioneer BDP-LX58</div>

        <div class="sortable-table__cell">86</div>
        <div class="sortable-table__cell">678</div>
        <div class="sortable-table__cell">123</div>
      </a>

      <a href="/products/dvd/blu-ray-pleer-pioneer-bdp-lx88" class="sortable-table__row">
        <div class="sortable-table__cell">
          <img class="sortable-table-image" alt="Image" src="http://magazilla.ru/jpg_zoom1/614677.jpg"></div>
        <div class="sortable-table__cell">DVD/Blu-ray плеер Pioneer BDP-LX88</div>

        <div class="sortable-table__cell">46</div>
        <div class="sortable-table__cell">2</div>
        <div class="sortable-table__cell">3</div>
      </a>

      <a href="/products/dvd/blu-ray-pleer-samsung-bd-j5500" class="sortable-table__row">
        <div class="sortable-table__cell">
          <img class="sortable-table-image" alt="Image" src="http://magazilla.ru/jpg_zoom1/794089.jpg"></div>
        <div class="sortable-table__cell">DVD/Blu-ray плеер Samsung BD-J5500</div>

        <div class="sortable-table__cell">92</div>
        <div class="sortable-table__cell">101</div>
        <div class="sortable-table__cell">8</div>
      </a>

      <a href="/products/dvd/blu-ray-pleer-samsung-bd-j7500" class="sortable-table__row">
        <div class="sortable-table__cell">
          <img class="sortable-table-image" alt="Image" src="http://magazilla.ru/jpg_zoom1/670780.jpg"></div>
        <div class="sortable-table__cell">DVD/Blu-ray плеер Samsung BD-J7500</div>

        <div class="sortable-table__cell">76</div>
        <div class="sortable-table__cell">151</div>
        <div class="sortable-table__cell">7</div>
      </a>

      <a href="/products/dvd/blu-ray-pleer-sony-bdp-s5500" class="sortable-table__row">
        <div class="sortable-table__cell">
          <img class="sortable-table-image" alt="Image" src="http://magazilla.ru/jpg_zoom1/614579.jpg"></div>
        <div class="sortable-table__cell">DVD/Blu-ray плеер Sony BDP-S5500</div>

        <div class="sortable-table__cell">84</div>
        <div class="sortable-table__cell">123</div>
        <div class="sortable-table__cell">15</div>
      </a>

      <a href="/products/dvd/blu-ray-pleer-sony-bdp-s6500" class="sortable-table__row">
        <div class="sortable-table__cell">
          <img class="sortable-table-image" alt="Image" src="http://magazilla.ru/jpg_zoom1/670829.jpg"></div>
        <div class="sortable-table__cell">DVD/Blu-ray плеер Sony BDP-S6500</div>

        <div class="sortable-table__cell">11</div>
        <div class="sortable-table__cell">149</div>
        <div class="sortable-table__cell">8</div>
      </a>

      <a href="/products/dvd/blu-ray-pleer-sony-dvp-sr320" class="sortable-table__row">
        <div class="sortable-table__cell">
          <img class="sortable-table-image" alt="Image" src="http://magazilla.ru/jpg_zoom1/167313.jpg"></div>
        <div class="sortable-table__cell">DVD/Blu-ray плеер Sony DVP-SR320</div>

        <div class="sortable-table__cell">81</div>
        <div class="sortable-table__cell">40</div>
        <div class="sortable-table__cell">6</div>
      </a>

      <a href="/products/dvd/blu-ray-pleer-sony-dvp-sr760h" class="sortable-table__row">
        <div class="sortable-table__cell">
          <img class="sortable-table-image" alt="Image" src="http://magazilla.ru/jpg_zoom1/205669.jpg"></div>
        <div class="sortable-table__cell">DVD/Blu-ray плеер Sony DVP-SR760H</div>

        <div class="sortable-table__cell">81</div>
        <div class="sortable-table__cell">59</div>
        <div class="sortable-table__cell">13</div>
      </a>

      <a href="/products/dvd/blu-ray-pleer-yamaha-bd-s477" class="sortable-table__row">
        <div class="sortable-table__cell">
          <img class="sortable-table-image" alt="Image" src="http://magazilla.ru/jpg_zoom1/430982.jpg"></div>
        <div class="sortable-table__cell">DVD/Blu-ray плеер Yamaha BD-S477</div>

        <div class="sortable-table__cell">27</div>
        <div class="sortable-table__cell">330</div>
        <div class="sortable-table__cell">16</div>
      </a>

    </div>
    `;
  }

  createTemplate() {
    return (`
    <div data-element="productsContainer" class="products-list__container">
  <div class="sortable-table">
      ${this.createTableHeader()} 
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
    const element = document.createElement('div');
    element.innerHTML = template;
    return element.firstElementChild ;
  }

  sort(fieldValue, orderValue) {

  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}

