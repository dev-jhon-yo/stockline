import React from "@rbxts/react";

import { Frame, Group, TextLabel } from "../../primitive";
import type { AppLayoutProps } from "../types";
import { AnimatedBackground } from "./animated-background";
import { AppNavBar } from "./app-nav-bar";

export function AppLayout({
  activeTabId,
  identity,
  onBack,
  onTabChange,
  children,
}: AppLayoutProps): React.Element {
  return (
    <Group
      key="AppRoot"
      Native={{
        ClipsDescendants: false,
        Size: new UDim2(1, 0, 1, 0),
      }}
    >
      <AnimatedBackground
        color={identity.themeColor}
        icon={identity.iconPattern}
      />

      <Frame
        key="AppCanvas"
        Native={{
          AnchorPoint: new Vector2(0.5, 0.5),
          BackgroundColor3: Color3.fromRGB(31, 32, 46),
          Position: new UDim2(0.5, 0, 0.45, 0),
          Size: new UDim2(3, 0, 1.2, 0),
          ZIndex: 5,
        }}
      >
        <uicorner CornerRadius={new UDim(0, 20)} />
        <uipadding
          PaddingTop={new UDim(0, 100)}
          PaddingBottom={new UDim(0, 20)}
          PaddingLeft={new UDim(0, 25)}
          PaddingRight={new UDim(0, 25)}
        />
        {children}
      </Frame>

      <Group key="Overlay" Native={{ Size: new UDim2(1, 0, 1, 0), ZIndex: 10 }}>
        <TextLabel
          Font={Enum.Font.FredokaOne}
          Native={{
            Position: new UDim2(0, 20, 0, 40),
            Size: new UDim2(0.4, 0, 0, 30),
            TextXAlignment: Enum.TextXAlignment.Left,
          }}
          Text={identity.title.upper()}
          TextColor={Color3.fromRGB(255, 255, 255)}
          TextSize={24}
        />

        <AppNavBar
          tabs={identity.tabs}
          activeTabId={activeTabId}
          onTabChange={onTabChange}
          themeColor={identity.themeColor}
        />

        <textbutton
          key="BackButton"
          AnchorPoint={new Vector2(0.5, 1)}
          BackgroundColor3={Color3.fromRGB(255, 255, 255)}
          Event={{ Activated: onBack }}
          Position={new UDim2(0.5, 0, 1, 130)}
          Size={new UDim2(0, 160, 0, 50)}
          Text=""
        >
          <uicorner CornerRadius={new UDim(0, 25)} />
          <uistroke Color={identity.themeColor} Thickness={3} />
          <TextLabel
            Font={Enum.Font.FredokaOne}
            Text="RETURN"
            TextColor={identity.themeColor}
            TextSize={20}
          />
        </textbutton>
      </Group>
    </Group>
  );
}
