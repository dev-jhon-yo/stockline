import React from "@rbxts/react";

import { useRem } from "client/ui/hooks";

import { marketChips } from "./hud-data";
import { StatChip, SurfaceCard } from "./hud-primitives";
import { hudTheme } from "./hud-theme";

export function TopHud(): React.Element {
	const rem = useRem();

	return (
		<frame
			BackgroundTransparency={1}
			Position={rem(new UDim2(0, 0, 0, 24), "pixel")}
			Size={rem(new UDim2(1, 0, 0, 84), "pixel")}
		>
			<frame
				AnchorPoint={new Vector2(0, 0)}
				BackgroundTransparency={1}
				Position={rem(new UDim2(0, 32, 0, 0), "pixel")}
				Size={rem(new UDim2(0, 470, 1, 0), "pixel")}
			>
				<SurfaceCard
					position={new UDim2(0, 0, 0, 0)}
					size={new UDim2(1, 0, 1, 0)}
				>
					<uipadding
						PaddingBottom={rem(new UDim(0, 12), "pixel")}
						PaddingLeft={rem(new UDim(0, 14), "pixel")}
						PaddingRight={rem(new UDim(0, 14), "pixel")}
						PaddingTop={rem(new UDim(0, 12), "pixel")}
					/>
					<uilistlayout
						FillDirection={Enum.FillDirection.Horizontal}
						Padding={rem(new UDim(0, 12), "pixel")}
						VerticalAlignment={Enum.VerticalAlignment.Center}
					/>
					<frame
						BackgroundColor3={hudTheme.colors.green}
						BackgroundTransparency={0.8}
						BorderSizePixel={0}
						Size={rem(new UDim2(0, 46, 0, 46), "pixel")}
					>
						<uicorner CornerRadius={rem(hudTheme.radius.md, "pixel")} />
						<textlabel
							BackgroundTransparency={1}
							Font={Enum.Font.GothamBold}
							Size={new UDim2(1, 0, 1, 0)}
							Text="☼"
							TextColor3={hudTheme.colors.green}
							TextSize={rem(20, "pixel")}
						/>
					</frame>
					<frame
						BackgroundTransparency={1}
						Size={rem(new UDim2(1, -172, 1, 0), "pixel")}
					>
						<textlabel
							BackgroundTransparency={1}
							Font={Enum.Font.Gotham}
							Position={rem(new UDim2(0, 0, 0, -2), "pixel")}
							Size={new UDim2(1, 0, 0.32, 0)}
							Text="Day 5"
							TextColor3={hudTheme.colors.textSecondary}
							TextSize={rem(13, "pixel")}
							TextXAlignment={Enum.TextXAlignment.Left}
						/>
						<textlabel
							BackgroundTransparency={1}
							Font={Enum.Font.GothamMedium}
							Position={new UDim2(0, 0, 0.32, 0)}
							Size={new UDim2(1, 0, 0.62, 0)}
							Text="◷ 02:37 PM"
							TextColor3={hudTheme.colors.textPrimary}
							TextSize={rem(38, "pixel")}
							TextXAlignment={Enum.TextXAlignment.Left}
						>
							<uitextsizeconstraint
								MaxTextSize={rem(28, "pixel")}
								MinTextSize={rem(16, "pixel")}
							/>
						</textlabel>
					</frame>
					<frame
						BackgroundColor3={hudTheme.colors.green}
						BackgroundTransparency={0.85}
						BorderSizePixel={0}
						Size={rem(new UDim2(0, 102, 0, 34), "pixel")}
					>
						<uicorner CornerRadius={rem(hudTheme.radius.sm, "pixel")} />
						<textlabel
							BackgroundTransparency={1}
							Font={Enum.Font.GothamMedium}
							Size={new UDim2(1, 0, 1, 0)}
							Text="Afternoon"
							TextColor3={hudTheme.colors.green}
							TextSize={rem(13, "pixel")}
						/>
					</frame>
				</SurfaceCard>
			</frame>

			<frame
				AnchorPoint={new Vector2(0.5, 0)}
				BackgroundTransparency={1}
				Position={new UDim2(0.5, 0, 0, 0)}
				Size={rem(new UDim2(0, 760, 1, 0), "pixel")}
			>
				<SurfaceCard
					position={new UDim2(0, 0, 0, 0)}
					size={new UDim2(1, 0, 1, 0)}
				>
					<uipadding
						PaddingLeft={rem(new UDim(0, 12), "pixel")}
						PaddingRight={rem(new UDim(0, 12), "pixel")}
					/>
					<uilistlayout
						FillDirection={Enum.FillDirection.Horizontal}
						HorizontalAlignment={Enum.HorizontalAlignment.Center}
						Padding={rem(new UDim(0, 10), "pixel")}
						VerticalAlignment={Enum.VerticalAlignment.Center}
					/>
					{marketChips.map((chip) => {
						return <StatChip key={chip.label} data={chip} />;
					})}
				</SurfaceCard>
			</frame>

			<frame
				AnchorPoint={new Vector2(1, 0)}
				BackgroundTransparency={1}
				Position={rem(new UDim2(1, -32, 0, 0), "pixel")}
				Size={rem(new UDim2(0, 370, 1, 0), "pixel")}
			>
				<uilistlayout
					FillDirection={Enum.FillDirection.Horizontal}
					HorizontalAlignment={Enum.HorizontalAlignment.Right}
					Padding={rem(new UDim(0, 12), "pixel")}
					VerticalAlignment={Enum.VerticalAlignment.Center}
				/>
				<SurfaceCard
					position={new UDim2(0, 0, 0, 0)}
					size={new UDim2(0, rem(292, "pixel"), 1, 0)}
				>
					<uipadding
						PaddingBottom={rem(new UDim(0, 10), "pixel")}
						PaddingLeft={rem(new UDim(0, 12), "pixel")}
						PaddingRight={rem(new UDim(0, 12), "pixel")}
						PaddingTop={rem(new UDim(0, 10), "pixel")}
					/>
					<uilistlayout
						FillDirection={Enum.FillDirection.Horizontal}
						Padding={rem(new UDim(0, 10), "pixel")}
						VerticalAlignment={Enum.VerticalAlignment.Center}
					/>
					<frame
						BackgroundColor3={hudTheme.colors.green}
						BackgroundTransparency={0.8}
						BorderSizePixel={0}
						Size={rem(new UDim2(0, 46, 0, 46), "pixel")}
					>
						<uicorner CornerRadius={rem(hudTheme.radius.md, "pixel")} />
						<textlabel
							BackgroundTransparency={1}
							Font={Enum.Font.GothamBold}
							Size={new UDim2(1, 0, 1, 0)}
							Text="◉"
							TextColor3={hudTheme.colors.green}
							TextSize={rem(18, "pixel")}
						/>
					</frame>
					<frame
						BackgroundTransparency={1}
						Size={rem(new UDim2(1, -56, 1, 0), "pixel")}
					>
						<textlabel
							BackgroundTransparency={1}
							Font={Enum.Font.Gotham}
							Size={new UDim2(1, 0, 0.32, 0)}
							Text="BALANCE"
							TextColor3={hudTheme.colors.textSecondary}
							TextSize={rem(13, "pixel")}
							TextXAlignment={Enum.TextXAlignment.Left}
						/>
						<textlabel
							BackgroundTransparency={1}
							Font={Enum.Font.GothamMedium}
							Position={new UDim2(0, 0, 0.33, 0)}
							Size={new UDim2(1, 0, 0.62, 0)}
							Text="$12,450"
							TextColor3={hudTheme.colors.green}
							TextSize={rem(35, "pixel")}
							TextXAlignment={Enum.TextXAlignment.Left}
						>
							<uitextsizeconstraint
								MaxTextSize={rem(33, "pixel")}
								MinTextSize={rem(16, "pixel")}
							/>
						</textlabel>
					</frame>
				</SurfaceCard>
				<frame
					BackgroundColor3={hudTheme.colors.surface}
					BackgroundTransparency={0.28}
					BorderSizePixel={0}
					Size={rem(new UDim2(0, 56, 0, 34), "pixel")}
				>
					<uicorner CornerRadius={rem(hudTheme.radius.pill, "pixel")} />
					<uistroke
						Color={hudTheme.colors.stroke}
						Thickness={rem(1, "pixel")}
						Transparency={0.25}
					/>
					<textlabel
						BackgroundTransparency={1}
						Font={Enum.Font.GothamMedium}
						Size={new UDim2(1, 0, 1, 0)}
						Text="⚙"
						TextColor3={hudTheme.colors.textSecondary}
						TextSize={rem(18, "pixel")}
					/>
				</frame>
			</frame>
		</frame>
	);
}
