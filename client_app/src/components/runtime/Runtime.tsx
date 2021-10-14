import { Slider } from "antd";
import React from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { setGreaterThan, setLessThan } from "./runtimeSlice";

interface IRuntimeProps {}

const Runtime: React.FC<IRuntimeProps> = ({}) => {
  const greaterThan = useAppSelector(
    (state) => state.runtime.runtime.greaterThan
  );
  const lessThan = useAppSelector((state) => state.runtime.runtime.lessThan);
  const dispatch = useAppDispatch();

  const handleSetRuntime = (runtime: [number, number]) => {
    dispatch(setGreaterThan(runtime[0]));
    dispatch(setLessThan(runtime[1]));

  };

  return (
    <div>
      <h1>Select Runtime length in minutes: </h1>
      <div id="runtime_length">
        <Slider
          range
          step={10}
          defaultValue={[greaterThan, lessThan ?? 240]}
          max={240}
          onAfterChange={handleSetRuntime}
        />
      </div>
    </div>
  );
};

export default Runtime;
