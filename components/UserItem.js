Vue.component('UserItem', {
    template: `
            <tr>
            <th scope="row"> {{ index + 1 }}</th>
            <td>{{user.username}}</td>
            <td>{{user.address}}</td>
            <td>{{user.email}}</td>
            <td class="text-right">
                <button class="btn btn-sm btn-primary"
                    @click = "handleEdit(user.id)"
                ><i class="fas fa-pencil-alt"></i></button>
                <button class="btn btn-sm btn-danger"
                    @click = "handleDelete(user.id)"
                ><i class="fas fa-trash-alt"></i></button>
            </td>
            </tr>
        `,  
    props: {
        index: Number,
        user: {
            type : Object,
            default: () => {}
        }
    }, 

    methods:{
        handleEdit(id) {
            this.$emit('handleEdit', id)
        },

        handleDelete(id) {
            this.$emit('handleDelete', id)
        }
    }

  })