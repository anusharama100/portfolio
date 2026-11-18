export const dataProjects = {
  marketpulse: {
    name: 'MarketPulse', category: 'Data engineering · Historical market replay',
    headline: 'Make a price chart explain the pipeline behind it.',
    description: 'An independent replay lab connecting historical market bars, streaming operations, and an inspectable dashboard. I built the data path and interface around one question: what changes when messages repeat, arrive late, or fail during processing?',
    image: '/data-projects/marketpulse.jpg', imageAlt: 'MarketPulse historical market dashboard', tone: 'blue',
    meta: [['Role', 'Independent engineering project'], ['Stack', 'Python, Kafka, Spark, PostgreSQL'], ['Interface', 'Next.js, TypeScript, FastAPI'], ['Status', 'Recorded local execution']],
    summary: [['Problem', 'A convincing chart can conceal duplicate delivery, late events, or a failed retry.'], ['Built', 'Historical replay, event-time windows, audit records, and a dashboard.'], ['Evidence', 'Source code and recorded streaming experiments; no hosted application is claimed.']],
  },
  atlasiq: {
    name: 'AtlasIQ', category: 'Analytics engineering · Urban mobility',
    headline: 'Trace an analytical chart back to its source.',
    description: 'A batch pipeline and dashboard for NYC Yellow taxi records. I connected ingestion, data quality, warehouse transformations, and interface design so a reviewer can inspect both the analysis and the records behind it.',
    image: '/data-projects/atlasiq.jpg', imageAlt: 'AtlasIQ NYC taxi analytics dashboard', tone: 'purple',
    meta: [['Role', 'Independent engineering project'], ['Stack', 'Python, PostgreSQL, dbt, Airflow'], ['Interface', 'FastAPI, TypeScript'], ['Status', 'Recorded local execution']],
    summary: [['Problem', 'Large, imperfect source files need reproducible sampling and trustworthy publication.'], ['Built', 'Validation, rejected-row review, warehouse models, and an analytical interface.'], ['Evidence', 'Recorded multi-month backfill, replay checks, and public source code.']],
  },
  signalflow: {
    name: 'SignalFlow', category: 'Data engineering · Grid carbon intelligence',
    headline: 'Keep forecasts, observations, and estimates distinct.',
    description: 'A pipeline and dashboard for Great Britain’s grid carbon intensity and generation mix. I built ingestion, revision handling, analytical queries, and an interface that makes data freshness and uncertainty visible.',
    image: '/data-projects/signalflow.jpg', imageAlt: 'SignalFlow grid carbon intensity dashboard', tone: 'green',
    meta: [['Role', 'Independent engineering project'], ['Stack', 'Python, SQL, FastAPI, Kafka, dbt'], ['Source', 'NESO Carbon Intensity API'], ['Status', 'Recorded local execution']],
    summary: [['Problem', 'Delayed actuals and revised forecasts can produce misleading comparisons.'], ['Built', 'Revision-aware storage, freshness checks, and historical workload comparisons.'], ['Evidence', 'Source code, recorded ingestion, exact replay, and quality checks.']],
  },
  'patient-journey': {
    name: 'Patient Journey Insights', category: 'Data engineering · Synthetic healthcare analytics',
    headline: 'Connect the pipeline to the questions a dashboard answers.',
    description: 'A healthcare analytics project connecting synthetic claims, patients, providers, and prescriptions. The work follows extraction, cleaning, and warehouse loading through to a Streamlit dashboard.',
    image: '/data-projects/patient-journey.svg', imageAlt: 'Pipeline schematic from synthetic records through transformation to analytical views', tone: 'blue',
    meta: [['Role', 'Independent data project'], ['Stack', 'Python, Parquet, PostgreSQL, SQL'], ['Interface', 'Streamlit'], ['Data', 'Synthetic demonstration records']],
    summary: [['Question', 'How do source records become usable cost and readmission views?'], ['Built', 'Extraction, transformation, SQL, orchestration definitions, and a dashboard.'], ['Scope', 'Synthetic data; the file-based dashboard and warehouse path have different readiness levels.']],
  },
  'diabetes-readmission': {
    name: 'Diabetes Readmission Explorer', category: 'Data analysis · Applied machine learning',
    headline: 'Make model comparison easier to inspect.',
    description: 'An educational analysis of historical hospital encounters involving diabetes. The application brings descriptive charts, a patient-grouped validation split, and a comparison of logistic regression and XGBoost into one interface.',
    image: '/data-projects/diabetes-readmission.svg', imageAlt: 'Analysis schematic showing encounter exploration, patient-grouped splitting, and model comparison', tone: 'rose',
    meta: [['Role', 'Independent analysis project'], ['Stack', 'Python, pandas, scikit-learn, XGBoost'], ['Interface', 'Flask, Express, JavaScript'], ['Scope', 'Educational model exploration']],
    summary: [['Question', 'What can encounter data reveal about readmission patterns and model behavior?'], ['Approach', 'Explore subgroups and compare two models using a split grouped by patient.'], ['Scope', 'Historical exploratory analysis; clinical calibration and external validation remain open.']],
  },
} as const

export type DataProjectSlug = keyof typeof dataProjects
export const dataProjectSlugs = Object.keys(dataProjects) as DataProjectSlug[]

export const dataProjectStories: Record<DataProjectSlug, {
  question: string; source: string; pipeline: string[];
  decisions: { title: string; body: string }[];
  result: string; next: string; evidence?: { label: string; href: string }[];
}> = {
  marketpulse: {
    question: 'Can a reviewer follow the same market event through a normal replay, a duplicate, and a recovery?',
    source: 'Official Binance Vision one-minute spot bars for BTCUSDT, ETHUSDT, and SOLUSDT on January 6, 2025. This is historical replay, with source dates and units visible in the interface.',
    pipeline: ['Verified source archives', 'Versioned Python events', 'Kafka + Spark', 'PostgreSQL facts + audit', 'FastAPI + Next.js'],
    decisions: [
      { title: 'Separate delivery from market identity.', body: 'Every Kafka delivery receives an audit decision. Accepted market facts use a separate identity, so repeated messages can increase delivery counts without inflating market volume.' },
      { title: 'Keep late facts visible.', body: 'A valid late bar can remain in the fact table even when the watermark excludes it from a closed window. Separate audit and window views make that difference inspectable.' },
      { title: 'Name the recovery boundary.', body: 'A transactional batch ledger suppresses repeated warehouse writes after a callback retry. The outbox can still publish again; the system is described as at-least-once rather than end-to-end exactly-once.' },
    ],
    result: 'The checked-in verification record covers a 4,320-bar replay and recorded duplicate, late, and restart experiments. Those runs support the local delivery behavior; they do not establish production capacity or trading performance.',
    next: 'Extend recovery testing beyond the demonstrated callback boundary and test realistic state sizes before making scale or availability claims.',
    evidence: [{ label: 'Streaming verification', href: 'https://github.com/anusharama100/marketpulse/blob/main/docs/verification.md' }, { label: 'Architecture', href: 'https://github.com/anusharama100/marketpulse/blob/main/docs/architecture.md' }],
  },
  atlasiq: {
    question: 'Can someone inspect a demand chart and determine which source records were accepted, rejected, and published?',
    source: 'Official NYC TLC Yellow taxi records, a zone lookup, and NOAA daily weather. The recorded runs use deterministic, bounded monthly samples; their counts are not expanded to city-wide totals.',
    pipeline: ['TLC + NOAA sources', 'Checksums + validation', 'PostgreSQL partitions', 'dbt quality gate', 'Typed API + dashboard'],
    decisions: [
      { title: 'Make rejection part of the product.', body: 'Invalid rows are quarantined with reasons instead of silently disappearing. Data quality and load history are available alongside demand and zone comparisons.' },
      { title: 'Replace revised partitions atomically.', body: 'Monthly partition replacement and payload fingerprints avoid accumulating duplicate records on replay. A failed replacement rolls back rather than leaving a partial month.' },
      { title: 'Publish only checked transformations.', body: 'The analytical API waits for warehouse transformations and quality checks. This keeps newly loaded raw data from appearing as if it were ready for analysis.' },
    ],
    result: 'The recorded three-month backfill selected 300,000 records: 284,899 accepted trips and 15,101 rejections. Replaying February preserved the counts and trip fingerprints. This demonstrates bounded local replay, not full-month production throughput.',
    next: 'Test backup restoration and larger loads, and explore a versioned serving swap to improve availability during warehouse publication.',
    evidence: [{ label: 'Backfill evidence', href: 'https://github.com/anusharama100/atlasiq/blob/main/docs/evidence/multi-month-backfill.json' }, { label: 'Verification notes', href: 'https://github.com/anusharama100/atlasiq/blob/main/docs/VERIFICATION.md' }],
  },
  signalflow: {
    question: 'How can a dashboard compare historical carbon intensity without hiding missing actuals or source revisions?',
    source: 'Great Britain’s NESO Carbon Intensity API, covering half-hour intensity and generation intervals. Source data is attributed under CC BY 4.0.',
    pipeline: ['NESO source intervals', 'Validation + raw events', 'Revision-aware SQL', 'Analytical queries', 'FastAPI dashboard'],
    decisions: [
      { title: 'Preserve what the source changed.', body: 'Exact repeats add no new event, while changed payloads remain auditable. A delayed forecast cannot overwrite a known actual, and generation revisions replace fuel records together.' },
      { title: 'Keep missing values meaningful.', body: 'Unknown actuals stay null and are excluded from forecast-error calculations. The workload comparison rejects incomplete windows rather than quietly filling gaps.' },
      { title: 'Start with a complete, small data path.', body: 'SQLite and FastAPI provide a working vertical slice before optional PostgreSQL, Kafka, dbt, and Airflow services. Both ingestion paths share validation and materialization logic.' },
    ],
    result: 'The recorded seven-day backfill contains 672 source events and 336 intensity intervals. Exact replay added no events. Historical workload comparisons demonstrate timing sensitivity, not measured operational savings.',
    next: 'Broaden failure-injection and infrastructure recovery checks before adding a hosted service or making availability claims.',
    evidence: [{ label: 'Verification record', href: 'https://github.com/anusharama100/signalflow/blob/main/docs/verification.md' }, { label: 'Architecture', href: 'https://github.com/anusharama100/signalflow/blob/main/docs/architecture.md' }],
  },
  'patient-journey': {
    question: 'What needs to happen between raw synthetic records and a dashboard that can explain costs and readmissions?',
    source: 'The default extraction path generates demonstration records. These are synthetic examples, not a hospital EHR connection or evidence of clinical outcomes.',
    pipeline: ['Synthetic records', 'Bronze Parquet', 'Cleaned silver layer', 'PostgreSQL + SQL', 'Streamlit analysis'],
    decisions: [
      { title: 'Keep intermediate layers inspectable.', body: 'Bronze and silver Parquet outputs separate extraction from cleaning, making it easier to inspect derived fields before warehouse loading.' },
      { title: 'Give the dashboard a file-based path.', body: 'The Streamlit interface can read checked-in silver-layer files when PostgreSQL is unavailable. That makes the visual analysis reviewable independently of the full stack.' },
      { title: 'Separate interface readiness from pipeline readiness.', body: 'A working file-based dashboard is not proof of a completed warehouse load. The loader’s schema selection still needs integration work, so the case study keeps those claims separate.' },
    ],
    result: 'The project includes extraction and transformation modules, analytical SQL, dashboard views, and an Airflow definition. A fresh full-stack execution has not been established, so no operational improvement metric is presented.',
    next: 'Resolve the warehouse schema mismatch, verify a clean install, and run the pipeline end to end. Source code remains private; this page summarizes the project’s scope.',
  },
  'diabetes-readmission': {
    question: 'How can a model comparison show what was evaluated without presenting exploratory scores as clinical readiness?',
    source: 'Historical hospital encounters involving diabetes, with readmission within 30 days as the target. Encounters and unique patients are different units and should not share one count label.',
    pipeline: ['Encounter exploration', 'Feature preparation', 'Patient-grouped split', 'Logistic regression + XGBoost', 'Validation + charts'],
    decisions: [
      { title: 'Split by patient, not by encounter.', body: 'GroupShuffleSplit separates training and validation by patient identifier. This reduces leakage from encounters belonging to the same person appearing on both sides of the split.' },
      { title: 'Compare discrimination and precision.', body: 'The application exposes ROC-AUC and average precision for logistic regression and XGBoost. A modest difference between models should not be presented as a large product outcome.' },
      { title: 'Separate description from causation.', body: 'Age, medication, admission, and length-of-stay charts describe the dataset. They do not establish why a patient returns or validate the application’s probability thresholds.' },
    ],
    result: 'The implementation brings subgroup exploration, model comparison, and a prediction form into one workflow. Earlier reported scores have not been reproduced for this portfolio update, so they are not used as headline metrics.',
    next: 'Reproduce the evaluation, check calibration and subgroup performance, and correct encounter-versus-patient labels before extending the analysis. This is educational work; the source repository remains private.',
  },
}
