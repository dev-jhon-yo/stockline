// cspell:disable
import React, { useState } from "@rbxts/react";
import { Frame, TextLabel, Group } from "../../primitive";
import { AppLayout } from "../components/app-layout";
import type { AppIdentity } from "../types";

interface ShopItem {
  id: number;
  name: string;
  icon: string;
  requirements: {
    label: string;
    amount: string;
    color: Color3;
    icon: string;
  }[];
}

const SHOP_DATA: ShopItem[] = [
  {
    id: 0,
    name: "Wooden table mirror",
    icon: "rbxassetid://16124021200",
    requirements: [
      {
        label: "wood",
        amount: "0 / 3",
        color: Color3.fromRGB(180, 110, 60),
        icon: "rbxassetid://16124021200",
      },
      {
        label: "iron nugget",
        amount: "1 / 1",
        color: Color3.fromRGB(120, 130, 140),
        icon: "rbxassetid://16124021200",
      },
    ],
  },
  {
    id: 1,
    name: "Bonfire",
    icon: "rbxassetid://16124021200",
    requirements: [
      {
        label: "campfire",
        amount: "0 / 1",
        color: Color3.fromRGB(100, 200, 100),
        icon: "rbxassetid://16124021200",
      },
      {
        label: "wood",
        amount: "0 / 10",
        color: Color3.fromRGB(180, 110, 60),
        icon: "rbxassetid://16124021200",
      },
    ],
  },
  {
    id: 2,
    name: "Jail bars",
    icon: "rbxassetid://16124021200",
    requirements: [
      {
        label: "iron nugget",
        amount: "1 / 5",
        color: Color3.fromRGB(120, 130, 140),
        icon: "rbxassetid://16124021200",
      },
    ],
  },
];

const SUPPLY_IDENTITY: AppIdentity = {
  iconPattern: "rbxassetid://117926250151482",
  tabs: [
    {
      id: "materials",
      icon: "rbxassetid://16124021200",
      tooltip: "Everything",
    },
    { id: "tools", icon: "rbxassetid://16124021200", tooltip: "Tools" },
  ],
  themeColor: Color3.fromRGB(241, 146, 32),
  title: "Supply Shop",
};

export function SupplyApp({
  onBack,
}: {
  readonly onBack: () => void;
}): React.Element {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const currentItem = (SHOP_DATA[selectedIdx] ?? SHOP_DATA[0]) as ShopItem;

  return (
    <AppLayout
      activeTabId="materials"
      identity={SUPPLY_IDENTITY}
      onBack={onBack}
      onTabChange={() => {}}
    >
      <Group key="MainUI" Native={{ Size: new UDim2(1, 0, 1, 0) }}>
        <uipadding
          PaddingBottom={new UDim(0, 25)}
          PaddingLeft={new UDim(0, 30)}
          PaddingRight={new UDim(0, 30)}
          PaddingTop={new UDim(0, 15)}
        />
        <uilistlayout
          FillDirection={Enum.FillDirection.Horizontal}
          Padding={new UDim(0, 35)}
          SortOrder={Enum.SortOrder.LayoutOrder}
        />

        {/* ESQUERDA: GRID DE ITENS */}
        <scrollingframe
          key="InventoryGrid"
          BackgroundTransparency={1}
          BorderSizePixel={0}
          Size={new UDim2(0.55, 0, 1, 0)}
          CanvasSize={new UDim2(0, 0, 0, 0)}
          AutomaticCanvasSize={Enum.AutomaticSize.Y}
          ScrollBarThickness={4}
          ScrollBarImageColor3={Color3.fromRGB(215, 210, 180)}
        >
          <uigridlayout
            CellPadding={new UDim2(0, 12, 0, 12)}
            CellSize={new UDim2(0, 80, 0, 110)}
          />
          {SHOP_DATA.map((item, i) => (
            <ItemCard
              key={item.id}
              isSelected={selectedIdx === i}
              onClick={() => setSelectedIdx(i)}
              icon={item.icon}
            />
          ))}
        </scrollingframe>

        {/* DIREITA: PAINEL DE DETALHES */}
        <Frame
          key="DetailsPanel"
          Native={{
            Size: new UDim2(0.45, -35, 1, 0),
            BackgroundColor3: Color3.fromRGB(243, 239, 217),
            BorderSizePixel: 0,
          }}
        >
          <uicorner CornerRadius={new UDim(0, 10)} />
          <uipadding
            PaddingBottom={new UDim(0, 20)}
            PaddingLeft={new UDim(0, 20)}
            PaddingRight={new UDim(0, 20)}
            PaddingTop={new UDim(0, 20)}
          />

          <Group key="Header" Native={{ Size: new UDim2(1, 0, 0, 40) }}>
            <uilistlayout
              FillDirection={Enum.FillDirection.Horizontal}
              Padding={new UDim(0, 10)}
              VerticalAlignment={Enum.VerticalAlignment.Center}
            />
            <imagelabel
              Image="rbxassetid://16124021200"
              Size={new UDim2(0, 24, 0, 24)}
              BackgroundTransparency={1}
              ImageColor3={Color3.fromRGB(110, 85, 60)}
            />
            <TextLabel
              Text={currentItem.name}
              Font={Enum.Font.FredokaOne}
              TextSize={22}
              TextColor={Color3.fromRGB(110, 85, 60)}
              Native={{
                Size: new UDim2(1, -34, 1, 0),
                TextXAlignment: Enum.TextXAlignment.Left,
              }}
            />
          </Group>

          {/* Linha Divisória */}
          <Frame
            Native={{
              Size: new UDim2(1, 0, 0, 2),
              Position: new UDim2(0, 0, 0, 45),
              BackgroundColor3: Color3.fromRGB(215, 210, 180),
              BorderSizePixel: 0,
            }}
          />

          <Group
            key="Content"
            Native={{
              Size: new UDim2(1, 0, 1, -110),
              Position: new UDim2(0, 0, 0, 60),
            }}
          >
            <uilistlayout Padding={new UDim(0, 10)} />
            {currentItem.requirements.map((req, idx) => (
              <RequirementRow key={idx} {...req} />
            ))}
          </Group>

          <textbutton
            Text="BUY"
            Font={Enum.Font.FredokaOne}
            TextSize={18}
            TextColor3={Color3.fromRGB(255, 255, 255)}
            BackgroundColor3={Color3.fromRGB(124, 206, 137)}
            Size={new UDim2(1, 0, 0, 45)}
            Position={new UDim2(0, 0, 1, -45)}
          >
            <uicorner CornerRadius={new UDim(0, 22)} />
            <uistroke Color={Color3.fromRGB(255, 255, 255)} Thickness={2} />
          </textbutton>
        </Frame>
      </Group>
    </AppLayout>
  );
}

function ItemCard({
  isSelected,
  onClick,
  icon,
}: {
  isSelected: boolean;
  onClick: () => void;
  icon: string;
}) {
  return (
    <imagebutton
      BackgroundColor3={
        isSelected
          ? Color3.fromRGB(255, 255, 255)
          : Color3.fromRGB(195, 153, 107)
      }
      BorderSizePixel={0}
      Event={{ Activated: onClick }}
    >
      <uicorner CornerRadius={new UDim(0, 8)} />
      <imagelabel
        Image="rbxassetid://117926250151482"
        Size={new UDim2(1, 0, 1, 0)}
        ImageTransparency={0.85}
        BackgroundTransparency={1}
        ScaleType={Enum.ScaleType.Tile}
        TileSize={new UDim2(0, 32, 0, 32)}
      />
      <uistroke
        Color={
          isSelected
            ? Color3.fromRGB(255, 255, 255)
            : Color3.fromRGB(165, 123, 87)
        }
        Thickness={isSelected ? 4 : 0}
      />
      <imagelabel
        Image={icon}
        Size={new UDim2(0.7, 0, 0.7, 0)}
        Position={new UDim2(0.5, 0, 0.5, 0)}
        AnchorPoint={new Vector2(0.5, 0.5)}
        BackgroundTransparency={1}
      />
      {isSelected && (
        <imagelabel
          Image="rbxassetid://10712716301"
          Size={new UDim2(0, 18, 0, 18)}
          Position={new UDim2(1, -5, 1, -5)}
          AnchorPoint={new Vector2(1, 1)}
          BackgroundTransparency={1}
          ImageColor3={Color3.fromRGB(124, 206, 137)}
        />
      )}
    </imagebutton>
  );
}

function RequirementRow({
  label,
  amount,
  icon,
}: {
  label: string;
  amount: string;
  icon: string;
}) {
  return (
    <Frame Native={{ Size: new UDim2(1, 0, 0, 40), BackgroundTransparency: 1 }}>
      <uilistlayout
        FillDirection={Enum.FillDirection.Horizontal}
        VerticalAlignment={Enum.VerticalAlignment.Center}
        Padding={new UDim(0, 10)}
      />
      <imagelabel
        Image={icon}
        Size={new UDim2(0, 30, 0, 30)}
        BackgroundTransparency={1}
      />
      <Group Native={{ Size: new UDim2(1, -40, 1, 0) }}>
        <TextLabel
          Text={label}
          TextColor={Color3.fromRGB(140, 120, 100)}
          TextSize={16}
          Native={{
            Size: new UDim2(0.6, 0, 1, 0),
            TextXAlignment: Enum.TextXAlignment.Left,
          }}
        />
        <TextLabel
          Text={amount}
          Font={Enum.Font.FredokaOne}
          TextColor={
            amount.sub(0, 1) === "0"
              ? Color3.fromRGB(220, 100, 80)
              : Color3.fromRGB(110, 85, 60)
          }
          TextSize={18}
          Native={{
            Size: new UDim2(0.4, 0, 1, 0),
            Position: new UDim2(0.6, 0, 0, 0),
            TextXAlignment: Enum.TextXAlignment.Right,
          }}
        />
      </Group>
    </Frame>
  );
}
