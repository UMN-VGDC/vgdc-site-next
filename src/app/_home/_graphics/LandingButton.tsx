type LandingButton = React.HTMLAttributes<SVGElement>

export default function LandingButton({ ...props }: LandingButton) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 133 133" {...props}>
      <circle cx="66.5" cy="66.5" r="59" stroke="url(#paint0_linear_314_324)" strokeWidth="15"></circle>
      <g clipPath="url(#clip0_314_324)" opacity="0.8">
        <path
          fill="#fff"
          d="M95.757 68.862l-44.236 33.803c-1.623 1.24-3.963.082-3.963-1.959V87.833a6.929 6.929 0 012.723-5.508L67.9 68.862a2.466 2.466 0 000-3.919L50.28 51.48a6.928 6.928 0 01-2.723-5.508v-12.87c0-2.044 2.34-3.2 3.963-1.96l44.236 33.801a2.466 2.466 0 010 3.92z"
        ></path>
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_314_324"
          x1="66.903"
          x2="66.903"
          y1="0"
          y2="133"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.344" stopColor="#0B1016"></stop>
          <stop offset="1" stopColor="#252B35"></stop>
        </linearGradient>
        <clipPath id="clip0_314_324">
          <path fill="#fff" d="M0 0H49.17V72.546H0z" transform="translate(47.558 30.63)"></path>
        </clipPath>
      </defs>
    </svg>
  )
}
