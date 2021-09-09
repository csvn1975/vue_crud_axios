
Vue.component('UserForm', {
    template: `
    <div>
        <div class = "overlay modal" 
            style = "display:block; background-color: rgba(0,0,0, 0.5)" 
            v-if="open"
         >
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title text-primary"> {{ userInput.id ? 'User Editing' : 'Add New User'}}</h5>
                        <button type="button" class="close" 
                        @click= "closeModal()"
                        data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    
                    <!-- BODY -->
                    <div class="modal-body">
                    
                        <div class="form-group">
                            <label for="exampleInputPassword1">Username</label>
                            <input type="text" class="form-control" id="Username" 
                            v-model="user.username"
                            placeholder="Enter username">
                        </div>

                        <div class="form-group">
                            <label for="exampleInputPassword1">Address</label>
                            <input type="text" class="form-control" id="Address" 
                            v-model="user.address"
                            placeholder="Enter address">
                        </div>
                
                        <div class="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input type="email" class="form-control" id="email" 
                            v-model="user.email"
                            aria-describedby="emailHelp" 
                            placeholder="Enter email">
                        </div>

                        <div class="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input type="password" class="form-control" id="password" 
                            v-model="user.password"
                            :placeholder="user.id ? '*****' : 'Enter password'">
                            <p class="text-danger mt-1" style="font-size:12px">{{ getValidate }}</p>
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button type="button" 
                            @click= "closeModal()"
                        class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button type="button" 
                            @click= "closeModal(true)"
                        class="btn btn-primary">  Save  </button>
                    </div>
                </div>
            </div>
        </div>
    </div> 
    `,  

    data:function(){
        return {
            user: {
                id:'',
                username:'',
                pasword:'',
                email:'',
                address:'',
            },
            errorMessage: '',
        }
    },

    props: {
        open: Boolean,
        userInput: {
            type: Object,
            default:()=> {}
        }
    },

    computed:{
        getValidate(){
            this.errorMessage = (!this.user.id && !!this.user.password == '') ? 'Please enter password' : '';
            return this.errorMessage;
        },
    },
    
    methods:{
        closeModal(isUpdate = false ){
            if ( !isUpdate ) { 
                this.$emit('formSubmit', null)  
            } 
            else if (!this.errorMessage ) { 
                user = {... this.user};
                this.$emit('formSubmit', user)
            } 

        }
    },

    watch: { 
        userInput: function(newVal, oldVal) { 
            this.user = {... newVal};
        },
    }
})