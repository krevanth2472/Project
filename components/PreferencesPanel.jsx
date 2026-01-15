
import React, { useState } from "react";
import styles from "../styles/Profile.module.css";

const CATEGORIES = ["Fashion", "Electronics", "Groceries", "Beauty", "Home"];
const COMMUNICATION_MODES = ["Email", "SMS", "WhatsApp"];

export default function PreferencesPanel({ preferences, onSave }) {
  const [favoriteCategories, setFavoriteCategories] = useState(preferences?.favoriteCategories || []);
  const [communicationMode, setCommunicationMode] = useState(preferences?.communicationMode || "Email");
  const [saving, setSaving] = useState(false);

  const toggleCategory = (cat) => {
    setFavoriteCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const save = async () => {
    setSaving(true);
    await onSave?.({ favoriteCategories, communicationMode });
    setSaving(false);
  };

  return (
    <section className={styles.cardPanel} aria-label="Preferences">
      <h3 className={styles.panelTitle}>Saved Preferences</h3>

      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Favorite categories</legend>
        <div className={styles.checkboxGroup}>
          {CATEGORIES.map((cat) => (
            <label key={cat} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={favoriteCategories.includes(cat)}
                onChange={() => toggleCategory(cat)}
              />
              <span>{cat}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Preferred communication mode</legend>
        <div className={styles.radioGroup}>
          {COMMUNICATION_MODES.map((mode) => (
            <label key={mode} className={styles.radioLabel}>
              <input
                type="radio"
                name="communicationMode"
                value={mode}
                checked={communicationMode === mode}
                onChange={(e) => setCommunicationMode(e.target.value)}
              />
              <span>{mode}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className={styles.panelActions}>
        <button className={styles.primaryBtn} onClick={save} disabled={saving}>
          {saving ? "Saving…" : "Update Preferences"}
        </button>
      </div>
    </section>
  );
}