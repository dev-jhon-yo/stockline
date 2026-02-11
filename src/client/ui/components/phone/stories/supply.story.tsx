import React from "@rbxts/react";
import { ReflexProvider } from "@rbxts/react-reflex";
import ReactRoblox from "@rbxts/react-roblox";
import { CreateReactStory } from "@rbxts/ui-labs";

import { store } from "client/store";
import { Group } from "client/ui/components/primitive";
import { RemProvider } from "client/ui/providers/rem-provider";

import { SupplyApp } from "../apps/supply-app";

const story = CreateReactStory(
  {
    name: "Supply App Story",
    react: React,
    reactRoblox: ReactRoblox,
  },
  (): React.Element => {
    return (
      <ReflexProvider producer={store}>
        <RemProvider>
          <Group
            key="PhoneStory_Canvas"
            Native={{
              BackgroundColor3: Color3.fromRGB(20, 20, 20),
              Size: UDim2.fromScale(1, 1),
            }}
          >
            <frame
              AnchorPoint={new Vector2(0.5, 0.5)}
              BackgroundTransparency={1}
              Position={UDim2.fromScale(0.5, 0.5)}
              Size={UDim2.fromOffset(500, 720)}
            >
              <SupplyApp
                onBack={() => {
                  print("Hi");
                }}
              />
            </frame>
          </Group>
        </RemProvider>
      </ReflexProvider>
    );
  },
);

export = story;
