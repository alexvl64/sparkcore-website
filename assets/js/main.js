// AOS — once: true ensures animations play exactly once and elements remain
// visible after their first reveal, even if scrolled out and back in. Without
// this, AOS may re-apply its initial hidden state (opacity:0, translateX) on
// re-entry into the viewport — the homepage's hero-content-left and other
// data-aos sections were disappearing on scroll-up after a FR→EN switch
// because the browser restored a non-zero scroll position and AOS scanned
// elements as out-of-viewport at init time.
AOS.init({
  duration: 400,
  once: true,
});

//   =========== CHART JS ========
// Window shown on the homepage (decision 2026-09-25): the fund's own record
// since launch plus two years of the same strategy on managed accounts,
// shaded and labelled so the two periods are never read as one.
const PERF_WINDOW_START = "2023-08-01";
const DT_FUND_LAUNCH = "2025-08-01";

const PERF_TEXT = {
  en: {
    preFund: "Managed accounts (pre-fund)",
    launch: "Fund launch",
    sinceLaunch: "Since fund launch (1 Aug 2025)",
    sinceWindow: "Since 1 Aug 2023, incl. managed accounts",
  },
  fr: {
    preFund: "Comptes gérés (avant le fonds)",
    launch: "Lancement du fonds",
    sinceLaunch: "Depuis le lancement du fonds (1er août 2025)",
    sinceWindow: "Depuis le 1er août 2023, comptes gérés inclus",
  },
};

function utcTs(isoDate) {
  const [y, m, d] = isoDate.split("-").map(Number);
  return Date.UTC(y, m - 1, d);
}

function fmtPct(x, locale) {
  const v = x * 100;
  const s = Math.abs(v).toLocaleString(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  return (v > 0 ? "+" : v < 0 ? "−" : "") + s + " %";
}

async function fetchJsonData() {
  // SparkCore-published JSON (R2, via the Pages Function). The full history
  // stays in the file; the window is applied here.
  try {
    const response = await fetch("/data/funds/dynamic-trends.json", {
      cache: "no-cache",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const d = await response.json();
    const pts = (d.chart_base100 || []).filter(
      (p) => p.date >= PERF_WINDOW_START && p.fund != null && p.benchmark != null
    );
    if (pts.length < 2) throw new Error("not enough points in window");
    const f0 = pts[0].fund;
    const b0 = pts[0].benchmark;
    const fund = pts.map((p) => ({ x: utcTs(p.date), y: +((p.fund / f0) * 100).toFixed(2) }));
    const btc = pts.map((p) => ({ x: utcTs(p.date), y: +((p.benchmark / b0) * 100).toFixed(2) }));

    renderSummary(pts);
    renderChart(fund, btc);
  } catch (error) {
    console.error("Error fetching data:", error);
    document.getElementById("data-container").textContent =
      currentLang === "fr" ? "Impossible de charger les données." : "Failed to load data.";
  }
}

function renderSummary(pts) {
  const t = PERF_TEXT[currentLang] || PERF_TEXT.en;
  const locale = currentLang === "fr" ? "fr-FR" : "en-US";
  const last = pts[pts.length - 1];
  const launch = pts.find((p) => p.date >= DT_FUND_LAUNCH);
  const first = pts[0];
  const row = (label, a) =>
    `<div class="perf-summary__row"><p class="perf-summary__label">${label}</p>` +
    `<p class="perf-summary__values"><span class="num">${fmtPct(last.fund / a.fund - 1, locale)}</span> Dynamic Trends` +
    `<span class="perf-summary__sep">·</span><span class="num">${fmtPct(last.benchmark / a.benchmark - 1, locale)}</span> Bitcoin</p></div>`;
  const asOf = new Date(utcTs(last.date)).toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
  document.getElementById("data-container").innerHTML =
    `<div class="perf-summary">` +
    (launch ? row(t.sinceLaunch, launch) : "") +
    row(t.sinceWindow, first) +
    `<p class="perf-summary__asof">${currentLang === "fr" ? "Au" : "As of"} ${asOf}</p></div>`;
}

function renderChart(fund, btc) {
  const t = PERF_TEXT[currentLang] || PERF_TEXT.en;
  const locale = currentLang === "en" ? "en-US" : "fr-FR";
  const monthYear = (ts) =>
    new Date(ts).toLocaleDateString(locale, { month: "short", year: "numeric", timeZone: "UTC" });
  const options = {
    series: [
      {
        name: "Dynamic Trends",
        data: fund,
      },
      {
        name: "Bitcoin",
        data: btc,
      },
    ],
    chart: {
      height: window.innerWidth <= 768 ? 300 : 538,
      type: "line",
      zoom: { enabled: false },
      toolbar: {
        show: false,
      },
      animations: {
        enabled: false,
      },
      background: "transparent",
    },
    stroke: {
      width: [2, 1.5],
      dashArray: [0, 6],
    },
    annotations: {
      xaxis: [
        {
          x: fund[0].x,
          x2: utcTs(DT_FUND_LAUNCH),
          fillColor: "#DBD1BC",
          opacity: 0.07,
          borderColor: "transparent",
          label: {
            text: t.preFund,
            orientation: "horizontal",
            position: "top",
            textAnchor: "start",
            offsetX: 8,
            offsetY: 6,
            borderWidth: 0,
            style: { background: "transparent", color: "#8FA3B8", fontSize: "12px", fontFamily: "Inter, sans-serif" },
          },
        },
        {
          x: utcTs(DT_FUND_LAUNCH),
          borderColor: "#DBD1BC",
          strokeDashArray: 3,
          label: {
            text: t.launch,
            orientation: "horizontal",
            position: "top",
            textAnchor: "start",
            offsetX: 8,
            offsetY: 6,
            borderWidth: 0,
            style: { background: "transparent", color: "#DBD1BC", fontSize: "12px", fontFamily: "Inter, sans-serif" },
          },
        },
      ],
    },
    xaxis: {
      type: "datetime",
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      labels: {
        hideOverlappingLabels: true,
        rotate: 0,
        formatter: (value, timestamp) => monthYear(timestamp != null ? timestamp : value),
        style: {
          colors: "#6B7B8D",
        },
      },
      tooltip: { enabled: false },
    },
    yaxis: {
      tickAmount: 4,
      labels: {
        formatter: (v) => Math.round(v).toLocaleString(locale),
        style: { colors: "#6B7B8D" },
      },
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
    },
    grid: {
      borderColor: "#1E2530",
      yaxis: {
        lines: { show: true },
      },
      xaxis: {
        lines: { show: false },
      },
      padding: {
        left: 12,
        right: 25,
      },
    },
    colors: ["#DBD1BC", "#545047"],
    legend: {
      position: "bottom",
      horizontalAlign: "left",
      labels: {
        colors: "#DBD1BC",
      },
      markers: {
        shape: "square",
        size: window.innerWidth <= 768 ? 10 : 14,
        strokeWidth: 0,
      },
    },
    tooltip: {
      theme: "dark",
      x: {
        formatter: (ts) =>
          new Date(ts).toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }),
      },
      y: { formatter: (v) => (v == null ? "" : v.toLocaleString(locale, { maximumFractionDigits: 1 })) },
    },
  };

  const chart = new ApexCharts(document.querySelector("#chart"), options);
  chart.render();
}

// Lazy-load: defer apexcharts download + chart render until #chart enters viewport.
// Reason: ApexCharts is ~530 KB uncompressed and accounted for ~351 ms of long-task
// time on mobile; users rarely scroll to the chart, and even when they do, a 300 px
// rootMargin gives enough lead time to fetch + render before it is on-screen.
function loadApexCharts() {
  if (typeof ApexCharts !== "undefined") return Promise.resolve();
  return new Promise(function (resolve, reject) {
    var s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/apexcharts";
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

(function () {
  var chartEl = document.querySelector("#chart");
  if (!chartEl) return;
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
          io.disconnect();
          loadApexCharts().then(fetchJsonData).catch(function (err) {
            console.error("Failed to load ApexCharts:", err);
          });
          return;
        }
      }
    }, { rootMargin: "300px" });
    io.observe(chartEl);
  } else {
    loadApexCharts().then(fetchJsonData);
  }
})();