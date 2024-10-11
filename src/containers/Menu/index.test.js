import { fireEvent, render, screen } from "@testing-library/react";
import Menu from "./index";

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
      document.body.innerHTML = '<div id="contact"></div>';
      
      render(<Menu />);

      fireEvent(
        await screen.findByText("Contact"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );

      window.location.hash = '#contact';
      
      expect(window.location.hash).toEqual("#contact");
    });
  });
});
