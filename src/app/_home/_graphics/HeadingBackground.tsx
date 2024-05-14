type HeadingBackground = React.HTMLAttributes<SVGElement>

export default function HeadingBackground({ ...props }: HeadingBackground) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 1056 997" {...props}>
      <path
        fill="url(#paint0_radial_36_16)"
        d="M510.141 997H-124V0h687.528l164.624 723.825C759.984 863.744 653.641 997 510.141 997z"
      ></path>
      <path
        fill="url(#paint1_radial_36_16)"
        d="M678.473 997H510.141c143.5 0 249.844-133.256 218.011-273.175L563.528 0H731.86l164.624 723.825C928.316 863.744 821.972 997 678.473 997z"
      ></path>
      <path
        fill="url(#paint2_radial_36_16)"
        d="M832.311 997H678.473c143.499 0 249.843-133.256 218.011-273.175L731.86 0h153.839l164.621 723.825C1082.16 863.744 975.811 997 832.311 997z"
      ></path>
      <defs>
        <radialGradient
          id="paint0_radial_36_16"
          cx="0"
          cy="0"
          r="1"
          gradientTransform="rotate(75.415 23.053 195.554) scale(974.917 838.817)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0B1016" stopOpacity="0.79"></stop>
          <stop offset="1" stopColor="#001126"></stop>
        </radialGradient>
        <radialGradient
          id="paint1_radial_36_16"
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(146.99989 1016.00075 -399.47937 57.7986 603 161)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#003370" stopOpacity="0.68"></stop>
          <stop offset="1" stopColor="#0B1016"></stop>
        </radialGradient>
        <radialGradient
          id="paint2_radial_36_16"
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(141.99955 989.99805 -374.86452 53.76838 804 142.5)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0B1016" stopOpacity="0.35"></stop>
          <stop offset="1" stopColor="#00326D" stopOpacity="0.6"></stop>
        </radialGradient>
      </defs>
    </svg>
  )
}
