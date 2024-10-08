import { render, screen, fireEvent, within, waitFor } from "@testing-library/react";
import Home from "./index";

describe("Home Page Integration Tests", () => {
  
  // Test 1: Slider section is rendered
  it("displays the slider section", async () => {
    render(<Home />);
    const sliderSection = await screen.findByTestId("slider", {}, { timeout: 2000 });
    expect(sliderSection).toBeInTheDocument();
  });
  

  // Test 2: Services section is rendered with service cards
  it("displays the services section with service cards", async () => {
    render(<Home />);
    const serviceSection = await waitFor(() => screen.findByTestId("services"));
    
    const serviceCards = within(serviceSection).getAllByRole("heading", { level: 3 });
    expect(serviceCards.length).toBe(3); // Il y a 3 services
  });
  

  // Test 3: Contact form submission shows success message
  it("displays success message after contact form submission", async () => {
    render(<Home />);
    
    // Simulation de la soumission du formulaire
    fireEvent.click(await screen.findByText("Envoyer"));
    
    // Vérification que le message de succès est affiché
    const successMessage = await screen.findByText("Message envoyé !");
    expect(successMessage).toBeInTheDocument();
  });
});
