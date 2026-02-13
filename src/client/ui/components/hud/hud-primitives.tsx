import React, { useState } from "@rbxts/react";

import { useRem } from "client/ui/hooks";

import { hudTheme } from "./hud-theme";

interface PanelProps extends React.PropsWithChildren {
	position: UDim2;
	size: UDim2;
	zIndex?: number | undefined;
}

export function Panel({ position, size, zIndex, children }: Readonly<PanelProps>): React.Element {
	const rem = useRem();

	return (
		<frame
			BackgroundColor3={hudTheme.colors.panel}
			BorderSizePixel={0}
			Position={position}
			Size={size}
			ZIndex={zIndex ?? hudTheme.layers.base}
		>
			<uicorner CornerRadius={rem(hudTheme.radius.lg, "pixel")} />
			<uistroke
				ApplyStrokeMode={Enum.ApplyStrokeMode.Border}
				Color={hudTheme.colors.stroke}
				Thickness={rem(3, "pixel")}
				Transparency={0.04}
			/>
			{/* Border-bottom depth illusion */}
			<frame
				BackgroundColor3={hudTheme.colors.strokeBottom}
				BorderSizePixel={0}
				Position={new UDim2(0, 0, 1, -rem(6, "pixel"))}
				Size={new UDim2(1, 0, 0, rem(6, "pixel"))}
				ZIndex={(zIndex ?? hudTheme.layers.base) - 1}
			>
				<uicorner CornerRadius={rem(hudTheme.radius.lg, "pixel")} />
			</frame>
			<frame
				BackgroundColor3={Color3.fromRGB(255, 255, 255)}
				BackgroundTransparency={0.88}
				BorderSizePixel={0}
				Size={new UDim2(1, 0, 0, rem(2, "pixel"))}
				ZIndex={(zIndex ?? hudTheme.layers.base) + 1}
			>
				<uicorner CornerRadius={rem(hudTheme.radius.md, "pixel")} />
			</frame>
			{children}
		</frame>
	);
}

interface ChipProps {
	color: Color3;
	label: string;
	text: string;
}

export function Chip({ color, label, text }: Readonly<ChipProps>): React.Element {
	const rem = useRem();

	return (
		<frame
			AutomaticSize={Enum.AutomaticSize.X}
			BackgroundColor3={color}
			BorderSizePixel={0}
			Size={new UDim2(0, 0, 0, rem(16, "pixel"))}
		>
			<uicorner CornerRadius={new UDim(1, 0)} />
			<uistroke
				Color={color.Lerp(Color3.fromRGB(0, 0, 0), 0.3)}
				Thickness={rem(1, "pixel")}
			/>
			<uipadding
				PaddingLeft={new UDim(0, rem(6, "pixel"))}
				PaddingRight={new UDim(0, rem(6, "pixel"))}
			/>
			<textlabel
				AutomaticSize={Enum.AutomaticSize.X}
				BackgroundTransparency={1}
				Font={Enum.Font.GothamBold}
				Size={new UDim2(0, 0, 1, 0)}
				Text={`${label} ${text}`}
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

	return (
		<frame BackgroundTransparency={1} Size={new UDim2(1, 0, 0, rem(26, "pixel"))}>
			<frame
				BackgroundColor3={hudTheme.colors.progressBase}
				BorderSizePixel={0}
				Size={new UDim2(1, 0, 0, rem(22, "pixel"))}
			>
				<uicorner CornerRadius={new UDim(1, 0)} />
				<uistroke Color={hudTheme.colors.strokeBottom} Thickness={rem(3, "pixel")} />
				<frame
					BackgroundColor3={fillColor}
					BorderSizePixel={0}
					Size={new UDim2(clamped, 0, 1, 0)}
				>
					<uicorner CornerRadius={new UDim(1, 0)} />
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
				Position={new UDim2(0.5, 0, 0.43, 0)}
				Size={new UDim2(1, 0, 0, rem(14, "pixel"))}
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
	position?: UDim2 | undefined;
	size: UDim2;
	subtitle?: string | undefined;
	zIndex?: number | undefined;
}

export function ActionButton({
	icon,
	label,
	onClick,
	position,
	size,
	subtitle,
	zIndex,
}: Readonly<ActionButtonProps>): React.Element {
	const rem = useRem();
	const [isHovered, setIsHovered] = useState(false);
	const [isPressed, setIsPressed] = useState(false);

	const bgTransparency = isHovered ? 0.04 : 0;
	const offsetY = isPressed ? rem(3, "pixel") : 0;

	return (
		<textbutton
			AutoButtonColor={false}
			BackgroundColor3={hudTheme.colors.buttonBlue}
			BackgroundTransparency={bgTransparency}
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
			Position={position ?? new UDim2()}
			Size={size}
			Text=""
			ZIndex={zIndex ?? hudTheme.layers.bottom}
		>
			<uicorner CornerRadius={rem(hudTheme.radius.lg, "pixel")} />
			<uigradient
				Color={
					new ColorSequence([
						new ColorSequenceKeypoint(0, Color3.fromRGB(110, 224, 255)),
						new ColorSequenceKeypoint(1, Color3.fromRGB(34, 168, 232)),
					])
				}
				Rotation={90}
			/>
			<uistroke Color={Color3.fromRGB(13, 122, 181)} Thickness={rem(4, "pixel")} />
			<frame
				BackgroundColor3={Color3.fromRGB(10, 95, 133)}
				BorderSizePixel={0}
				Position={new UDim2(0, 0, 1, -rem(8, "pixel") + offsetY)}
				Size={new UDim2(1, 0, 0, rem(8, "pixel"))}
				ZIndex={(zIndex ?? hudTheme.layers.bottom) - 1}
			>
				<uicorner CornerRadius={rem(hudTheme.radius.lg, "pixel")} />
			</frame>
			<frame
				BackgroundTransparency={1}
				Position={new UDim2(0, 0, 0, offsetY)}
				Size={new UDim2(1, 0, 1, 0)}
			>
				<uipadding
					PaddingBottom={new UDim(0, rem(8, "pixel"))}
					PaddingLeft={new UDim(0, rem(12, "pixel"))}
					PaddingRight={new UDim(0, rem(12, "pixel"))}
					PaddingTop={new UDim(0, rem(10, "pixel"))}
				/>
				<uilistlayout
					FillDirection={Enum.FillDirection.Horizontal}
					Padding={new UDim(0, rem(12, "pixel"))}
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
					<uicorner CornerRadius={rem(hudTheme.radius.sm, "pixel")} />
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
						<uicorner CornerRadius={rem(hudTheme.radius.md, "pixel")} />
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
			</frame>
		</textbutton>
	);
}
