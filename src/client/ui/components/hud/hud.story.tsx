import React from "@rbxts/react";
import ReactRoblox from "@rbxts/react-roblox";
import { CreateReactStory } from "@rbxts/ui-labs";

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
				<HudRoot />
			</RemProvider>
		);
	},
);

export = story;
