class ZController {

  constructor() {

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

    this.btnSalvar = document.querySelector('#btnSalvar');
    this.btnAddProject = document.querySelector('#btn-add-project');
    this.btnAddSolution = document.querySelector('#btn-add-solution');

    this.tableProjectTh = document.querySelector('#table-projects-th');

    this.listCustomersEl = document.querySelector('#list-customers');
    this.listProjectCustomersEl = document.querySelector('#list-projects-customers');

    this.customerKey = '';
    this.projectKey = '';
    this.solutionKey = '';

    this.connectFirebase();
    this.readCustomers();
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

    // this.tableProjectTh.style.visibility = 'hidden';
    // this.listCustomersEl.style.visibility = 'hidden';
    // this.listProjectCustomersEl.visibility = 'hidden';

    this.btnSalvar.addEventListener('click', e => {

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

      this.customerKey = cpf;

      if (name) {

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

        // this.formAddCustomer.style.visibility = 'hidden';

        // this.tableProjectTh.style.visibility = 'visible';
        // this.listCustomersEl.style.visibility = 'visible';
        // this.listProjectCustomersEl.visibility = 'visible';

      } else {

        console.log('Nome não existe');

      }

    });

  }


  getFirebaseRef(path) {

    if (!path) path = 'ssa/customers/' + this.customerKey;

    return firebase.database().ref(path);

  }


  getCustomerView(data, key) {

    let li = document.createElement('li');

    li.dataset.key = key;
    // li.dataset.file = JSON.stringify(data);

    li.innerHTML = `
      <div class="list-group-item d-flex justify-content-between align-items-center"><span>${data.name}</span><span>${data.cpf}</span><span>${data.email}</span>
      <span><button type="button" class="btn" id="btn-add-project"><img src="src/img/icons/add-circle-outline.svg" alt="add" width="18px"/></button></span></div>
    `;

    this.initEventsLi(li);

    return li;

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



  readCustomers() {

    this.getFirebaseRef().on('value', snapshot => {

      this.listCustomersEl.innerHTML = '';

      snapshot.forEach(snapshotItem => {

        let key = snapshotItem.key;
        let data = snapshotItem.val();

        if (data) {

          this.listCustomersEl.appendChild(this.getCustomerView(data, key));

        }

      });

    });

  }


  initEventsLi(li) {

    let key;
    let refCustomer;

    li.addEventListener('dblclick', e => {

      let newProject = prompt('Nome do novo projeto:');

      if (newProject) {

        key = li.dataset.key;

        refCustomer = 'ssa/customers/' + key + '/projects';

        firebase.database().ref(refCustomer).push().set({
          projectName: newProject
        });

      }

    });


    li.addEventListener('click', e => {

      let btnID = e.path[1].id;

      if (btnID) {

        switch (btnID) {
          case 'btn-add-project':
            this.projectKey = li.dataset.key;
            break;

          case 'btn-add-solution':
            let newSolution = prompt('Nome da nova solução:');

            if (newSolution) {

              this.solutionKey = li.dataset.key;

              refCustomer = 'ssa/customers/' + this.projectKey + '/projects/' + this.solutionKey;

              firebase.database().ref(refCustomer).push().set({
                solutionName: newSolution
              });

            }
            break;

          default:
            console.log('Vazio');
            break;
        }

      }

      key = li.dataset.key;

      refCustomer = 'ssa/customers/' + key + '/projects';

      firebase.database().ref(refCustomer).on('value', snapshot => {

        this.listProjectCustomersEl.innerHTML = '';

        snapshot.forEach(snapshotItem => {

          let key = snapshotItem.key;
          let data = snapshotItem.val();

          console.log('Dados: ', data.projectName);

          if (data) {

            this.listProjectCustomersEl.appendChild(this.getProjectCustomerView(data, key));

          }

        });

      });

    });

  }

}