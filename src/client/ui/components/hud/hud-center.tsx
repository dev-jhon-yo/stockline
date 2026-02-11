import React from "@rbxts/react";

import { useRem } from "client/ui/hooks";

import { hudTheme } from "./hud-theme";

export function CenterHud(): React.Element {
	const rem = useRem();

	return (
		<frame
			AnchorPoint={new Vector2(0.5, 0.5)}
			BackgroundTransparency={1}
			Position={rem(new UDim2(0.5, 0, 0.52, 0), "pixel")}
			Size={rem(new UDim2(0.26, 0, 0.22, 0), "pixel")}
		>
			<uilistlayout
				HorizontalAlignment={Enum.HorizontalAlignment.Center}
				Padding={rem(new UDim(0, 8), "pixel")}
				SortOrder={Enum.SortOrder.LayoutOrder}
				VerticalAlignment={Enum.VerticalAlignment.Center}
			/>
			<textlabel
				BackgroundTransparency={1}
				Font={Enum.Font.GothamMedium}
				LayoutOrder={1}
				Size={rem(new UDim2(0, 64, 0, 64), "pixel")}
				Text="🏪"
				TextColor3={hudTheme.colors.textPrimary}
				TextSize={rem(48, "pixel")}
			/>
			<textlabel
				BackgroundTransparency={1}
				Font={Enum.Font.GothamMedium}
				LayoutOrder={2}
				Size={rem(new UDim2(1, 0, 0, 34), "pixel")}
				Text="First-Person Game View"
				TextColor3={hudTheme.colors.textSecondary}
				TextSize={rem(26, "pixel")}
			>
				<uitextsizeconstraint
					MaxTextSize={rem(30, "pixel")}
					MinTextSize={rem(14, "pixel")}
				/>
			</textlabel>
			<textlabel
				BackgroundTransparency={1}
				Font={Enum.Font.Gotham}
				LayoutOrder={3}
				Size={rem(new UDim2(1, 0, 0, 24), "pixel")}
				Text="HUD elements positioned around viewport"
				TextColor3={hudTheme.colors.stroke}
				TextSize={rem(18, "pixel")}
			>
				<uitextsizeconstraint
					MaxTextSize={rem(20, "pixel")}
					MinTextSize={rem(10, "pixel")}
				/>
			</textlabel>
		</frame>
	);
}
