import Home from '../Home';
import { act, cleanup, fireEvent, render } from '@testing-library/react';
import renderer from 'react-test-renderer';



describe("Home Component", () => {

    afterEach(() => {
        cleanup();
    })

    test("Create Parking Slot Button Test", async () => {
        await act(async () => {
            const { getByTestId } = render(<Home />);
            const createSlotButton = getByTestId("createSlotButton");
            expect(createSlotButton).toBeTruthy();
            expect(createSlotButton.innerHTML).toBe(`<span class=\"MuiButton-label\">Create Slot</span>`);  
        })
    })

    test("No. of Input value to Create Parking Test", async () => {
        await act(async () => {
            const { getByTestId } = render(<Home />);
            const createParkingSlotInput = getByTestId("createParkingSlotInput");
            expect(createParkingSlotInput).toBeTruthy(); 
        })
    })

    test.skip("Matches SnapShot", () => {
        const tree = renderer.create(<Home />).toJSON();
        expect(tree).toMatchSnapshot();
    })

})
