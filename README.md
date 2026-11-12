#root {
  min-height: 100vh;
}

:root {
  font-family: Inter, 'Segoe UI', sans-serif;
  color: #e5edf9;
  background: linear-gradient(180deg, #071421 0%, #0e1b2a 100%);
  line-height: 1.5;
  font-weight: 500;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
  background: #081621;
}

button,
select {
  font: inherit;
}

.app-shell {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 20px 36px;
}

.topbar,
.toolbar,
.panel-header,
.bar-row,
.table-wrap,
.panel {
  width: 100%;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 26px;
}

.eyebrow {
  margin: 0 0 4px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.7rem;
  color: #8fa9c8;
}

h1 {
  margin: 0;
  font-size: clamp(2rem, 4vw, 3rem);
}

.status-pill,
.chip {
  border-radius: 999px;
  padding: 8px 12px;
  font-size: 0.8rem;
  background: rgba(91, 170, 255, 0.12);
  color: #79d3ff;
  border: 1px solid rgba(121, 211, 255, 0.25);
}

.toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 22px;
  padding: 16px 18px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 18px;
  background: rgba(14, 27, 42, 0.9);
}

.toolbar label {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 0.9rem;
  color: #afc2d9;
}

.toolbar select {
  min-width: 180px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #eff6ff;
  border-radius: 10px;
  padding: 10px 12px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.stat-card {
  padding: 20px 18px;
  border-radius: 18px;
  background: rgba(15, 24, 35, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.06);
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.stat-card span,
.label {
  color: #a6bdd8;
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.stat-card strong {
  font-size: clamp(1.6rem, 3vw, 2.2rem);
}

.stat-card small {
  color: #c9d9ee;
}

.accent-blue { border-top: 3px solid #5bb7ff; }
.accent-amber { border-top: 3px solid #ffba5a; }
.accent-green { border-top: 3px solid #65dc96; }
.accent-violet { border-top: 3px solid #a77ef7; }

.panel-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}

.panel {
  background: rgba(12, 22, 31, 0.96);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 18px;
  padding: 18px 18px 16px;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

.panel-header h2 {
  margin: 0;
  font-size: 1.1rem;
}

.prediction-box {
  padding: 20px 18px;
  border-radius: 14px;
  background: linear-gradient(135deg, rgba(47, 103, 167, 0.18), rgba(128, 58, 183, 0.14));
  border: 1px solid rgba(128, 151, 255, 0.2);
}

.prediction-box h3 {
  margin: 8px 0 12px;
  font-size: clamp(1.7rem, 4vw, 2.4rem);
  text-transform: uppercase;
}

.prediction-box p {
  margin: 0;
  color: #d4e3f6;
}

.bar-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.bar-row {
  display: grid;
  grid-template-columns: 32px 1fr 42px;
  align-items: center;
  gap: 12px;
}

.bar-label {
  color: #c7d8eb;
  font-weight: 700;
}

.bar-track {
  position: relative;
  height: 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #5bb7ff 0%, #a77ef7 100%);
  border-radius: inherit;
}

.table-wrap {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 12px 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  text-align: left;
}

thead th {
  color: #9db7d3;
  font-size: 0.79rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.result-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  padding: 6px 10px;
  text-transform: capitalize;
  font-size: 0.78rem;
  font-weight: 700;
}

.result-badge.matches {
  background: rgba(101, 220, 150, 0.12);
  color: #7fe4ad;
}

.result-badge.differs {
  background: rgba(255, 186, 90, 0.12);
  color: #ffc96b;
}

.footnote {
  margin-top: 20px;
  color: #96a9c2;
  font-size: 0.8rem;
  text-align: center;
}

@media (max-width: 620px) {
  .app-shell {
    padding-top: 20px;
  }

  .topbar {
    align-items: flex-start;
    flex-direction: column;
    gap: 12px;
  }
}
