<template>
    <form @submit.prevent="submitForm()">
        <DxForm :form-data="record" :col-count="2">
          <DxSimpleItem data-field="title" :is-required="true" />
          <DxSimpleItem data-field="genre"/>
          <DxSimpleItem data-field="author"/>
        </DxForm>
        <DxButton text="Simpan" type="success" :use-submit-behavior="true" :disabled="submitButtonDisabled" />
    </form>
</template>

<script lang="ts" setup>
import DxButton from 'devextreme-vue/button'
import { DxForm, DxSimpleItem } from 'devextreme-vue/form';

// Custom types
interface Book {
    id: number,
    title: string,
    genre: string,
    author: string,
    vote_count: number
}

// Props
const props = defineProps({
    initialRecord: {
        type: Object as PropType<Book>,
        default: {} as Book
    },
})

// Data
const record = reactive(props.initialRecord)
const isEditMode = ref(false)
const submitButtonDisabled = ref(false)

// Computed
const submitUrl = computed(function() {
    let url = '/api/book'
    if (isEditMode.value) {
        url += '/' + record.id
    }
    return url
})
const submitMethod = computed(function() {
    return isEditMode.value ? 'put' : 'post'
})

// Watchers
watch(props.initialRecord, function(newInitialRecord, oldInitialRecord){
    isEditMode.value = newInitialRecord !== oldInitialRecord
}, {
    immediate: true,
    once: true
})

// Methods 
async function submitForm() {
    try {
        submitButtonDisabled.value = true
        const client = useSanctumClient()
        const router = useRouter()
        await client(submitUrl.value, {
            method: submitMethod.value,
            body: JSON.stringify(record)
        }).then(function(){
            router.push('/book')
        })
    } catch (error) {
        console.log(error);
    }finally{
        submitButtonDisabled.value = false
        Object.assign(record, {title:'', genre: '', author:''} as Book)
    }
}
</script>
