import { registrationIncludedItems, registrationKitExtras } from "./content";
import RegistrationBenefitIcon from "./registration-benefit-icon";
import "./registration-inclusions.css";

export default function RegistrationInclusions() {
  return (
    <section className="brasil-inclusions" id="sua-inscricao" aria-labelledby="brasil-inclusions-title">
      <div className="section-frame">
        <div className="brasil-inclusions-panel">
          <h2 id="brasil-inclusions-title">O QUE INCLUI SUA INSCRIÇÃO?</h2>
          <ul className="brasil-inclusions-grid">
            {registrationIncludedItems.map((item) => (
              <li key={item.icon}>
                <RegistrationBenefitIcon kind={item.icon} />
                <h3>{item.title}</h3>
                {item.detail ? <p>{item.detail}</p> : null}
              </li>
            ))}
          </ul>
          <p className="brasil-inclusions-extra">Também incluído: {registrationKitExtras.join(" ")}</p>
        </div>
      </div>
    </section>
  );
}
