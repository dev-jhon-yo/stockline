import React from "@rbxts/react";

import { useRem } from "client/ui/hooks";

import type { DayTimeModel, MarketMetric } from "./hud-data";
import { Chip, Panel } from "./hud-primitives";
import type { HudLayoutInfo } from "./hud-root";
import { hudTheme } from "./hud-theme";

interface TopHudProps {
	balance: number;
	dayTime: DayTimeModel;
	layout: HudLayoutInfo;
	market: ReadonlyArray<MarketMetric>;
	onSettings?: (() => void) | undefined;
}

export function TopHud({
	balance,
	dayTime,
	layout,
	market,
	onSettings,
}: Readonly<TopHudProps>): React.Element {
	const rem = useRem();
	const topOffset = rem(4, "pixel");
	const rowHeight = rem(58, "pixel");

	return (
		<frame
			BackgroundTransparency={1}
			Position={new UDim2(0, 0, 0, topOffset)}
			Size={new UDim2(1, 0, 0, rowHeight)}
			ZIndex={hudTheme.layers.top}
		>
			<Panel
				position={new UDim2(0, 0, 0, 0)}
				size={new UDim2(0, rem(layout.isPhone ? 240 : 280, "pixel"), 1, 0)}
				zIndex={hudTheme.layers.top}
			>
				<uipadding
					PaddingLeft={new UDim(0, rem(12, "pixel"))}
					PaddingRight={new UDim(0, rem(12, "pixel"))}
					PaddingTop={new UDim(0, rem(8, "pixel"))}
				/>
				<uilistlayout
					FillDirection={Enum.FillDirection.Horizontal}
					Padding={new UDim(0, rem(10, "pixel"))}
					VerticalAlignment={Enum.VerticalAlignment.Center}
				/>
				<textlabel
					BackgroundTransparency={1}
					Font={Enum.Font.GothamBlack}
					Size={new UDim2(0, rem(56, "pixel"), 0, rem(24, "pixel"))}
					Text={`☀ ${dayTime.dayLabel}`}
					TextColor3={hudTheme.colors.white}
					TextSize={rem(13, "pixel")}
					TextXAlignment={Enum.TextXAlignment.Left}
				/>
				<frame
					BackgroundColor3={Color3.fromRGB(61, 66, 112)}
					BorderSizePixel={0}
					Size={new UDim2(0, rem(2, "pixel"), 0, rem(22, "pixel"))}
				>
					<uicorner CornerRadius={new UDim(1, 0)} />
				</frame>
				<textlabel
					BackgroundTransparency={1}
					Font={Enum.Font.RobotoMono}
					Size={new UDim2(0, rem(82, "pixel"), 0, rem(24, "pixel"))}
					Text={`🕒 ${dayTime.timeLabel}`}
					TextColor3={hudTheme.colors.white}
					TextSize={rem(13, "pixel")}
					TextXAlignment={Enum.TextXAlignment.Left}
				/>
				<Chip color={hudTheme.colors.green} label="" text={dayTime.periodLabel} />
			</Panel>

			{layout.isPhone ? undefined : (
				<Panel
					position={new UDim2(0.5, -rem(layout.isCompact ? 200 : 260, "pixel") / 2, 0, 0)}
					size={new UDim2(0, rem(layout.isCompact ? 400 : 520, "pixel"), 1, 0)}
					zIndex={hudTheme.layers.top}
				>
					<uipadding
						PaddingLeft={new UDim(0, rem(12, "pixel"))}
						PaddingRight={new UDim(0, rem(12, "pixel"))}
						PaddingTop={new UDim(0, rem(8, "pixel"))}
					/>
					<uilistlayout
						FillDirection={Enum.FillDirection.Horizontal}
						HorizontalAlignment={Enum.HorizontalAlignment.Center}
						Padding={new UDim(0, rem(12, "pixel"))}
						VerticalAlignment={Enum.VerticalAlignment.Center}
					/>
					{market.map((metric, index) => {
						return (
							<React.Fragment key={metric.label}>
								<frame
									BackgroundTransparency={1}
									Size={
										new UDim2(
											0,
											rem(layout.isCompact ? 112 : 140, "pixel"),
											1,
											0,
										)
									}
								>
									<textlabel
										BackgroundTransparency={1}
										Font={Enum.Font.GothamBlack}
										Position={new UDim2(0, 0, 0, rem(6, "pixel"))}
										Size={new UDim2(1, 0, 0, rem(10, "pixel"))}
										Text={metric.label.upper()}
										TextColor3={hudTheme.colors.textMuted}
										TextSize={rem(9, "pixel")}
										TextXAlignment={Enum.TextXAlignment.Left}
									/>
									<textlabel
										BackgroundTransparency={1}
										Font={Enum.Font.GothamBlack}
										Position={new UDim2(0, 0, 0, rem(18, "pixel"))}
										Size={new UDim2(0, rem(74, "pixel"), 0, rem(20, "pixel"))}
										Text={`${metric.icon} ${metric.value}`}
										TextColor3={hudTheme.colors.white}
										TextSize={rem(16, "pixel")}
										TextXAlignment={Enum.TextXAlignment.Left}
									/>
									<Chip
										color={metric.changeColor}
										label=""
										text={metric.change}
									/>
								</frame>
								{index < market.size() - 1 ? (
									<frame
										BackgroundColor3={Color3.fromRGB(61, 66, 112)}
										BorderSizePixel={0}
										Size={new UDim2(0, rem(2, "pixel"), 0, rem(28, "pixel"))}
									>
										<uicorner CornerRadius={new UDim(1, 0)} />
									</frame>
								) : undefined}
							</React.Fragment>
						);
					})}
				</Panel>
			)}

			<frame
				AnchorPoint={new Vector2(1, 0)}
				BackgroundTransparency={1}
				Position={new UDim2(1, 0, 0, 0)}
				Size={new UDim2(0, rem(layout.isPhone ? 230 : 320, "pixel"), 1, 0)}
			>
				<uilistlayout
					FillDirection={Enum.FillDirection.Horizontal}
					HorizontalAlignment={Enum.HorizontalAlignment.Right}
					Padding={new UDim(0, rem(8, "pixel"))}
					VerticalAlignment={Enum.VerticalAlignment.Center}
				/>
				<Panel
					position={new UDim2(0, 0, 0, 0)}
					size={new UDim2(0, rem(layout.isPhone ? 184 : 264, "pixel"), 1, 0)}
					zIndex={hudTheme.layers.top}
				>
					<uipadding
						PaddingLeft={new UDim(0, rem(10, "pixel"))}
						PaddingRight={new UDim(0, rem(10, "pixel"))}
						PaddingTop={new UDim(0, rem(8, "pixel"))}
					/>
					<uilistlayout
						FillDirection={Enum.FillDirection.Horizontal}
						Padding={new UDim(0, rem(8, "pixel"))}
						VerticalAlignment={Enum.VerticalAlignment.Center}
					/>
					<textlabel
						BackgroundColor3={Color3.fromRGB(255, 193, 7)}
						BorderSizePixel={0}
						Font={Enum.Font.GothamBlack}
						Size={new UDim2(0, rem(30, "pixel"), 0, rem(30, "pixel"))}
						Text="$"
						TextColor3={Color3.fromRGB(255, 248, 225)}
						TextSize={rem(20, "pixel")}
					>
						<uicorner CornerRadius={new UDim(1, 0)} />
						<uistroke Color={Color3.fromRGB(230, 162, 0)} Thickness={rem(3, "pixel")} />
					</textlabel>
					<frame BackgroundTransparency={1} Size={new UDim2(1, -rem(44, "pixel"), 1, 0)}>
						<textlabel
							BackgroundTransparency={1}
							Font={Enum.Font.GothamBlack}
							Position={new UDim2(0, 0, 0, rem(6, "pixel"))}
							Size={new UDim2(1, 0, 0, rem(10, "pixel"))}
							Text="BALANCE"
							TextColor3={hudTheme.colors.textMuted}
							TextSize={rem(9, "pixel")}
							TextXAlignment={Enum.TextXAlignment.Left}
						/>
						<textlabel
							BackgroundTransparency={1}
							Font={Enum.Font.RobotoMono}
							Position={new UDim2(0, 0, 0, rem(18, "pixel"))}
							Size={new UDim2(1, 0, 0, rem(24, "pixel"))}
							Text={`$${string.format("%d", balance)}`}
							TextColor3={hudTheme.colors.yellow}
							TextSize={rem(layout.isPhone ? 16 : 24, "pixel")}
							TextXAlignment={Enum.TextXAlignment.Left}
						>
							<uistroke
								Color={hudTheme.colors.strokeBottom}
								Thickness={rem(1, "pixel")}
							/>
						</textlabel>
					</frame>
				</Panel>
				<textbutton
					AutoButtonColor={false}
					BackgroundColor3={Color3.fromRGB(61, 66, 112)}
					BorderSizePixel={0}
					Event={{ Activated: () => onSettings?.() }}
					Size={new UDim2(0, rem(40, "pixel"), 0, rem(40, "pixel"))}
					Text="⚙"
					TextColor3={hudTheme.colors.white}
					TextSize={rem(20, "pixel")}
				>
					<uicorner CornerRadius={new UDim(1, 0)} />
					<uistroke Color={hudTheme.colors.stroke} Thickness={rem(3, "pixel")} />
				</textbutton>
			</frame>
		</frame>
	);
}
