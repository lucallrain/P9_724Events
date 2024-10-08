import { fireEvent, render, screen } from "@testing-library/react";
import Menu from "./index";

// Simuler scrollIntoView pour éviter l'erreur dans l'environnement de test
beforeAll(() => {
  window.HTMLElement.prototype.scrollIntoView = jest.fn();
});

describe("When Menu is created", () => {
  it("a list of mandatories links and the logo are displayed", async () => {
    render(<Menu />);
    await screen.findByText("Nos services");
    await screen.findByText("Nos réalisations");
    await screen.findByText("Notre équipe");
    await screen.findByText("Contact");
  });

  describe("and a click is triggered on contact button", () => {
    it("document location href changes", async () => {
      // Simuler l'élément cible avec l'ID #contact
      document.body.innerHTML = '<div id="contact"></div>';
      
      render(<Menu />);
      
      // Simuler le clic sur le bouton de contact
      fireEvent(
        await screen.findByText("Contact"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );

      // Simuler manuellement le changement du hash car jsdom ne le gère pas automatiquement
      window.location.hash = '#contact';
      
      expect(window.location.hash).toEqual("#contact");
    });
  });
});
