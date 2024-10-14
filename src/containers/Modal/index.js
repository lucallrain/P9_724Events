import PropTypes from "prop-types";
import { useState } from "react";
import Icon from "../../components/Icon";
import "./style.scss";

const Modal = ({ opened, Content, children }) => {
  const [isOpened, setIsOpened] = useState(opened);

  return (
    <>
      {children({ isOpened, setIsOpened })}
      {isOpened && (
        <div className="modal full-screen"> {/* Prend tout l'écran */}
          <div className="content animated"> {/* Animation fluide */}
            <button
              type="button"
              className="close-modal"
              data-testid="close-modal"
              onClick={() => setIsOpened(false)} // Garde le bouton de fermeture
            >
              <Icon name="close" />
            </button>
            {Content}
          </div>
        </div>
      )}
    </>
  );
};

Modal.defaultProps = {
  opened: false,
};

Modal.propTypes = {
  opened: PropTypes.bool,
  Content: PropTypes.node.isRequired,
  children: PropTypes.func.isRequired,
};

export default Modal;
