import { fireEvent, render, screen } from "@testing-library/react";
import Form from "./index";

describe("When Events is created", () => {
  it("a list of event fields is displayed", async () => {
    render(<Form />);
    expect(await screen.findByText("Email")).toBeInTheDocument();
    expect(await screen.findByText("Nom")).toBeInTheDocument();
    expect(await screen.findByText("Prénom")).toBeInTheDocument();
    expect(await screen.findByText("Personel / Entreprise")).toBeInTheDocument();
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success action is called", async () => {
      const onSuccess = jest.fn(); 

      render(<Form onSuccess={onSuccess} />);

      const submitButton = screen.getByTestId("button-test-id");

      
      fireEvent.click(submitButton);

      await screen.findByText("En cours");

      await screen.findByText("Envoyer");

      expect(onSuccess).toHaveBeenCalled();
    });
  });
});
