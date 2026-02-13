import React from "@rbxts/react";
import { ReflexProvider } from "@rbxts/react-reflex";
import ReactRoblox from "@rbxts/react-roblox";
import { CreateReactStory } from "@rbxts/ui-labs";

import { store } from "client/store";
import { RemProvider } from "client/ui/providers/rem-provider";

import { HudRoot } from "./hud-root";

const story = CreateReactStory(
	{
		name: "HUD / Market Simulator",
		react: React,
		reactRoblox: ReactRoblox,
	},
	(): React.Element => {
		return (
			<RemProvider>
				<ReflexProvider producer={store}>
					<HudRoot />
				</ReflexProvider>
			</RemProvider>
		);
	},
);

export = story;
