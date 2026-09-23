import type { SiteLanguage } from "../site-language";
import { componentText } from "./components-i18n";
import { getBrasilContent } from "./content-i18n";
import RegistrationBenefitIcon from "./registration-benefit-icon";
import "./registration-inclusions.css";

export default function RegistrationInclusions({ locale = "pt" }: { locale?: SiteLanguage }) {
  const { registrationIncludedItems, registrationKitExtras } = getBrasilContent(locale);
  const t = componentText(locale);
  return (
    <section className="brasil-inclusions" id="sua-inscricao" aria-labelledby="brasil-inclusions-title">
      <div className="section-frame">
        <div className="brasil-inclusions-panel">
          <h2 id="brasil-inclusions-title">{t("O QUE INCLUI SUA INSCRIÇÃO?")}</h2>
          <ul className="brasil-inclusions-grid">
            {registrationIncludedItems.map((item) => (
              <li key={item.icon}>
                <RegistrationBenefitIcon kind={item.icon} />
                <h3>{item.title}</h3>
                {item.detail ? <p>{item.detail}</p> : null}
              </li>
            ))}
          </ul>
          <p className="brasil-inclusions-extra">{t("Também incluído:")} {registrationKitExtras.join(" ")}</p>
        </div>
      </div>
    </section>
  );
}
