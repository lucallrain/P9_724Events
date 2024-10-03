import { useEffect, useState, useRef } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";
import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const [isManual, setIsManual] = useState(false);
  const intervalRef = useRef(null);

  // Trier les événements par date décroissante
  const byDateDesc = data?.focus?.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  ) || [];

  const nextCard = () => {
    setIndex((prevIndex) =>
      prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0
    );
  };

  // Vérifier que les données sont présentes avant de démarrer l'intervalle
  useEffect(() => {
    if (!isManual && byDateDesc.length > 0) {
      intervalRef.current = setInterval(nextCard, 5000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isManual, index, byDateDesc.length]);

  const handleRadioChange = (radioIdx) => {
    clearInterval(intervalRef.current);
    setIndex(radioIdx); // Mise à jour de l'index lors du changement manuel
    setIsManual(true); // Désactiver l'auto-slide
  };

  return (
    <div className="SlideCardList">
      {byDateDesc.map((event, eventIdx) => (
        <div
          key={event.id || eventIdx}
          className={`SlideCard ${index === eventIdx ? "SlideCard--display" : "SlideCard--hide"}`}
        >
          <img src={event.cover} alt="forum" />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                  key={`radio-${event.id || radioIdx}`}
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx} // Gérer la sélection
                  onChange={() => handleRadioChange(radioIdx)}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
