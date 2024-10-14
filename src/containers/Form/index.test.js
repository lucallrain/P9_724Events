import { fireEvent, render, screen } from "@testing-library/react";
import Form from "./index";

describe("When Events is created", () => {
  it("a list of event fields is displayed", async () => {
    render(<Form />);
    // Vérification que les champs de formulaire sont bien affichés
    expect(await screen.findByText("Email")).toBeInTheDocument();
    expect(await screen.findByText("Nom")).toBeInTheDocument();
    expect(await screen.findByText("Prénom")).toBeInTheDocument();
    expect(await screen.findByText("Personel / Entreprise")).toBeInTheDocument();
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success action is called", async () => {
      const onSuccess = jest.fn(); // Simuler la fonction onSuccess

      // Rendre le formulaire avec la fonction onSuccess simulée
      render(<Form onSuccess={onSuccess} />);

      // Trouver le bouton de soumission
      const submitButton = screen.getByTestId("button-test-id");

      // Simuler un clic sur le bouton de soumission
      fireEvent.click(submitButton);

      // Attendre le texte de statut "En cours" (vous pourriez aussi utiliser `findByRole` si c'est plus précis)
      await screen.findByText("En cours");

      // Vérifier que le texte "Envoyer" réapparaît (si pertinent pour votre logique)
      await screen.findByText("Envoyer");

      // Vérifier que la fonction onSuccess a bien été appelée
      expect(onSuccess).toHaveBeenCalled();
    });
  });
});
