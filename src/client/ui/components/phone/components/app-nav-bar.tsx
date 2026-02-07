import React from "@rbxts/react";

import { Group } from "../../primitive";

type TabIconProps = Readonly<{
	icon: string;
	isActive: boolean;
}>;

export function AppNavBar(): React.Element {
	return (
		<Group
			key="NavBar"
			Native={{
				AnchorPoint: new Vector2(0.5, 0.5),
				Position: new UDim2(0.5, 0, 0, 75),
				Size: new UDim2(0.8, 0, 0, 40),
			}}
		>
			<uilistlayout
				FillDirection={Enum.FillDirection.Horizontal}
				HorizontalAlignment={Enum.HorizontalAlignment.Center}
				Padding={new UDim(0, 10)}
			/>

			<TabIcon icon="rbxassetid://16124021200" isActive={true} />
			<TabIcon icon="rbxassetid://16124021200" isActive={false} />
			<TabIcon icon="rbxassetid://16124021200" isActive={false} />
		</Group>
	);
}

function TabIcon({ icon, isActive }: TabIconProps): React.Element {
	return (
		<imagelabel
			BackgroundColor3={Color3.fromRGB(255, 255, 255)}
			BackgroundTransparency={isActive ? 0.8 : 1}
			Image={icon}
			Size={new UDim2(0, 32, 0, 32)}
		>
			<uicorner CornerRadius={new UDim(1, 0)} />
		</imagelabel>
	);
}
