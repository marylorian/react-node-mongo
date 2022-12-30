import React, {
  useCallback,
  useState,
  ChangeEvent,
  ChangeEventHandler,
} from "react";
import { Radio, Wrapper } from "./Tabs.styled";

export interface Tab {
  label: string;
  id?: string;
}

interface TabsProps {
  items: Tab[];
  initialActiveTabId?: string;
  htmlName?: string;
  onChange?: (tab: Tab) => void;
}

export const Tabs = ({
  items = [],
  htmlName,
  initialActiveTabId,
  onChange,
}: TabsProps) => {
  const [activeTabId, setActiveTabId] = useState<string>(
    initialActiveTabId || ""
  );

  const getClickHandler = useCallback(
    (activeTab: Tab): ChangeEventHandler =>
      (e?: ChangeEvent) => {
        setActiveTabId(e?.target?.id || "");
        onChange?.(activeTab);
      },
    []
  );

  return (
    <Wrapper>
      {items.map((item) => {
        const id =
          item.id ||
          `${htmlName}__${item.label.toLowerCase().replaceAll(" ", "-")}`;

        return (
          <React.Fragment key={item.id}>
            <Radio
              name={htmlName}
              id={id}
              checked={id === activeTabId}
              onChange={getClickHandler(item)}
            />
            <label htmlFor={id}>{item.label}</label>
          </React.Fragment>
        );
      })}
    </Wrapper>
  );
};
