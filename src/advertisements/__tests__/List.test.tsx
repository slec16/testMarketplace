import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import List from "../List";
import { type IAdvertisement } from "../../interfaces";

// Мокаем компонент Card для изоляции тестов
jest.mock("../Card", () => ({
    __esModule: true,
    default: ({ data }: { data: IAdvertisement }) => (
        <div data-testid="card">
            <h3>{data.name}</h3>
            <p>Price: ${data.price}</p>
            <img src={data.imageUrl} alt={data.name} />
        </div>
    )
}));

describe("List Component", () => {
    const mockAds: IAdvertisement[] = [
        {
            id: "1",
            name: "Premium Bike",
            description: "Mountain bike in excellent condition",
            price: 450,
            createdAt: "2023-01-15",
            views: 1250,
            likes: 34,
            imageUrl: "/bike.jpg"
        },
        {
            id: "2",
            name: "Vintage Camera",
            description: "Film camera from 1980s",
            price: 120,
            createdAt: "2023-02-20",
            views: 890,
            likes: 21,
            imageUrl: "/camera.jpg"
        }
    ];

    const mockFilteredAds: IAdvertisement[] = [
        {
            id: "3",
            name: "Designer Watch",
            description: "Luxury wristwatch",
            price: 1200,
            createdAt: "2023-03-10",
            views: 1500,
            likes: 45,
            imageUrl: "/watch.jpg"
        }
    ];

    it("renders all advertisements when no filters are applied", () => {
        render(
            <List
                arrayOfAdvertisements={mockAds}
                arrayOfFiltered={mockAds}
            />
        );

        const cards = screen.getAllByTestId("card");
        expect(cards).toHaveLength(2);
        expect(screen.getByText("Premium Bike")).toBeInTheDocument();
        expect(screen.getByText("Vintage Camera")).toBeInTheDocument();
    });

    it("renders only filtered advertisements when filters are applied", () => {
        render(
            <List
                arrayOfAdvertisements={mockAds}
                arrayOfFiltered={mockFilteredAds}
            />
        );

        const cards = screen.getAllByTestId("card");
        expect(cards).toHaveLength(1);
        expect(screen.getByText("Designer Watch")).toBeInTheDocument();
        expect(screen.queryByText("Premium Bike")).not.toBeInTheDocument();
    });

    it("renders nothing when both arrays are empty", () => {
        render(
            <List
                arrayOfAdvertisements={[]}
                arrayOfFiltered={[]}
            />
        );

        expect(screen.queryByTestId("card")).not.toBeInTheDocument();
    });

    it("displays correct price and image in cards", () => {
        render(
            <List
                arrayOfAdvertisements={mockAds}
                arrayOfFiltered={mockAds}
            />
        );

        expect(screen.getByText("Price: $450")).toBeInTheDocument();
        expect(screen.getByText("Price: $120")).toBeInTheDocument();
        expect(screen.getByAltText("Premium Bike")).toHaveAttribute("src", "/bike.jpg");
    });
});