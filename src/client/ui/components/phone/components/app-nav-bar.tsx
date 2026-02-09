import React from "@rbxts/react";

import { Frame, Group, TextLabel } from "../../primitive";
import { AppTab } from "../types";

interface AppNavBarProps {
  readonly tabs: readonly AppTab[];
  readonly activeTabId: string;
  readonly onTabChange: (id: string) => void;
  readonly themeColor: Color3;
}

export function AppNavBar({
  tabs,
  activeTabId,
  onTabChange,
  themeColor,
}: AppNavBarProps): React.Element {
  const activeTab = tabs.find((t) => t.id === activeTabId);

  return (
    <Group
      key="NavBarContainer"
      Native={{
        AnchorPoint: new Vector2(0.5, 0.5),
        Position: new UDim2(0.5, 0, 0, -50),
        Size: new UDim2(0.8, 0, 0, 40),
        ZIndex: 15,
      }}
    >
      {/* TOOLTIP */}
      {activeTab && (
        <Frame
          key="Tooltip"
          Native={{
            AnchorPoint: new Vector2(0.5, 1),
            Position: new UDim2(0.5, 0, 0, 15),
            BackgroundColor3: Color3.fromRGB(255, 140, 0),
            Size: new UDim2(0, 0, 0, 24),
            AutomaticSize: Enum.AutomaticSize.X,
          }}
        >
          <uicorner CornerRadius={new UDim(0, 12)} />
          <uipadding
            PaddingLeft={new UDim(0, 12)}
            PaddingRight={new UDim(0, 12)}
          />
          <TextLabel
            Text={activeTab.tooltip.upper()}
            TextColor={Color3.fromRGB(255, 255, 255)}
            TextSize={14}
            Font={Enum.Font.FredokaOne}
            Native={{ Size: new UDim2(1, 0, 1, 0) }}
          />
        </Frame>
      )}

      {/* TABS */}
      <Group
        key={"Icons"}
        Native={{
          AnchorPoint: new Vector2(0.5, 0),
          Position: new UDim2(0.5, 0, 0, 20),
          Size: new UDim2(1, 0, 0, 50),
        }}
      >
        <uilistlayout
          FillDirection={Enum.FillDirection.Horizontal}
          HorizontalAlignment={Enum.HorizontalAlignment.Center}
          VerticalAlignment={Enum.VerticalAlignment.Center}
          Padding={new UDim(0, 12)}
        />

        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            icon={tab.icon}
            isActive={tab.id === activeTabId}
            onClick={() => onTabChange(tab.id)}
            themeColor={themeColor}
          />
        ))}
      </Group>
    </Group>
  );
}

interface TabButtonProps {
  icon: string;
  isActive: boolean;
  onClick: () => void;
  themeColor: Color3;
}

function TabButton({
  icon,
  isActive,
  onClick,
  themeColor,
}: TabButtonProps): React.Element {
  return (
    <imagebutton
      key={"Tab"}
      BorderSizePixel={0}
      BackgroundColor3={
        isActive ? Color3.fromRGB(255, 140, 0) : Color3.fromRGB(255, 255, 255)
      }
      Size={isActive ? new UDim2(0, 48, 0, 48) : new UDim2(0, 40, 0, 40)}
      Event={{ Activated: onClick }}
    >
      <uicorner CornerRadius={new UDim(1, 0)} />
      <uistroke
        Color={Color3.fromRGB(255, 255, 255)}
        Thickness={isActive ? 4 : 0}
        ApplyStrokeMode={Enum.ApplyStrokeMode.Border}
      />

      <imagelabel
        BackgroundTransparency={1}
        Image={icon}
        ImageColor3={
          isActive
            ? Color3.fromRGB(255, 255, 255)
            : Color3.fromRGB(150, 150, 140)
        }
        AnchorPoint={new Vector2(0.5, 0.5)}
        Position={new UDim2(0.5, 0, 0.5, 0)}
        Size={new UDim2(0.7, 0, 0.7, 0)}
      />
    </imagebutton>
  );
}
