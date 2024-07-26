import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Address from '../Address';
import './styles.css'

const AddressesSchema = z.object({
    addresses: z.array(z.object({
        cep: z.string().min(9, "Cep must contain 8 numbers.").max(9, "Cep must contain 8 numbers.").regex(/^\d{5}-\d{3}$/, "Formato inválido."),
        street: z.string().min(1, "Street is required."),
        number: z.string().min(1, "Number is required."),
        complement: z.string(),
        district: z.string().min(1, "District is required."),
        city: z.string().min(1, "City is required."),
        uf: z.string().min(1, "Choose a valid UF.")
    }))
})

export type AddressesFormData = z.infer<typeof AddressesSchema>;

export const Form = () => {

    const methods = useForm<AddressesFormData>({
        resolver: zodResolver(AddressesSchema)
    });

    const { control, handleSubmit } = methods;

    const { fields, append, remove } = useFieldArray({
        control,
        name: "addresses"
    });

    const onSubmit = (data: AddressesFormData) => {
        console.log(data)
    }

    return (
        <div className='form-div'>
            <div className='addresses-title-div'>
                <h2>Addresses</h2>
                <button type="button" onClick={() => append({ cep: '', street: '', number: '', complement: '', district: '', city: '', uf: '' })}>
                    Add Address
                </button>
            </div>

            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {fields.map((field, index) => (
                        <Address field={field} index={index} remove={remove} />
                    ))}
                    <div className='button-div'>
                        <button type='submit'>Submit</button>
                    </div>
                </form>
            </FormProvider>
        </div>
    )

}