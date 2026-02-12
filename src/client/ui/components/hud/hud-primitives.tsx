import React from "@rbxts/react";

import { useRem } from "client/ui/hooks";

import type { ChipData, ObjectiveData, SlotData } from "./hud-data";
import { hudTheme } from "./hud-theme";

interface SurfaceCardProps extends React.PropsWithChildren {
	position: UDim2;
	size: UDim2;
	zIndex?: number | undefined;
}

export function SurfaceCard({
	position,
	size,
	zIndex,
	children,
}: Readonly<SurfaceCardProps>): React.Element {
	const rem = useRem();

	return (
		<frame
			AnchorPoint={new Vector2(0, 0)}
			BackgroundColor3={hudTheme.colors.surface}
			BackgroundTransparency={0.18}
			BorderSizePixel={0}
			Position={position}
			Size={size}
			ZIndex={zIndex ?? hudTheme.layers.base}
		>
			<uicorner CornerRadius={rem(hudTheme.radius.lg, "pixel")} />
			<uistroke
				Color={hudTheme.colors.stroke}
				Thickness={rem(hudTheme.stroke.regular, "pixel")}
				Transparency={0.2}
			/>
			{children}
		</frame>
	);
}

export function StatChip({
	compact,
	data,
}: Readonly<{ compact?: boolean | undefined; data: ChipData }>): React.Element {
	const rem = useRem();

	const iconSize = rem(compact === true ? 22 : 26, "pixel");
	const minW = rem(compact === true ? 130 : 154, "pixel");
	const maxW = rem(compact === true ? 188 : 220, "pixel");

	return (
		<frame
			AutomaticSize={Enum.AutomaticSize.X}
			BackgroundTransparency={1}
			Size={new UDim2(0, 0, 1, 0)}
		>
			<uisizeconstraint
				MaxSize={new Vector2(maxW, math.huge)}
				MinSize={new Vector2(minW, 0)}
			/>

			<uipadding
				PaddingLeft={rem(new UDim(0, 3), "pixel")}
				PaddingRight={rem(new UDim(0, 3), "pixel")}
			/>
			<uilistlayout
				FillDirection={Enum.FillDirection.Horizontal}
				Padding={rem(new UDim(0, 7), "pixel")}
				VerticalAlignment={Enum.VerticalAlignment.Center}
			/>

			<frame
				BackgroundColor3={hudTheme.colors.surfaceStrong}
				BackgroundTransparency={0.4}
				Size={new UDim2(0, iconSize, 0, iconSize)}
			>
				<uicorner CornerRadius={rem(hudTheme.radius.sm, "pixel")} />
				<textlabel
					BackgroundTransparency={1}
					Font={Enum.Font.GothamMedium}
					Size={new UDim2(1, 0, 1, 0)}
					Text={data.icon}
					TextColor3={hudTheme.colors.blue}
					TextSize={rem(compact === true ? 12 : 14, "pixel")}
				/>
			</frame>

			<frame BackgroundTransparency={1} Size={new UDim2(1, 0, 1, 0)}>
				<uilistlayout
					FillDirection={Enum.FillDirection.Vertical}
					Padding={rem(new UDim(0, 1), "pixel")}
					VerticalAlignment={Enum.VerticalAlignment.Center}
				/>

				<textlabel
					BackgroundTransparency={1}
					Font={Enum.Font.Gotham}
					Size={new UDim2(1, 0, 0, rem(14, "pixel"))}
					Text={data.label}
					TextColor3={hudTheme.colors.textSecondary}
					TextSize={rem(compact === true ? 9 : 11, "pixel")}
					TextTruncate={Enum.TextTruncate.AtEnd}
					TextXAlignment={Enum.TextXAlignment.Left}
				/>

				<frame BackgroundTransparency={1} Size={new UDim2(1, 0, 0, rem(18, "pixel"))}>
					<uilistlayout
						FillDirection={Enum.FillDirection.Horizontal}
						HorizontalAlignment={Enum.HorizontalAlignment.Left}
						Padding={rem(new UDim(0, 6), "pixel")}
						VerticalAlignment={Enum.VerticalAlignment.Center}
					/>

					<textlabel
						AutomaticSize={Enum.AutomaticSize.X}
						BackgroundTransparency={1}
						Font={Enum.Font.GothamMedium}
						Size={new UDim2(0, 0, 1, 0)}
						Text={data.value}
						TextColor3={hudTheme.colors.textPrimary}
						TextSize={rem(compact === true ? 12 : 15, "pixel")}
						TextXAlignment={Enum.TextXAlignment.Left}
					/>

					<frame
						AutomaticSize={Enum.AutomaticSize.X}
						BackgroundColor3={data.changeColor}
						BackgroundTransparency={0.8}
						Size={new UDim2(0, 0, 1, 0)}
					>
						<uicorner CornerRadius={rem(hudTheme.radius.sm, "pixel")} />
						<uipadding
							PaddingLeft={rem(new UDim(0, 5), "pixel")}
							PaddingRight={rem(new UDim(0, 5), "pixel")}
						/>
						<textlabel
							AutomaticSize={Enum.AutomaticSize.X}
							BackgroundTransparency={1}
							Font={Enum.Font.GothamMedium}
							Size={new UDim2(0, 0, 1, 0)}
							Text={data.change}
							TextColor3={data.changeColor}
							TextSize={rem(compact === true ? 9 : 10, "pixel")}
						/>
					</frame>
				</frame>
			</frame>
		</frame>
	);
}

export function ObjectiveItem({
	compact,
	data,
}: Readonly<{ compact?: boolean | undefined; data: ObjectiveData }>): React.Element {
	const rem = useRem();
	const cardHeight = rem(compact === true ? 94 : 102, "pixel");
	const indicatorSize = rem(compact === true ? 11 : 13, "pixel");
	const progressBarHeight = rem(6, "pixel");

	return (
		<frame
			BackgroundColor3={hudTheme.colors.surfaceMuted}
			BackgroundTransparency={0.18}
			BorderSizePixel={0}
			Size={new UDim2(1, 0, 0, cardHeight)}
		>
			<uicorner CornerRadius={rem(hudTheme.radius.md, "pixel")} />
			<uipadding
				PaddingBottom={rem(new UDim(0, 8), "pixel")}
				PaddingLeft={rem(new UDim(0, 10), "pixel")}
				PaddingRight={rem(new UDim(0, 10), "pixel")}
				PaddingTop={rem(new UDim(0, 8), "pixel")}
			/>
			<frame BackgroundTransparency={1} Size={new UDim2(1, 0, 1, 0)}>
				<frame
					BackgroundTransparency={1}
					Position={new UDim2(0, 0, 0, 0)}
					Size={new UDim2(1, 0, 0, rem(38, "pixel"))}
				>
					<uilistlayout
						FillDirection={Enum.FillDirection.Horizontal}
						Padding={rem(new UDim(0, 8), "pixel")}
						VerticalAlignment={Enum.VerticalAlignment.Top}
					/>

					<frame
						BackgroundTransparency={1}
						Size={new UDim2(0, indicatorSize, 0, indicatorSize)}
					>
						<uicorner CornerRadius={new UDim(1, 0)} />
						<uistroke
							Color={hudTheme.colors.textSecondary}
							Thickness={rem(1.4, "pixel")}
							Transparency={0.2}
						/>
					</frame>

					<frame BackgroundTransparency={1} Size={new UDim2(1, -indicatorSize - rem(8, "pixel"), 1, 0)}>
						<textlabel
							BackgroundTransparency={1}
							Font={Enum.Font.GothamMedium}
							Size={new UDim2(1, 0, 0, rem(18, "pixel"))}
							Text={data.title}
							TextColor3={hudTheme.colors.textPrimary}
							TextSize={rem(compact === true ? 11 : 12, "pixel")}
							TextTruncate={Enum.TextTruncate.AtEnd}
							TextXAlignment={Enum.TextXAlignment.Left}
						/>
						<textlabel
							BackgroundTransparency={1}
							Font={Enum.Font.Gotham}
							Position={new UDim2(0, 0, 0, rem(18, "pixel"))}
							Size={new UDim2(1, 0, 0, rem(20, "pixel"))}
							Text={data.description}
							TextColor3={hudTheme.colors.textSecondary}
							TextSize={rem(compact === true ? 9 : 10, "pixel")}
							TextWrapped={true}
							TextXAlignment={Enum.TextXAlignment.Left}
							TextYAlignment={Enum.TextYAlignment.Top}
						/>
					</frame>
				</frame>

				<frame
					BackgroundTransparency={1}
					Position={new UDim2(0, rem(0, "pixel"), 1, -rem(28, "pixel"))}
					Size={new UDim2(1, 0, 0, rem(12, "pixel"))}
				>
					<textlabel
						BackgroundTransparency={1}
						Font={Enum.Font.GothamMedium}
						Size={new UDim2(0.6, 0, 1, 0)}
						Text="Progress"
						TextColor3={hudTheme.colors.textSecondary}
						TextSize={rem(10, "pixel")}
						TextXAlignment={Enum.TextXAlignment.Left}
					/>
					<textlabel
						BackgroundTransparency={1}
						Font={Enum.Font.GothamMedium}
						Position={new UDim2(0.6, 0, 0, 0)}
						Size={new UDim2(0.4, 0, 1, 0)}
						Text={data.progressLabel}
						TextColor3={hudTheme.colors.textSecondary}
						TextSize={rem(10, "pixel")}
						TextXAlignment={Enum.TextXAlignment.Right}
					/>
				</frame>

				<frame
					BackgroundColor3={hudTheme.colors.surfaceStrong}
					BackgroundTransparency={0.45}
					BorderSizePixel={0}
					Position={new UDim2(0, rem(6, "pixel"), 1, -progressBarHeight)}
					Size={new UDim2(1, -rem(12, "pixel"), 0, progressBarHeight)}
				>
					<uicorner CornerRadius={new UDim(1, 0)} />
					<frame
						BackgroundColor3={hudTheme.colors.blue}
						BorderSizePixel={0}
						Size={new UDim2(data.progressValue, 0, 1, 0)}
					>
						<uicorner CornerRadius={new UDim(1, 0)} />
					</frame>
				</frame>

				{data.isOptional === true ? (
					<textlabel
						BackgroundTransparency={1}
						Font={Enum.Font.Gotham}
						Position={new UDim2(1, -rem(84, "pixel"), 0, rem(1, "pixel"))}
						Size={new UDim2(0, rem(84, "pixel"), 0, rem(14, "pixel"))}
						Text="(Optional)"
						TextColor3={hudTheme.colors.textSecondary}
						TextSize={rem(10, "pixel")}
						TextXAlignment={Enum.TextXAlignment.Right}
					/>
				) : undefined}
			</frame>
		</frame>
	);
}

export function QuickSlot({
	compact,
	data,
	index,
}: Readonly<{ compact?: boolean | undefined; data: SlotData; index: number }>): React.Element {
	const rem = useRem();

	const slotSize = rem(compact === true ? 56 : 64, "pixel");
	const minW = rem(compact === true ? 48 : 54, "pixel");
	const maxW = rem(compact === true ? 70 : 76, "pixel");

	const selectedBackground = data.isSelected === true ? hudTheme.colors.surfaceStrong : hudTheme.colors.surface;
	const selectedTransparency = data.isSelected === true ? 0.08 : 0.33;

	return (
		<frame
			BackgroundColor3={selectedBackground}
			BackgroundTransparency={selectedTransparency}
			BorderSizePixel={0}
			Size={new UDim2(0, slotSize, 1, 0)}
		>
			<uisizeconstraint
				MaxSize={new Vector2(maxW, math.huge)}
				MinSize={new Vector2(minW, 0)}
			/>

			<uicorner CornerRadius={rem(hudTheme.radius.md, "pixel")} />
			<uistroke
				Color={data.isSelected === true ? hudTheme.colors.stroke : hudTheme.colors.strokeSoft}
				Thickness={rem(data.isSelected === true ? 1.4 : hudTheme.stroke.thin, "pixel")}
				Transparency={data.isSelected === true ? 0.16 : 0.48}
			/>

			<textlabel
				BackgroundTransparency={1}
				Font={Enum.Font.GothamBold}
				Position={new UDim2(0.5, 0, 0, rem(-4, "pixel"))}
				Size={new UDim2(0, rem(18, "pixel"), 0, rem(12, "pixel"))}
				Text={`${index + 1}`}
				TextColor3={hudTheme.colors.textSecondary}
				TextSize={rem(10, "pixel")}
				TextXAlignment={Enum.TextXAlignment.Center}
			/>

			<textlabel
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundTransparency={1}
				Font={Enum.Font.GothamMedium}
				Position={new UDim2(0.5, 0, 0.52, 0)}
				Size={rem(new UDim2(0, 28, 0, 28), "pixel")}
				Text={data.icon}
				TextColor3={hudTheme.colors.textPrimary}
				TextSize={rem(compact === true ? 20 : 23, "pixel")}
			/>

			{data.count === "" ? undefined : (
				<textlabel
					BackgroundTransparency={1}
					Font={Enum.Font.GothamMedium}
					Position={rem(new UDim2(1, -6, 1, -15), "pixel")}
					Size={rem(new UDim2(0, 20, 0, 13), "pixel")}
					Text={data.count}
					TextColor3={hudTheme.colors.textPrimary}
					TextSize={rem(10, "pixel")}
					TextXAlignment={Enum.TextXAlignment.Right}
				/>
			)}
		</frame>
	);
}
