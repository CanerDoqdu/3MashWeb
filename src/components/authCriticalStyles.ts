const authCriticalStyles = `
.three-mash-auth-page,
.three-mash-register-page {
  display: grid;
  width: 100%;
  min-height: calc(100vh - 78px);
  overflow: hidden;
  background: var(--tm-theme-bg, #fafaf7);
}
.tma-auth-panel,
.tmrpg-auth-panel {
  display: grid;
  align-items: center;
  width: min(100%, 1180px);
  min-height: inherit;
  margin: 0 auto;
  padding: clamp(42px, 5.4vw, 76px) 24px clamp(62px, 7vw, 104px);
}
.tma-auth-form,
.tmrpg-auth-form {
  display: grid;
  grid-template-columns: minmax(280px, .68fr) minmax(360px, .86fr);
  column-gap: clamp(28px, 4vw, 54px);
  row-gap: 14px;
  align-items: stretch;
  width: 100%;
  min-height: 680px;
  padding: 20px;
  border: 1px solid var(--tm-theme-line, #e6e6e0);
  background: #fff;
}
.tma-auth-copy,
.tmrpg-auth-copy {
  position: relative;
  grid-column: 1;
  grid-row: 1 / span 24;
  display: grid;
  align-content: end;
  min-width: 0;
  min-height: 620px;
  overflow: hidden;
  padding: clamp(30px, 4vw, 48px);
  background: var(--tm-theme-dark, #0e0e0c);
}
.tma-auth-copy::before,
.tmrpg-auth-copy::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 0;
  background:
    linear-gradient(180deg, rgba(14, 14, 12, .08), rgba(14, 14, 12, .88)),
    var(--tma-auth-visual, var(--tmrpg-auth-visual, transparent));
  background-position: center;
  background-size: cover;
}
.tma-auth-copy::after,
.tmrpg-auth-copy::after {
  content: "3MASH";
  position: absolute;
  top: clamp(24px, 3vw, 40px);
  left: clamp(24px, 3vw, 40px);
  z-index: 1;
  color: rgba(250, 250, 247, .86);
  font-size: 18px;
  font-weight: 800;
}
.tma-auth-copy > *,
.tmrpg-auth-copy > * { position: relative; z-index: 1; }
.tma-auth-tabs,
.tma-auth-field,
.tma-auth-check,
.tma-auth-submit,
.tma-auth-status,
.tma-auth-register-callout,
.tmrpg-auth-tabs,
.tmrpg-auth-field,
.tmrpg-auth-check,
.tmrpg-auth-submit,
.tmrpg-auth-status,
.tmrpg-auth-login-callout { grid-column: 2; }
@media (max-width: 980px) {
  .tma-auth-form,
  .tmrpg-auth-form { grid-template-columns: 1fr; min-height: 0; padding: 0; border: 0; background: transparent; }
  .tma-auth-copy,
  .tmrpg-auth-copy,
  .tma-auth-tabs,
  .tma-auth-field,
  .tma-auth-check,
  .tma-auth-submit,
  .tmrpg-auth-tabs,
  .tmrpg-auth-field,
  .tmrpg-auth-check,
  .tmrpg-auth-submit { grid-column: auto; }
  .tma-auth-copy,
  .tmrpg-auth-copy { min-height: 320px; }
}
`;

export default authCriticalStyles;