class ZController {

  constructor() {


    // this.addProduct = document.getElementById('#add-product');

    this.connectFirebase();
    
    this.elementsPrototype();
    this.loadElements();
    this.initEvents();
    this.hideAllPanels();

    this.proposalKey = '';
    this.solutionKey = '';
    this.cartKey = '';

    this.arrayCategories = [];
    this.categoryName = "";


  }

  connectFirebase() {

    // Your web app's Firebase configuration
    var firebaseConfig = {
      apiKey: "AIzaSyAjv7DpoQ3xb2M82MSxEIrGX6pJo2cfUOU",
      authDomain: "dropbox-clone-eaa87.firebaseapp.com",
      databaseURL: "https://dropbox-clone-eaa87.firebaseio.com",
      projectId: "dropbox-clone-eaa87",
      storageBucket: "dropbox-clone-eaa87.appspot.com",
      messagingSenderId: "433019358246",
      appId: "1:433019358246:web:0e6db5625fb8b41fc66ae7",
      measurementId: "G-8PZH7NB8TY"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
  }



  loadElements() {

    this.el = {};

    document.querySelectorAll('[id]').forEach(element => {

      this.el[Format.getCamelCase(element.id)] = element;

    });

  }


  elementsPrototype() {

    Element.prototype.hide = function () {
      this.style.display = 'none';
      return this;
    }

    Element.prototype.show = function () {
      this.style.display = 'block';
      return this;
    }

    Element.prototype.toggle = function () {
      this.style.display = (this.style.display === 'none') ? 'block' : 'none';
      return this;
    }

    Element.prototype.on = function (events, fn) {
      events.split(' ').forEach(event => {
        this.addEventListener(event, fn);
      });
      return this;
    }

    Element.prototype.css = function (styles) {
      for (let name in styles) {
        this.style[name] = styles[name];
      }
      return this;
    }

    Element.prototype.addClass = function (name) {
      this.classList.add(name);
      return this;
    }

    Element.prototype.removeClass = function (name) {
      this.classList.remove(name);
      return this;
    }

    Element.prototype.toggleClass = function (name) {
      this.classList.toggle(name);
      return this;
    }

    Element.prototype.hasClass = function (name) {
      return this.classList.contains(name);
    }

    HTMLFormElement.prototype.getForm = function () {
      return new FormData(this);
    }

    HTMLFormElement.prototype.toJSON = function () {

      let json = {};

      this.getForm().forEach((value, key) => {

        json[key] = value;

      });

      return json;
    }

  }



  initEvents() {

    

    this.el.btnHome.on('click', e => {

      this.hideAllPanels();

    });

    this.el.btnClientes.on('click', e => {

      this.readAllCustomers();

      this.showPanelCustomers();

    });

    this.el.btnPropostas.on('click', e => {

      this.readAllFilterCustomers();

      this.getCustomersOptionsView();

      this.readAllProposals();

      this.showPanelProposals();

    });

    this.el.btnProdutos.on('click', e => {

      this.showPanelProducts();

    });

    this.el.zoomBtnAddCustomer.on('click', e => {

      $('#modal-add-customers').modal('show');
      $('#modal-add-proposal').modal('hide');
      $('#modal-add-products').modal('hide');
      $('#modal-add-solutions').modal('hide');

    });

    this.el.zoomBtnAddProposal.on('click', e => {

      $('#modal-add-customers').modal('hide');
      $('#modal-add-proposal').modal('show');
      $('#modal-add-products').modal('hide');
      $('#modal-add-solutions').modal('hide');

    });

    this.el.zoomBtnAddProduct.on('click', e => {

      $('#modal-add-customers').modal('hide');
      $('#modal-add-proposal').modal('hide');
      $('#modal-add-products').modal('show');
      $('#modal-add-solutions').modal('hide');
      

    });

    this.el.zoomBtnAddSolutions.on('click', e => {

      $('#modal-add-customers').modal('hide');
      $('#modal-add-proposal').modal('hide');
      $('#modal-add-products').modal('hide');
      $('#modal-add-solutions').modal('show'); 

    });


    this.el.formAddCustomer.on('submit', e => {

      e.preventDefault();

      this.el.btnSaveCustomer.css().disabled;

      this.addCustomerDatabase(this.el.formAddCustomer.toJSON());

      $('#modal-add-customers').modal('hide');

    });



    this.el.formAddProposal.on('submit', e => {

      e.preventDefault();

      this.el.btnSaveProposal.css().disabled;

      this.addProposalDatabase(this.el.formAddProposal.toJSON());

      $('#modal-add-proposal').modal('hide');

    });


    this.el.formAddSolution.on('submit', e => {

      e.preventDefault();

      this.el.btnSaveSolution.css().disabled;

      this.addSolutionDatabase(this.el.formAddSolution.toJSON());

      $('#modal-add-solutions').modal('hide');

    });


    this.el.formAddProduct.on('submit', e => {

      e.preventDefault();

      this.el.btnAddProduct.css().disabled;

      // this.addProductInSolutionDatabase(this.el.formAddProduct.toJSON());

    console.log(this.el.formAddProduct.toJSON());
    });

  }


  hideAllPanels() {

    this.el.customersPanel.hide();
    this.el.proposalsPanel.hide();
    this.el.productsPanel.hide();
    this.el.solutionsPanel.hide();

  }


  showPanelCustomers() {

    this.el.customersPanel.show();
    this.el.proposalsPanel.hide();
    this.el.productsPanel.hide();
    this.el.solutionsPanel.hide();

  }

  showPanelProposals() {

    this.el.customersPanel.hide();
    this.el.proposalsPanel.show();
    this.el.productsPanel.hide();
    this.el.solutionsPanel.hide();

  }

  showPanelProducts() {

    this.el.customersPanel.hide();
    this.el.proposalsPanel.hide();
    this.el.productsPanel.show();
    this.el.solutionsPanel.hide();

  }

  showPanelSolutions() {

    this.el.customersPanel.hide();
    this.el.proposalsPanel.hide();
    this.el.productsPanel.hide();
    this.el.solutionsPanel.show();

  }


  addCustomerDatabase(customerData) {

    if (customerData) {

      this.getFirebaseCustomAddRef().set(
        customerData
      );

    } else {

      console.log('Falha ao salvar registro!');

    }

  }


  addProposalDatabase(proposalData) {

    let timestamp = Date.now();
    let data = proposalData;
    data = {...data, timestamp, proposalTotal: 0.0}
    
    if (data) {

      this.getFirebaseProposalAddRef().set(
        data
      );

      this.el.inputProposalName.innerHTML = '';

    } else {

      console.log('Falha ao salvar registro!');

    }

  }


  addSolutionDatabase(solutionData) {

    let timestamp = Date.now();
    let data = solutionData;
    data = {...data, timestamp, solutionTotal: 0.0}
    
    if (data) {
      
      this.getFirebaseSolutionsAddRef().set(
        data
      );

    } else {

      console.log('Falha ao salvar registro!');

    }

  }


  addProductInSolutionDatabase(productInSolutionData) {

    let timestamp = Date.now();
    let data = productInSolutionData;
    data = {...data, timestamp}

    console.log(data);
    
    if (data) {
      
      this.getFirebaseProductInSolutionsAddRef().set(
        data
      );

    } else {

      console.log('Falha ao salvar registro!');

    }

  }


  getFirebaseCustomAddRef(path) {

    let timestampNow = Date.now();

    if (!path) path = 'customers/' + timestampNow;

    return firebase.database().ref(path);

  }

  getFirebaseProposalAddRef(path) {

    let timestampNow = Date.now();

    if (!path) path = 'proposals/' + timestampNow;

    return firebase.database().ref(path);

  }


  getFirebaseSolutionsAddRef(path) {

    let timestampNow = Date.now();

    if (!path) path = 'proposals/' + this.proposalKey + '/solutions/' + timestampNow;

    return firebase.database().ref(path);

  }


  getFirebaseProductInSolutionsAddRef(path) {

    let timestampNow = Date.now();

    if (!path) path = 'proposals/' + this.proposalKey + '/solutions/' + this.solutionKey + '/cart/' + timestampNow;
    console.log(path);

    return firebase.database().ref(path);

  }


  getCustomersFirebaseRef(path) {

    if (!path) path = 'customers/';

    return firebase.database().ref(path);

  }

  readAllCustomers() {

    this.getCustomersFirebaseRef().on('value', snapshot => {

      this.el.tbodyCustomer.innerHTML = '';

      snapshot.forEach(snapshotItem => {

        let key = snapshotItem.key;
        let data = snapshotItem.val();

        if (data !== '') {

          this.el.tbodyCustomer.appendChild(this.getAllCustomerView(data, key));

        }

      });

    });

  }

  getAllCustomerView(data, key) {

    let tr = document.createElement('tr');

    tr.dataset.key = key;
    tr.dataset.file = JSON.stringify(data);

    tr.innerHTML = `
      <tr>
        <td>${data.name}</td>
        <td>${data.email}</td>
        <td class="text-center">${data.celular}</td>
        <td>${data.city}</td>
      </tr>
    `;

    return tr;

  }


  getProposalsFirebaseRef(path) {

    if (!path) path = 'proposals/';

    return firebase.database().ref(path);

  }


  readAllProposals() {

    let totalProposal;

    this.getProposalsFirebaseRef().on('value', snapshot => {

      this.el.tbodyProposal.innerHTML = '';

      snapshot.forEach(snapshotItem => {

        let key = snapshotItem.key;
        let data = snapshotItem.val();
        totalProposal = data.proposalTotal;

        if (data !== '') {

          this.el.tbodyProposal.appendChild(this.getAllProposalsView(data, key));

        }

      });

      this.el.titleProposalTotal.innerHTML = 'Proposta - R$ ' + totalProposal;

    });

  }


  getAllProposalsView(data, key) {

    let tr = document.createElement('tr');

    tr.dataset.key = key;
    tr.dataset.file = JSON.stringify(data);
    tr.dataset.name = 'open-proposal';
    tr.dataset.proposalName = data.proposalName;
    tr.dataset.proposalCustomer = data.proposalCustomer;

    tr.innerHTML = `
      <tr>
        <td><div type="button" id="open-proposal" dataset-key="${key}">${data.proposalName}</div></td>
        <td>${data.proposalCustomer}</td>
        <td class="text-center">${data.timestamp}</td>
        <td class="text-right">${data.proposalTotal}</td>
      </tr>
    `;

    this.initEventsTr(tr);
    
    return tr;

  }


  getSolutionsFirebaseRef(path) {

    if (!path) path = 'proposals/solutions/';

    return firebase.database().ref(path);

  }


  readAllSolutionsByProposals(id) {

    let pathToSolution = 'proposals/' + id + '/solutions/';

    firebase.database().ref(pathToSolution).on('value', snapshot => {

      this.el.cardsSolutions.innerHTML = '';

      let keyCart;
      let dataCart;
      let nicknameCart;
      let priceSaleCart;
      let quantityCart;

      snapshot.forEach(snapshotItem => {

        let key = snapshotItem.key;
        let data = snapshotItem.val();
        let solutionName = data.solutionName;
        let subtotal = data.solutionTotal;

        let pathCart = 'proposals/' + id + '/solutions/' + key + '/cart/';

        if (data !== '') {


          firebase.database().ref(pathCart).on('value', snapshotCart => {

            snapshotCart.forEach(snapshotCartItem => {

              keyCart = snapshotCartItem.key;
              dataCart = snapshotCartItem.val();
              console.log(dataCart.nickname)
              if (keyCart !== '') {

                nicknameCart = dataCart.nickname;
                priceSaleCart = dataCart.priceSale;
                quantityCart = dataCart.quantity;

              }

            });

          });
          

          this.el.cardsSolutions.appendChild(this.getAllSolutionsByProposalView(subtotal, solutionName, data, key, nicknameCart, priceSaleCart, quantityCart));

        }
        
      });

    });

  }


  getAllSolutionsByProposalView(subtotal, solutionName, data, key, nicknameCart, priceSaleCart, quantityCart) {

    let div = document.createElement('div');


    
    div.dataset.key = key;
    div.dataset.file = data;
    // div.dataset.name = 'add-product';
    div.dataset.solutionName = solutionName;
    div.dataset.subtotal = subtotal;

    // div.innerHTML = `
    //   <div class="card">
    //     <div class="card-header" id="heading-${div.dataset.key}">
    //       <h5 class="mb-0 col-12">
    //         <div class="row">

    //           <div class="col-9">
    //             <button class="btn font-weight-bold" type="button" data-toggle="collapse"
    //               data-target="#collapse-${div.dataset.key}" aria-expanded="false" aria-controls="collapse-${div.dataset.key}">
    //               ${div.dataset.solutionName}
    //             </button>
    //           </div>

    //           <div class="col-3 pt-2 text-right"><span class="h6">R$ ${div.dataset.subtotal}</span></div>
    //         </div>
    //       </h5>
    //     </div>

    //     <div id="collapse-${div.dataset.key}" class="collapse" aria-labelledby="heading-${div.dataset.key}" data-parent="#cards-solutions">
    //       <div class="card-body">

    //       <!-- Inicio do FORM -->
    //       <section id="content-section">
    //         <div class="row">
    //           <div class="col-12">

    //             <!-- Begin Page Content -->
    //             <div class="container-fluid">

    //               <!-- Page Heading -->
    //               <div>
    //                 <form id="form-add-product">
    //                   <div class="form-row">
                        
    //                     <div class="form-group col-3">
    //                       <label for="input-product-category">Categoria</label>
    //                       <select class="form-control" id="input-product-category" name="productCategory">
                            
    //                       </select>
    //                     </div>

    //                     <div class="form-group col-4">
    //                       <label for="input-product-nickname">Equipamento</label>
    //                       <select class="form-control" id="input-product-nickname" name="productNickname">
                            
    //                       </select>
    //                     </div>

    //                     <div class="form-group col-md-2 text-center">
    //                       <label for="input-product-quantity">Quant</label>
    //                       <input type="text" class="form-control" id="input-product-quantity" name="productQuantity">
    //                     </div>
                        
    //                     <div class="form-group col-3">
    //                       <button id="btn-add-product" type="submit" class="btn btn-dark mt-4">Adicionar</button>
    //                     </div>
    //                   </div>
    //                 </form>
    //               </div>

    //             </div>
    //             <!-- /.container-fluid -->

    //           </div>
    //           <!-- End of Main Content -->

    //         </div>
    //       </section>
    //       <!-- Fim do FORM -->
          

    //       <table class="table table-hover col-12">
    //         <thead>
    //           <tr>
    //             <th scope="row">Produto</th>
    //             <th scope="col" class="text-center">Quant</th>
    //             <th scope="col" class="text-right">Valor</th>
    //           </tr>
    //         </thead>
    //         <tbody id="tbody-solution">
    //         <tr>
    //           <td scope="row">${nicknameCart}</td>
    //           <td scope="col" class="text-center">${quantityCart}</td>
    //           <td scope="col" class="text-right">${priceSaleCart}</td>
    //         </tr>
    //         </tbody>
    //       </table>
    //       </div>
    //     </div>
    //   </div>
    // `;

    this.initEventsTr(div);

    return div;

  }


  initEventsTr(tr) {

    tr.on('click', e => {

      this.readAllFilterCategories();
      this.readAllFilterProductsByCategory();

      switch (tr.dataset.name) {
        
        case ('open-proposal'):
        
          this.showPanelSolutions();
    
          this.el.titlePanelSolution.innerHTML = tr.dataset.proposalName + " - " + tr.dataset.proposalCustomer;
          
          // Chama os arcodeos das soluçoes de uma determinada proposta
          // this.readAllSolutionsByProposals(tr.dataset.key);

          this.proposalKey = tr.dataset.key;

          break;

        case ('add-product'):
          console.log('ok');
          break;
      
        default:
          break;
      }
    
    });




    // this.formControlSelectCategoriaEl.on('change', e => {

    //       this.categoryName = this.selectCategory.options[this.selectCategory.selectedIndex].value;
    
    //       this.readAllFilterProductsByCategory(categoryName);
    
    //       console.log(this.readAllFilterProductsByCategory(this.categoryName));
    //     });
    

    // this.el.addProduct.on('click', e => {
    //   console.log('uhhhh');
    // });

  }


  getCustomersOptionsView(dataName, key) {

    let option = document.createElement('option');

    option.dataset.key = key;
    option.dataset.file = dataName;

    option.innerHTML = `
      <option id='customerName' value='${dataName}'>${dataName}</option>
    `;

    return option;

  }


  readAllFilterCustomers() {

    this.getCustomersFirebaseRef().on('value', snapshot => {

      this.el.inputProposalCustomer.innerHTML = '';

      snapshot.forEach(snapshotItem => {

        let key = snapshotItem.key;
        let data = snapshotItem.val();
        let dataName = data.name;

        if (dataName !== '') {

          this.el.inputProposalCustomer.appendChild(this.getCustomersOptionsView(dataName, key));

        }

      });

    });
  }



  getCategoryView(dataName, key) {

    let option = document.createElement('option');

    option.dataset.key = key;
    option.dataset.file = dataName

    option.innerHTML = `
      <option id='categoryName' value='${dataName}'>${dataName}</option>
    `;

    return option;

  }


  readAllFilterCategories() {

    firebase.database().ref("products").on('value', snapshot => {

      this.el.inputProductCategory.innerHTML = '';

      snapshot.forEach(snapshotItem => {

        let key = snapshotItem.key;
        let data = snapshotItem.val();
        let dataName = data.categoria;

        if (dataName !== '') {

          this.arrayCategories.push(data.categoria);

        }

      });

      const setUnico = new Set(this.arrayCategories);
      const deVoltaAAray = [...setUnico];

      deVoltaAAray.forEach(item => {

        this.el.inputProductCategory.appendChild(this.getCategoryView(item));

      });

    });

  }


  getProductByCategoryView(data, key) {

    let option = document.createElement('option');

    option.dataset.key = key;
    option.dataset.file = data;
    option.dataset.price = data.precoVenda;

    option.innerHTML = `
      <option value='${key}' dataset-file='${data}' dataset-price='${data.precoVenda}'>${data.nomeFantasia}</option>
    `;

    return option;

  }


  readAllFilterProductsByCategory() {

    this.categoryName = "Receiver";

    firebase.database().ref("products").orderByChild("categoria").equalTo(this.categoryName).on('value', snapshot => {

      this.el.inputProductNickname.innerHTML = '';

      snapshot.forEach(snapshotItem => {

        let key = snapshotItem.key;
        let data = snapshotItem.val();

        if (data !== '') {

          this.el.inputProductNickname.appendChild(this.getProductByCategoryView(data, key));

        }
        
      });

    });

  }


 




  // initEvents() {

  //   this.btnConsolidateProposalEl.addEventListener('click', e => {

  //     // console.log(this.customerKey);
  //     // console.log(this.proposalKey);

  //     let ref = 'ssa/customers/' + this.customerKey + '/projects/proposal/' + this.proposalKey + '/solutoins/cart/';
  //     // console.log(ref);

  //     if (confirm("Deseja consolidar a Proposta?")) {

  //       let name = this.proposalName;
  //       console.log(name);
  //       this.arraySubtotalSolutions();
  //       console.log('ok');
  //     } else {
  //       console.log('não');
  //     }

  //   });

  //   this.btnAddProductEl.addEventListener('click', e => {

  //     let timestampNow = Date.now();

  //     let price = this.selectProduct.options[this.selectProduct.selectedIndex].dataset.price;

  //     this.productNameSelected = this.selectProduct.options[this.selectProduct.selectedIndex].value;
  //     let quantityProduct = this.inputQuantityEl.value;

  //     this.addNewProduct(quantityProduct, price);

  //   });

  //   this.formControlSelectCategoriaEl.addEventListener('change', e => {

  //     this.categoryName = this.selectCategory.options[this.selectCategory.selectedIndex].value;

  //     this.readAllFilterProductsByCategory(categoryName);

  //   });

  //   this.btnNewProjectEl.addEventListener('click', e => {

  //     this.addNewProject();

  //   });


  //   this.btnNewProposalEl.addEventListener('click', e => {

  //     this.addNewProposal();

  //   });



  //   this.btnNewSolutionEl.addEventListener('click', e => {

  //     this.addNewSolution();

  //   });

  //   this.btnNewProductEl.addEventListener('click', e => {

  //     // this.addNewProduct();

  //     $('#modal-list-products').modal('hide');

  //     $('#modal-list-solutions').modal('show');

  //   });



  //   this.btnConsultCustomersEl.addEventListener('click', e => {

  //     let consultName = this.consultNameEl.value;

  //     if (consultName !== '') {

  //       this.readConsultCustomers(consultName);

  //     } else {

  //       console.log('Campo nome vazio');

  //       this.listCustomersEl.innerHTML = '';

  //     }

  //   });


  //   this.btnModalCloseProjectsEl.addEventListener('click', e => {

  //     $('#modal-list-projects').modal('hide');

  //   });


  //   this.btnModalCloseProposalEl.addEventListener('click', e => {

  //     $('#modal-list-proposal').modal('hide');

  //   });


  //   this.btnModalCloseSolutionEl.addEventListener('click', e => {

  //     $('#modal-list-solutions').modal('hide');

  //   });


  //   this.btnModalCloseProductEl.addEventListener('click', e => {

  //     $('#modal-list-products').modal('hide');

  //   });



  //   this.btnSaveCustomerEl.addEventListener('click', e => {

  //     let timestampNow = Date.now();

  //     let name = this.inputName.value;
  //     let cpf = this.inputCpf.value;
  //     let celular = this.inputCelular.value;
  //     let email = this.inputEmail.value;
  //     let address = this.inputAddress.value;
  //     let address2 = this.inputAddress2.value;
  //     let city = this.inputCity.value;
  //     let state = this.inputState.value;
  //     let zip = this.inputZip.value;

  //     if (name) {

  //       this.customerKey = timestampNow;

  //       this.getFirebaseRef().set({
  //         timestampNow,
  //         name,
  //         cpf,
  //         celular,
  //         email,
  //         address,
  //         address2,
  //         city,
  //         state,
  //         zip
  //       });

  //       this.inputName.value = '';
  //       this.inputCpf.value = '';
  //       this.inputCelular.value = '';
  //       this.inputEmail.value = '';
  //       this.inputAddress.value = '';
  //       this.inputAddress2.value = '';
  //       this.inputCity.value = '';
  //       this.inputState.value = '';
  //       this.inputZip.value = '';

  //       $('#modal-add-customers').modal('hide');

  //     } else {

  //       console.log('Nome não existe');

  //     }

  //     this.addNewProject();

  //   });

  // }











  // arraySubtotalSolutions() {
  //   let total = [0];

  //   let ref = 'ssa/customers/' + this.customerKey + '/projects/' + this.projectKey + '/proposal/' + this.proposalKey + '/solutions/';

  //   console.log(ref);
  //   firebase.database().ref(ref).on('value', snapshot => {

  //     snapshot.forEach(snapshotItem => {

  //       let key = snapshotItem.key;
  //       let data = snapshotItem.val();

  //       total.push(data.subtotal);
  //       let ttl = total.reduce((total, currentElement) => total + currentElement);
  //       console.log(total);
  //       console.log(ttl);

  //       //  TODO Apensenter o total na consolidação da proposta



  //     });

  //     // this.proposalName = snapshot.val().proposalName;

  //   });

  // }


  // addNewProject() {

  //   let newProject = prompt('Nome do novo projeto:');

  //   if (newProject) {

  //     let refCustomer = 'ssa/customers/' + this.customerKey + '/projects';

  //     firebase.database().ref(refCustomer).push().set({
  //       projectName: newProject
  //     });

  //   }

  // }



  // addNewProposal() {

  //   let newProposal = prompt('Nome da nova proposta:');

  //   if (newProposal) {

  //     firebase.database().ref(this.refProjectCustomer).push().set({
  //       proposalName: newProposal
  //     });

  //   }

  // }



  // addNewSolution() {

  //   let newSolution = prompt('Nome da nova solução:');

  //   if (newSolution) {

  //     // this.projectKey = li.dataset.key;

  //     this.refProjectCustomer = 'ssa/customers/' + this.customerKey + '/projects/' + this.projectKey;
  //     console.log(this.proposalKey);
  //     console.log(this.refProposalProjectCustomer);

  //     firebase.database().ref(this.refProposalProjectCustomer).push().set({
  //       solutionName: newSolution
  //     });

  //   }

  // }


  // addNewProduct(quantityProduct, price) {

  //   // $('#modal-list-products').modal('hide');

  //   // $('#modal-add-product').modal('show');

  //   let timestampNow = Date.now();
  //   let product = this.productNameSelected;
  //   let quantity = quantityProduct;
  //   let salePrice = price;

  //   if (product && quantity && salePrice) {

  //     this.refSolutionProposalProjectCustomer = 'ssa/customers/' + this.customerKey + '/projects/' + this.projectKey + '/proposal/' + this.proposalKey + '/solutions/' + this.solutionKey + '/cart/';

  //     firebase.database().ref(this.refSolutionProposalProjectCustomer).push().set({
  //       timestampNow,
  //         product,
  //         quantity,
  //         salePrice
  //     });

  //     let subtotal = this.subtotal;

  //     this.refProposalProjectCustomer = 'ssa/customers/' + this.customerKey + '/projects/' + this.projectKey + '/proposal/' + this.proposalKey + '/solutions/' + this.solutionKey;
  //     console.log(this.refProposalProjectCustomer);
  //     firebase.database().ref(this.refProposalProjectCustomer).update({
  //       subtotal
  //     });



  //       //this.inputQuantityEl.innerHTML = '';

  //   }

  // }



  // getFirebaseRef(path) {

  //   if (!path) path = 'ssa/customers/' + this.customerKey;

  //   return firebase.database().ref(path);

  // }


  // getConsultCustomerView(data, key) {

  //   let li = document.createElement('li');

  //   li.dataset.key = key;
  //   li.dataset.file = JSON.stringify(data);

  //   li.innerHTML = `
  //     <div class="list-group-item d-flex justify-content-between align-items-center"><span>${data.name}</span><span>${data.cpf}</span><span>${data.email}</span>
  //     <span><button type="button" class="btn" id="btn-project"><img src="src/img/icons/add-circle-outline.svg" alt="add" width="18px"/></button></span></div>
  //   `;

  //   this.initEventsLi(li);

  //   return li;

  // }


  // readConsultCustomers(consultName) {

  //   let getConsultName = consultName;

  //   this.getFirebaseRef().orderByChild("name").startAt(getConsultName).on('value', snapshot => {

  //     this.listCustomersEl.innerHTML = '';

  //     snapshot.forEach(snapshotItem => {

  //       let key = snapshotItem.key;
  //       let data = snapshotItem.val();

  //       if (data !== '' ) {

  //         this.listCustomersEl.appendChild(this.getConsultCustomerView(data, key));

  //       } else {

  //         this.listCustomersEl.innerHTML = '';

  //       }

  //     });

  //   });

  // }



  // readConsultCustomerById(id) {

  //   this.customerKey = id;

  //   let refPath = firebase.database().ref('ssa/customers/' + this.customerKey + '/');

  //   refPath.on('value', snapshot => {

  //     snapshot.forEach(snapshotItem => {

  //       let key = snapshotItem.key;
  //       let data = snapshotItem.val();

  //     });

  //     this.customerName = snapshot.val().name;

  //   });

  // }



  // readConsultProjectCustomerById(id) {

  //   this.projectKey = id;

  //   let refPath = firebase.database().ref('ssa/customers/' + this.customerKey + '/projects/' + this.projectKey + '/');

  //   refPath.on('value', snapshot => {

  //     snapshot.forEach(snapshotItem => {

  //       let key = snapshotItem.key;
  //       let data = snapshotItem.val();

  //     });

  //     this.projectName = snapshot.val().projectName;

  //   });

  // }



  // readConsultProposalProjectCustomerById(id) {

  //   this.proposalKey = id;

  //   let refPath = firebase.database().ref('ssa/customers/' + this.customerKey + '/projects/' + this.projectKey + '/proposal/' + this.proposalKey + '/');

  //   refPath.on('value', snapshot => {

  //     snapshot.forEach(snapshotItem => {

  //       let key = snapshotItem.key;
  //       let data = snapshotItem.val();

  //     });

  //     this.proposalName = snapshot.val().proposalName;

  //   });

  // }



  // readConsultSolutionProposalProjectCustomerById(id) {

  //   this.solutionKey = id;

  //   let refPath = firebase.database().ref('ssa/customers/' + this.customerKey + '/projects/' + this.projectKey + '/proposal/' + this.proposalKey + '/solutions/' + this.solutionKey + '/');

  //   refPath.on('value', snapshot => {

  //     snapshot.forEach(snapshotItem => {

  //       let key = snapshotItem.key;
  //       let data = snapshotItem.val();

  //     });

  //     this.solutionName = snapshot.val().solutionName;

  //   });

  // }



  // getAllCustomerView(data, key) {

  //   let li = document.createElement('li');

  //   li.dataset.key = key;
  //   li.dataset.file = JSON.stringify(data);

  //   li.innerHTML = `
  //     <div class="list-group-item d-flex justify-content-between align-items-center"><span>${data.name}</span><span>${data.cpf}</span><span>${data.email}</span>
  //     <span><button type="button" class="btn" id="btn-project"><img src="src/img/icons/add-circle-outline.svg" alt="add" width="18px"/></button></span></div>
  //   `;

  //   this.initEventsLi(li);

  //   return li;

  // }



  // readAllCustomers() {

  //   this.getFirebaseRef().orderByChild("name").on('value', snapshot => {

  //     this.listCustomersEl.innerHTML = '';
  //     this.tableTitleEl.innerHTML = 'Clientes';

  //     snapshot.forEach(snapshotItem => {

  //       let key = snapshotItem.key;
  //       let data = snapshotItem.val();

  //       if (data !== '') {

  //         this.listCustomersEl.appendChild(this.getAllCustomerView(data, key));

  //       }

  //     });

  //   });

  // }



  // getProjectCustomerView(data, key) {

  //   let li = document.createElement('li');

  //   li.dataset.key = key;
  //   li.dataset.file = JSON.stringify(data);

  //   li.innerHTML = `
  //     <div class="list-group-item d-flex justify-content-between align-items-center"><span>${data.projectName}</span>
  //     <span><button type="button" class="btn" id="btn-add-proposal"><img src="src/img/icons/add-circle-outline.svg" alt="add" width="18px"/></button></span></div>
  //   `;

  //   this.initEventsLi(li);

  //   return li;

  // }


  // getProposalProjectCustomerView(data, key) {

  //   let li = document.createElement('li');

  //   li.dataset.key = key;
  //   li.dataset.file = JSON.stringify(data);

  //   li.innerHTML = `
  //     <div class="list-group-item d-flex justify-content-between align-items-center"><span>${data.proposalName}</span>
  //     <span><button type="button" class="btn" id="btn-add-solution"><img src="src/img/icons/add-circle-outline.svg" alt="add" width="18px"/></button></span></div>
  //   `;

  //   this.initEventsLi(li);

  //   return li;

  // }



  // getSolutionProposalProjectCustomerView(data, key) {

  //   let li = document.createElement('li');

  //   li.dataset.key = key;
  //   li.dataset.file = JSON.stringify(data);

  //   li.innerHTML = `
  //     <div class="list-group-item d-flex justify-content-between align-items-center"><span>${data.solutionName}</span>
  //     <span><button type="button" class="btn" id="btn-add-product"><img src="src/img/icons/add-circle-outline.svg" alt="add" width="18px"/></button></span></div>
  //   `;

  //   this.initEventsLi(li);

  //   return li;

  // }



  // getProductSolutionProposalProjectCustomerView(data, key) {

  //   let li = document.createElement('li');

  //   li.dataset.key = key;
  //   li.dataset.file = JSON.stringify(data);

  //   li.innerHTML = `
  //     <div class="list-group-item d-flex justify-content-between align-items-center"><span class="col-8">${data.product}</span><span class="col-2 text-center">${data.quantity}</span>
  //     <span class="col-2 text-center"><button type="button" class="btn" id="btn-remove-product"><img src="src/img/icons/trash-outline.svg" alt="add" width="18px"/></button></span></div>
  //   `;

  //   this.initEventsLi(li);

  //   return li;

  // }



  // initEventsLi(li) {

  //   let key;
  //   let refCustomer;


  //   li.addEventListener('click', e => {

  //     // Get value of id li
  //     let btnID = e.path[1].id;

  //     // Customer's Key
  //     let lastLiKey = li.dataset.key;

  //     if (btnID) {

  //       switch (btnID) {
  //         case 'btn-project':

  //           this.customerKey = lastLiKey;

  //           refCustomer = 'ssa/customers/' + this.customerKey + '/projects';

  //           $('#modal-list-projects').modal('show');

  //           firebase.database().ref(refCustomer).on('value', snapshot => {

  //             this.listProjectCustomersEl.innerHTML = '';

  //             snapshot.forEach(snapshotItem => {

  //               let key = snapshotItem.key;
  //               let data = snapshotItem.val();

  //               if (key !== '') {

  //                 this.listProjectCustomersEl.appendChild(this.getProjectCustomerView(data, key));

  //               }

  //             });

  //             if (this.listProjectCustomersEl.childElementCount === 0) {

  //               this.addNewProject();

  //             }

  //             this.readConsultCustomerById(this.customerKey);
  //             this.projectTitleEl.innerHTML = this.customerName + ' > Projetos';

  //           });
  //           break;

  //           case 'btn-add-proposal':
  //             this.projectKey = lastLiKey;

  //             this.refProjectCustomer = 'ssa/customers/' + this.customerKey + '/projects/' + this.projectKey + '/proposal';

  //             $('#modal-list-projects').modal('hide');

  //             $('#modal-list-proposal').modal('show');

  //             firebase.database().ref(this.refProjectCustomer).on('value', snapshot => {

  //               this.listProposalProjectsCustomersEl.innerHTML = '';

  //               snapshot.forEach(snapshotItem => {

  //                 let key = snapshotItem.key;
  //                 let data = snapshotItem.val();

  //                 if (key !== '') {

  //                   this.listProposalProjectsCustomersEl.appendChild(this.getProposalProjectCustomerView(data, key));

  //                 } 

  //               });

  //               if (this.listProposalProjectsCustomersEl.childElementCount === 0) {

  //                 this.addNewProposal();

  //               }

  //               this.readConsultCustomerById(this.customerKey);
  //               this.readConsultProjectCustomerById(this.projectKey);
  //               this.proposalTitleEl.innerHTML = this.customerName + ' > ' + this.projectName + ' > Propostas';

  //             });
  //             break;

  //         case 'btn-add-solution':
  //           this.proposalKey = lastLiKey;

  //           this.refProposalProjectCustomer = 'ssa/customers/' + this.customerKey + '/projects/' + this.projectKey + '/proposal/' + this.proposalKey + '/solutions/';

  //           $('#modal-list-proposal').modal('hide');

  //           $('#modal-list-solutions').modal('show');

  //           firebase.database().ref(this.refProposalProjectCustomer).on('value', snapshot => {

  //             this.listSolutionsProposalProjectsCustomersEl.innerHTML = '';

  //             snapshot.forEach(snapshotItem => {

  //               let key = snapshotItem.key;
  //               let data = snapshotItem.val();

  //               if (key !== '') {

  //                 this.listSolutionsProposalProjectsCustomersEl.appendChild(this.getSolutionProposalProjectCustomerView(data, key));

  //               } 

  //             });

  //             if (this.listSolutionsProposalProjectsCustomersEl.childElementCount === 0) {

  //               this.addNewSolution();

  //             }

  //             this.readConsultCustomerById(this.customerKey);
  //             this.readConsultProjectCustomerById(this.projectKey);
  //             this.readConsultProposalProjectCustomerById(this.proposalKey);
  //             this.solutionTitleEl.innerHTML = this.customerName + ' > ' + this.projectName +  ' > ' + this.proposalName + ' > Soluções';

  //           });
  //           break;

  //         case 'btn-add-product':

  //           let arrayPrice;

  //           this.subtotalEl.innerHTML = '';

  //           this.solutionKey = lastLiKey;

  //           this.refSolutionProposalProjectCustomer = 'ssa/customers/' + this.customerKey + '/projects/' + this.projectKey + '/proposal/' + this.proposalKey + '/solutions/' + this.solutionKey + '/cart/';

  //           $('#modal-list-solutions').modal('hide');

  //           $('#modal-list-products').modal('show');

  //           firebase.database().ref(this.refSolutionProposalProjectCustomer).on('value', snapshot => {

  //             this.listProductsSolutionsProposalProjectsCustomersEl.innerHTML = '';
  //             arrayPrice = [0];
  //             this.subtotal = 0;

  //             snapshot.forEach(snapshotItem => {

  //               let key = snapshotItem.key;
  //               let data = snapshotItem.val();

  //               if (key !== '') {

  //                 this.listProductsSolutionsProposalProjectsCustomersEl.appendChild(this.getProductSolutionProposalProjectCustomerView(data, key));

  //               } 

  //               let item = (data.salePrice * parseFloat(data.quantity));
  //               arrayPrice.push(item);
  //             });

  //             this.subtotal = arrayPrice.reduce((total, currentElement) => total + currentElement);

  //             this.subtotalEl.innerHTML = this.subtotal;

  //             // if (this.listProductsSolutionsProposalProjectsCustomersEl.childElementCount === 0) {

  //             //   this.addNewProduct();

  //             // }

  //             this.readConsultCustomerById(this.customerKey);
  //             this.readConsultProjectCustomerById(this.projectKey);
  //             this.readConsultProposalProjectCustomerById(this.proposalKey);
  //             this.readConsultSolutionProposalProjectCustomerById(this.solutionKey);
  //             this.productTitleEl.innerHTML = this.customerName + ' > ' + this.projectName +  ' > ' + this.proposalName + ' > ' + this.solutionName + ' > Equipamentos';

  //           });
  //           break;
  //         case 'btn-remove-product': 

  //           this.itemKey = lastLiKey;
  //           this.removeItem(this.itemKey);

  //           break;

  //         default:
  //           console.log('Vazio');
  //           break;
  //       }

  //     }

  //   });

  // }


  // getCategoryView(dataName, key) {

  //   let option = document.createElement('option');

  //   // option.dataset.key = key;
  //   option.dataset.file = dataName

  //   option.innerHTML = `
  //     <option id='categoryName' value='${dataName}'>${dataName}</option>
  //   `;

  //   return option;

  // }


  // readAllFilterCategories() {

  //   firebase.database().ref("products").on('value', snapshot => {

  //     // this.listCustomersEl.innerHTML = '';

  //     snapshot.forEach(snapshotItem => {

  //       let key = snapshotItem.key;
  //       let data = snapshotItem.val();
  //       let dataName = data.categoria;

  //       if (dataName !== '') {

  //         this.arrayCategories.push(data.categoria);

  //       }

  //     });

  //     const setUnico = new Set(this.arrayCategories);
  //     const deVoltaAAray = [...setUnico];

  //     deVoltaAAray.forEach(item => {

  //       this.formControlSelectCategoriaEl.appendChild(this.getCategoryView(item));

  //     });

  //   });

  // }


  // getProductByCategoryView(data, key) {

  //   let option = document.createElement('option');

  //   option.dataset.key = key;
  //   option.dataset.file = data;
  //   option.dataset.price = data.precoVenda;

  //   option.innerHTML = `
  //     <option value='${key}' dataset-file='${data}' dataset-price='${data.precoVenda}'>${data.nomeFantasia}</option>
  //   `;

  //   return option;

  // }


  // readAllFilterProductsByCategory(categoryName) {

  //   firebase.database().ref("products").orderByChild("categoria").equalTo(this.categoryName).on('value', snapshot => {

  //     this.formControlSelectProdutosPorCategoriaEl.innerHTML = '';

  //     snapshot.forEach(snapshotItem => {

  //       let key = snapshotItem.key;
  //       let data = snapshotItem.val();

  //       if (data !== '') {

  //         this.formControlSelectProdutosPorCategoriaEl.appendChild(this.getProductByCategoryView(data, key));

  //       }

  //     });

  //   });

  // }  


  // removeItem(key) {

  //   let ref = this.refSolutionProposalProjectCustomer + key;
  //   firebase.database().ref(ref).remove();

  // }

}