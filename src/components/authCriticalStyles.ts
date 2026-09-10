const authCriticalStyles = `
.three-mash-auth-page,
.three-mash-register-page {
  display: grid;
  width: 100%;
  container: tma-auth / inline-size;
  min-height: calc(100vh - 78px);
  overflow: hidden;
  background: var(--tm-theme-bg, #fafaf7);
  color: var(--tm-theme-text, #0e0e0c);
  font-family: var(--tm-theme-font-body, Inter, system-ui, sans-serif);
  place-items: center;
}
.three-mash-auth-page *,
.three-mash-register-page * { box-sizing: border-box; }
.tma-auth-panel,
.tmrpg-auth-panel {
  display: grid;
  align-items: center;
  justify-items: center;
  width: min(100%, 1180px);
  min-height: inherit;
  margin: 0 auto;
  padding: 24px;
}
.tma-auth-form,
.tmrpg-auth-form {
  display: grid;
  grid-template-columns: 420px minmax(360px, 1fr);
  column-gap: clamp(28px, 4vw, 54px);
  row-gap: 0;
  align-items: stretch;
  width: 100%;
  min-height: 680px !important;
  height: 680px !important;
  padding: 20px;
  border: 1px solid var(--tm-theme-line, #e6e6e0);
  background: #fff;
}
.tma-auth-form > .tma-auth-tabs,
.tma-auth-form > .tma-auth-field,
.tma-auth-form > .tma-auth-check,
.tma-auth-form > .tma-auth-submit,
.tma-auth-form > .tma-auth-password-links,
.tma-auth-form > .tma-auth-underlink,
.tma-auth-form > .tma-auth-register-callout,
.tma-auth-form > .tma-auth-status,
.tmrpg-auth-form > .tmrpg-auth-tabs,
.tmrpg-auth-form > .tmrpg-auth-field,
.tmrpg-auth-form > .tmrpg-auth-check,
.tmrpg-auth-form > .tmrpg-auth-submit,
.tmrpg-auth-form > .tmrpg-auth-login-callout,
.tmrpg-auth-form > .tmrpg-auth-status { margin-bottom: 14px; }
.tma-auth-form > :last-child,
.tmrpg-auth-form > :last-child { margin-bottom: 0; }
.tma-auth-secondary-title {
  grid-column: 2;
  margin: 12px 0 10px;
  color: var(--tm-theme-text, #0e0e0c);
  font-family: var(--tm-theme-font-heading, Space Grotesk, sans-serif);
  font-size: clamp(28px, 3vw, 42px);
  line-height: 1;
  text-align: center;
}
.tma-auth-register-callout button {
  color: var(--tm-theme-text, #0e0e0c);
  font: inherit;
  font-weight: 800;
  text-decoration: underline;
  text-underline-offset: 3px;
}
.tmrpg-auth-panel {
  padding: 24px;
}
.tmrpg-auth-form {
  min-height: 0;
  height: fit-content;
  align-content: start;
}
.tma-auth-form.is-register {
  min-height: 0;
  height: fit-content;
  align-content: start;
}
.tma-auth-form {
  position: relative;
}
.tmrpg-auth-copy {
  height: auto;
  min-height: 0;
}
.tma-auth-copy,
.tmrpg-auth-copy {
  position: relative;
  grid-column: 1;
  grid-row: 1 / span 24;
  width: 420px;
  min-width: 420px;
  max-width: 420px;
  display: grid;
  align-content: end;
  align-self: start;
  height: 638px;
  min-height: 638px;
  overflow: hidden;
  padding: clamp(30px, 4vw, 48px);
  background: var(--tm-theme-dark, #0e0e0c);
}
.tma-auth-copy {
  height: 638px !important;
  min-height: 638px !important;
}
.tmrpg-auth-copy {
  height: 638px;
  min-height: 638px;
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
  max-width: 100%;
  margin: 0;
  color: var(--tm-theme-accent, #c7f136);
  font-family: var(--tm-theme-font-heading, Space Grotesk, Inter, sans-serif);
  font-size: clamp(30px, 3.1vw, 54px);
  line-height: .96;
  font-weight: 800;
  overflow-wrap: anywhere;
  word-break: break-word;
}

@media (min-width: 1300px) {
  .tma-auth-copy h1,
  .tmrpg-auth-copy h1 {
    font-size: clamp(28px, 2.4vw, 40px);
    line-height: .92;
  }
}
.tma-auth-copy .is-secondary-copy { visibility: hidden; }
.tma-auth-copy p,
.tmrpg-auth-copy p {
  max-width: 100%;
  margin: 22px 0 0;
  color: #d8d8d0;
  font-size: 16px;
  line-height: 1.62;
  overflow-wrap: anywhere;
  word-break: break-word;
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
.tma-auth-cart-link { display: none !important; }
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
.tma-auth-tabs .tab-active,
.tmrpg-auth-tabs .tab-active { background: #fff !important; box-shadow: inset 0 0 0 1px var(--tm-theme-line, #e6e6e0) !important; }
.tma-auth-tabs .tab-inactive,
.tmrpg-auth-tabs .tab-inactive { background: var(--tm-theme-panel, #f1f1ec) !important; box-shadow: none !important; }
.is-register-page .tmrpg-auth-tabs > a { background: var(--tm-theme-panel, #f1f1ec) !important; box-shadow: none !important; }
.is-register-page .tmrpg-auth-tabs > span { background: #fff !important; box-shadow: inset 0 0 0 1px var(--tm-theme-line, #e6e6e0) !important; }
.is-register-page .tma-auth-tabs > button:first-child { background: var(--tm-theme-panel, #f1f1ec) !important; box-shadow: none !important; }
.is-register-page .tma-auth-tabs > button:last-child { background: #fff !important; box-shadow: inset 0 0 0 1px var(--tm-theme-line, #e6e6e0) !important; }
.tmrpg-auth-tabs > a { background: transparent !important; box-shadow: none !important; }
.tmrpg-auth-tabs > span.is-active { background: #fff !important; box-shadow: inset 0 0 0 1px var(--tm-theme-line, #e6e6e0) !important; }
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
.tma-auth-register-callout a { color: var(--tm-theme-text, #0e0e0c); font-size: 14px; font-weight: 800; text-decoration: none; }
.tma-auth-password-links { display: flex; flex-wrap: wrap; align-items: center; gap: 18px; }
.tma-auth-register-callout,
.tmrpg-auth-login-callout { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; padding-top: 18px; border-top: 1px solid var(--tm-theme-line, #e6e6e0); color: var(--tm-theme-sub, #55554e); font-size: 14px; line-height: 1.45; }
@media (max-width: 980px) {
  .three-mash-auth-page,
  .three-mash-register-page {
    min-height: auto;
    align-items: start;
  }
  .tma-auth-panel,
  .tmrpg-auth-panel {
    min-height: auto;
    align-items: start;
    padding: 18px 16px 28px;
  }
  .tma-auth-form,
  .tmrpg-auth-form {
    grid-template-columns: 1fr;
    row-gap: 0;
    min-height: 0 !important;
    height: fit-content !important;
    padding: 0;
    border: 0;
    background: transparent;
  }
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
  .tmrpg-auth-copy { height: auto; }
}
@media (max-width: 560px) {
  .three-mash-auth-page,
  .three-mash-register-page {
    min-height: auto;
    align-items: start;
  }
  .tma-auth-panel,
  .tmrpg-auth-panel {
    min-height: auto;
    align-items: start;
    padding: 12px 14px 20px;
  }
  .tmrpg-auth-panel { padding-bottom: 20px; }
  .tmrpg-auth-copy { display: none; }
}
@container tma-auth (max-width: 700px) {
  .three-mash-auth-page,
  .three-mash-register-page {
    min-height: auto;
    align-items: start;
  }
  .tma-auth-panel,
  .tmrpg-auth-panel {
    width: 100%;
    min-height: auto;
    align-items: start;
    padding: 14px 16px 24px;
  }
  .tma-auth-form {
    grid-template-columns: 1fr;
    min-height: 0 !important;
    height: fit-content !important;
    padding: 0;
    border: 0;
    background: transparent;
  }
  .tma-auth-copy { display: none; }
  .tma-auth-tabs,
  .tma-auth-field,
  .tma-auth-submit,
  .tma-auth-password-links,
  .tma-auth-underlink,
  .tma-auth-register-callout,
  .tma-auth-status,
  .tma-auth-secondary-title { grid-column: auto; }
  .tma-auth-secondary-title {
    margin: 8px 0 18px;
    font-size: clamp(28px, 8vw, 38px);
  }
  .tma-auth-password-links { gap: 12px !important; }
}
@media (max-width: 768px) {
  .three-mash-auth-page,
  .three-mash-register-page {
    min-height: auto;
    align-items: start;
  }
  .tma-auth-copy,
  .tmrpg-auth-copy { display: none; }
  .tma-auth-panel,
  .tmrpg-auth-panel {
    min-height: auto;
    align-items: start;
    padding: 14px 16px 24px;
  }
}
`;

export default authCriticalStyles;
