const terracotta = "var(--br-terracotta)";
const paper = "var(--br-paper)";
const sand = "var(--br-sand)";

const illustrations = {
  shirt: (
    <>
      <path d="m35 17-16 8-9 20 16 7 5-10v39h34V42l5 10 16-7-9-20-16-8" fill={paper} />
      <path d="M35 17c0 9 26 9 26 0l-6-3c0 6-14 6-14 0l-6 3Z" fill={terracotta} />
      <path d="m12 40 16 7m40 0 16-7M31 75h34" stroke={terracotta} />
      <path d="M52 35h8v8h-8z" fill={terracotta} stroke="none" />
      <path d="M35 61c8-4 15-4 26 1m-26 8c11-6 19-7 26-5" stroke={terracotta} />
    </>
  ),
  socks: (
    <>
      <path d="M40 13h24v35l14 12c6 5 7 12 2 17s-11 5-17 1L45 64c-3-2-5-6-5-10V13Z" fill={sand} />
      <path d="M40 22h24M62 73l15-16" stroke={terracotta} />
      <path d="M22 23h25v35l14 12c6 5 6 12 1 17s-11 4-17 0L27 73c-3-2-5-6-5-10V23Z" fill={paper} />
      <path d="M22 23h25v11H22V23Z" fill={terracotta} />
      <path d="m43 83 15-16M22 60c8 0 12 5 12 12" stroke={terracotta} />
      <path d="M28 43h13m-13 6h13" stroke={terracotta} />
    </>
  ),
  medal: (
    <>
      <path d="M27 10h16l15 33-14 7-17-40Z" fill={sand} />
      <path d="M53 10h16L52 50l-14-7 15-33Z" fill={terracotta} />
      <path d="m59 10-14 33" stroke={paper} />
      <circle cx="48" cy="63" r="23" fill={paper} />
      <circle cx="48" cy="63" r="17" stroke={terracotta} />
      <path d="m48 52 3.5 7.2 8 1.1-5.8 5.6 1.4 7.9-7.1-3.7-7.1 3.7 1.4-7.9-5.8-5.6 8-1.1L48 52Z" fill={terracotta} stroke="none" />
    </>
  ),
  plate: (
    <>
      <rect x="10" y="20" width="76" height="59" rx="7" fill={paper} />
      <path d="M17 20h62a7 7 0 0 1 7 7v9H10v-9a7 7 0 0 1 7-7Z" fill={terracotta} />
      <circle cx="19" cy="28" r="2" fill={paper} stroke="none" />
      <circle cx="77" cy="28" r="2" fill={paper} stroke="none" />
      <g strokeWidth="2.7">
        <path d="m21 47 4-3v19m-4 0h8M35 48c0-6 10-6 10 0 0 4-10 8-10 15h10M51 45h10l-7 7c10-2 10 11 1 11-2 0-3-.5-4-1.5M72 44l-6 13h12m-3-13v19" />
      </g>
      <path d="M23 71h50" stroke={terracotta} />
    </>
  ),
  shield: (
    <>
      <path d="M48 11c10 8 21 11 31 12v25c0 17-13 29-31 39-18-10-31-22-31-39V23c10-1 21-4 31-12Z" fill={paper} />
      <path d="M48 21c7 5 15 8 23 9v18c0 13-10 23-23 31-13-8-23-18-23-31V30c8-1 16-4 23-9Z" fill={sand} stroke={terracotta} />
      <path d="m34 49 9 9 19-21" stroke={terracotta} strokeWidth="4" />
    </>
  ),
  hydration: (
    <>
      <path d="M26 19h24v11l6 7v43a6 6 0 0 1-6 6H26a6 6 0 0 1-6-6V37l6-7V19Z" fill={paper} />
      <rect x="25" y="12" width="26" height="10" rx="3" fill={terracotta} />
      <path d="M33 12V7h10v5M20 47h36v25H20V47Z" fill={sand} />
      <path d="M38 53c-3 4-6 7-6 10a6 6 0 0 0 12 0c0-3-3-6-6-10Z" fill={terracotta} stroke="none" />
      <path d="M72 31c-5 7-12 14-12 21a12 12 0 0 0 24 0c0-7-7-14-12-21Z" fill={sand} stroke={terracotta} />
      <path d="M66 52c0 4 2 6 6 6" stroke={terracotta} />
    </>
  ),
  medical: (
    <>
      <path d="M35 29v-9a5 5 0 0 1 5-5h16a5 5 0 0 1 5 5v9M41 29v-7h14v7" fill={sand} />
      <rect x="12" y="29" width="72" height="51" rx="9" fill={paper} />
      <path d="M23 29v51m50-51v51" stroke={terracotta} />
      <path d="M42 41h12v9h9v12h-9v9H42v-9h-9V50h9v-9Z" fill={terracotta} stroke="none" />
      <path d="M12 43h11m50 0h11" stroke={terracotta} />
    </>
  ),
  mechanic: (
    <>
      <path d="m23 14 6-4 11 13-3 7 39 40-7 7-39-40-7 3-13-11 4-6 11 8 7-7-9-10Z" fill={sand} />
      <path d="M77 11a19 19 0 0 0-26 23L15 70a8 8 0 0 0 11 11l36-36a19 19 0 0 0 23-26L74 30l-10-3-3-10L77 11Z" fill={paper} />
      <path d="m32 66 23-23" stroke={terracotta} strokeWidth="5" />
      <circle cx="22" cy="75" r="3" fill={terracotta} stroke="none" />
      <path d="m67 70 5 5" stroke={terracotta} />
    </>
  ),
  wash: (
    <>
      <path d="M13 13h16c5 0 9 4 9 9v2" />
      <path d="M29 28c0-5 18-5 18 0v5H29v-5Z" fill={terracotta} />
      <path d="m30 40-2 5m10-5v6m8-6 2 5M55 11c-3 4-6 8-6 11a6 6 0 0 0 12 0c0-3-3-7-6-11Z" stroke={terracotta} />
      <circle cx="23" cy="71" r="14" fill={paper} />
      <circle cx="73" cy="71" r="14" fill={paper} />
      <path d="m23 71 15-25 18 25H23m15-25h25L56 71m17 0L61 39h-8M33 42h10" />
      <path d="m23 71 15-25 18 25H23Z" stroke={terracotta} />
      <path d="M10 90h76" stroke={terracotta} />
    </>
  ),
};

export type RegistrationBenefitKind = keyof typeof illustrations;

export default function RegistrationBenefitIcon({ kind }: { kind: RegistrationBenefitKind }) {
  return (
    <svg
      viewBox="0 0 96 96"
      width="90"
      height="90"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {illustrations[kind]}
    </svg>
  );
}
