const authCriticalStyles = `
.three-mash-auth-page,
.three-mash-register-page {
  display: grid;
  width: 100%;
  min-height: calc(100vh - 78px);
  overflow: hidden;
  background: var(--tm-theme-bg, #fafaf7);
  color: var(--tm-theme-text, #0e0e0c);
  font-family: var(--tm-theme-font-body, Inter, system-ui, sans-serif);
}
.three-mash-auth-page *,
.three-mash-register-page * { box-sizing: border-box; }
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
.tma-auth-copy > span,
.tmrpg-auth-copy > span {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  min-height: 26px;
  margin-bottom: 20px;
  padding: 0 11px;
  background: var(--tm-theme-accent, #c7f136);
  color: #3d4d0e;
  font-size: 12px;
  font-weight: 800;
}
.tma-auth-copy h1,
.tmrpg-auth-copy h1 {
  max-width: 470px;
  margin: 0;
  color: var(--tm-theme-accent, #c7f136);
  font-family: var(--tm-theme-font-heading, Space Grotesk, Inter, sans-serif);
  font-size: clamp(42px, 5vw, 72px);
  line-height: .96;
  font-weight: 800;
}
.tma-auth-copy p,
.tmrpg-auth-copy p {
  max-width: 420px;
  margin: 22px 0 0;
  color: #d8d8d0;
  font-size: 16px;
  line-height: 1.62;
}
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
.tma-auth-tabs,
.tmrpg-auth-tabs {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
  padding: 4px;
  background: var(--tm-theme-panel, #f1f1ec);
}
.tma-auth-tabs button,
.tma-auth-tabs a,
.tma-auth-tabs span,
.tmrpg-auth-tabs a,
.tmrpg-auth-tabs span {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  border: 0;
  background: transparent;
  color: var(--tm-theme-text, #0e0e0c);
  font-family: var(--tm-theme-font-heading, Space Grotesk, Inter, sans-serif);
  font-size: 15px;
  font-weight: 800;
  line-height: 1.2;
  text-decoration: none;
}
.tma-auth-tabs .is-active,
.tmrpg-auth-tabs .is-active { background: #fff; box-shadow: inset 0 0 0 1px var(--tm-theme-line, #e6e6e0); }
.tma-auth-field,
.tmrpg-auth-field { display: grid; gap: 8px; }
.tma-auth-field span,
.tmrpg-auth-field span { color: var(--tm-theme-sub, #55554e); font-size: 13px; font-weight: 700; line-height: 1.35; }
.tma-auth-field input,
.tmrpg-auth-field input {
  width: 100%;
  height: 52px;
  border: 1px solid var(--tm-theme-line, #e6e6e0);
  border-radius: 0;
  background: #fff;
  color: var(--tm-theme-text, #0e0e0c);
  padding: 0 14px;
  font: inherit;
}
.tma-auth-check,
.tmrpg-auth-check { display: grid; grid-template-columns: 20px minmax(0, 1fr); gap: 11px; align-items: start; color: var(--tm-theme-sub, #55554e); font-size: 13px; line-height: 1.5; }
.tma-auth-check input,
.tmrpg-auth-check input { width: 20px; height: 20px; margin: 1px 0 0; accent-color: var(--tm-theme-accent, #c7f136); }
.tma-auth-submit,
.tmrpg-auth-submit { display: inline-flex; align-items: center; justify-content: center; width: 100%; min-height: 54px; border: 0; border-radius: 0; background: var(--tm-theme-accent, #c7f136); color: var(--tm-theme-text, #0e0e0c); font: inherit; font-weight: 800; cursor: pointer; }
.tma-auth-underlink,
.tmrpg-auth-login-callout a,
.tma-auth-register-callout a { color: var(--tm-theme-text, #0e0e0c); font-size: 14px; font-weight: 800; text-decoration: underline; }
.tma-auth-register-callout,
.tmrpg-auth-login-callout { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; padding-top: 18px; border-top: 1px solid var(--tm-theme-line, #e6e6e0); color: var(--tm-theme-sub, #55554e); font-size: 14px; line-height: 1.45; }
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