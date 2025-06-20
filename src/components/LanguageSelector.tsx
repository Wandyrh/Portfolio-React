import React from "react";

import i18n from "../i18n";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
];

export type LanguageSelectorProps = {
  value?: string;
  onChange?: (lang: string) => void;
};

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  value,
  onChange,
}) => {
  const [selected, setSelected] = React.useState<string>(
    value || localStorage.getItem("lang") || "en"
  );

  React.useEffect(() => {
    const prev = localStorage.getItem("lang") || "en";
    if (prev !== selected) {
      localStorage.setItem("lang", selected);
      i18n.changeLanguage(selected);
      if (onChange) onChange(selected);
    }
  }, [selected, onChange]);

  return (
    <div className="relative inline-block">
      <select
        className="px-3 py-2 rounded-xl border border-react bg-white text-gray-800 shadow focus:outline-none focus:ring-2 focus:ring-react hover:border-react transition"
        value={selected}
        onChange={e => setSelected(e.target.value)}
        aria-label="Select language"
      >
        {LANGUAGES.map(lang => (
          <option key={lang.code} value={lang.code}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;