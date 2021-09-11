Vue.component('UserList', {
    template: `
        <div>
            <div class="row" v-if = "message">
                <div class="col-8 offset-2">
                    <div 
                    class="alert"
                    :class="alertDanger ? 'alert-danger': 'alert-success'"
                    > 
                        {{message}}
                    </div>
                </div>
            </div>

            <div class="row">
            <div class="col-8 offset-2">
                    <button class="btn btn-primary float-right" 
                    @click="isOpenForm = true, currentUser = {}"> Add new user</button>
                </div>
            </div>

            <div class="row">
                <div class="col-8 offset-2">
                    <table class="table table-striped table-hover mt-2">
                        <thead>
                            <th scope="col" 
                                :class= "{'text-right': (index == lastCol)}"
                                v-for = "(item, index) in tableCols"
                                :key="index"
                            > {{item}}</th>
                        </thead>
                        <tbody>
                            <user-item v-for="(user, index) in usersList"
                                :key=index
                                :index = index
                                :user= user
                                @handleEdit = "isOpenForm = true, currentUser = {... user}"
                                @handleDelete = "isOpenDelete=true, deleteId=user.id"
                            ></user-item>
                        </tbody>
                    </table>
                </div>
            </div>
            <div>
                <!-- DELETE COMPONENT-->
                <user-delete 
                    @closeModal = "userDelete"
                    :id ="deleteId"
                    :open="isOpenDelete"></user-delete>

                <user-form 
                    @formSubmit = "userUpdateOrCreate"
                    :userInput = "currentUser"
                    :open="isOpenForm"></user-form>
            </div>

        </div>
        `,


    data: function () {
        return {
            tableCols: ['#', 'First-Name', 'Address', 'Email', 'Action'],
            lastCol: 4,
            isOpenDelete:false,
            isOpenForm:false,
            usersList: [],
            deleteId: '',
            currentUser: {},
            message: '',
            alertDanger: true,
            url: '/helpers/actions.php'
        }
    },

    created(){
        
       this.readUserList();
    },

    methods: {
        readUserList(){
            axios.get(this.url + '?action=load')
            .then(function (response) {
                return response.data;
            }).then(data => {
                console.log(data['users']);
                this.usersList = data['users'];
            });

        },

        userUpdateOrCreate(user) {
            this.isOpenForm = false;
            if ( user ) {
                
                const form_data = new FormData();
            
                form_data.append('action', user.id ? 'update' : 'insert');
                form_data.append('id', user.id);
                form_data.append('username', user.username);
                form_data.append('address', user.address);
                form_data.append('password', user.password);
                form_data.append('email', user.email);

                const options = {
                    url: this.url,
                    method: 'POST',
                    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
                    data: form_data,
                };

                axios(options)
                .then(function (response) {
                    return response.data;
                }).then(data => {
                    if (data.status === 200){
                        this.readUserList();
                        this.alertDanger = false;
                    }
                    this.message = data.message;
                });
            }

        },

        userDelete(data) {
            this.isOpenDelete = false;
            if ( data ) {
                axios.get(this.url + '?action=delete&id=' + data.id)
                .then(function (response) {
                    return response.data;
                }).then( data => {
                    if (data.status === 200){
                        this.readUserList();
                        this.alertDanger = false;
                    }
                    this.message = data.message;
                })
            } 
        },
    }
})