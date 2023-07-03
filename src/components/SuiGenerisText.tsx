import localFont from "next/font/local";

const suiGenerisFont = localFont({
  src: "../fonts/sui-generis-rg.woff2",
  display: "auto",
});

const SuiGenerisText = ({ children }: { children: string }) => {
  return <div className={suiGenerisFont.className}>{children}</div>;
};

export default SuiGenerisText;
