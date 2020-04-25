class ZController {

  constructor() {

    // Select with product categories
    this.formControlSelectCategoriaEl = document.querySelector('#formControlSelectCategoria');

    // Get the value of category selected
    this.selectCategory = document.getElementById('formControlSelectCategoria');

    // Select with the products by categories selected
    this.formControlSelectProdutosPorCategoriaEl = document.querySelector('#formControlSelectProdutosPorCategoria');

    // Get the value of product selected
    this.selectProduct = document.getElementById('formControlSelectProdutosPorCategoria');

    // Form to add products into basket
    this.formAddProductEl = document.querySelector('#form-add-products');
    this.productNameEl = document.querySelector('#formControlSelectProdutosPorCategoria');
    this.inputQuantityEl = document.querySelector('#inputQuantity');

    this.btnAddProductEl = document.querySelector('#btn-add-product');

    // Form to consult customers
    this.formConsutlCustomers = document.querySelector('#form-consult-customer');
    this.consultNameEl = document.querySelector('#consult-name');
    this.btnConsultCustomersEl = document.querySelector('#btn-consult-customers');

    // Modal Button to open form to create a new Project
    this.btnNewProjectEl = document.querySelector('#btn-new-project');

    // Modal Button to open form to create a new Proposal
    this.btnNewProposalEl = document.querySelector('#btn-new-proposal');

    // Modal Button to open form to create a new Solution
    this.btnNewSolutionEl = document.querySelector('#btn-new-solution');

    // Modal Button to open form to create a new Product
    this.btnNewProductEl = document.querySelector('#btn-new-product');

    // Modal Title Project
    this.projectTitleEl = document.querySelector('#project-title');

    // Modal Title Proposal
    this.proposalTitleEl = document.querySelector('#proposal-title');

    // Modal Title Solution
    this.solutionTitleEl = document.querySelector('#solution-title');

    // Modal Title Product
    this.productTitleEl = document.querySelector('#product-title');

    // Table Title
    this.tableTitleEl = document.querySelector('#table-title');

    // Button to close all modal list
    this.btnModalCloseProjectsEl = document.querySelector('.btn-modal-close-project');

    // Button to close modal Proposal
    this.btnModalCloseProposalEl = document.querySelector('.btn-modal-close-proposal');

    // Button to close modal Solution
    this.btnModalCloseSolutionEl = document.querySelector('.btn-modal-close-solution');

    // Button to close modal Product
    this.btnModalCloseProductEl = document.querySelector('.btn-modal-close-product');

    // Form to add Customer
    this.formAddCustomer = document.querySelector('#form-add-customer');
    this.inputName = document.querySelector('#inputName');
    this.inputCpf = document.querySelector('#inputCpf');
    this.inputCelular = document.querySelector('#inputCelular');
    this.inputEmail = document.querySelector('#inputEmail');
    this.inputAddress = document.querySelector('#inputAddress');
    this.inputAddress2 = document.querySelector('#inputAddress2');
    this.inputCity = document.querySelector('#inputCity');
    this.inputState = document.querySelector('#inputState');
    this.inputZip = document.querySelector('#inputZip');

    // Button to save customer's data in database
    this.btnSaveCustomerEl = document.querySelector('#btn-save-customer');

    // Button to add Project in database
    this.btnProject = document.querySelector('#btn-add-project');

    // Button to add Proposal in database
    this.btnAddProposal = document.querySelector('#btn-add-proposal');

    // Button to add Solution in database
    this.btnAddSolution = document.querySelector('#btn-add-solution');

    // Button to add Product in database
    this.btnAddProduct = document.querySelector('#btn-add-product');

    // li of Customer's list
    this.listCustomersEl = document.querySelector('#list-customers');

    // li of Projects by Customer's  list
    this.listProjectCustomersEl = document.querySelector('#list-projects-customers');

    // li of Proposal by Project by Customer's  list
    this.listProposalProjectsCustomersEl = document.querySelector('#list-proposal-projects-customers');

    // li of Solutions by Proposal by Project by Customer's  list
    this.listSolutionsProposalProjectsCustomersEl = document.querySelector('#list-solutions-proposal-projects-customers');

    // li of Products by Solutions by Proposal by Project by Customer's  list
    this.listProductsSolutionsProposalProjectsCustomersEl = document.querySelector('#list-products-solutions-proposal-projects-customers');
    
    // Customer's key
    this.customerKey = '';

    // Customer's Name
    this.customerName = '';

    // Project's key
    this.projectKey = '';

    // Project's name
    this.projectName = '';

    // Proposal's key
    this.proposalKey = '';

    // Proposal's name
    this.proposalName = '';

    // Solution's key
    this.solutionKey = '';

    // Solution's name
    this.solutionName = '';

    // Product's key
    this.productKey = '';

    // Product's name
    this.productName = '';

    // Path to save Proposal into Project
    this.refProjectCustomer = '';


    // Path to save Solution into Proposal
    this.refProposalProjectCustomer = '';

    // Path to save Product into Solution
    this.refSolutionProposalProjectCustomer = '';

    // Array with category name (no repeat)
    this.arrayCategories = [];

    // Array with Categories names
    this.arrayNomeFantasia = [];

    // Category name selected
    this.categoryName = '';

    // Product name selected
    this.productNameSelected = '';
    
    // Projects's th title
    this.tableProjectTh = document.querySelector('#table-projects-th');

    this.connectFirebase();
    this.readAllCustomers();
    this.initEvents();

    this.readAllFilterCategories();
    this.readAllFilterProductsByCategory();

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


  initEvents() {

    this.btnAddProductEl.addEventListener('click', e => {

      let timestampNow = Date.now();

      this.productNameSelected = this.selectProduct.options[this.selectProduct.selectedIndex].value;
      let quantityProduct = this.inputQuantityEl.value;

      this.addNewProduct(quantityProduct);

    });

    this.formControlSelectCategoriaEl.addEventListener('change', e => {

      this.categoryName = this.selectCategory.options[this.selectCategory.selectedIndex].value;

      this.readAllFilterProductsByCategory(categoryName);

    });

    this.btnNewProjectEl.addEventListener('click', e => {

      this.addNewProject();

    });


    this.btnNewProposalEl.addEventListener('click', e => {

      this.addNewProposal();

    });



    this.btnNewSolutionEl.addEventListener('click', e => {

      this.addNewSolution();

    });

    this.btnNewProductEl.addEventListener('click', e => {

      this.addNewProduct();

    });



    this.btnConsultCustomersEl.addEventListener('click', e => {

      let consultName = this.consultNameEl.value;

      if (consultName !== '') {

        this.readConsultCustomers(consultName);
        
      } else {

        console.log('Campo nome vazio');

        this.listCustomersEl.innerHTML = '';

      }

    });


    this.btnModalCloseProjectsEl.addEventListener('click', e => {

      $('#modal-list-projects').modal('hide');

    });


    this.btnModalCloseProposalEl.addEventListener('click', e => {

      $('#modal-list-proposal').modal('hide');

    });


    this.btnModalCloseSolutionEl.addEventListener('click', e => {

      $('#modal-list-solutions').modal('hide');

    });


    this.btnModalCloseProductEl.addEventListener('click', e => {

      $('#modal-list-products').modal('hide');

    });



    this.btnSaveCustomerEl.addEventListener('click', e => {

      let timestampNow = Date.now();

      let name = this.inputName.value;
      let cpf = this.inputCpf.value;
      let celular = this.inputCelular.value;
      let email = this.inputEmail.value;
      let address = this.inputAddress.value;
      let address2 = this.inputAddress2.value;
      let city = this.inputCity.value;
      let state = this.inputState.value;
      let zip = this.inputZip.value;

      if (name) {

        this.customerKey = timestampNow;

        this.getFirebaseRef().set({
          timestampNow,
          name,
          cpf,
          celular,
          email,
          address,
          address2,
          city,
          state,
          zip
        });

        this.inputName.value = '';
        this.inputCpf.value = '';
        this.inputCelular.value = '';
        this.inputEmail.value = '';
        this.inputAddress.value = '';
        this.inputAddress2.value = '';
        this.inputCity.value = '';
        this.inputState.value = '';
        this.inputZip.value = '';

        $('#modal-add-customers').modal('hide');

      } else {

        console.log('Nome não existe');

      }

      this.addNewProject();

    });

  }


  addNewProject() {

    let newProject = prompt('Nome do novo projeto:');

    if (newProject) {

      let refCustomer = 'ssa/customers/' + this.customerKey + '/projects';

      firebase.database().ref(refCustomer).push().set({
        projectName: newProject
      });

    }

  }



  addNewProposal() {

    let newProposal = prompt('Nome da nova proposta:');

    if (newProposal) {

      firebase.database().ref(this.refProjectCustomer).push().set({
        proposalName: newProposal
      });

    }

  }



  addNewSolution() {

    let newSolution = prompt('Nome da nova solução:');

    if (newSolution) {

      // this.projectKey = li.dataset.key;

      //this.refProjectCustomer = 'ssa/customers/' + this.customerKey + '/projects/' + this.projectKey;

      firebase.database().ref(this.refProposalProjectCustomer).push().set({
        solutionName: newSolution
      });

    }

  }


  addNewProduct(quantityProduct) {

    $('#modal-list-products').modal('hide');
  
    $('#modal-add-product').modal('show');

    let timestampNow = Date.now();
    let product = this.productNameSelected;
    let quantity = quantityProduct;

    if (product && quantity) {

        firebase.database().ref('basket/').push().set({
          timestampNow,
          product,
          quantity
          
        });  
        
        this.inputQuantityEl.innerHTML = '';

    }

    
    this.getProductSolutionProposalProjectCustomerView();

    // if (newProduct) {

    //   // this.projectKey = li.dataset.key;

    //   //this.refProjectCustomer = 'ssa/customers/' + this.customerKey + '/projects/' + this.projectKey;

    //   firebase.database().ref(this.refSolutionProposalProjectCustomer).push().set({
    //     productName: newProduct
    //   });

    // }

  }
  


  getFirebaseRef(path) {

    if (!path) path = 'ssa/customers/' + this.customerKey;

    return firebase.database().ref(path);

  }


  getConsultCustomerView(data, key) {

    let li = document.createElement('li');

    li.dataset.key = key;
    li.dataset.file = JSON.stringify(data);

    li.innerHTML = `
      <div class="list-group-item d-flex justify-content-between align-items-center"><span>${data.name}</span><span>${data.cpf}</span><span>${data.email}</span>
      <span><button type="button" class="btn" id="btn-project"><img src="src/img/icons/add-circle-outline.svg" alt="add" width="18px"/></button></span></div>
    `;

    this.initEventsLi(li);

    return li;

  }


  readConsultCustomers(consultName) {

    let getConsultName = consultName;

    this.getFirebaseRef().orderByChild("name").startAt(getConsultName).on('value', snapshot => {

      this.listCustomersEl.innerHTML = '';

      snapshot.forEach(snapshotItem => {

        let key = snapshotItem.key;
        let data = snapshotItem.val();

        if (data !== '' ) {

          this.listCustomersEl.appendChild(this.getConsultCustomerView(data, key));

        } else {

          this.listCustomersEl.innerHTML = '';

        }

      });

    });

  }



  readConsultCustomerById(id) {

    this.customerKey = id;

    let refPath = firebase.database().ref('ssa/customers/' + this.customerKey + '/');

    refPath.on('value', snapshot => {

      snapshot.forEach(snapshotItem => {

        let key = snapshotItem.key;
        let data = snapshotItem.val();

      });

      this.customerName = snapshot.val().name;

    });

  }


  
  readConsultProjectCustomerById(id) {

    this.projectKey = id;

    let refPath = firebase.database().ref('ssa/customers/' + this.customerKey + '/projects/' + this.projectKey + '/');

    refPath.on('value', snapshot => {

      snapshot.forEach(snapshotItem => {

        let key = snapshotItem.key;
        let data = snapshotItem.val();

      });

      this.projectName = snapshot.val().projectName;

    });

  }



  readConsultProposalProjectCustomerById(id) {

    this.proposalKey = id;

    let refPath = firebase.database().ref('ssa/customers/' + this.customerKey + '/projects/' + this.projectKey + '/proposal/' + this.proposalKey + '/');

    refPath.on('value', snapshot => {

      snapshot.forEach(snapshotItem => {

        let key = snapshotItem.key;
        let data = snapshotItem.val();

      });

      this.proposalName = snapshot.val().proposalName;

    });

  }



  readConsultSolutionProposalProjectCustomerById(id) {

    this.solutionKey = id;

    let refPath = firebase.database().ref('ssa/customers/' + this.customerKey + '/projects/' + this.projectKey + '/proposal/' + this.proposalKey + '/solutions/' + this.solutionKey + '/');

    refPath.on('value', snapshot => {

      snapshot.forEach(snapshotItem => {

        let key = snapshotItem.key;
        let data = snapshotItem.val();

      });

      this.solutionName = snapshot.val().solutionName;

    });

  }



  getAllCustomerView(data, key) {

    let li = document.createElement('li');

    li.dataset.key = key;
    li.dataset.file = JSON.stringify(data);

    li.innerHTML = `
      <div class="list-group-item d-flex justify-content-between align-items-center"><span>${data.name}</span><span>${data.cpf}</span><span>${data.email}</span>
      <span><button type="button" class="btn" id="btn-project"><img src="src/img/icons/add-circle-outline.svg" alt="add" width="18px"/></button></span></div>
    `;

    this.initEventsLi(li);

    return li;

  }



  readAllCustomers() {

    this.getFirebaseRef().orderByChild("name").on('value', snapshot => {

      this.listCustomersEl.innerHTML = '';
      this.tableTitleEl.innerHTML = 'Clientes';

      snapshot.forEach(snapshotItem => {

        let key = snapshotItem.key;
        let data = snapshotItem.val();

        if (data !== '') {

          this.listCustomersEl.appendChild(this.getAllCustomerView(data, key));

        }

      });

    });

  }



  getProjectCustomerView(data, key) {

    let li = document.createElement('li');

    li.dataset.key = key;
    li.dataset.file = JSON.stringify(data);

    li.innerHTML = `
      <div class="list-group-item d-flex justify-content-between align-items-center"><span>${data.projectName}</span>
      <span><button type="button" class="btn" id="btn-add-proposal"><img src="src/img/icons/add-circle-outline.svg" alt="add" width="18px"/></button></span></div>
    `;

    this.initEventsLi(li);

    return li;

  }


  getProposalProjectCustomerView(data, key) {

    let li = document.createElement('li');

    li.dataset.key = key;
    li.dataset.file = JSON.stringify(data);

    li.innerHTML = `
      <div class="list-group-item d-flex justify-content-between align-items-center"><span>${data.proposalName}</span>
      <span><button type="button" class="btn" id="btn-add-solution"><img src="src/img/icons/add-circle-outline.svg" alt="add" width="18px"/></button></span></div>
    `;

    this.initEventsLi(li);

    return li;

  }



  getSolutionProposalProjectCustomerView(data, key) {

    let li = document.createElement('li');

    li.dataset.key = key;
    li.dataset.file = JSON.stringify(data);

    li.innerHTML = `
      <div class="list-group-item d-flex justify-content-between align-items-center"><span>${data.solutionName}</span>
      <span><button type="button" class="btn" id="btn-add-product"><img src="src/img/icons/add-circle-outline.svg" alt="add" width="18px"/></button></span></div>
    `;

    this.initEventsLi(li);

    return li;

  }



  getProductSolutionProposalProjectCustomerView(data, key) {

    let li = document.createElement('li');

    li.dataset.key = key;
    li.dataset.file = JSON.stringify(data);

    li.innerHTML = `
      <div class="list-group-item d-flex justify-content-between align-items-center"><span>${data.productName}</span><span>${data.quantity}</span>
      </div>
    `;

    this.initEventsLi(li);

    return li;

  }


  
  initEventsLi(li) {

    let key;
    let refCustomer;


    li.addEventListener('click', e => {

      // Get value of id li
      let btnID = e.path[1].id;

      // Customer's Key
      let lastLiKey = li.dataset.key;

      if (btnID) {

        switch (btnID) {
          case 'btn-project':

            this.customerKey = lastLiKey;

            refCustomer = 'ssa/customers/' + this.customerKey + '/projects';

            $('#modal-list-projects').modal('show');

            firebase.database().ref(refCustomer).on('value', snapshot => {

              this.listProjectCustomersEl.innerHTML = '';

              snapshot.forEach(snapshotItem => {

                let key = snapshotItem.key;
                let data = snapshotItem.val();

                if (key !== '') {

                  this.listProjectCustomersEl.appendChild(this.getProjectCustomerView(data, key));

                }

              });

              if (this.listProjectCustomersEl.childElementCount === 0) {
        
                this.addNewProject();
        
              }

              this.readConsultCustomerById(this.customerKey);
              this.projectTitleEl.innerHTML = this.customerName + ' > Projetos';

            });
            break;

            case 'btn-add-proposal':
              this.projectKey = lastLiKey;
  
              this.refProjectCustomer = 'ssa/customers/' + this.customerKey + '/projects/' + this.projectKey + '/proposal';
  
              $('#modal-list-projects').modal('hide');
  
              $('#modal-list-proposal').modal('show');
  
              firebase.database().ref(this.refProjectCustomer).on('value', snapshot => {
  
                this.listProposalProjectsCustomersEl.innerHTML = '';
  
                snapshot.forEach(snapshotItem => {
  
                  let key = snapshotItem.key;
                  let data = snapshotItem.val();
  
                  if (key !== '') {
  
                    this.listProposalProjectsCustomersEl.appendChild(this.getProposalProjectCustomerView(data, key));
                    
                  } 
  
                });
  
                if (this.listProposalProjectsCustomersEl.childElementCount === 0) {
          
                  this.addNewProposal();
          
                }
  
                this.readConsultCustomerById(this.customerKey);
                this.readConsultProjectCustomerById(this.projectKey);
                this.proposalTitleEl.innerHTML = this.customerName + ' > ' + this.projectName + ' > Propostas';
  
              });
              break;

          case 'btn-add-solution':
            this.proposalKey = lastLiKey;

            this.refProposalProjectCustomer = 'ssa/customers/' + this.customerKey + '/projects/' + this.projectKey + '/proposal/' + this.proposalKey + '/solutions/';

            $('#modal-list-proposal').modal('hide');

            $('#modal-list-solutions').modal('show');

            firebase.database().ref(this.refProposalProjectCustomer).on('value', snapshot => {

              this.listSolutionsProposalProjectsCustomersEl.innerHTML = '';

              snapshot.forEach(snapshotItem => {

                let key = snapshotItem.key;
                let data = snapshotItem.val();

                if (key !== '') {

                  this.listSolutionsProposalProjectsCustomersEl.appendChild(this.getSolutionProposalProjectCustomerView(data, key));
                  
                } 

              });

              if (this.listSolutionsProposalProjectsCustomersEl.childElementCount === 0) {
        
                this.addNewSolution();
        
              }

              this.readConsultCustomerById(this.customerKey);
              this.readConsultProjectCustomerById(this.projectKey);
              this.readConsultProposalProjectCustomerById(this.proposalKey);
              this.solutionTitleEl.innerHTML = this.customerName + ' > ' + this.projectName +  ' > ' + this.proposalName + ' > Soluções';

            });
            break;
        
          case 'btn-add-product':
            this.solutionKey = lastLiKey;

            this.refSolutionProposalProjectCustomer = 'ssa/customers/' + this.customerKey + '/projects/' + this.projectKey + '/proposal/' + this.proposalKey + '/solutions/' + this.solutionKey + '/product/';

            $('#modal-list-solutions').modal('hide');

            $('#modal-list-products').modal('show');

            firebase.database().ref(this.refSolutionProposalProjectCustomer).on('value', snapshot => {

              this.listProductsSolutionsProposalProjectsCustomersEl.innerHTML = '';

              snapshot.forEach(snapshotItem => {

                let key = snapshotItem.key;
                let data = snapshotItem.val();

                if (key !== '') {

                  this.listProductsSolutionsProposalProjectsCustomersEl.appendChild(this.getProductSolutionProposalProjectCustomerView(data, key));
                  
                } 

              });

              if (this.listProductsSolutionsProposalProjectsCustomersEl.childElementCount === 0) {
        
                this.addNewProduct();
        
              }

              this.readConsultCustomerById(this.customerKey);
              this.readConsultProjectCustomerById(this.projectKey);
              this.readConsultProposalProjectCustomerById(this.proposalKey);
              this.readConsultSolutionProposalProjectCustomerById(this.solutionKey);
              this.productTitleEl.innerHTML = this.customerName + ' > ' + this.projectName +  ' > ' + this.proposalName + '>' + this.solutionName + ' > Produtos';

            });
            break;

          default:
            console.log('Vazio');
            break;
        }

      }

    });

  }


  getCategoryView(dataName, key) {

    let option = document.createElement('option');

    // option.dataset.key = key;
    option.dataset.file = dataName
    
    option.innerHTML = `
      <option id='categoryName' value='${dataName}'>${dataName}</option>
    `;

    return option;

  }


  readAllFilterCategories() {

    firebase.database().ref("products").on('value', snapshot => {

      // this.listCustomersEl.innerHTML = '';

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
      console.log(deVoltaAAray);

      deVoltaAAray.forEach(item => {

        this.formControlSelectCategoriaEl.appendChild(this.getCategoryView(item));

      });

    });

  }


  getProductByCategoryView(data, key) {

    let option = document.createElement('option');

    option.dataset.key = key;
    option.dataset.file = data
    
    option.innerHTML = `
      <option value='${key}'>${data.nomeFantasia}</option>
    `;

    return option;

  }


  readAllFilterProductsByCategory(categoryName) {

    firebase.database().ref("products").orderByChild("categoria").equalTo(this.categoryName).on('value', snapshot => {

      this.formControlSelectProdutosPorCategoriaEl.innerHTML = '';

      snapshot.forEach(snapshotItem => {

        let key = snapshotItem.key;
        let data = snapshotItem.val();

        if (data !== '') {

          this.formControlSelectProdutosPorCategoriaEl.appendChild(this.getProductByCategoryView(data, key));

        }
        
      });

    });

  }  
  
}