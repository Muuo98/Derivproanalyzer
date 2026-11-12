import { useMemo, useState } from 'react';

const generateDemoTicks = (count) => {
  const ticks = [];
  let previousResult = 'matches';
  let previousDigit = 4;
  let streak = 0;

  for (let i = 1; i <= count; i += 1) {
    const phase = i % 12;
    const cycleBias = [0.52, 0.48, 0.55, 0.45, 0.51, 0.49, 0.57, 0.43, 0.53, 0.47, 0.5, 0.5][phase];
    const streakBias = streak >= 3 ? 0.58 : streak <= -3 ? 0.42 : cycleBias;
    const resultRoll = ((i * 17 + previousDigit * 13) % 100) / 100;
    const result = resultRoll < streakBias ? 'matches' : 'differs';

    const digitRoll = (i * 19 + previousDigit * 7 + (result === 'matches' ? 3 : 1)) % 10;
    const digit = (digitRoll + (i % 5 === 0 ? 1 : 0)) % 10;

    ticks.push({
      id: i,
      digit,
      result,
      streak: streak + (result === previousResult ? 1 : -1)
    });

    previousResult = result;
    previousDigit = digit;
    streak = result === previousResult ? streak + 1 : 1;
  }

  return ticks;
};

const demoTicks = generateDemoTicks(140);

function getDigitMatrix(items) {
  return Array.from({ length: 10 }, (_, digit) => {
    const filtered = items.filter((item) => item.digit === digit);
    const counts = filtered.length;
    const matchRate = counts
      ? (filtered.filter((item) => item.result === 'matches').length / counts) * 100
      : 0;
    const differRate = counts
      ? (filtered.filter((item) => item.result === 'differs').length / counts) * 100
      : 0;

    return {
      digit,
      count: counts,
      matchRate,
      differRate,
      frequency: counts / items.length
    };
  });
}

function calculateStreakMetrics(items) {
  let current = 0;
  let longest = 0;
  let lastResult = null;

  items.forEach((item) => {
    if (lastResult === item.result) {
      current += 1;
    } else {
      current = 1;
    }
    longest = Math.max(longest, current);
    lastResult = item.result;
  });

  return {
    current,
    longest,
    last: items[items.length - 1]?.result ?? 'matches'
  };
}

function App() {
  const [windowSize, setWindowSize] = useState(30);
  const [biasTarget, setBiasTarget] = useState('matches');

  const view = useMemo(() => {
    const recent = demoTicks.slice(-windowSize);
    const matches = recent.filter((tick) => tick.result === 'matches').length;
    const differs = recent.filter((tick) => tick.result === 'differs').length;
    const matchRate = (matches / recent.length) * 100;
    const differRate = (differs / recent.length) * 100;

    const digitMatrix = getDigitMatrix(recent);
    const bestDigit = [...digitMatrix].sort((a, b) => b.count - a.count)[0];
    const hotDigits = [...digitMatrix]
      .filter((entry) => entry.count > 0)
      .sort((a, b) => b.matchRate - a.matchRate)
      .slice(0, 3);
    const coldDigits = [...digitMatrix]
      .filter((entry) => entry.count > 0)
      .sort((a, b) => a.matchRate - b.matchRate)
      .slice(0, 3);

    const streakStats = calculateStreakMetrics(recent);
    const lastResult = recent[recent.length - 1]?.result ?? 'matches';
    const biasStrength = (matchRate - differRate) / 2;
    const eventPressure = Math.min(95, Math.max(52, Math.round(Math.abs(biasStrength) * 3 + 58)));

    const forecastOutcome = (() => {
      if (biasTarget === 'matches') {
        return matchRate >= differRate ? 'matches' : 'differs';
      }
      return differRate >= matchRate ? 'differs' : 'matches';
    })();

    const volatility = Math.min(
      80,
      Math.max(
        20,
        Math.round(
          (recent.filter((tick, idx) => idx > 0 && tick.result !== recent[idx - 1].result).length /
            recent.length) *
            100
        )
      )
    );

    const expectedProbability =
      forecastOutcome === 'matches'
        ? Math.min(96, Math.max(50, Math.round((matchRate + 20) / 1.2)))
        : Math.min(96, Math.max(50, Math.round((differRate + 20) / 1.2)));

    return {
      recent,
      matchRate,
      differRate,
      matches,
      differs,
      digitMatrix,
      bestDigit,
      hotDigits,
      coldDigits,
      streakStats,
      lastResult,
      biasStrength,
      eventPressure,
      forecastOutcome,
      volatility,
      expectedProbability
    };
  }, [windowSize, biasTarget]);

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Advanced signal suite</p>
          <h1>Derivproanalyzer</h1>
        </div>
        <div className="status-pill">Live demo</div>
      </header>

      <section className="toolbar">
        <label>
          Market window
          <select value={windowSize} onChange={(e) => setWindowSize(Number(e.target.value))}>
            <option value={10}>10 ticks</option>
            <option value={20}>20 ticks</option>
            <option value={30}>30 ticks</option>
            <option value={40}>40 ticks</option>
            <option value={60}>60 ticks</option>
          </select>
        </label>

        <label>
          Bias target
          <select value={biasTarget} onChange={(e) => setBiasTarget(e.target.value)}>
            <option value="matches">Matches</option>
            <option value="differs">Differs</option>
          </select>
        </label>
      </section>

      <section className="stats-grid">
        <article className="stat-card accent-blue">
          <span>Match rate</span>
          <strong>{view.matchRate.toFixed(1)}%</strong>
          <small>{view.matches}/{view.recent.length} recent outcomes</small>
        </article>

        <article className="stat-card accent-amber">
          <span>Differ rate</span>
          <strong>{view.differRate.toFixed(1)}%</strong>
          <small>{view.differs}/{view.recent.length} recent outcomes</small>
        </article>

        <article className="stat-card accent-green">
          <span>Pressure</span>
          <strong>{view.eventPressure}%</strong>
          <small>Bias strength {view.biasStrength.toFixed(1)}</small>
        </article>

        <article className="stat-card accent-violet">
          <span>Forecast</span>
          <strong>{view.expectedProbability}%</strong>
          <small>{view.forecastOutcome}</small>
        </article>
      </section>

      <section className="panel-grid">
        <div className="panel">
          <div className="panel-header">
            <h2>Prediction engine</h2>
            <span className="chip">{view.forecastOutcome}</span>
          </div>

          <div className="prediction-box">
            <p className="label">Projected next swing</p>
            <h3>{view.forecastOutcome.toUpperCase()}</h3>
            <p>
              The current momentum favors <strong>{view.forecastOutcome}</strong> because{' '}
              {view.matchRate >= view.differRate ? 'match frequency is leading the cycle' : 'differ frequency is dominating the recent flow'}.
              The strongest recurring digit cluster is <strong>{view.bestDigit.digit}</strong> with{' '}
              <strong>{view.bestDigit.count}</strong> appearances in the selected range.
            </p>
          </div>

          <div className="mini-metrics">
            <div>
              <span>Last result</span>
              <strong>{view.lastResult}</strong>
            </div>
            <div>
              <span>Streak</span>
              <strong>{view.streakStats.current}</strong>
            </div>
            <div>
              <span>Volatility</span>
              <strong>{view.volatility}%</strong>
            </div>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <h2>Hot digits</h2>
          </div>

          <div className="pills-wrap">
            {view.hotDigits.map((entry) => (
              <div key={entry.digit} className="pill-box">
                <span>Digit {entry.digit}</span>
                <strong>{entry.matchRate.toFixed(0)}%</strong>
              </div>
            ))}
          </div>

          <div className="panel-subheader">
            <h3>Cold digits</h3>
          </div>

          <div className="pills-wrap secondary">
            {view.coldDigits.map((entry) => (
              <div key={entry.digit} className="pill-box cold">
                <span>Digit {entry.digit}</span>
                <strong>{entry.matchRate.toFixed(0)}%</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <h2>Digit matrix</h2>
        </div>

        <div className="bar-list">
          {view.digitMatrix.map((entry) => (
            <div key={entry.digit} className="bar-row">
              <div className="bar-label">{entry.digit}</div>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: `${entry.count / view.recent.length * 100}%` }} />
              </div>
              <small>{entry.count}</small>
            </div>
          ))}
        </div>
      </section>

      <section className="panel recent-panel">
        <div className="panel-header">
          <h2>Recent outcomes</h2>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Digit</th>
                <th>Result</th>
                <th>Streak</th>
              </tr>
            </thead>
            <tbody>
              {view.recent.slice().reverse().slice(0, 20).map((tick) => (
                <tr key={tick.id}>
                  <td>{tick.id}</td>
                  <td>{tick.digit}</td>
                  <td>
                    <span className={`result-badge ${tick.result}`}>{tick.result}</span>
                  </td>
                  <td>{tick.streak}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <footer className="footnote">
        This dashboard is a research-oriented demo and does not guarantee profits or trading outcomes.
      </footer>
    </div>
  );
}

export default App;
