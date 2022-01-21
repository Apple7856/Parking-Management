import Navbar from '../Navbar';
import { render } from '@testing-library/react';

describe("Navbar Component", () => {
    test("Button Test", () => {
        const { getByTestId } = render(<Navbar />);
        const heading = getByTestId("Heading");
        expect(heading.innerHTML).toBe('Car Parking Management');
    })
})

