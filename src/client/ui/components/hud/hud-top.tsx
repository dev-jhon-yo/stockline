import React from "@rbxts/react";

import { useRem } from "client/ui/hooks";

import type { DayTimeModel, MarketMetric } from "./hud-data";
import { Chip, Panel } from "./hud-primitives";
import type { HudLayoutInfo } from "./hud-root";
import { hudTheme } from "./hud-theme";

export type TopHudSection = "center" | "left" | "right";

interface TopHudProps {
	balance: number;
	dayTime: DayTimeModel;
	layout: HudLayoutInfo;
	market: ReadonlyArray<MarketMetric>;
	onSettings?: (() => void) | undefined;
	section: TopHudSection;
}

function DayTimeDisplay({ dayTime }: Readonly<{ dayTime: DayTimeModel }>): React.Element {
	const rem = useRem();

	return (
		<Panel
			automaticSize={Enum.AutomaticSize.XY}
			size={new UDim2(0, rem(300, "pixel"), 0, rem(54, "pixel"))}
			zIndex={hudTheme.layers.top}
		>
			<uipadding
				PaddingBottom={new UDim(0, rem(hudTheme.tokens.pad2, "pixel"))}
				PaddingLeft={new UDim(0, rem(hudTheme.tokens.pad4, "pixel"))}
				PaddingRight={new UDim(0, rem(hudTheme.tokens.pad4, "pixel"))}
				PaddingTop={new UDim(0, rem(hudTheme.tokens.pad2, "pixel"))}
			/>
			<uilistlayout
				FillDirection={Enum.FillDirection.Horizontal}
				Padding={new UDim(0, rem(hudTheme.tokens.gap3, "pixel"))}
				VerticalAlignment={Enum.VerticalAlignment.Center}
			/>
			<textlabel
				BackgroundTransparency={1}
				Font={Enum.Font.GothamBlack}
				Size={new UDim2(0, rem(70, "pixel"), 0, rem(20, "pixel"))}
				Text={`☀ ${dayTime.dayLabel}`}
				TextColor3={hudTheme.colors.white}
				TextSize={rem(14, "pixel")}
				TextXAlignment={Enum.TextXAlignment.Left}
			/>
			<frame
				BackgroundColor3={Color3.fromRGB(61, 66, 112)}
				BorderSizePixel={0}
				Size={new UDim2(0, rem(2, "pixel"), 0, rem(24, "pixel"))}
			>
				<uicorner CornerRadius={new UDim(1, 0)} />
			</frame>
			<textlabel
				BackgroundTransparency={1}
				Font={Enum.Font.RobotoMono}
				Size={new UDim2(0, rem(98, "pixel"), 0, rem(20, "pixel"))}
				Text={`🕒 ${dayTime.timeLabel}`}
				TextColor3={hudTheme.colors.white}
				TextSize={rem(14, "pixel")}
				TextXAlignment={Enum.TextXAlignment.Left}
			/>
			<Chip color={hudTheme.colors.green} text={dayTime.periodLabel} />
		</Panel>
	);
}

function MarketInfo({
	layout,
	market,
}: Readonly<{ layout: HudLayoutInfo; market: ReadonlyArray<MarketMetric> }>): React.Element {
	const rem = useRem();
	const maxWidth = rem(layout.isCompact ? 430 : 520, "pixel");
	const minWidth = rem(layout.isCompact ? 360 : 460, "pixel");

	return (
		<Panel
			automaticSize={Enum.AutomaticSize.XY}
			size={new UDim2(0, minWidth, 0, rem(58, "pixel"))}
			zIndex={hudTheme.layers.top}
		>
			<uisizeconstraint
				MaxSize={new Vector2(maxWidth, rem(80, "pixel"))}
				MinSize={new Vector2(minWidth, rem(58, "pixel"))}
			/>
			<uipadding
				PaddingBottom={new UDim(0, rem(hudTheme.tokens.pad2, "pixel"))}
				PaddingLeft={new UDim(0, rem(hudTheme.tokens.pad3, "pixel"))}
				PaddingRight={new UDim(0, rem(hudTheme.tokens.pad3, "pixel"))}
				PaddingTop={new UDim(0, rem(hudTheme.tokens.pad2, "pixel"))}
			/>
			<uilistlayout
				FillDirection={Enum.FillDirection.Horizontal}
				HorizontalAlignment={Enum.HorizontalAlignment.Center}
				Padding={new UDim(0, rem(hudTheme.tokens.gap3, "pixel"))}
				VerticalAlignment={Enum.VerticalAlignment.Center}
			/>
			{market.map((metric, index) => {
				return (
					<React.Fragment key={metric.label}>
						<frame
							BackgroundTransparency={1}
							Size={new UDim2(0, rem(130, "pixel"), 0, rem(42, "pixel"))}
						>
							<textlabel
								BackgroundTransparency={1}
								Font={Enum.Font.GothamBlack}
								Size={new UDim2(1, 0, 0, rem(10, "pixel"))}
								Text={metric.label.upper()}
								TextColor3={hudTheme.colors.textMuted}
								TextSize={rem(9, "pixel")}
								TextXAlignment={Enum.TextXAlignment.Left}
							/>
							<textlabel
								BackgroundTransparency={1}
								Font={Enum.Font.GothamBlack}
								Position={new UDim2(0, 0, 0, rem(12, "pixel"))}
								Size={new UDim2(0, rem(82, "pixel"), 0, rem(18, "pixel"))}
								Text={`${metric.icon} ${metric.value}`}
								TextColor3={hudTheme.colors.white}
								TextSize={rem(15, "pixel")}
								TextXAlignment={Enum.TextXAlignment.Left}
							/>
							<frame
								BackgroundTransparency={1}
								Position={new UDim2(0, 0, 1, -rem(18, "pixel"))}
								Size={new UDim2(0, 0, 0, 0)}
							>
								<Chip color={metric.changeColor} text={metric.change} />
							</frame>
						</frame>
						{index < market.size() - 1 ? (
							<frame
								BackgroundColor3={Color3.fromRGB(61, 66, 112)}
								BorderSizePixel={0}
								Size={new UDim2(0, rem(2, "pixel"), 0, rem(32, "pixel"))}
							>
								<uicorner CornerRadius={new UDim(1, 0)} />
							</frame>
						) : undefined}
					</React.Fragment>
				);
			})}
		</Panel>
	);
}

function BalanceDisplay({
	balance,
	onSettings,
}: Readonly<{ balance: number; onSettings?: (() => void) | undefined }>): React.Element {
	const rem = useRem();

	return (
		<frame
			AutomaticSize={Enum.AutomaticSize.XY}
			BackgroundTransparency={1}
			Size={new UDim2(0, rem(1, "pixel"), 0, rem(58, "pixel"))}
		>
			<uilistlayout
				FillDirection={Enum.FillDirection.Horizontal}
				HorizontalAlignment={Enum.HorizontalAlignment.Right}
				Padding={new UDim(0, rem(hudTheme.tokens.gap2, "pixel"))}
				VerticalAlignment={Enum.VerticalAlignment.Center}
			/>
			<Panel
				automaticSize={Enum.AutomaticSize.XY}
				size={new UDim2(0, rem(236, "pixel"), 0, rem(58, "pixel"))}
				zIndex={hudTheme.layers.top}
			>
				<uipadding
					PaddingBottom={new UDim(0, rem(hudTheme.tokens.pad2, "pixel"))}
					PaddingLeft={new UDim(0, rem(hudTheme.tokens.pad3, "pixel"))}
					PaddingRight={new UDim(0, rem(hudTheme.tokens.pad3, "pixel"))}
					PaddingTop={new UDim(0, rem(hudTheme.tokens.pad2, "pixel"))}
				/>
				<uilistlayout
					FillDirection={Enum.FillDirection.Horizontal}
					Padding={new UDim(0, rem(hudTheme.tokens.gap2, "pixel"))}
					VerticalAlignment={Enum.VerticalAlignment.Center}
				/>
				<textlabel
					BackgroundColor3={Color3.fromRGB(255, 193, 7)}
					BorderSizePixel={0}
					Font={Enum.Font.GothamBlack}
					Size={new UDim2(0, rem(32, "pixel"), 0, rem(32, "pixel"))}
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
						Position={new UDim2(0, 0, 0, rem(4, "pixel"))}
						Size={new UDim2(1, 0, 0, rem(10, "pixel"))}
						Text="BALANCE"
						TextColor3={hudTheme.colors.textMuted}
						TextSize={rem(9, "pixel")}
						TextXAlignment={Enum.TextXAlignment.Left}
					/>
					<textlabel
						BackgroundTransparency={1}
						Font={Enum.Font.RobotoMono}
						Position={new UDim2(0, 0, 0, rem(16, "pixel"))}
						Size={new UDim2(1, 0, 0, rem(26, "pixel"))}
						Text={`$${string.format("%d", balance)}`}
						TextColor3={hudTheme.colors.yellow}
						TextSize={rem(24, "pixel")}
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
				Size={new UDim2(0, rem(42, "pixel"), 0, rem(42, "pixel"))}
				Text="⚙"
				TextColor3={hudTheme.colors.white}
				TextSize={rem(20, "pixel")}
			>
				<uicorner CornerRadius={new UDim(1, 0)} />
				<uistroke Color={hudTheme.colors.stroke} Thickness={rem(3, "pixel")} />
			</textbutton>
		</frame>
	);
}

export function TopHud({
	balance,
	dayTime,
	layout,
	market,
	onSettings,
	section,
}: Readonly<TopHudProps>): React.Element {
	if (section === "left") {
		return <DayTimeDisplay dayTime={dayTime} />;
	}

	if (section === "center") {
		return <MarketInfo layout={layout} market={market} />;
	}

	return <BalanceDisplay balance={balance} onSettings={onSettings} />;
}
