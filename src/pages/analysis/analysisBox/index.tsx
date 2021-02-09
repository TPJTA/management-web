import React, { useEffect, useRef } from "react";
import "./index.less";
import { EleResize } from "@/libs/resize";
interface props {
  style?: React.HTMLAttributes<HTMLDivElement>["style"];
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
  onSize?: () => void;
}
const analysisBox: React.FC<props> = function (props) {
  const dom = useRef(null);
  useEffect(() => {
    if (props.onSize) {
      EleResize.on(dom.current, props.onSize);
      window.addEventListener("resize", props.onSize);
    }
    return () => {
      if (props.onSize) {
        window.removeEventListener("resize", props.onSize);
      }
    };
  }, [props.onSize]);
  return (
    <div
      className={"analysis-box " + props.className}
      style={props.style}
      ref={dom}
    >
      <div className="analysis-box-top"></div>
      <div className="analysis-box-left"></div>
      {props.children}
    </div>
  );
};
export default analysisBox;
