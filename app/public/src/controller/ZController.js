class ZController {

  constructor() {

    // Form to consult customers
    this.formConsutlCustomers = document.querySelector('#form-consult-customer');
    this.consultNameEl = document.querySelector('#consult-name');
    this.btnConsultCustomersEl = document.querySelector('#btn-consult-customers');

    // Modal Button to open form to create a new Project
    this.btnNewProjectEl = document.querySelector('#btn-new-project');

    // Modal Button to open form to create a new Solution
    this.btnNewSolutionEl = document.querySelector('#btn-new-solution');

    // Modal Title Project
    this.projectTitleEl = document.querySelector('#project-title');

    // Modal Title Solution
    this.solutionTitleEl = document.querySelector('#solution-title');

    // Table Title
    this.tableTitleEl = document.querySelector('#table-title');

    // Button to close all modal list
    this.btnModalCloseProjectsEl = document.querySelector('.btn-modal-close-project');

    // Button to close modal Solution
    this.btnModalCloseSolutionEl = document.querySelector('.btn-modal-close-solution');

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

    // Button to add Solution in database
    this.btnAddSolution = document.querySelector('#btn-add-solution');

    // li of Customer's list
    this.listCustomersEl = document.querySelector('#list-customers');

    // li of Projects by Customer's  list
    this.listProjectCustomersEl = document.querySelector('#list-projects-customers');

    // li of Projects by Customer's  list
    this.listSolutionsProjectsCustomersEl = document.querySelector('#list-solutions-projects-customers');
    
    // Customer's key
    this.customerKey = '';

    // Customer's Name
    this.customerName = '';

    // Project's key
    this.projectKey = '';

    // Project's name
    this.projectName = '';

    // Path to save Solution into Project
    this.refProjectCustomer = '';

    // Solution's key
    this.solutionKey = '';
    
    // Projects's th title
    this.tableProjectTh = document.querySelector('#table-projects-th');

    this.connectFirebase();
    this.readAllCustomers();
    this.initEvents();

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

    this.btnNewProjectEl.addEventListener('click', e => {

      this.addNewProject();

    });



    this.btnNewSolutionEl.addEventListener('click', e => {

      this.addNewSolution();

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

    this.btnModalCloseSolutionEl.addEventListener('click', e => {

      $('#modal-list-solutions').modal('hide');

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


  addNewSolution() {

    let newSolution = prompt('Nome da nova solução:');

    if (newSolution) {

      // this.projectKey = li.dataset.key;

      //this.refProjectCustomer = 'ssa/customers/' + this.customerKey + '/projects/' + this.projectKey;

      firebase.database().ref(this.refProjectCustomer).push().set({
        solutionName: newSolution
      });

    }

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
      <span><button type="button" class="btn" id="btn-add-solution"><img src="src/img/icons/add-circle-outline.svg" alt="add" width="18px"/></button></span></div>
    `;

    this.initEventsLi(li);

    return li;

  }



  getSolutionProjectCustomerView(data, key) {

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

          case 'btn-add-solution':
            this.projectKey = lastLiKey;

            this.refProjectCustomer = 'ssa/customers/' + this.customerKey + '/projects/' + this.projectKey + '/solutions';

            $('#modal-list-projects').modal('hide');

            $('#modal-list-solutions').modal('show');

            firebase.database().ref(this.refProjectCustomer).on('value', snapshot => {

              this.listSolutionsProjectsCustomersEl.innerHTML = '';

              snapshot.forEach(snapshotItem => {

                let key = snapshotItem.key;
                let data = snapshotItem.val();

                if (key !== '') {

                  this.listSolutionsProjectsCustomersEl.appendChild(this.getSolutionProjectCustomerView(data, key));
                  
                } 

              });

              if (this.listSolutionsProjectsCustomersEl.childElementCount === 0) {
        
                this.addNewSolution();
        
              }

              this.readConsultCustomerById(this.customerKey);
              this.readConsultProjectCustomerById(this.projectKey);
              this.solutionTitleEl.innerHTML = this.customerName + ' > ' + this.projectName + ' > Soluções';

            });
            break;

          default:
            console.log('Vazio');
            break;
        }

      }

    });

  }

}