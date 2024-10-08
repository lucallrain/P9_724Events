/* eslint-disable no-return-assign */
import Button from "../../components/Button";
import Logo from "../../components/Logo";

import "./style.scss";

const Menu = () => {
  const handleSmoothScroll = (e, target) => {
    e.preventDefault();
    document.querySelector(target).scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <nav>
      <Logo />
      <ul>
        <li>
          <a href="#nos-services" onClick={(e) => handleSmoothScroll(e, "#services")}>
            Nos services
          </a>
        </li>
        <li>
          <a href="#nos-realisations" onClick={(e) => handleSmoothScroll(e, "#events")}>
            Nos réalisations
          </a>
        </li>
        <li>
          <a href="#notre-equipe" onClick={(e) => handleSmoothScroll(e, "#team")}>
            Notre équipe
          </a>
        </li>
      </ul>
      <Button title="contact" onClick={(e) => handleSmoothScroll(e, "#contact")}>
        Contact
      </Button>
    </nav>
  );
};

export default Menu;
