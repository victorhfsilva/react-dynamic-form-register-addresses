import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { Form } from "."

describe('Form Submission Test', () => {

    test('given a empty form, when add address is pressed, should show addresses fields', async () => {
        render(
            <Form />
        )

        const addAddressButton = screen.getByText("Add Address");

        fireEvent.click(addAddressButton);

        const cepInput = await screen.findByLabelText("CEP:");
        const streetInput = await screen.findByLabelText("Street:");
        const numberInput = await screen.findByLabelText("Number:");
        const complementInput = await screen.findByLabelText("Complement:");
        const districtInput = await screen.findByLabelText("District:");
        const cityInput = await screen.findByLabelText("City:");
        const ufInput = await screen.findByLabelText("UF:");

        expect(cepInput).toBeVisible();
        expect(streetInput).toBeVisible();
        expect(numberInput).toBeVisible();
        expect(complementInput).toBeVisible();
        expect(districtInput).toBeVisible();
        expect(cityInput).toBeVisible();
        expect(ufInput).toBeVisible();

    })

    test('given a empty form, when a new address is added, the submission should be acknowledged', async () => {
        render(
            <Form />
        )

        const addAddressButton = screen.getByText("Add Address");
        const submitButton = screen.getByText("Submit");

        fireEvent.click(addAddressButton);

        const cepInput = await screen.findByLabelText("CEP:");
        const streetInput = await screen.findByLabelText("Street:");
        const numberInput = await screen.findByLabelText("Number:");
        const complementInput = await screen.findByLabelText("Complement:");
        const districtInput = await screen.findByLabelText("District:");
        const cityInput = await screen.findByLabelText("City:");
        const ufInput = await screen.findByLabelText("UF:");

        fireEvent.change(cepInput, {
            target: {
                value: '01001000'
            }
        })

        fireEvent.change(streetInput, {
            target: {
                value: 'Stret XYZ'
            }
        })

        fireEvent.change(numberInput, {
            target: {
                value: '123'
            }
        })

        fireEvent.change(complementInput, {
            target: {
                value: 'Ap. 321'
            }
        })

        fireEvent.change(districtInput, {
            target: {
                value: 'District ZYX'
            }
        })

        fireEvent.change(cityInput, {
            target: {
                value: 'City ABC'
            }
        })

        fireEvent.change(ufInput, {
            target: {
                value: 'SP'
            }
        })

        fireEvent.click(submitButton);

        const acknowledgment = await screen.findByText('Data was submitted successfully.')
        expect(acknowledgment).toBeVisible();
    })

})