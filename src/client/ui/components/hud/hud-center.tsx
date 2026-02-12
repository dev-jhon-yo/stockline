import React from "@rbxts/react";

import { useRem } from "client/ui/hooks";

import type { HudLayoutInfo } from "./hud-root";
import { hudTheme } from "./hud-theme";

interface CenterHudProps {
	layout: HudLayoutInfo;
}

export function CenterHud({ layout }: Readonly<CenterHudProps>): React.Element {
	const rem = useRem();

	if (layout.isPhone || layout.isShort || layout.isUltraCompact || layout.safeWidth < 980) {
		return <></>;
	}

	return (
		<frame
			AnchorPoint={new Vector2(0.5, 0.5)}
			BackgroundTransparency={1}
			Position={new UDim2(0.5, 0, 0.53, 0)}
			Size={new UDim2(0, rem(460, "pixel"), 0, rem(150, "pixel"))}
			ZIndex={hudTheme.layers.overlay}
		>
			<uilistlayout
				HorizontalAlignment={Enum.HorizontalAlignment.Center}
				Padding={rem(new UDim(0, 5), "pixel")}
				SortOrder={Enum.SortOrder.LayoutOrder}
				VerticalAlignment={Enum.VerticalAlignment.Center}
			/>
			<textlabel
				BackgroundTransparency={1}
				Font={Enum.Font.GothamMedium}
				LayoutOrder={0}
				Size={new UDim2(1, 0, 0, rem(42, "pixel"))}
				Text="🏪"
				TextColor3={hudTheme.colors.textPrimary}
				TextSize={rem(34, "pixel")}
			/>
			<textlabel
				BackgroundTransparency={1}
				Font={Enum.Font.GothamBold}
				LayoutOrder={1}
				Size={new UDim2(1, 0, 0, rem(12, "pixel"))}
				Text="○"
				TextColor3={hudTheme.colors.textSecondary}
				TextSize={rem(8, "pixel")}
			/>
			<textlabel
				BackgroundTransparency={1}
				Font={Enum.Font.GothamMedium}
				LayoutOrder={2}
				Size={new UDim2(1, 0, 0, rem(32, "pixel"))}
				Text="First-Person Game View"
				TextColor3={hudTheme.colors.textSecondary}
				TextSize={rem(20, "pixel")}
			>
				<uitextsizeconstraint
					MaxTextSize={rem(22, "pixel")}
					MinTextSize={rem(14, "pixel")}
				/>
			</textlabel>
			<textlabel
				BackgroundTransparency={1}
				Font={Enum.Font.Gotham}
				LayoutOrder={3}
				Size={new UDim2(1, 0, 0, rem(22, "pixel"))}
				Text="HUD elements reposition automatically by viewport"
				TextColor3={hudTheme.colors.stroke}
				TextSize={rem(14, "pixel")}
			>
				<uitextsizeconstraint
					MaxTextSize={rem(14, "pixel")}
					MinTextSize={rem(10, "pixel")}
				/>
			</textlabel>
		</frame>
	);
}
