import { useEffect, useRef } from "react";
import * as d3 from "d3";

function useD3(renderChartFn, dependencies) {
  const ref = useRef();

  useEffect(() => {
    renderChartFn(d3.select(ref.current));
  }, [...dependencies]);

  return ref;
}

export default useD3;
