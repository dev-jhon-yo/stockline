import React, { useMemo } from "@rbxts/react";

import { useRem } from "client/ui/hooks";

import type { ChipData } from "./hud-data";
import { marketChips } from "./hud-data";
import { StatChip, SurfaceCard } from "./hud-primitives";
import type { HudLayoutInfo } from "./hud-root";
import { hudTheme } from "./hud-theme";

interface TopHudProps {
	layout: HudLayoutInfo;
}

function pickVisibleChips(layout: HudLayoutInfo): ReadonlyArray<ChipData> {
	if (layout.isPhone) {
		return [];
	}

	if (layout.isUltraCompact) {
		return marketChips.filter((_chip, index) => index < 2);
	}

	return marketChips;
}

export function TopHud({ layout }: Readonly<TopHudProps>): React.Element {
	const rem = useRem();

	const chips = useMemo(() => pickVisibleChips(layout), [layout]);

	const barHeight = rem(layout.isPhone ? 72 : layout.isUltraCompact ? 78 : 84, "pixel");
	const sideGap = rem(layout.isPhone ? 8 : 12, "pixel");

	const leftWidth = rem(layout.isPhone ? 294 : layout.isCompact ? 372 : 420, "pixel");
	const rightWidth = rem(layout.isPhone ? 268 : layout.isCompact ? 320 : 356, "pixel");

	const balanceWidth = rem(layout.isPhone ? 208 : layout.isCompact ? 244 : 272, "pixel");
	const settingsWidth = rem(layout.isPhone ? 42 : 54, "pixel");
	const settingsHeight = rem(layout.isPhone ? 26 : 30, "pixel");

	const centerMin = rem(layout.isUltraCompact ? 280 : 340, "pixel");
	const centerMax = rem(layout.isUltraCompact ? 500 : 640, "pixel");
	const centerAvailable = math.max(
		0,
		layout.safeWidth - leftWidth - rightWidth - sideGap * 2 - rem(16, "pixel"),
	);
	const centerWidth = math.clamp(centerAvailable, 0, centerMax);
	const showCenter = !layout.isUltraCompact && chips.size() > 0 && centerWidth >= centerMin;

	return (
		<frame
			BackgroundTransparency={1}
			Position={new UDim2(0, 0, 0, 0)}
			Size={new UDim2(1, 0, 0, barHeight)}
			ZIndex={hudTheme.layers.top}
		>
			<frame
				BackgroundTransparency={1}
				Position={new UDim2(0, 0, 0, 0)}
				Size={new UDim2(0, leftWidth, 1, 0)}
				ZIndex={hudTheme.layers.top}
			>
				<SurfaceCard position={new UDim2(0, 0, 0, 0)} size={new UDim2(1, 0, 1, 0)}>
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
						Size={rem(new UDim2(0, layout.isPhone ? 36 : 42, 0, layout.isPhone ? 36 : 42), "pixel")}
					>
						<uicorner CornerRadius={rem(hudTheme.radius.md, "pixel")} />
						<textlabel
							BackgroundTransparency={1}
							Font={Enum.Font.GothamBold}
							Size={new UDim2(1, 0, 1, 0)}
							Text="☼"
							TextColor3={hudTheme.colors.green}
							TextSize={rem(layout.isPhone ? 16 : 18, "pixel")}
						/>
					</frame>

					<frame BackgroundTransparency={1} Size={new UDim2(1, 0, 1, 0)}>
						<textlabel
							BackgroundTransparency={1}
							Font={Enum.Font.Gotham}
							Position={new UDim2(0, 0, 0, 0)}
							Size={new UDim2(1, 0, 0.34, 0)}
							Text="Day 5"
							TextColor3={hudTheme.colors.textSecondary}
							TextSize={rem(13, "pixel")}
							TextXAlignment={Enum.TextXAlignment.Left}
						/>
						<textlabel
							BackgroundTransparency={1}
							Font={Enum.Font.GothamMedium}
							Position={new UDim2(0, 0, 0.3, 0)}
							Size={new UDim2(1, 0, 0.7, 0)}
							Text="◷ 02:37 PM"
							TextColor3={hudTheme.colors.textPrimary}
							TextSize={rem(layout.isPhone ? 20 : layout.isUltraCompact ? 24 : 27, "pixel")}
							TextXAlignment={Enum.TextXAlignment.Left}
						>
							<uitextsizeconstraint
								MaxTextSize={rem(layout.isUltraCompact ? 21 : 23, "pixel")}
								MinTextSize={rem(14, "pixel")}
							/>
						</textlabel>
					</frame>

					{layout.isPhone ? undefined : (
						<frame
							BackgroundColor3={hudTheme.colors.green}
							BackgroundTransparency={0.85}
							BorderSizePixel={0}
							Size={rem(new UDim2(0, layout.isCompact ? 78 : 90, 0, 28), "pixel")}
						>
							<uicorner CornerRadius={rem(hudTheme.radius.sm, "pixel")} />
							<textlabel
								BackgroundTransparency={1}
								Font={Enum.Font.GothamMedium}
								Size={new UDim2(1, 0, 1, 0)}
								Text="Afternoon"
								TextColor3={hudTheme.colors.green}
								TextSize={rem(12, "pixel")}
							/>
						</frame>
					)}
				</SurfaceCard>
			</frame>

			{showCenter ? (
				<frame
					AnchorPoint={new Vector2(0.5, 0)}
					BackgroundTransparency={1}
					Position={new UDim2(0.5, 0, 0, 0)}
					Size={new UDim2(0, centerWidth, 1, 0)}
					ZIndex={hudTheme.layers.top}
				>
					<SurfaceCard position={new UDim2(0, 0, 0, 0)} size={new UDim2(1, 0, 1, 0)}>
						<uipadding
							PaddingBottom={rem(new UDim(0, 8), "pixel")}
							PaddingLeft={rem(new UDim(0, 10), "pixel")}
							PaddingRight={rem(new UDim(0, 10), "pixel")}
							PaddingTop={rem(new UDim(0, 8), "pixel")}
						/>
						<uilistlayout
							FillDirection={Enum.FillDirection.Horizontal}
							HorizontalAlignment={Enum.HorizontalAlignment.Center}
							Padding={rem(new UDim(0, 8), "pixel")}
							VerticalAlignment={Enum.VerticalAlignment.Center}
						/>
						{chips.map((chip, index) => {
							return (
								<React.Fragment key={chip.label}>
									<StatChip
										compact={layout.isCompact || layout.isUltraCompact}
										data={chip}
									/>
									{index < chips.size() - 1 ? (
										<frame
											BackgroundColor3={hudTheme.colors.stroke}
											BackgroundTransparency={0.62}
											Size={new UDim2(0, rem(1, "pixel"), 0, rem(30, "pixel"))}
										/>
									) : undefined}
								</React.Fragment>
							);
						})}
					</SurfaceCard>
				</frame>
			) : undefined}

			<frame
				AnchorPoint={new Vector2(1, 0)}
				BackgroundTransparency={1}
				Position={new UDim2(1, 0, 0, 0)}
				Size={new UDim2(0, rightWidth, 1, 0)}
				ZIndex={hudTheme.layers.top}
			>
				<uilistlayout
					FillDirection={Enum.FillDirection.Horizontal}
					HorizontalAlignment={Enum.HorizontalAlignment.Right}
					Padding={new UDim(0, sideGap)}
					VerticalAlignment={Enum.VerticalAlignment.Center}
				/>

				<SurfaceCard
					position={new UDim2(0, 0, 0, 0)}
					size={new UDim2(0, balanceWidth, 1, 0)}
				>
					<uipadding
						PaddingBottom={rem(new UDim(0, 9), "pixel")}
						PaddingLeft={rem(new UDim(0, 10), "pixel")}
						PaddingRight={rem(new UDim(0, 10), "pixel")}
						PaddingTop={rem(new UDim(0, 9), "pixel")}
					/>
					<uilistlayout
						FillDirection={Enum.FillDirection.Horizontal}
						Padding={rem(new UDim(0, 9), "pixel")}
						VerticalAlignment={Enum.VerticalAlignment.Center}
					/>

					<frame
						BackgroundColor3={hudTheme.colors.green}
						BackgroundTransparency={0.8}
						BorderSizePixel={0}
						Size={rem(new UDim2(0, layout.isPhone ? 32 : 38, 0, layout.isPhone ? 32 : 38), "pixel")}
					>
						<uicorner CornerRadius={rem(hudTheme.radius.md, "pixel")} />
						<textlabel
							BackgroundTransparency={1}
							Font={Enum.Font.GothamBold}
							Size={new UDim2(1, 0, 1, 0)}
							Text="◉"
							TextColor3={hudTheme.colors.green}
							TextSize={rem(layout.isPhone ? 13 : 15, "pixel")}
						/>
					</frame>

					<frame BackgroundTransparency={1} Size={new UDim2(1, 0, 1, 0)}>
						<textlabel
							BackgroundTransparency={1}
							Font={Enum.Font.Gotham}
							Size={new UDim2(1, 0, 0.34, 0)}
							Text="BALANCE"
							TextColor3={hudTheme.colors.textSecondary}
							TextSize={rem(12, "pixel")}
							TextXAlignment={Enum.TextXAlignment.Left}
						/>
						<textlabel
							BackgroundTransparency={1}
							Font={Enum.Font.GothamMedium}
							Position={new UDim2(0, 0, 0.3, 0)}
							Size={new UDim2(1, 0, 0.7, 0)}
							Text="$12,450"
							TextColor3={hudTheme.colors.green}
							TextSize={rem(layout.isPhone ? 18 : layout.isUltraCompact ? 23 : 26, "pixel")}
							TextXAlignment={Enum.TextXAlignment.Left}
						>
							<uitextsizeconstraint
								MaxTextSize={rem(layout.isUltraCompact ? 20 : 25, "pixel")}
								MinTextSize={rem(13, "pixel")}
							/>
						</textlabel>
					</frame>
				</SurfaceCard>

				<frame
					BackgroundColor3={hudTheme.colors.surface}
					BackgroundTransparency={0.28}
					BorderSizePixel={0}
					Size={new UDim2(0, settingsWidth, 0, settingsHeight)}
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
						TextSize={rem(layout.isPhone ? 15 : 18, "pixel")}
					/>
				</frame>
			</frame>
		</frame>
	);
}
