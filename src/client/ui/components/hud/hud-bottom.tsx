import React from "@rbxts/react";

import { useRem } from "client/ui/hooks";

import { slots } from "./hud-data";
import { QuickSlot } from "./hud-primitives";
import { hudTheme } from "./hud-theme";

interface BottomHudProps {
	ctaGlowRef: React.RefObject<UIStroke>;
}

export function BottomHud({
	ctaGlowRef,
}: Readonly<BottomHudProps>): React.Element {
	const rem = useRem();

	return (
		<>
			<frame
				AnchorPoint={new Vector2(0.5, 1)}
				BackgroundColor3={hudTheme.colors.surface}
				BackgroundTransparency={0.2}
				BorderSizePixel={0}
				Position={rem(new UDim2(0.5, 0, 0.98, 0), "pixel")}
				Size={rem(new UDim2(0.26, 0, 0.08, 0), "pixel")}
			>
				<uicorner CornerRadius={rem(hudTheme.radius.lg, "pixel")} />
				<uistroke
					Color={hudTheme.colors.stroke}
					Thickness={rem(1.2, "pixel")}
					Transparency={0.3}
				/>
				<uipadding
					PaddingBottom={rem(new UDim(0, 6), "pixel")}
					PaddingLeft={rem(new UDim(0, 8), "pixel")}
					PaddingRight={rem(new UDim(0, 8), "pixel")}
					PaddingTop={rem(new UDim(0, 6), "pixel")}
				/>
				<uilistlayout
					FillDirection={Enum.FillDirection.Horizontal}
					Padding={rem(new UDim(0, 6), "pixel")}
				/>
				{slots.map((slot, index) => {
					return <QuickSlot key={slot.id} data={slot} index={index} />;
				})}
			</frame>

			<frame
				AnchorPoint={new Vector2(0.5, 1)}
				BackgroundColor3={hudTheme.colors.surface}
				BackgroundTransparency={0.16}
				BorderSizePixel={0}
				Position={rem(new UDim2(0.5, 0, 0.89, 0), "pixel")}
				Size={rem(new UDim2(0.16, 0, 0.08, 0), "pixel")}
			>
				<uicorner CornerRadius={rem(hudTheme.radius.lg, "pixel")} />
				<uistroke
					ref={ctaGlowRef}
					Color={hudTheme.colors.glowGreen}
					Thickness={rem(2, "pixel")}
					Transparency={0.35}
				/>
				<uipadding
					PaddingBottom={rem(new UDim(0, 10), "pixel")}
					PaddingLeft={rem(new UDim(0, 10), "pixel")}
					PaddingRight={rem(new UDim(0, 10), "pixel")}
					PaddingTop={rem(new UDim(0, 10), "pixel")}
				/>
				<uilistlayout
					FillDirection={Enum.FillDirection.Horizontal}
					Padding={rem(new UDim(0, 10), "pixel")}
					VerticalAlignment={Enum.VerticalAlignment.Center}
				/>
				<frame
					BackgroundColor3={hudTheme.colors.green}
					BackgroundTransparency={0.78}
					BorderSizePixel={0}
					Size={rem(new UDim2(0, 56, 1, 0), "pixel")}
				>
					<uicorner CornerRadius={rem(hudTheme.radius.md, "pixel")} />
					<textlabel
						BackgroundTransparency={1}
						Font={Enum.Font.GothamMedium}
						Size={new UDim2(1, 0, 1, 0)}
						Text="E"
						TextColor3={hudTheme.colors.green}
						TextSize={rem(24, "pixel")}
					/>
				</frame>
				<frame
					BackgroundTransparency={1}
					Size={rem(new UDim2(1, -66, 1, 0), "pixel")}
				>
					<textlabel
						BackgroundTransparency={1}
						Font={Enum.Font.GothamMedium}
						Size={new UDim2(1, 0, 0.56, 0)}
						Text="🛒  Purchase Item"
						TextColor3={hudTheme.colors.textPrimary}
						TextSize={rem(27, "pixel")}
						TextXAlignment={Enum.TextXAlignment.Left}
					>
						<uitextsizeconstraint
							MaxTextSize={rem(25, "pixel")}
							MinTextSize={rem(14, "pixel")}
						/>
					</textlabel>
					<textlabel
						BackgroundTransparency={1}
						Font={Enum.Font.Gotham}
						Position={new UDim2(0, 0, 0.56, 0)}
						Size={new UDim2(1, 0, 0.44, 0)}
						Text="Ion Battery • $150"
						TextColor3={hudTheme.colors.textSecondary}
						TextSize={rem(20, "pixel")}
						TextXAlignment={Enum.TextXAlignment.Left}
					>
						<uitextsizeconstraint
							MaxTextSize={rem(18, "pixel")}
							MinTextSize={rem(11, "pixel")}
						/>
					</textlabel>
				</frame>
			</frame>
		</>
	);
}
