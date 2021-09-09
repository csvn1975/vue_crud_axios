
Vue.component('UserDelete', {
    template: `
    <div>
        <div class = "overlay modal" 
            style = "display:block; background-color: rgba(0,0,0, 0.5)" 
            v-if="open"
         >
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title text-danger">User delete</h5>
                        <button type="button" class="close" 
                        @click= "closeModal()"
                        data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        Are you sure you want to delete this user?
                    </div>
                    <div class="modal-footer">
                        <button type="button" 
                            @click= "closeModal()"
                        class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button type="button" 
                            @click= "closeModal(true)"
                        class="btn btn-primary">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    </div> 
    `,  

    props: {
        open: Boolean,
        id: String,
    },

    methods:{
        closeModal(isDelete = false){
            if ( isDelete )
                this.$emit('closeModal', {id: this.id})
            else 
                this.$emit('closeModal', null)
        }
    }
})