type MobileHeadingBackground = React.HTMLAttributes<SVGElement>

export default function MobileHeadingBackground({ ...props }: MobileHeadingBackground) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 390 513" {...props}>
      <g style={{ mixBlendMode: "multiply" }}>
        <path
          fill="url(#paint0_radial_314_272)"
          d="M0 .5h390v353l-139.434 83.661c-34.202 20.521-76.93 20.521-111.132 0L0 353.5V.5z"
        ></path>
        <path
          fill="url(#paint1_radial_314_272)"
          d="M0 .5h390V413l-139.434 83.661c-34.202 20.521-76.93 20.521-111.132 0L0 413V.5z"
        ></path>
      </g>
      <defs>
        <radialGradient
          id="paint0_radial_314_272"
          cx="0"
          cy="0"
          r="1"
          gradientTransform="rotate(-101.67 286.83 95.319) scale(343.602 552.254)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.448" stopColor="#001A41" stopOpacity="0.34"></stop>
          <stop offset="1" stopColor="#00193E"></stop>
        </radialGradient>
        <radialGradient
          id="paint1_radial_314_272"
          cx="0"
          cy="0"
          r="1"
          gradientTransform="rotate(-101.67 286.83 95.319) scale(343.602 552.254)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.448" stopColor="#001A41" stopOpacity="0.34"></stop>
          <stop offset="1" stopColor="#00193E"></stop>
        </radialGradient>
      </defs>
    </svg>
  )
}
