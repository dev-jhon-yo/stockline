/* eslint-disable max-lines -- HUD components are intentionally co-located to preserve visual hierarchy parity with the source reference. */
import React, { useState } from "@rbxts/react";

import { useRem } from "client/ui/hooks";

import { hudTheme } from "./hud-theme";

interface PanelProps extends React.PropsWithChildren {
	automaticSize?: Enum.AutomaticSize | undefined;
	position?: UDim2 | undefined;
	size?: UDim2 | undefined;
	zIndex?: number | undefined;
}

export function Panel({
	automaticSize,
	position,
	size,
	zIndex,
	children,
}: Readonly<PanelProps>): React.Element {
	const rem = useRem();

	// MUCH larger depth offset to match Figma's pronounced shadow (6-8px)
	const depthOffset = rem(7, "pixel");
	const cornerRadius = rem(hudTheme.tokens.radiusLg, "pixel");

	// IMPORTANT:
	// - If AutomaticSize is enabled, do NOT apply a default Size.
	// - Default Size is only safe when AutomaticSize is NOT used.
	const resolvedSize =
		size ?? (automaticSize !== undefined ? new UDim2(0, 0, 0, 0) : new UDim2(0, 320, 0, 64));

	const resolvedZ = zIndex ?? hudTheme.layers.base;

	return (
		<frame
			{...(automaticSize !== undefined ? { AutomaticSize: automaticSize } : {})}
			BackgroundTransparency={1}
			BorderSizePixel={0}
			Position={position ?? new UDim2()}
			Size={resolvedSize}
			ZIndex={resolvedZ}
		>
			{/* Base (depth) - VERY DARK shadow matching Figma */}
			<frame
				key="BASE_DEPTH"
				BackgroundColor3={Color3.fromRGB(20, 23, 38)}
				BorderSizePixel={0}
				Position={new UDim2(0, 0, 0, depthOffset)}
				Size={new UDim2(1, 0, 1, 0)}
				ZIndex={resolvedZ - 1}
			>
				<uicorner CornerRadius={new UDim(0, cornerRadius)} />
			</frame>

			{/* Face - Solid color matching Figma (no strong gradient) */}
			<frame
				BackgroundColor3={Color3.fromRGB(42, 45, 74)}
				BorderSizePixel={0}
				Size={new UDim2(1, 0, 1, 0)}
				ZIndex={resolvedZ}
			>
				<uicorner CornerRadius={new UDim(0, cornerRadius)} />

				{/* VERY subtle gradient (barely visible) */}
				<uigradient
					Color={
						new ColorSequence([
							new ColorSequenceKeypoint(0, Color3.fromRGB(44, 47, 77)),
							new ColorSequenceKeypoint(1, Color3.fromRGB(40, 43, 72)),
						])
					}
					Rotation={90}
					Transparency={
						new NumberSequence([
							new NumberSequenceKeypoint(0, 0.5),
							new NumberSequenceKeypoint(1, 0),
						])
					}
				/>

				{/* Dark border stroke */}
				<uistroke
					ApplyStrokeMode={Enum.ApplyStrokeMode.Border}
					Color={Color3.fromRGB(28, 31, 52)}
					Thickness={rem(hudTheme.tokens.strokeLg, "pixel")}
				/>

				{children}
			</frame>
		</frame>
	);
}

interface ChipProps {
	color: Color3;
	text: string;
}

export function Chip({ color, text }: Readonly<ChipProps>): React.Element {
	const rem = useRem();
	return (
		<frame
			AutomaticSize={Enum.AutomaticSize.X}
			BackgroundColor3={color}
			BorderSizePixel={0}
			Size={new UDim2(0, 0, 0, rem(18, "pixel"))}
		>
			<uicorner CornerRadius={new UDim(1, 0)} />
			<uistroke
				Color={color.Lerp(Color3.fromRGB(0, 0, 0), 0.35)}
				Thickness={rem(hudTheme.tokens.strokeMd, "pixel")}
			/>
			<uipadding
				PaddingLeft={new UDim(0, rem(8, "pixel"))}
				PaddingRight={new UDim(0, rem(8, "pixel"))}
			/>
			<textlabel
				AutomaticSize={Enum.AutomaticSize.X}
				BackgroundTransparency={1}
				Font={Enum.Font.GothamBold}
				Size={new UDim2(0, 0, 1, 0)}
				Text={text}
				TextColor3={hudTheme.colors.white}
				TextSize={rem(10, "pixel")}
			/>
		</frame>
	);
}

interface ProgressBarProps {
	fillColor: Color3;
	progress: number;
	text: string;
}

export function ProgressBar({
	fillColor,
	progress,
	text,
}: Readonly<ProgressBarProps>): React.Element {
	const rem = useRem();
	const clamped = math.clamp(progress, 0, 1);
	const radius = rem(hudTheme.tokens.radiusSm, "pixel");
	return (
		<frame BackgroundTransparency={1} Size={new UDim2(1, 0, 0, rem(24, "pixel"))}>
			<frame
				BackgroundColor3={hudTheme.colors.progressBase}
				BorderSizePixel={0}
				Size={new UDim2(1, 0, 0, rem(20, "pixel"))}
			>
				<uicorner CornerRadius={new UDim(0, radius)} />
				<uistroke Color={hudTheme.colors.strokeBottom} Thickness={rem(3, "pixel")} />
				<frame
					BackgroundColor3={fillColor}
					BorderSizePixel={0}
					Size={new UDim2(clamped, 0, 1, 0)}
				>
					<uicorner CornerRadius={new UDim(0, radius)} />
					<uigradient
						Color={
							new ColorSequence([
								new ColorSequenceKeypoint(
									0,
									fillColor.Lerp(Color3.fromRGB(255, 255, 255), 0.3),
								),
								new ColorSequenceKeypoint(
									1,
									fillColor.Lerp(Color3.fromRGB(0, 0, 0), 0.2),
								),
							])
						}
						Rotation={90}
					/>
				</frame>
			</frame>
			<textlabel
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundTransparency={1}
				Font={Enum.Font.GothamBlack}
				Position={new UDim2(0.5, 0, 0.42, 0)}
				Size={new UDim2(1, -rem(8, "pixel"), 0, rem(12, "pixel"))}
				Text={text}
				TextColor3={hudTheme.colors.white}
				TextSize={rem(11, "pixel")}
			>
				<uistroke Color={hudTheme.colors.strokeBottom} Thickness={rem(1, "pixel")} />
			</textlabel>
		</frame>
	);
}

interface ActionButtonProps {
	icon: string;
	label: string;
	onClick?: (() => void) | undefined;
	size: UDim2;
	subtitle?: string | undefined;
	zIndex?: number | undefined;
}

export function ActionButton({
	icon,
	label,
	onClick,
	size,
	subtitle,
	zIndex,
}: Readonly<ActionButtonProps>): React.Element {
	const rem = useRem();
	const [isHovered, setIsHovered] = useState(false);
	const [isPressed, setIsPressed] = useState(false);

	const depthOffset = rem(isPressed ? 2 : hudTheme.tokens.depthOffset, "pixel");
	let pressScale = 1;
	if (isPressed) {
		pressScale = 0.985;
	} else if (isHovered) {
		pressScale = 1.01;
	}

	return (
		<frame BackgroundTransparency={1} Size={size} ZIndex={zIndex ?? hudTheme.layers.bottom}>
			<uiscale Scale={pressScale} />
			<frame
				BackgroundColor3={hudTheme.colors.buttonBlueDark}
				BorderSizePixel={0}
				Position={new UDim2(0, 0, 0, depthOffset)}
				Size={new UDim2(1, 0, 1, 0)}
			>
				<uicorner CornerRadius={new UDim(0, rem(hudTheme.tokens.radiusLg, "pixel"))} />
			</frame>
			<textbutton
				AutoButtonColor={false}
				BackgroundColor3={hudTheme.colors.buttonBlue}
				BorderSizePixel={0}
				Event={{
					Activated: () => onClick?.(),
					MouseButton1Down: () => {
						setIsPressed(true);
					},
					MouseButton1Up: () => {
						setIsPressed(false);
					},
					MouseEnter: () => {
						setIsHovered(true);
					},
					MouseLeave: () => {
						setIsHovered(false);
						setIsPressed(false);
					},
				}}
				Size={new UDim2(1, 0, 1, 0)}
				Text=""
			>
				<uicorner CornerRadius={new UDim(0, rem(hudTheme.tokens.radiusLg, "pixel"))} />
				<uistroke Color={Color3.fromRGB(13, 122, 181)} Thickness={rem(3, "pixel")} />
				<uigradient
					Color={
						new ColorSequence([
							new ColorSequenceKeypoint(0, Color3.fromRGB(110, 224, 255)),
							new ColorSequenceKeypoint(1, Color3.fromRGB(34, 168, 232)),
						])
					}
					Rotation={90}
				/>
				<frame
					BackgroundColor3={Color3.fromRGB(255, 255, 255)}
					BackgroundTransparency={0.65}
					BorderSizePixel={0}
					Size={new UDim2(1, 0, 0, rem(3, "pixel"))}
				>
					<uicorner CornerRadius={new UDim(0, rem(hudTheme.tokens.radiusLg, "pixel"))} />
				</frame>
				<uipadding
					PaddingBottom={new UDim(0, rem(8, "pixel"))}
					PaddingLeft={new UDim(0, rem(hudTheme.tokens.pad3, "pixel"))}
					PaddingRight={new UDim(0, rem(hudTheme.tokens.pad4, "pixel"))}
					PaddingTop={new UDim(0, rem(hudTheme.tokens.pad3, "pixel"))}
				/>
				<uilistlayout
					FillDirection={Enum.FillDirection.Horizontal}
					Padding={new UDim(0, rem(hudTheme.tokens.gap3, "pixel"))}
					VerticalAlignment={Enum.VerticalAlignment.Center}
				/>
				<textlabel
					BackgroundColor3={Color3.fromRGB(26, 107, 154)}
					BorderSizePixel={0}
					Font={Enum.Font.GothamBlack}
					Size={new UDim2(0, rem(36, "pixel"), 0, rem(36, "pixel"))}
					Text="E"
					TextColor3={hudTheme.colors.white}
					TextSize={rem(20, "pixel")}
				>
					<uicorner CornerRadius={new UDim(0, rem(hudTheme.tokens.radiusSm, "pixel"))} />
					<uistroke Color={Color3.fromRGB(13, 85, 128)} Thickness={rem(3, "pixel")} />
				</textlabel>
				<frame BackgroundTransparency={1} Size={new UDim2(1, -rem(52, "pixel"), 1, 0)}>
					<uilistlayout
						FillDirection={Enum.FillDirection.Horizontal}
						Padding={new UDim(0, rem(10, "pixel"))}
						VerticalAlignment={Enum.VerticalAlignment.Center}
					/>
					<textlabel
						BackgroundColor3={Color3.fromRGB(255, 255, 255)}
						BackgroundTransparency={0.76}
						BorderSizePixel={0}
						Font={Enum.Font.GothamBold}
						Size={new UDim2(0, rem(34, "pixel"), 0, rem(34, "pixel"))}
						Text={icon}
						TextColor3={hudTheme.colors.white}
						TextSize={rem(22, "pixel")}
					>
						<uicorner
							CornerRadius={new UDim(0, rem(hudTheme.tokens.radiusMd, "pixel"))}
						/>
					</textlabel>
					<frame BackgroundTransparency={1} Size={new UDim2(1, -rem(44, "pixel"), 1, 0)}>
						<textlabel
							BackgroundTransparency={1}
							Font={Enum.Font.GothamBlack}
							Position={new UDim2(0, 0, 0, rem(2, "pixel"))}
							Size={new UDim2(1, 0, 0, rem(20, "pixel"))}
							Text={label}
							TextColor3={hudTheme.colors.white}
							TextSize={rem(20, "pixel")}
							TextXAlignment={Enum.TextXAlignment.Left}
						/>
						{subtitle !== undefined ? (
							<textlabel
								BackgroundTransparency={1}
								Font={Enum.Font.GothamBold}
								Position={new UDim2(0, 0, 0, rem(24, "pixel"))}
								Size={new UDim2(1, 0, 0, rem(14, "pixel"))}
								Text={subtitle}
								TextColor3={Color3.fromRGB(220, 240, 255)}
								TextSize={rem(11, "pixel")}
								TextXAlignment={Enum.TextXAlignment.Left}
							/>
						) : undefined}
					</frame>
				</frame>
			</textbutton>
		</frame>
	);
}
