import { FieldArrayWithId, FieldErrors, UseFieldArrayRemove, UseFormRegister } from "react-hook-form";
import { AddressesFormData } from "../Form";
import './styles.css'
import InputMask from 'react-input-mask';
import { states } from "../../constants/states";

interface AddressProps {
    field: FieldArrayWithId<AddressesFormData, "addresses", "id">;
    index: number;
    register: UseFormRegister<AddressesFormData>;
    remove: UseFieldArrayRemove,
    errors: FieldErrors<AddressesFormData>
}

const Address = ({ field, index, register, remove, errors }: AddressProps) => {
    return (
        <div key={field.id}>
            <div className="address-title-div">
                <h4>Address {index + 1}</h4>
                <button type="button" onClick={() => remove(index)}>Remove</button>
            </div>

            <div className='input-div'>
                <label htmlFor={`addresses.${index}.cep`}>CEP: </label>
                <InputMask mask="99999-999" type="text" id={`addresses.${index}.cep`} {...register(`addresses.${index}.cep`)} />
                <span>{errors.addresses?.[index]?.cep?.message}</span>
            </div>

            <div className='input-div'>
                <label htmlFor={`addresses.${index}.street`}>Street: </label>
                <input type="text" id={`addresses.${index}.street`} {...register(`addresses.${index}.street`)} />
                <span>{errors.addresses?.[index]?.street?.message}</span>
            </div>

            <div className='input-div'>
                <label htmlFor={`addresses.${index}.number`}>Number: </label>
                <input type="text" id={`addresses.${index}.number`} {...register(`addresses.${index}.number`)} />
                <span>{errors.addresses?.[index]?.number?.message}</span>
            </div>

            <div className='input-div'>
                <label htmlFor={`addresses.${index}.complement`}>Complement: </label>
                <input type="text" id={`addresses.${index}.complement`} {...register(`addresses.${index}.complement`)} />
                <span>{errors.addresses?.[index]?.complement?.message}</span>
            </div>

            <div className='input-div'>
                <label htmlFor={`addresses.${index}.district`}>District: </label>
                <input type="text" id={`addresses.${index}.district`} {...register(`addresses.${index}.district`)} />
                <span>{errors.addresses?.[index]?.district?.message}</span>
            </div>

            <div className='input-div'>
                <label htmlFor={`addresses.${index}.city`}>City: </label>
                <input type="text" id={`addresses.${index}.city`} {...register(`addresses.${index}.city`)} />
                <span>{errors.addresses?.[index]?.city?.message}</span>
            </div>

            <div className='input-div'>
                <label htmlFor={`addresses.${index}.uf`}>UF: </label>
                <select id={`addresses.${index}.uf`} {...register(`addresses.${index}.uf`)}>
                    <option value="">Select a state</option>
                    {Object.entries(states).map(([uf, state]) => (
                        <option key={uf} value={uf}>{state}</option>
                    ))}
                </select>
                <span>{errors.addresses?.[index]?.uf?.message}</span>
            </div>
        </div>
    )
}

export default Address;