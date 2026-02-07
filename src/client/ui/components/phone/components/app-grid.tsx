import React, { useState } from "@rbxts/react";

import type { AppConfig } from "./app-icon";
import { AppIcon } from "./app-icon";

const APPS: ReadonlyArray<AppConfig> = [
	{
		id: "Builds",
		name: "Builds",
		color: Color3.fromHex("#df7d3e"),
		icon: "rbxassetid://162124021200",
	},
	{
		id: "Management",
		name: "Management",
		color: Color3.fromHex("#4b5261"),
		icon: "rbxassetid://16124421314021200",
	},
	{
		id: "Shop",
		name: "Shop",
		color: Color3.fromHex("#e85eb0"),
		icon: "rbxassetid://1453612311124021200",
	},
	{
		id: "Supply",
		name: "Supply",
		color: Color3.fromHex("#4db6ac"),
		icon: "rbxassetid://124353224021200",
	},
	{
		id: "Tasks",
		name: "Tasks",
		color: Color3.fromHex("#9b59b6"),
		icon: "rbxassetid://347i936124021200",
	},
];

interface AppGridProps {
	readonly onAppSelected: (id: string, color: Color3) => void;
}

export function AppGrid({ onAppSelected }: AppGridProps): React.Element {
	const [focusedId, setFocusedId] = useState<string>("");

	return (
		<frame key="GridContainer" BackgroundTransparency={1} Size={new UDim2(1, 0, 1, 0)}>
			<uigridlayout
				key="Layout"
				CellPadding={new UDim2(0, 15, 0, 20)}
				CellSize={new UDim2(0, 70, 0, 70)}
				HorizontalAlignment={Enum.HorizontalAlignment.Center}
				SortOrder={Enum.SortOrder.LayoutOrder}
				VerticalAlignment={Enum.VerticalAlignment.Center}
			/>

			{APPS.map((app) => {
				return (
					<AppIcon
						key={app.id}
						config={app}
						isSelected={focusedId === app.id}
						onActivated={() => {
							onAppSelected(app.id, app.color);
						}}
						onMouseEnter={() => {
							setFocusedId(app.id);
						}}
					/>
				);
			})}
		</frame>
	);
}
