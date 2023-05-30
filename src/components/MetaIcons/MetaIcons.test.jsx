import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import MetaIcons from ".";

describe("MetaIcons", () => {
  test("should render error if metadata is missing", () => {
    render(<MetaIcons />);
    expect(screen.getByText("ERROR")).toBeInTheDocument();
  });

  describe("if fullList=true", () => {
    test("should render icons with labels", () => {
      render(
        <MetaIcons
          fullList={true}
          metaData={{
            wifi: true,
            pets: true,
            parking: true,
            breakfast: true,
          }}
        />
      );
      expect(screen.getByText("Parking available")).toBeInTheDocument();
      expect(screen.getByText("Offers breakfast")).toBeInTheDocument();
      expect(screen.getByText("Pets allowed")).toBeInTheDocument();
      expect(screen.getByText("Free WiFi")).toBeInTheDocument();
    });

    test("should only render icons&labels when the venue offers that feature", () => {
      render(
        <MetaIcons
          fullList={true}
          metaData={{
            wifi: true,
            pets: true,
            parking: false,
            breakfast: false,
          }}
        />
      );
      expect(screen.getByText("Pets allowed")).toBeInTheDocument();
      expect(screen.getByText("Free WiFi")).toBeInTheDocument();
      expect(screen.queryByText("Parking available")).not.toBeInTheDocument();
      expect(screen.queryByText("Offers breakfast")).not.toBeInTheDocument();
    });
  });

  test("should not render label if fullList=false", () => {
    render(
      <MetaIcons
        metaData={{
          wifi: true,
          pets: true,
          parking: true,
          breakfast: true,
        }}
      />
    );
    expect(screen.queryByText("Parking available")).not.toBeInTheDocument();
    expect(screen.queryByText("Offers breakfast")).not.toBeInTheDocument();
    expect(screen.queryByText("Pets allowed")).not.toBeInTheDocument();
    expect(screen.queryByText("Free WiFi")).not.toBeInTheDocument();
  });
});
