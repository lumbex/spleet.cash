app.component('reservation-form', {
  template:
  /*html*/
  `<form @submit.prevent="fakeSubmit">
    <p class="app-form-error" v-if="formError.length > 0">{{formError}}</p>
    <div class="form-group">
      <label for="username">Username</label> 
      <input v-model="username" type="text" id="username" placeholder="e.g spleetcash (min. 3 characters)"/>
    </div>
    <div class="form-group">
      <label for="email">Email</label> 
      <input v-model="email" type="email" id="email" required placeholder="e.g mail@spleet.cash"/>
    </div>

    <p class="tiny">By clicking ‘Reserve’, you agree to our <a href="#">Terms</a></p>

    <button class="btn btn-beans btn-cool" type="submit">
      <img v-if="callingApi" class="btn-loader lds-spinner" src="https://assets-hub.s3.us-west-2.amazonaws.com/img/spleet.cash/native-loader.gif" />
      <span v-else class="btn-titile">Reserve</span>
    </button>    

  </form>`,
  data() {
    return {
      username: '',
      email: '',
      formError: '',
      callingApi: true
    }
  },
  methods: {
    fakeSubmit() {
      this.callingApi = true;
    },
    onSubmit() {
      // call "/reserveUsername"
      if (this.email === '' || this.username === '') {
        alert('Reservation is incomplete. Please fill out every field.')
        return
      }

      let usernameReservation = {
        username: this.username,
        email: this.email
      }
      this.$emit('review-submitted', productReview)

      this.username = ''
      this.email = ''

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usernameReservation)
      };
      this.callingApi = true;
      fetch('https://1nd7ij4m1k.execute-api.us-east-2.amazonaws.com/prod/reserveUsername', requestOptions)
        .then(async response => {
          const data = await response.json();
          this.callingApi = false;

          // check for error response
          if (!response.ok) {
            // get error message from body or default to response status
            const error = (data && data.message) || response.status;
            this.formError = error
            return Promise.reject(error);
          }

          this.postId = data.id;
        })
        .catch(error => {
          this.formError = error;
          console.error('There was an error!', error);
        });
    },
    reserveUsername() {
          // POST request using fetch with error handling
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'Vue POST Request Example' })
      };
      fetch('https://jsonplaceholder.typicode.com/invalid-url', requestOptions)
        .then(async response => {
          const data = await response.json();

          // check for error response
          if (!response.ok) {
            // get error message from body or default to response status
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
          }

          this.postId = data.id;
        })
        .catch(error => {
          this.errorMessage = error;
          console.error('There was an error!', error);
        });
    }
  }
})