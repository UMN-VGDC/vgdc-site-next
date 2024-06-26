type NewWindowIcon = React.HTMLAttributes<SVGElement>

export default function NewWindowIcon({ ...props }: NewWindowIcon) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 50 50" {...props}>
      <path stroke="#fff" fill="#fff" d="M36.06 8.24H11.94c-2.04 0-3.7 1.66-3.7 3.7v24.12c0 2.04 1.66 3.7 3.7 3.7h24.12c2.04 0 3.7-1.66 3.7-3.7V11.94c0-2.04-1.66-3.7-3.7-3.7zm1.7 27.82c0 .937-.763 1.7-1.7 1.7H11.94c-.937 0-1.7-.763-1.7-1.7V11.94c0-.937.763-1.7 1.7-1.7h24.12c.937 0 1.7.763 1.7 1.7v24.12zM33.694 13.58c.27.268.418.64.409 1.02l-.224 8.3a1.001 1.001 0 01-2-.055l.168-6.198-9.68 9.68a1 1 0 11-1.414-1.415l9.68-9.68-6.199.168c-1.31.007-1.37-1.939-.054-2l8.299-.223c.37-.005.747.135 1.015.403z"></path>
    </svg>
  )
}
