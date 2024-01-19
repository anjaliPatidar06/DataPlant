const SearchIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="21"
      viewBox="0 0 22 21"
      fill="none"
    >
      <path
        d="M17.4112 18.212L11.923 12.9068C11.4874 13.2436 10.9865 13.5103 10.4203 13.7068C9.85404 13.9033 9.2515 14.0015 8.61266 14.0015C7.03008 14.0015 5.6907 13.4717 4.59451 12.412C3.49832 11.3524 2.95023 10.0576 2.95023 8.52782C2.95023 6.998 3.49832 5.70326 4.59451 4.64361C5.6907 3.58396 7.03008 3.05414 8.61266 3.05414C10.1952 3.05414 11.5346 3.58396 12.6308 4.64361C13.727 5.70326 14.2751 6.998 14.2751 8.52782C14.2751 9.14537 14.1735 9.72782 13.9702 10.2752C13.7669 10.8226 13.4911 11.3068 13.1426 11.7278L18.6308 17.0331L17.4112 18.212ZM8.61266 12.3173C9.70159 12.3173 10.6272 11.9489 11.3894 11.212C12.1517 10.4752 12.5328 9.58046 12.5328 8.52782C12.5328 7.47519 12.1517 6.58045 11.3894 5.84361C10.6272 5.10677 9.70159 4.73835 8.61266 4.73835C7.52373 4.73835 6.59814 5.10677 5.83589 5.84361C5.07364 6.58045 4.69251 7.47519 4.69251 8.52782C4.69251 9.58046 5.07364 10.4752 5.83589 11.212C6.59814 11.9489 7.52373 12.3173 8.61266 12.3173Z"
        fill="#391E5A"
      />
    </svg>
  );
};
const AddIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M15.1667 8C15.1667 11.958 11.958 15.1667 8 15.1667C4.04196 15.1667 0.833333 11.958 0.833333 8C0.833333 4.04196 4.04196 0.833333 8 0.833333C11.958 0.833333 15.1667 4.04196 15.1667 8Z"
        stroke="white"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
const EditIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M0 12.8538V15.5556C0 15.8045 0.195528 16 0.444383 16H3.14623C3.26177 16 3.37731 15.9556 3.4573 15.8667L13.1626 6.17025L9.82975 2.83738L0.133315 12.5338C0.0444384 12.6227 0 12.7293 0 12.8538ZM15.74 3.59283C16.0867 3.24622 16.0867 2.68629 15.74 2.33968L13.6603 0.259964C13.3137 -0.0866546 12.7538 -0.0866546 12.4072 0.259964L10.7807 1.8864L14.1136 5.21928L15.74 3.59283Z"
        fill="black"
      />
    </svg>
  );
};
const DelIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="16"
      viewBox="0 0 14 16"
      fill="none"
    >
      <path
        d="M2.625 16C2.14375 16 1.73177 15.8259 1.38906 15.4778C1.04635 15.1296 0.875 14.7111 0.875 14.2222V2.66667H0V0.888889H4.375V0H9.625V0.888889H14V2.66667H13.125V14.2222C13.125 14.7111 12.9536 15.1296 12.6109 15.4778C12.2682 15.8259 11.8562 16 11.375 16H2.625ZM11.375 2.66667H2.625V14.2222H11.375V2.66667ZM4.375 12.4444H6.125V4.44444H4.375V12.4444ZM7.875 12.4444H9.625V4.44444H7.875V12.4444Z"
        fill="#3C1E5A"
      />
    </svg>
  );
};
const Elipse = ({ text = "", fill = "white" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle cx="12" cy="12" r="12" fill={fill} />
      <circle cx="12" cy="12" r="11.5" stroke="#3C1E5A" strokeOpacity="0.1" />
      <text
        x="52%"
        y="55%"
        alignmentBaseline="middle"
        textAnchor="middle"
        // fill="#3C1E5A"
        fill="#000"
        style={{
          fontFamily: "Nunito Sans",
          fontSize: "14px",
          fontStyle: "normal",
          fontWeight: "600",
          lineHeight: "normal",
        }}
      >
        {text}
      </text>
    </svg>
  );
};
export { SearchIcon, AddIcon, EditIcon, DelIcon, Elipse };