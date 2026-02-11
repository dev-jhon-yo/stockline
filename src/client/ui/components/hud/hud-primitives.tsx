import React from "@rbxts/react";

import { useRem } from "client/ui/hooks";

import type { ChipData, ObjectiveData, SlotData } from "./hud-data";
import { hudTheme } from "./hud-theme";

export function SurfaceCard(
	props: Readonly<React.PropsWithChildren<{ position: UDim2; size: UDim2 }>>,
): React.Element {
	const { position, size, children } = props;
	const rem = useRem();

	return (
		<frame
			AnchorPoint={new Vector2(0, 0)}
			BackgroundColor3={hudTheme.colors.surface}
			BackgroundTransparency={0.18}
			BorderSizePixel={0}
			Position={position}
			Size={size}
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
	data,
}: Readonly<{ data: ChipData }>): React.Element {
	const rem = useRem();

	return (
		<frame BackgroundTransparency={1} Size={new UDim2(0.32, 0, 1, 0)}>
			<uilistlayout
				FillDirection={Enum.FillDirection.Horizontal}
				Padding={rem(new UDim(0, 8), "pixel")}
				VerticalAlignment={Enum.VerticalAlignment.Center}
			/>
			<frame
				BackgroundColor3={hudTheme.colors.surfaceStrong}
				BackgroundTransparency={0.4}
				Size={rem(new UDim2(0, 30, 0, 30), "pixel")}
			>
				<uicorner CornerRadius={rem(hudTheme.radius.sm, "pixel")} />
				<textlabel
					BackgroundTransparency={1}
					Font={Enum.Font.GothamMedium}
					Size={new UDim2(1, 0, 1, 0)}
					Text={data.icon}
					TextColor3={hudTheme.colors.blue}
					TextSize={rem(16, "pixel")}
				/>
			</frame>
			<frame
				BackgroundTransparency={1}
				Size={rem(new UDim2(1, -40, 1, 0), "pixel")}
			>
				<textlabel
					BackgroundTransparency={1}
					Font={Enum.Font.Gotham}
					Position={rem(new UDim2(0, 0, 0, -2), "pixel")}
					Size={new UDim2(1, 0, 0.45, 0)}
					Text={data.label}
					TextColor3={hudTheme.colors.textSecondary}
					TextSize={rem(14, "pixel")}
					TextXAlignment={Enum.TextXAlignment.Left}
				/>
				<textlabel
					BackgroundTransparency={1}
					Font={Enum.Font.GothamMedium}
					Position={new UDim2(0, 0, 0.52, 0)}
					Size={new UDim2(0.52, 0, 0.48, 0)}
					Text={data.value}
					TextColor3={hudTheme.colors.textPrimary}
					TextSize={rem(20, "pixel")}
					TextXAlignment={Enum.TextXAlignment.Left}
				/>
				<frame
					BackgroundColor3={data.changeColor}
					BackgroundTransparency={0.8}
					Position={new UDim2(0.56, 0, 0.58, 0)}
					Size={new UDim2(0.44, 0, 0.36, 0)}
				>
					<uicorner CornerRadius={rem(hudTheme.radius.sm, "pixel")} />
					<textlabel
						BackgroundTransparency={1}
						Font={Enum.Font.GothamMedium}
						Size={new UDim2(1, 0, 1, 0)}
						Text={data.change}
						TextColor3={data.changeColor}
						TextSize={rem(13, "pixel")}
					/>
				</frame>
			</frame>
		</frame>
	);
}

export function ObjectiveItem({
	data,
}: Readonly<{ data: ObjectiveData }>): React.Element {
	const rem = useRem();

	return (
		<frame
			BackgroundColor3={hudTheme.colors.surfaceMuted}
			BackgroundTransparency={0.25}
			BorderSizePixel={0}
			Size={rem(new UDim2(1, 0, 0, 138), "pixel")}
		>
			<uicorner CornerRadius={rem(hudTheme.radius.md, "pixel")} />
			<uipadding
				PaddingBottom={rem(new UDim(0, 10), "pixel")}
				PaddingLeft={rem(new UDim(0, 14), "pixel")}
				PaddingRight={rem(new UDim(0, 14), "pixel")}
				PaddingTop={rem(new UDim(0, 12), "pixel")}
			/>
			<textlabel
				BackgroundTransparency={1}
				Font={Enum.Font.GothamMedium}
				Size={rem(new UDim2(1, 0, 0, 24), "pixel")}
				Text={
					data.isOptional === true ? `${data.title} (Optional)` : data.title
				}
				TextColor3={hudTheme.colors.textPrimary}
				TextSize={rem(22, "pixel")}
				TextXAlignment={Enum.TextXAlignment.Left}
				TextYAlignment={Enum.TextYAlignment.Top}
			>
				<uitextsizeconstraint
					MaxTextSize={rem(21, "pixel")}
					MinTextSize={rem(14, "pixel")}
				/>
			</textlabel>
			<textlabel
				BackgroundTransparency={1}
				Font={Enum.Font.Gotham}
				Position={rem(new UDim2(0, 0, 0, 30), "pixel")}
				Size={rem(new UDim2(1, 0, 0, 30), "pixel")}
				Text={data.description}
				TextColor3={hudTheme.colors.textSecondary}
				TextSize={rem(16, "pixel")}
				TextWrapped={true}
				TextXAlignment={Enum.TextXAlignment.Left}
				TextYAlignment={Enum.TextYAlignment.Top}
			>
				<uitextsizeconstraint
					MaxTextSize={rem(14, "pixel")}
					MinTextSize={rem(12, "pixel")}
				/>
			</textlabel>
			<textlabel
				BackgroundTransparency={1}
				Font={Enum.Font.GothamMedium}
				Position={rem(new UDim2(0, 0, 1, -52), "pixel")}
				Size={rem(new UDim2(1, 0, 0, 20), "pixel")}
				Text={`Progress      ${data.progressLabel}`}
				TextColor3={hudTheme.colors.textSecondary}
				TextSize={rem(14, "pixel")}
				TextXAlignment={Enum.TextXAlignment.Left}
			>
				<uitextsizeconstraint
					MaxTextSize={rem(14, "pixel")}
					MinTextSize={rem(11, "pixel")}
				/>
			</textlabel>
			<frame
				BackgroundColor3={hudTheme.colors.surfaceStrong}
				BackgroundTransparency={0.45}
				BorderSizePixel={0}
				Position={rem(new UDim2(0, 10, 1, -26), "pixel")}
				Size={rem(new UDim2(1, -20, 0, 8), "pixel")}
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
		</frame>
	);
}

export function QuickSlot({
	data,
	index,
}: Readonly<{ data: SlotData; index: number }>): React.Element {
	const rem = useRem();

	return (
		<frame
			BackgroundColor3={
				data.isSelected === true
					? hudTheme.colors.surfaceStrong
					: hudTheme.colors.surface
			}
			BackgroundTransparency={data.isSelected === true ? 0.15 : 0.35}
			BorderSizePixel={0}
			Size={rem(new UDim2(0, 84, 1, -12), "pixel")}
		>
			<uicorner CornerRadius={rem(hudTheme.radius.md, "pixel")} />
			<uistroke
				Color={
					data.isSelected === true
						? hudTheme.colors.stroke
						: hudTheme.colors.strokeSoft
				}
				Thickness={rem(hudTheme.stroke.thin, "pixel")}
				Transparency={data.isSelected === true ? 0.25 : 0.55}
			/>
			<textlabel
				BackgroundTransparency={1}
				Font={Enum.Font.GothamBold}
				Position={rem(new UDim2(0, 8, 0, -6), "pixel")}
				Size={rem(new UDim2(0, 20, 0, 20), "pixel")}
				Text={`${index + 1}`}
				TextColor3={hudTheme.colors.textSecondary}
				TextSize={rem(14, "pixel")}
				TextXAlignment={Enum.TextXAlignment.Left}
			/>
			<textlabel
				BackgroundTransparency={1}
				Font={Enum.Font.GothamMedium}
				Position={new UDim2(0.5, 0, 0.45, 0)}
				Size={rem(new UDim2(0, 36, 0, 36), "pixel")}
				Text={data.icon}
				TextColor3={hudTheme.colors.textPrimary}
				TextSize={rem(32, "pixel")}
			/>
			<textlabel
				BackgroundTransparency={1}
				Font={Enum.Font.GothamMedium}
				Position={rem(new UDim2(1, -8, 1, -18), "pixel")}
				Size={rem(new UDim2(0, 22, 0, 14), "pixel")}
				Text={data.count}
				TextColor3={hudTheme.colors.textPrimary}
				TextSize={rem(15, "pixel")}
				TextXAlignment={Enum.TextXAlignment.Right}
			/>
		</frame>
	);
}
