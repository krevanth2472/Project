
import React from "react";


/**
 * Profile header showing avatar (photo if available), basic info, and loyalty tier badge.
 */
export default function ProfileHeader({ profile }) {
  if (!profile) return null;
  const { name, email, phone, loyaltyTier, photoURL } = profile;

  return (
    <section className={styles.profileHeader} aria-label="Profile overview">
      {photoURL ? (
        <img
          src={photoURL}
          alt={`${name}'s profile picture`}
          className={styles.avatarImg}
        />
      ) : (
        <div className={styles.avatar} aria-hidden="true">
          {name?.[0]?.toUpperCase() || "U"}
        </div>
      )}

      <div className={styles.headerInfo}>
        <h2 className={styles.name}>{name}</h2>
        <p className={styles.meta}><strong>Email:</strong> {email}</p>
        <p className={styles.meta}><strong>Phone:</strong> {phone}</p>
      </div>

      <div className={styles.tierBadge} role="status" aria-label={`Loyalty tier ${loyaltyTier}`}>
        {loyaltyTier}
      </div>
    </section>
  );
}
