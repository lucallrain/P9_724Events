import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";
import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const [isManual, setIsManual] = useState(false);
  const intervalRef = useRef(null);

  // Trier les événements par date décroissante
  const byDateDesc = useMemo(() => 
    data?.focus?.sort((evtA, evtB) => new Date(evtA.date) < new Date(evtB.date) ? -1 : 1) || [], 
    [data]
  );

  // Fonction pour passer à la carte suivante
  const nextCard = useCallback(() => 
    setIndex((prevIndex) => (prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0)),
    [byDateDesc.length]
  );

  // Gestion de l'auto-slide
  useEffect(() => {
    if (!isManual && byDateDesc.length > 0) {
      intervalRef.current = setInterval(nextCard, 5000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current); // Nettoyer l'intervalle lors du démontage
      }
    };
  }, [isManual, nextCard, byDateDesc.length]);

  // Gérer le changement manuel via les boutons radio
  const handleRadioChange = useCallback((radioIdx) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current); // Arrêter l'auto-slide lors d'un changement manuel
    }
    setIndex(radioIdx);
    setIsManual(true);
  }, []);

  if (!byDateDesc.length) {
    return <p>Chargement des événements...</p>; // Message de chargement
  }

  return (
    <div className="SlideCardList">
      {byDateDesc.map((event) => (
        // Ajoutez une vérification pour vous assurer que l'événement a un ID
        <div
          key={event.id ? `slide-${event.id}` : `slide-${event.title}`} // Utilisez event.id, ou fallback à event.title
          className={`SlideCard ${index === byDateDesc.indexOf(event) ? "SlideCard--display" : "SlideCard--hide"}`}
        >
          <img src={event.cover} alt={event.title} />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((paginationEvent, paginationIdx) => (
                <label key={paginationEvent.id ? `pagination-${paginationEvent.id}` : `pagination-${paginationIdx}`} htmlFor={`radio-${paginationEvent.id}`} className="sr-only">
                  <input
                    id={`radio-${paginationEvent.id}`}
                    type="radio"
                    name="radio-button"
                    checked={index === byDateDesc.indexOf(paginationEvent)}
                    onChange={() => handleRadioChange(byDateDesc.indexOf(paginationEvent))}
                    aria-label={`Slide ${byDateDesc.indexOf(paginationEvent) + 1}`}
                  />
                </label>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
