import React, { useMemo } from "@rbxts/react";

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

/**
 * Compact stat pill: icon (left), label/value (middle), delta chip (right).
 * Avoid UIListLayout "justify-between" traps by using slot layout.
 */
function StatPill({ metric }: Readonly<{ metric: MarketMetric }>): React.Element {
	const rem = useRem();

	const minH = rem(52, "pixel");
	const minW = rem(170, "pixel");
	const maxW = rem(210, "pixel");
	const maxH = rem(66, "pixel");

	const padX = rem(10, "pixel");
	const padY = rem(8, "pixel");
	const gap = rem(10, "pixel");

	const iconSize = rem(34, "pixel");

	// Reserve a safe space for the right chip (varies, so reserve a bit more)
	const chipReserveW = rem(64, "pixel");

	return (
		<Panel
			automaticSize={Enum.AutomaticSize.XY}
			size={new UDim2(0, 0, 0, 0)}
			zIndex={hudTheme.layers.top}
		>
			<uisizeconstraint MaxSize={new Vector2(maxW, maxH)} MinSize={new Vector2(minW, minH)} />

			<uipadding
				PaddingBottom={new UDim(0, padY)}
				PaddingLeft={new UDim(0, padX)}
				PaddingRight={new UDim(0, padX)}
				PaddingTop={new UDim(0, padY)}
			/>

			{/* Icon bubble (LEFT) */}
			<frame
				AnchorPoint={new Vector2(0, 0.5)}
				BackgroundColor3={hudTheme.colors.panelElevated ?? Color3.fromRGB(53, 56, 96)}
				BorderSizePixel={0}
				Position={new UDim2(0, 0, 0.5, 0)}
				Size={new UDim2(0, iconSize, 0, iconSize)}
			>
				<uicorner CornerRadius={new UDim(1, 0)} />
				<uistroke
					Color={hudTheme.colors.stroke}
					Thickness={rem(hudTheme.tokens.strokeMd, "pixel")}
				/>
				<textlabel
					BackgroundTransparency={1}
					Font={Enum.Font.GothamBlack}
					Size={new UDim2(1, 0, 1, 0)}
					Text={metric.icon}
					TextColor3={hudTheme.colors.white}
					TextSize={rem(16, "pixel")}
				/>
			</frame>

			{/* Delta chip (RIGHT) */}
			<frame
				AnchorPoint={new Vector2(1, 0.5)}
				AutomaticSize={Enum.AutomaticSize.XY}
				BackgroundTransparency={1}
				Position={new UDim2(1, 0, 0.5, 0)}
				Size={new UDim2(0, 0, 0, 0)}
			>
				<Chip color={metric.changeColor} text={metric.change} />
			</frame>

			{/* Text stack (MIDDLE, fills remaining space) */}
			<frame
				BackgroundTransparency={1}
				Position={new UDim2(0, iconSize + gap, 0, 0)}
				Size={new UDim2(1, -(iconSize + gap + chipReserveW), 1, 0)}
			>
				<uilistlayout
					FillDirection={Enum.FillDirection.Vertical}
					Padding={new UDim(0, rem(2, "pixel"))}
					VerticalAlignment={Enum.VerticalAlignment.Center}
				/>

				<textlabel
					BackgroundTransparency={1}
					Font={Enum.Font.GothamBlack}
					Size={new UDim2(1, 0, 0, rem(12, "pixel"))}
					Text={metric.label.upper()}
					TextColor3={hudTheme.colors.textMuted}
					TextSize={rem(9, "pixel")}
					TextTruncate={Enum.TextTruncate.AtEnd}
					TextXAlignment={Enum.TextXAlignment.Left}
				/>

				<textlabel
					BackgroundTransparency={1}
					Font={Enum.Font.GothamBlack}
					Size={new UDim2(1, 0, 0, rem(18, "pixel"))}
					Text={`${metric.value}`}
					TextColor3={hudTheme.colors.white}
					TextSize={rem(16, "pixel")}
					TextTruncate={Enum.TextTruncate.AtEnd}
					TextXAlignment={Enum.TextXAlignment.Left}
				/>
			</frame>
		</Panel>
	);
}

function DayTimeDisplay({ dayTime }: Readonly<{ dayTime: DayTimeModel }>): React.Element {
	const rem = useRem();

	const minW = rem(260, "pixel");
	const minH = rem(54, "pixel");
	const maxW = rem(340, "pixel");

	return (
		<Panel
			automaticSize={Enum.AutomaticSize.XY}
			size={new UDim2(0, 0, 0, 0)}
			zIndex={hudTheme.layers.top}
		>
			<uisizeconstraint
				MaxSize={new Vector2(maxW, rem(72, "pixel"))}
				MinSize={new Vector2(minW, minH)}
			/>

			<uipadding
				PaddingBottom={new UDim(0, rem(hudTheme.tokens.pad2, "pixel"))}
				PaddingLeft={new UDim(0, rem(hudTheme.tokens.pad3, "pixel"))}
				PaddingRight={new UDim(0, rem(hudTheme.tokens.pad3, "pixel"))}
				PaddingTop={new UDim(0, rem(hudTheme.tokens.pad2, "pixel"))}
			/>
			<uilistlayout
				FillDirection={Enum.FillDirection.Horizontal}
				Padding={new UDim(0, rem(hudTheme.tokens.gap3, "pixel"))}
				VerticalAlignment={Enum.VerticalAlignment.Center}
			/>

			<textlabel
				AutomaticSize={Enum.AutomaticSize.X}
				BackgroundTransparency={1}
				Font={Enum.Font.GothamBlack}
				Size={new UDim2(0, 0, 0, rem(20, "pixel"))}
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
				AutomaticSize={Enum.AutomaticSize.X}
				BackgroundTransparency={1}
				Font={Enum.Font.RobotoMono}
				Size={new UDim2(0, 0, 0, rem(20, "pixel"))}
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

	// On compact screens, show at most 2 pills.
	const count = layout.isCompact ? math.min(2, market.size()) : market.size();

	const visible = useMemo((): Array<MarketMetric> => {
		const out = new Array<MarketMetric>();
		for (let index = 0; index < count; index++) {
			const item = market[index];
			if (item !== undefined) {
				out.push(item);
			}
		}

		return out;
	}, [count, market]);

	return (
		<frame
			AutomaticSize={Enum.AutomaticSize.XY}
			BackgroundTransparency={1}
			Size={new UDim2(0, 0, 0, 0)}
		>
			<uipadding
				PaddingLeft={new UDim(0, rem(4, "pixel"))}
				PaddingRight={new UDim(0, rem(4, "pixel"))}
			/>
			<uilistlayout
				FillDirection={Enum.FillDirection.Horizontal}
				HorizontalAlignment={Enum.HorizontalAlignment.Center}
				Padding={new UDim(0, rem(hudTheme.tokens.gap3, "pixel"))}
				VerticalAlignment={Enum.VerticalAlignment.Center}
			/>

			{visible.map((metric: MarketMetric) => {
				return <StatPill key={metric.label} metric={metric} />;
			})}
		</frame>
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
			Size={new UDim2(0, 0, 0, 0)}
		>
			<uilistlayout
				FillDirection={Enum.FillDirection.Horizontal}
				HorizontalAlignment={Enum.HorizontalAlignment.Right}
				Padding={new UDim(0, rem(hudTheme.tokens.gap2, "pixel"))}
				VerticalAlignment={Enum.VerticalAlignment.Center}
			/>

			<Panel
				automaticSize={Enum.AutomaticSize.XY}
				size={new UDim2(0, 0, 0, 0)}
				zIndex={hudTheme.layers.top}
			>
				<uisizeconstraint
					MaxSize={new Vector2(rem(300, "pixel"), rem(76, "pixel"))}
					MinSize={new Vector2(rem(220, "pixel"), rem(58, "pixel"))}
				/>

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
					Size={new UDim2(0, rem(34, "pixel"), 0, rem(34, "pixel"))}
					Text="$"
					TextColor3={Color3.fromRGB(255, 248, 225)}
					TextSize={rem(20, "pixel")}
				>
					<uicorner CornerRadius={new UDim(1, 0)} />
					<uistroke Color={Color3.fromRGB(230, 162, 0)} Thickness={rem(3, "pixel")} />
				</textlabel>

				<frame
					AutomaticSize={Enum.AutomaticSize.XY}
					BackgroundTransparency={1}
					Size={new UDim2(0, 0, 0, 0)}
				>
					<uilistlayout
						FillDirection={Enum.FillDirection.Vertical}
						Padding={new UDim(0, rem(2, "pixel"))}
					/>

					<textlabel
						AutomaticSize={Enum.AutomaticSize.X}
						BackgroundTransparency={1}
						Font={Enum.Font.GothamBlack}
						Size={new UDim2(0, 0, 0, rem(10, "pixel"))}
						Text="BALANCE"
						TextColor3={hudTheme.colors.textMuted}
						TextSize={rem(9, "pixel")}
						TextXAlignment={Enum.TextXAlignment.Left}
					/>

					<textlabel
						AutomaticSize={Enum.AutomaticSize.X}
						BackgroundTransparency={1}
						Font={Enum.Font.RobotoMono}
						Size={new UDim2(0, 0, 0, rem(26, "pixel"))}
						Text={`$${string.format("%d", balance)}`}
						TextColor3={hudTheme.colors.yellow}
						TextSize={rem(22, "pixel")}
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
