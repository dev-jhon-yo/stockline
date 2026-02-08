import React, { useState } from "@rbxts/react";

import { Frame, TextLabel } from "../../primitive";
import { AppLayout } from "../components/app-layout";
import type { AppIdentity } from "../types";

const SUPPLY_IDENTITY: AppIdentity = {
  iconPattern: "rbxassetid://117926250151482",
  tabs: [
    {
      id: "materials",
      icon: "rbxassetid://16124021200",
      tooltip: "Diary Materials",
    },
    { id: "tools", icon: "rbxassetid://16124021200", tooltip: "Tools" },
  ],
  themeColor: Color3.fromRGB(77, 182, 172),
  title: "Supply Shop",
};

interface SupplyAppProps {
  readonly onBack: () => void;
}

export function SupplyApp({ onBack }: SupplyAppProps): React.Element {
  const [activeTab, setActiveTab] = useState("materials");

  return (
    <AppLayout
      activeTabId={activeTab}
      identity={SUPPLY_IDENTITY}
      onBack={onBack}
      onTabChange={setActiveTab}
    >
      <scrollingframe
        key="GridScroll"
        BackgroundTransparency={1}
        BorderSizePixel={0}
        CanvasSize={new UDim2(0, 0, 0, 600)}
        ScrollBarThickness={0}
        Size={new UDim2(1, 0, 1, 0)}
      >
        <uigridlayout
          key="ItemLayout"
          CellPadding={new UDim2(0, 15, 0, 15)}
          CellSize={new UDim2(0, 110, 0, 140)}
          HorizontalAlignment={Enum.HorizontalAlignment.Center}
          SortOrder={Enum.SortOrder.LayoutOrder}
        />

        {/* Items Mock */}
        {[1, 2, 3, 4, 5, 6].map((index) => {
          return (
            <Frame
              key={`Card_${index}`}
              Native={{ BackgroundColor3: Color3.fromRGB(255, 255, 255) }}
            >
              <uicorner CornerRadius={new UDim(0, 15)} />
              <uistroke Color={Color3.fromRGB(230, 230, 220)} Thickness={2} />

              <imagelabel
                BackgroundTransparency={1}
                Image="rbxassetid://16124021200"
                Position={new UDim2(0.2, 0, 0.1, 0)}
                Size={new UDim2(0.6, 0, 0.5, 0)}
              />

              <TextLabel
                Native={{
                  Position: new UDim2(0.5, 0, 0.7, 0),
                  Size: new UDim2(0.9, 0, 0, 20),
                }}
                Text={`Item ${index}`}
                TextColor={Color3.fromRGB(120, 120, 100)}
                TextSize={14}
              />

              <TextLabel
                Font={Enum.Font.FredokaOne}
                Native={{
                  Position: new UDim2(0.5, 0, 0.85, 0),
                  Size: new UDim2(0.9, 0, 0, 20),
                }}
                Text="💰 500"
                TextColor={Color3.fromRGB(77, 182, 172)}
                TextSize={16}
              />
            </Frame>
          );
        })}
      </scrollingframe>
    </AppLayout>
  );
}
