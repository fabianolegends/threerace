// Display the original Uruguay artwork through individual viewports.
// These bounds exclude the jersey and the artwork's Spanish captions.
const artwork = {
  shirt: [471, 185, 218, 242],
  socks: [822, 194, 190, 232],
  medal: [1139, 158, 141, 261],
  plate: [1404, 220, 246, 178],
  shield: [190, 534, 159, 204],
  hydration: [484, 514, 160, 221],
  medical: [792, 553, 194, 177],
  mechanic: [1093, 539, 196, 188],
  wash: [1355, 527, 334, 217],
} as const;

export type RegistrationBenefitKind = keyof typeof artwork;
const artworkHeight = Math.max(...Object.values(artwork).map((bounds) => bounds[3]));

export default function RegistrationBenefitIcon({ kind }: { kind: RegistrationBenefitKind }) {
  const [x, y, width, height] = artwork[kind];

  return (
    <span className="brasil-benefit-icon" aria-hidden="true">
      <svg
        viewBox={`${x} ${y} ${width} ${height}`}
        width={`${(width / artworkHeight) * 100}%`}
        height={`${(height / artworkHeight) * 100}%`}
        overflow="hidden"
        focusable="false"
      >
        <image href="/threerace-benefits-vetor-premium-wide.webp" width="1800" height="900" />
      </svg>
    </span>
  );
}
