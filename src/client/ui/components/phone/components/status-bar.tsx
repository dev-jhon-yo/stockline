// cspell:disable
import React from "@rbxts/react";

export function StatusBar(): React.Element {
	return (
		<frame
			key="StatusBar"
			AnchorPoint={new Vector2(0.5, 0)}
			BackgroundTransparency={1}
			Position={new UDim2(0.5, 0, 0, 15)}
			Size={new UDim2(1, -60, 0, 20)}
		>
			<textlabel
				key="Clock"
				BackgroundTransparency={1}
				Font={Enum.Font.FredokaOne}
				Size={new UDim2(0.3, 0, 1, 0)}
				Text="10:39 AM"
				TextColor3={Color3.fromRGB(110, 105, 90)}
				TextSize={16}
				TextXAlignment={Enum.TextXAlignment.Left}
			/>
		</frame>
	);
}
