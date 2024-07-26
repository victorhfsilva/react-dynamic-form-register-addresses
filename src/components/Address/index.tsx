import { FieldArrayWithId, UseFieldArrayRemove, useFormContext } from "react-hook-form";
import { AddressesFormData } from "../Form";
import './styles.css'
import InputMask from 'react-input-mask';
import { states } from "../../constants/states";

interface AddressProps {
    field: FieldArrayWithId<AddressesFormData, "addresses", "id">;
    index: number;
    remove: UseFieldArrayRemove,
}

const Address = ({ field, index, remove }: AddressProps) => {

    const { register, formState: { errors }, setValue, setError } = useFormContext<AddressesFormData>();

    const fetchAddress = async (cep: string) => {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();

            if (data.erro) {
                setError(`addresses.${index}.cep`, { type: 'manual', message: 'CEP inválido' });
            } else {
                setValue(`addresses.${index}.street`, data.logradouro);
                setValue(`addresses.${index}.district`, data.bairro);
                setValue(`addresses.${index}.city`, data.localidade);
                setValue(`addresses.${index}.uf`, data.uf);
            }
        } catch (error) {
            setError(`addresses.${index}.cep`, { type: 'manual', message: 'Erro ao buscar CEP' });
        }
    };

    const handleCepBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        const cep = event.target.value;
        if (cep) {
            fetchAddress(cep);
        }
    };

    return (
        <div key={field.id}>
            <div className="address-title-div">
                <h4>Address {index + 1}</h4>
                <button type="button" onClick={() => remove(index)}>Remove</button>
            </div>

            <div className='input-div'>
                <label htmlFor={`addresses.${index}.cep`}>CEP: </label>
                <InputMask
                    mask="99999-999"
                    type="text"
                    id={`addresses.${index}.cep`}
                    {...register(`addresses.${index}.cep`)}
                    onBlur={handleCepBlur} />
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